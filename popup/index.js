import { copy_to_clipboard } from "../lib/clipboard.js";
import { urls_to_markdown_list } from "../lib/formatter.js";

document.getElementById("format-result").innerHTML = urls_to_markdown_list(
  ["https://deno.land", "https://developer.chrome.com/docs/extensions"],
);

document.getElementById("btn-dump-to-clipboard").addEventListener(
  "click",
  (event) => {
    chrome.tabs.query({}, (tabs) => {
      const urls = tabs.map((it) => {
        return { title: it.title, url: it.url };
      });
      const markdown_urls_list = urls_to_markdown_list(urls);
      copy_to_clipboard(markdown_urls_list);
    });
  },
);
