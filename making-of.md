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

## Make the extension available for Firefox

Since this extension does not rely on any vendor browser specific features it can be easily made available as a Firefox extension.

The only difference between chrome and Firefox extension at the time I write this is the `manifest.json` version used.

[Firefox uses the version 2][mozilla-manifest-v3-faq] of the manifesto but Chrome uses the version 3.

In order to support both targets I splited the shared code in a `shared` folder and the manifests in `firefox` and `chrome` folders.

Then I introduced some automation to copy shared code along with each browser's respective manifesto into
- `generated/chrome` for chrome extension
- `generated/firefox` for firefox extension


[mozilla-manifest-v3-faq]:https://blog.mozilla.org/addons/2019/09/03/mozillas-manifest-v3-faq/

## Build with makefile for both powershell and linux shell

In order to have an unified build, I chose to use make command.

I wanted to make the build working both for windows (powershell) and Linux shell environments.

To do so I used a basic Os detection.

```makefile
ifeq ($(OS),Windows_NT) 
# set variables for windows environment
else
# set variables for other environment
endif
```

I wanted to avoid checking for Os in each make targets, so I factorized commands and values in pre-computed variables.

By luck the commands I needed at the moment had similar signatures so I didn't had to introduce OS based conditions in the target themselves.

```makefile
ifeq ($(OS),Windows_NT) 
	PWSH_CMD = pwsh -Command
	MKDIR_P = ${PWSH_CMD} New-Item -ItemType Directory -Force
	CP_R = ${PWSH_CMD} Copy-Item -Force -Recurse 
	RM_RF_GENERATED = ${PWSH_CMD} Remove-Item -Recurse -Force generated
	INSTALL_DENO = ${PWSH_CMD}  "Invoke-WebRequest https://deno.land/x/install/install.ps1 -useb | Invoke-Expression"
	DENO_IS_INSTALLED = $(shell ${PWSH_CMD} Test-Path "$$env:Home/.deno/bin/deno.exe")
	DENO = ${HOME}/.deno/bin/deno
else
	MKDIR_P = mkdir -p
	CP_R = cp -r 
	RM_RF_GENERATED = rm -rf generated
	INSTALL_DENO = curl -fsSL https://deno.land/x/install/install.sh | sh
	DENO_IS_INSTALLED = $(shell if [ -f ${HOME}/.deno/bin/deno ]; then echo "True"; else echo "False"; fi)
	DENO = ${HOME}/.deno/bin/deno
endif
```

Scaffolding `generated`, `generated/chrome`, `generated/firefox` folders.
This target will be run before any other target.

```makefile
scaffold :
	${MKDIR_P} generated
	${MKDIR_P} generated/chrome
	${MKDIR_P} generated/firefox
```

Installing deno if not present

1. check for deno installation in home folder
2. if not found install deno (in userland, so no need to elevate permissions)
3. store the absolute path of the deno command as a makefile variable (no need to export it in path or source it in .bashrc or .zshrc)

```makefile
install-deno :
ifeq ($(DENO_IS_INSTALLED),True)
	@echo Deno is already installed
else
	@echo Installing Deno in userland
	${INSTALL_DENO}
endif

test : install-deno
	${DENO} test
```

So, when running `make test`, we first check if deno is installed, we install it if not.
Then we run the `deno test` command (using absolute path of the deno binary).

Cleaning up generated files

```makefile
clean :
	${RM_RF_GENERATED}
```

## Publish to store

To be continued...