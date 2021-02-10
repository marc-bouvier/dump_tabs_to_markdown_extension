https://www.maketecheasier.com/create-chrome-extension/

https://developer.chrome.com/docs/extensions/mv2/declare_permissions/

[Enable chrome extensions developer mode](chrome://extensions/)
Load unpacked

https://developer.chrome.com/docs/extensions/mv3/manifest/



https://developer.chrome.com/docs/extensions/reference/tabs/

https://developer.chrome.com/docs/extensions/reference/tabs/#method-query

https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab

- id
- index
- title
- url
- 


https://developer.chrome.com/docs/extensions/mv3/a11y/

Inline script is not authorized to used. Prefer link to local scripts

```html
<script type="module" src="./index.js"></script>
```

```js
import { urls_to_markdown_list } from "../lib/formatter.js";

document.getElementById("format-result").innerHTML = urls_to_markdown_list(
  ["https://deno.land", "https://developer.chrome.com/docs/extensions"],
);

```

## Publish to store

