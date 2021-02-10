export function urlsToMarkdownList(urls) {
  if (urls.length == 0) {
    return "";
  }
  return urls.map(({ title, url }) => "- [" + title + "](" + url + ")")
    .join("\n");
}
