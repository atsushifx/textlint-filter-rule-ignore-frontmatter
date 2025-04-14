<#
.SYNOPSIS
    Install linter tools, commit hook

.DESCRIPTION
    Install linter tools, commit hook using pnpm, scoop

.NOTES
    @Author   Furukawa Atsushi <atsushifx@gmail.com>
    @License  MIT License https://opensource.org/licenses/MIT
    @Since    2025-03-04
    @Version  1.0.0

This project is licensed under the MIT License, see LICENSE for details
#>

# install using scoop
scoop install lefthook

# install using pnpm
$packages = @(
    "@commitlint/cli",
    "@commitlint/config-conventional",
    "secretlint",
    "@secretlint/secretlint-rule-preset-recommend"
) | Join-String -Separator " "

$command = "pnpm add --global " + $packages
Invoke-Expression $command
