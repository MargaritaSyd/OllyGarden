import { spawn } from "node:child_process";
const port = 9346;
const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", ["--headless=new","--disable-gpu","--no-first-run",`--remote-debugging-port=${port}`,`--user-data-dir=${process.env.TEMP}\\olly-bk-chrome-7`,"about:blank"], {stdio:"ignore"});
const timer = setTimeout(() => { chrome.kill(); process.exit(1); }, 25000);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let version;
for (let i = 0; i < 40 && !version?.webSocketDebuggerUrl; i++) {
  try { version = await fetch(`http://127.0.0.1:${port}/json/version`).then((r) => r.json()); } catch { version = null; }
  await sleep(200);
}
const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => socket.addEventListener("open", r, { once: true }));
let id = 0; const pending = new Map(); const logs = [];
socket.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.method === "Runtime.exceptionThrown") logs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === "Runtime.consoleAPICalled") logs.push(m.params.args.map((a) => a.value || a.description || a.type).join(" ").slice(0, 300));
  if (!m.id || !pending.has(m.id)) return;
  const {resolve, reject} = pending.get(m.id); pending.delete(m.id);
  m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
});
const send = (method, params={}, sessionId) => new Promise((resolve, reject) => { const messageId = ++id; pending.set(messageId, {resolve, reject}); socket.send(JSON.stringify({id: messageId, method, params, sessionId})); });
const evalOn = async (sessionId, expression) => {
  const result = await send("Runtime.evaluate", {expression, awaitPromise: true, returnByValue: true}, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
};
const {targetId} = await send("Target.createTarget", {url: "about:blank"});
const {sessionId} = await send("Target.attachToTarget", {targetId, flatten: true});
await send("Runtime.enable", {}, sessionId);
await send("Page.navigate", {url: "http://localhost:3010/"}, sessionId);
await sleep(6000);
const info = await evalOn(sessionId, `(() => {
  const button = document.querySelector("header a, header button");
  return {
    next: typeof window.next,
    tag: button?.tagName,
    names: button ? Object.getOwnPropertyNames(button).filter((key) => key.toLowerCase().includes("react")).slice(0, 4) : [],
    scripts: document.scripts.length,
  };
})()`);
console.log(JSON.stringify(info, null, 2));
console.log("---");
console.log(logs.slice(0, 15).join("\n"));
clearTimeout(timer); socket.close(); chrome.kill();
