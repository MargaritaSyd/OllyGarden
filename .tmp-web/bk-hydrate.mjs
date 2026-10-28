import { spawn } from "node:child_process";

const port = 9343;
const chrome = spawn(
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${process.env.TEMP}\\olly-bk-chrome-4`,
    "about:blank",
  ],
  { stdio: "ignore" },
);
const timer = setTimeout(() => {
  chrome.kill();
  process.exit(1);
}, 30000);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let version;
for (let attempt = 0; attempt < 50 && !version?.webSocketDebuggerUrl; attempt += 1) {
  try {
    version = await fetch(`http://127.0.0.1:${port}/json/version`).then((response) => response.json());
  } catch {
    version = null;
  }
  await sleep(200);
}
const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
let id = 0;
const pending = new Map();
const logs = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.consoleAPICalled") {
    logs.push(message.params.args.map((arg) => arg.value || arg.description).join(" "));
  }
  if (message.method === "Runtime.exceptionThrown") {
    logs.push("EXC " + message.params.exceptionDetails.exception?.description);
  }
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(JSON.stringify(message.error)));
  else resolve(message.result);
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    socket.send(JSON.stringify({ id: messageId, method, params, sessionId }));
  });
async function evaluate(sessionId, expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Runtime.enable", {}, sessionId);
await send("Page.navigate", { url: "http://localhost:3010/resources/brand-kit" }, sessionId);
for (let attempt = 0; attempt < 40; attempt += 1) {
  if (await evaluate(sessionId, "Boolean(document.querySelector('#pattern input'))")) break;
  await sleep(200);
}
await sleep(1500);
const result = await evaluate(
  sessionId,
  `new Promise((resolve) => {
    const wait = () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
    (async () => {
      const image = document.querySelector(".bk-compare-in");
      const scratch = document.createElement("canvas");
      scratch.width = 40;
      scratch.height = 20;
      const source = scratch.getContext("2d");
      let read = "ok";
      try {
        source.drawImage(image, 0, 0, 40, 20);
        read = [...source.getImageData(0, 0, 1, 1).data].join(",");
      } catch (error) {
        read = error.name + ": " + error.message;
      }
      const input = document.querySelector("#pattern input");
      const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      set.call(input, "OTEL");
      input._valueTracker?.setValue("");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const range = document.querySelector("#imagery input[type=range]");
      set.call(range, "50");
      range._valueTracker?.setValue("45");
      range.dispatchEvent(new Event("input", { bubbles: true }));
      await wait();
      await wait();
      const canvas = document.querySelector(".bk-compare-out");
      resolve({
        read,
        label: document.querySelector(".bk-pixels")?.getAttribute("aria-label"),
        input: input.value,
        sizeLabel: document.querySelector(".bk-range b")?.textContent,
        canvas: [canvas.width, canvas.height],
      });
    })();
  })`,
);
console.log(JSON.stringify(result, null, 2));
console.log("LOGS");
console.log(logs.filter((line) => /error|Error|hydrat|eval|brand/i.test(line)).slice(0, 20).join("\n"));
clearTimeout(timer);
socket.close();
chrome.kill();
