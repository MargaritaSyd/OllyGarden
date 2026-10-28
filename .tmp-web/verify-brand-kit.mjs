import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = Number(process.env.CDP_PORT || 9333);
const outDir = ".tmp-web/brand-kit-shots";
mkdirSync(outDir, { recursive: true });

const browser = process.env.CDP_PORT
  ? null
  : spawn(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        `--remote-debugging-port=${port}`,
        "--user-data-dir=.tmp-web/chrome-profile",
        "about:blank",
      ],
      { stdio: "ignore" },
    );

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function debuggerUrl() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const version = await fetch(`http://127.0.0.1:${port}/json/version`).then((response) => response.json());
      if (version.webSocketDebuggerUrl) return version.webSocketDebuggerUrl;
    } catch {
      // Chrome is still starting.
    }
    await sleep(150);
  }
  throw new Error("Chrome debugging port did not open");
}

function session(socket) {
  let id = 0;
  const pending = new Map();
  const waits = [];
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
      return;
    }
    for (const wait of waits) {
      if (wait.match(message)) {
        waits.splice(waits.indexOf(wait), 1);
        wait.resolve(message);
      }
    }
  });
  return {
    send(method, params = {}, sessionId) {
      const messageId = ++id;
      return new Promise((resolve, reject) => {
        pending.set(messageId, { resolve, reject });
        socket.send(JSON.stringify({ id: messageId, method, params, sessionId }));
      });
    },
    until(match) {
      return new Promise((resolve) => waits.push({ match, resolve }));
    },
  };
}

async function evaluate(cdp, sessionId, expression) {
  const result = await cdp.send(
    "Runtime.evaluate",
    { expression, awaitPromise: true, returnByValue: true },
    sessionId,
  );
  if (result.exceptionDetails) {
    const detail = result.exceptionDetails.exception?.description || result.exceptionDetails.text;
    throw new Error(detail || "evaluate failed");
  }
  return result.result.value;
}

async function shot(cdp, sessionId, name) {
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png" }, sessionId);
  const file = `${outDir}/${name}.png`;
  writeFileSync(file, Buffer.from(data, "base64"));
  return file;
}

async function open(cdp, url) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send(
    "Emulation.setDeviceMetricsOverride",
    { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
    sessionId,
  );
  const loaded = cdp.until((message) => message.method === "Page.loadEventFired" && message.sessionId === sessionId);
  await cdp.send("Page.navigate", { url }, sessionId);
  await loaded;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const ready = await evaluate(cdp, sessionId, "Boolean(document.querySelector('h1'))");
    if (ready) return sessionId;
    await sleep(150);
  }
  throw new Error(`Page did not render: ${await evaluate(cdp, sessionId, "location.href")}`);
}

const report = [];
function note(label, value) {
  report.push(`${label}: ${typeof value === "string" ? value : JSON.stringify(value)}`);
}

