import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { urlsToMarkdownList } from "../shared/lib/formatter.js";

Deno.test("assert test framework is working", () => {
  assertEquals(3,3);
});

Deno.test("empty URL list formats to empty string", () => {
  assertEquals(urlsToMarkdownList([]), "");
});

Deno.test("URL list with one URL formats to one line markdown", () => {
  assertEquals(
    urlsToMarkdownList([{ title: "Deno", url: "https://deno.land" }]),
    "- [Deno](https://deno.land)",
  );
});

Deno.test("URL list with one other URL formats to one line markdown", () => {
  assertEquals(
    urlsToMarkdownList([{
      title: "Chrome Extensions documentation",
      url: "https://developer.chrome.com/docs/extensions",
    }]),
    "- [Chrome Extensions documentation](https://developer.chrome.com/docs/extensions)",
  );
});

Deno.test("URL list with two URL formats to two lines markdown", () => {
  assertEquals(
    urlsToMarkdownList([
      {title:"Deno",url:"https://deno.land"},
      {title:"Chrome Extensions documentation",url:"https://developer.chrome.com/docs/extensions"},
    ]),
    "- [Deno](https://deno.land)\n- [Chrome Extensions documentation](https://developer.chrome.com/docs/extensions)",
  );
});
