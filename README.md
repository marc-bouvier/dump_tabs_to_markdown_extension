# dump_tabs_to_markdown_extension

[![Deno](https://github.com/marc-bouvier/dump_tabs_to_markdown_extension/workflows/Deno/badge.svg)](https://github.com/marc-bouvier/dump_tabs_to_markdown_extension/actions)

Chrome/Firefox extension to copy all opened tabs as a markdown list into clipboard.

![Showcase GIF : User clicks on the extension icon. Then clicls on "Dump all tabs as markdown to clipboard" buton. Then all opened tabs are copied into the clipboard as a markdown list of links](/showcase/showcase_video.gif)


## Build all and run tests

The following command will
- scaffold `generated` folder and sub-folders
- Install deno if necessary
- Run tests with deno
- generate Chrome extension into `generated/chrome` folder
- generate Firefox extension into `generated/firefox` folder

```bash
make
```

## Build and install for chrome

To generate extension for chrome into `generated/chrome` :

```bash
make chrome
```

In a chrome based browser open [chrome://extensions](chrome://extensions)
- Check "Developer mode" if it is not already enabled
- Load Unpacked
- Choose `generated\chrome` folder
- The extension should be loaded

## Build and install for Firefox

To generate extension for chrome into `generated/firefox` :

```bash
make firefox
```

In Firefox browser open [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
- Load temporary Addon
- Choose `generated\firefox\manifest.json`
- The extension should be loaded

## Test with deno

```
make test
```

If you have deno already installed, you can also run tests with deno command directly.

```
deno test
```

## Project structure

| Folder / File | Purpose |
| ------ | ------- |
| `.github` | Continuous integration with Github Actions |
| `chrome` | Chrome specifics (mostly manifest) |
| `firefox` | Firefox specifics (mostly manifest) |
| `generated` | (non versioned) output folder where extension are generated. Will be created by `make` targets. |
| `shared` | Common code for the extension. `make` targets will copy contents from this folder into appropriate target folders. |
| `showcase` | Pictures and gifs for documentation purpose |
| `tests` | Automatic tests for deno runtime to execute |
| `credits.md` | Attributions for non owned resources (e.g. icons) |
| `Makefile` | Build targets to be run with `make` command |
| `making-of.md` | Some educational informations on how this extension was built |