let socket;
try {
  socket = new WebSocket(await debuggerUrl());
  await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
  const cdp = session(socket);
  const page = await open(cdp, "http://localhost:3010/resources/brand-kit");

  note(
    "hero",
    await evaluate(
      cdp,
      page,
      `(() => {
        const title = document.querySelector("h1")?.textContent?.trim();
        const buttons = [...document.querySelectorAll(".bk-btn")].slice(0, 2).map((node) => node.textContent.trim());
        const jumps = [...document.querySelectorAll(".bk-jump-link")].map((node) => node.textContent.trim());
        const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
        return { title, buttons, jumps, overflow };
      })()`,
    ),
  );
  note("shot-hero", await shot(cdp, page, "01-hero"));

  const sections = ["downloads", "logo", "colour", "type", "pattern", "icons", "imagery"];
  for (const id of sections) {
    await evaluate(
      cdp,
      page,
      `document.getElementById(${JSON.stringify(id)})?.scrollIntoView()`,
    );
    await sleep(200);
    note(`shot-${id}`, await shot(cdp, page, `02-${id}`));
  }

  note(
    "assets",
    await evaluate(
      cdp,
      page,
      `Promise.all([...document.querySelectorAll("img")].map(async (image) => {
        const response = await fetch(image.src, { method: "HEAD" });
        return response.ok ? null : response.status + " " + image.getAttribute("src");
      })).then((rows) => rows.filter(Boolean))`,
    ),
  );

  note(
    "logo",
    await evaluate(
      cdp,
      page,
      `(() => {
        const stage = document.querySelector(".bk-stage-logo");
        const before = stage.currentSrc || stage.src;
        const rose = [...document.querySelectorAll("#logo .bk-seg-btn")].find((node) => node.textContent.trim() === "Rose");
        rose.click();
        const vertical = [...document.querySelectorAll("#logo .bk-seg-btn")].find((node) => node.textContent.trim() === "Vertical");
        vertical.click();
        const sunflower = document.querySelector("#logo .bk-ground[aria-label*='Sunflower'], #logo button.bk-ground");
        const grounds = [...document.querySelectorAll("#logo .bk-ground")];
        grounds[2]?.click();
        const after = (document.querySelector(".bk-stage-logo").currentSrc || document.querySelector(".bk-stage-logo").src);
        const clear = document.querySelector("#logo .bk-toggle");
        return {
          before: before.split("/").pop(),
          after: after.split("/").pop(),
          verticalDisabled: vertical.disabled,
          clearDisabled: clear.disabled,
          groundCount: grounds.length,
        };
      })()`,
    ),
  );

  note(
    "colour",
    await evaluate(
      cdp,
      page,
      `(() => {
        const button = document.querySelector(".bk-swatch");
        button.click();
        return document.querySelector(".bk-swatch-copied")?.textContent;
      })()`,
    ),
  );

  note(
    "pattern",
    await evaluate(
      cdp,
      page,
      `(() => {
        const input = document.querySelector("#pattern input");
        const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        set.call(input, "OTEL");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        const before = document.querySelector("#pattern .bk-pixels rect")?.getAttribute("fill");
        document.querySelector("#pattern .bk-pixels rect")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        const after = document.querySelector("#pattern .bk-pixels rect")?.getAttribute("fill");
        const label = document.querySelector("#pattern .bk-pixels")?.getAttribute("aria-label");
        const tiles = document.querySelectorAll("#pattern .bk-pixels rect").length;
        return { before, after, label, tiles };
      })()`,
    ),
  );

  note(
    "imagery",
    await evaluate(
      cdp,
      page,
      `new Promise((resolve) => {
        const started = performance.now();
        const check = () => {
          const canvas = document.querySelector("#imagery canvas");
          if (canvas && canvas.width > 0) {
            resolve({ width: canvas.width, height: canvas.height });
            return;
          }
          if (performance.now() - started > 4000) resolve({ width: canvas?.width ?? 0, height: canvas?.height ?? 0 });
          else requestAnimationFrame(check);
        };
        check();
      })`,
    ),
  );

  note(
    "dock",
    await evaluate(
      cdp,
      page,
      `(() => {
        document.getElementById("type").scrollIntoView();
        const dock = document.querySelector(".bk-dock");
        return { className: dock.className, inert: dock.hasAttribute("inert") };
      })()`,
    ),
  );

  await evaluate(
    cdp,
    page,
    `Object.defineProperty(window, "innerWidth", { configurable: true, get: () => 390 }); window.dispatchEvent(new Event("resize")); document.documentElement.style.width = "390px";`,
  );
  await cdp.send(
    "Emulation.setDeviceMetricsOverride",
    { width: 390, height: 844, deviceScaleFactor: 2, mobile: true },
    page,
  );
  await evaluate(cdp, page, `document.getElementById("brand-kit-title").scrollIntoView()`);
  await sleep(250);
  note("shot-mobile-hero", await shot(cdp, page, "03-mobile-hero"));
  await evaluate(cdp, page, `document.getElementById("downloads").scrollIntoView()`);
  await sleep(200);
  note("shot-mobile-downloads", await shot(cdp, page, "03-mobile-downloads"));
  note(
    "mobile-overflow",
    await evaluate(
      cdp,
      page,
      `document.documentElement.scrollWidth > document.documentElement.clientWidth + 2`,
    ),
  );

  console.log(report.join("\n"));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  socket?.close();
  browser?.kill();
}
