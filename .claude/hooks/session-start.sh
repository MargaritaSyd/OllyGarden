#!/bin/bash
# SessionStart hook for Claude Code cloud sessions: installs dependencies and the
# skill plugins declared in .claude/settings.json. Local sessions skip it.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install the plugins declared in .claude/settings.json. Claude Code also offers
# them on its own, but only after the marketplaces are known, so add those first.
# A marketplace already registered from a different repository or ref is
# replaced, and its plugins are reinstalled, so a session only trusts the sources
# this file names. A plugin that cannot be installed (for example a private
# marketplace this session cannot read) prints a warning and does not block it.
install_plugins() {
  local settings="$CLAUDE_PROJECT_DIR/.claude/settings.json"
  local known="$HOME/.claude/plugins/known_marketplaces.json"
  local installed="$HOME/.claude/plugins/installed_plugins.json"
  local readded=" "
  if ! command -v claude >/dev/null || ! command -v jq >/dev/null; then
    echo "session-start: claude or jq is missing; skipping plugins" >&2
    return 0
  fi
  while read -r name repo ref; do
    local current="" source="$repo"
    [ -n "$ref" ] && source="$repo#$ref"
    if [ -f "$known" ]; then
      current=$(jq -r --arg n "$name" '.[$n].source // empty | "\(.repo) \(.ref // "")"' "$known")
    fi
    [ "$current" = "$repo $ref" ] && continue
    if [ -n "$current" ]; then
      claude plugin marketplace remove "$name" >/dev/null 2>&1 || true
    fi
    if claude plugin marketplace add "$source" >/dev/null 2>&1; then
      readded="$readded$name "
    else
      echo "session-start: could not add marketplace $source" >&2
    fi
  done < <(jq -r '.extraKnownMarketplaces // {} | to_entries[] | "\(.key) \(.value.source.repo) \(.value.source.ref // "")"' "$settings")
  while read -r plugin; do
    if [[ "$readded" != *" ${plugin#*@} "* ]] && [ -f "$installed" ] &&
      jq -e --arg p "$plugin" '.plugins | has($p)' "$installed" >/dev/null; then
      continue
    fi
    claude plugin install "$plugin" >/dev/null 2>&1 ||
      echo "session-start: could not install $plugin" >&2
  done < <(jq -r '.enabledPlugins // {} | to_entries[] | select(.value) | .key' "$settings")
}

cd "$CLAUDE_PROJECT_DIR"

# Use the Bun version Netlify builds with; an older Bun rewrites bun.lock in an older format.
bun_version=$(sed -n 's/^ *BUN_VERSION *= *"\(.*\)"/\1/p' netlify.toml | head -1)
if [ -z "$bun_version" ]; then
  echo "session-start: BUN_VERSION not found in netlify.toml" >&2
  exit 1
fi
bun_prefix="$HOME/.local/bun-$bun_version"
if [ "$("$bun_prefix/bin/bun" --version 2>/dev/null)" != "$bun_version" ]; then
  npm install --global --silent --prefix "$bun_prefix" "bun@$bun_version"
fi
export PATH="$bun_prefix/bin:$PATH"
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export PATH=\"$bun_prefix/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
fi
bun install --frozen-lockfile

install_plugins
