ifeq ($(OS),Windows_NT) 
	PWSH_CMD = pwsh -Command
	MKDIR_P = ${PWSH_CMD} New-Item -ItemType Directory -Force
	CP_R = ${PWSH_CMD} Copy-Item -Force -Recurse 
	RM_RF_GENERATED = ${PWSH_CMD} Remove-Item -Force generated
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

all : scaffold test firefox chrome

install-deno :
ifeq ($(DENO_IS_INSTALLED),True)
	@echo Deno is already installed
else
	@echo Installing Deno in userland
	${INSTALL_DENO}
endif

scaffold :
	${MKDIR_P} generated
	${MKDIR_P} generated/chrome
	${MKDIR_P} generated/firefox

test : install-deno
	${DENO} test

firefox : scaffold
	${CP_R} shared/* generated/firefox
	${CP_R} firefox/manifest.json generated/firefox

chrome : scaffold
	${CP_R} shared/* generated/chrome
	${CP_R} chrome/manifest.json generated/chrome

clean :
	${RM_RF_GENERATED}