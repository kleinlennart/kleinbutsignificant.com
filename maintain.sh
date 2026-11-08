#!/usr/bin/env bash
# Routine maintenance: print tool versions and upgrade dependencies.
set -euo pipefail
cd "$(dirname "$0")"

## Versions
node --version
quarto --version
uv --version
rv --version
R --version | head -1

## JavaScript (Astro)
npm outdated || true
npm update

## Python (Jupyter engine for Quarto)
uv lock --upgrade
uv sync

## R (knitr engine for Quarto)
rv upgrade

## Sanity check
npm run check
npm run build
