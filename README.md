# dump_tabs_to_markdown_extension

[![Deno](https://github.com/marc-bouvier/dump_tabs_to_markdown_extension/workflows/Deno/badge.svg)](https://github.com/marc-bouvier/dump_tabs_to_markdown_extension/actions)

Chrome extension to copy all opened tabs as a markdown list.

![Showcase GIF : User clicks on the extension icon. Then clicls on "Dump all tabs as markdown to clipboard" buton. Then all opened tabs are copied into the clipboard as a markdown list of links](/showcase/showcase_video.gif)

## Build for chrome

To generate extension for chrome into `generated/chrome` :

```bash
make chrome
```

## Build for firefox


To generate extension for chrome into `generated/firefox` :

```bash
make firefox
```

## Test with deno

```
deno test
```
