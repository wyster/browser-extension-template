import browser from "webextension-polyfill";

const s = document.createElement("script");
s.type = "text/javascript";
s.src = browser.extension.getURL("dist/page.js");
document.head.appendChild(s);

console.debug("Hello from content script!");
