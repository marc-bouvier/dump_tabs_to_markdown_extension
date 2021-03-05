import { copyToClipboard } from "../lib/clipboard.js";
import { urlsToMarkdownList as urlsToMarkdownList } from "../lib/formatter.js";

document.getElementById("btn-dump-to-clipboard").addEventListener(
  "click",
  () => {
    chrome.tabs.query({}, (tabs) => {
      const urls = tabs.map((it) => {
        return { title: it.title, url: it.url };
      });
      const markdownUrlsList = urlsToMarkdownList(urls);
      copyToClipboard(markdownUrlsList);
    });
  },
);
