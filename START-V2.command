#!/bin/zsh
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
cd "${0:A:h}" || exit 1
if ! command -v node >/dev/null 2>&1; then
  print 'Install Node.js from https://nodejs.org, then open this file again.'
  read '?Press Return to close.'
  exit 1
fi
if [[ ! -f dist/index.html ]]; then
  npm ci && npm run build || exit 1
fi
node tools/serve.mjs
