import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { urls_to_markdown_list } from "../lib/formatter.js";

Deno.test("assert framework is working", () => {
  assertEquals(3, 3);
});

Deno.test("empty URL list formats to empty string", () => {
  assertEquals(urls_to_markdown_list([]), "");
});

Deno.test("URL list with one URL formats to one line markdown", () => {
  assertEquals(
    urls_to_markdown_list([{ title: "Deno", url: "https://deno.land" }]),
    "- [Deno](https://deno.land)",
  );
});

Deno.test("URL list with one other URL formats to one line markdown", () => {
  assertEquals(
    urls_to_markdown_list([{
      title: "Chrome Extensions documentation",
      url: "https://developer.chrome.com/docs/extensions",
    }]),
    "- [Chrome Extensions documentation](https://developer.chrome.com/docs/extensions)",
  );
});

Deno.test("URL list with two URL formats to two lines markdown", () => {
  assertEquals(
    urls_to_markdown_list([
      {title:"Deno",url:"https://deno.land"},
      {title:"Chrome Extensions documentation",url:"https://developer.chrome.com/docs/extensions"},
    ]),
    "- [Deno](https://deno.land)\n- [Chrome Extensions documentation](https://developer.chrome.com/docs/extensions)",
  );
});
