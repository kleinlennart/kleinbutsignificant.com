#!/usr/bin/env bash
# Runs once after the container is created.
set -euo pipefail

# JavaScript (Astro)
pnpm install --frozen-lockfile

# Python (uv) for Quarto's Jupyter engine
curl -LsSf https://astral.sh/uv/install.sh | sh
"$HOME/.local/bin/uv" sync

# Air, the R formatter
curl -LsSf https://github.com/posit-dev/air/releases/latest/download/air-installer.sh | sh

# R packages (rv) for Quarto's knitr engine
curl -sSL https://raw.githubusercontent.com/A2-ai/rv/refs/heads/main/scripts/install.sh | bash
rv sync
