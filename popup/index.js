import { urls_to_markdown_list } from "../lib/formatter.js";

document.getElementById("format-result").innerHTML = urls_to_markdown_list(
  ["https://deno.land", "https://developer.chrome.com/docs/extensions"],
);

document.getElementById("btn-dump-to-clipboard").addEventListener("click", (event)=>{
  console.log("Hello click!")
  //chrome.tabs.query(queryInfo: object, callback: function)
})