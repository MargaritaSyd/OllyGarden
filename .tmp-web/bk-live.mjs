import { spawn } from "node:child_process";

const port = 9347;
const chrome = spawn(
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ["--headless=new", "--disable-gpu", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}\\olly-bk-chrome-8`, "about:blank"],
  { stdio: "ignore" },
);
const timer = setTimeout(() => {
  chrome.kill();
  process.exit(1);
}, 40000);
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
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
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
const { targetId } = await send("Target.createTarget", { url: "http://localhost:3010/resources/brand-kit" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
for (let attempt = 0; attempt < 30; attempt += 1) {
  if (await evaluate(sessionId, "Boolean(document.querySelector('.bk-compare-out'))")) break;
  await sleep(200);
}
await sleep(5000);
const before = await evaluate(
  sessionId,
  `(() => {
    const input = document.querySelector("#pattern input");
    const canvas = document.querySelector(".bk-compare-out");
    const image = document.querySelector(".bk-compare-in");
    return {
      react: Object.keys(input).some((key) => key.startsWith("__react")),
      canvas: [canvas.width, canvas.height],
      image: [image.complete, image.naturalWidth],
      fill: document.querySelector(".bk-pixels rect").getAttribute("fill"),
    };
  })()`,
);
await evaluate(sessionId, `document.querySelector("#pattern button").click()`);
await sleep(400);
const after = await evaluate(
  sessionId,
  `(() => {
    const canvas = document.querySelector(".bk-compare-out");
    const data = canvas.getContext("2d").getImageData(10, 10, 1, 1).data;
    return { fill: document.querySelector(".bk-pixels rect").getAttribute("fill"), canvas: [canvas.width, canvas.height], pixel: [...data] };
  })()`,
);
console.log(JSON.stringify({ before, after }, null, 2));
clearTimeout(timer);
socket.close();
chrome.kill();
