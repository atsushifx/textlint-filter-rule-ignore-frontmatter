<#
  .SYNOPSIS
     install linters & dev tools using pnpm and scoop

  .DESCRIPTION
    This script installs linters & dev tools using pnpm and scoop

  .NOTES
    @Author   Furukawa, Atsushi <atsushifx@aglabo.com>
    @License  MIT License https://opensource.org/licenses/MIT

    @Since    2025-02-07
    @Version  1.1.0     Updated by つむぎちゃん💕

  .LICENSE
  This project is licensed under the MIT License, see LICENSE for details
#>

### Functions
<#
  .SYNOPSIS
    Install global packages via pnpm

  .DESCRIPTION
    Checks if each package is already globally installed with pnpm,
    and installs it only if not found.
#>
function install-withPnpmGlobal {
    param (
        [Parameter(Mandatory = $true)]
        [string[]] $Packages
    )

    foreach ($pkg in $Packages) {
        $isInstalled = pnpm list -g --depth 0 | Select-String $pkg

        if ($isInstalled) {
            Write-Host "✅ $pkg is already installed." -ForegroundColor Green
        }
        else {
            Write-Host "📦 Installing $pkg via pnpm..." -ForegroundColor Cyan
            pnpm add -g $pkg
        }
    }
}

<#
  .SYNOPSIS
    Install CLI tools via Scoop

  .DESCRIPTION
    Installs command-line tools using Scoop if not already present.
    Useful for CLI apps like lefthook, gitleaks, dprint, etc.
#>
function install-withScoop {
    param (
        [Parameter(Mandatory = $true)]
        [string[]] $Packages
    )

    foreach ($pkg in $Packages) {
        $isInstalled = scoop list | Select-String $pkg

        if ($isInstalled) {
            Write-Host "✅ $pkg is already installed (scoop)." -ForegroundColor Green
        }
        else {
            Write-Host "🔧 Installing $pkg via scoop..." -ForegroundColor Cyan
            scoop install $pkg
        }
    }
}

### Main
<#
  .SYNOPSIS
    Main installer function

  .DESCRIPTION
    Defines the list of tools to install via pnpm and scoop, and executes the installers.
#>
function main {
    $pnpmPackages = @(
        # secretlint:
        "secretlint",
        "@secretlint/secretlint-rule-preset-recommend",
        # commitlint: check commit messages as ConventionalCommit
        "commitlint",
        "@commitlint/cli",
        "@commitlint/config-conventional",
        # Spell Checker
        "cspell"
    )

    $scoopTools = @(
        "lefthook",
        "gitleaks",
        "dprint"
    )

    Write-Host "`n🌟 Starting dev tool installation..." -ForegroundColor Magenta
    install-withPnpmGlobal -Packages $pnpmPackages
    install-withScoop -Packages $scoopTools
    Write-Host "`n🎉 All tools are ready! Let's make your code sparkle, センパイっ✨" -ForegroundColor Magenta
}

# ▶ 呼び出し
main
