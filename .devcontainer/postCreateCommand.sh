#!/usr/bin/env bash
# Runs once after the container is created.
set -euo pipefail

# JavaScript (Astro)
npm ci

# Python (uv) for Quarto's Jupyter engine
curl -LsSf https://astral.sh/uv/install.sh | sh
"$HOME/.local/bin/uv" sync

# R packages (rv) for Quarto's knitr engine
curl -sSL https://raw.githubusercontent.com/A2-ai/rv/refs/heads/main/scripts/install.sh | bash
rv sync
