#!/usr/bin/env bash
set -eu
cd -- "$(dirname -- "$0")"
PORT="${1:-8080}"
printf 'Flightpath is opening at http://localhost:%s\nPress Ctrl+C to stop.\n' "$PORT"
exec python3 -m http.server "$PORT" --bind 127.0.0.1 --directory dist
