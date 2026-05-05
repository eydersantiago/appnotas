#!/usr/bin/env bash
set -euo pipefail

ADACEEN_EXTENSION="adaceen.adaceen"

detect_code_cli() {
  if command -v code >/dev/null 2>&1; then
    echo "code"
    return 0
  fi
  if command -v code-insiders >/dev/null 2>&1; then
    echo "code-insiders"
    return 0
  fi
  local vscode_bin
  vscode_bin="$(find /vscode/bin -maxdepth 5 -type f -name code 2>/dev/null | head -n 1 || true)"
  if [ -n "${vscode_bin}" ]; then
    echo "${vscode_bin}"
    return 0
  fi
  return 1
}

if ! CODE_CLI="$(detect_code_cli)"; then
  echo "[ADACEEN] VS Code CLI no disponible todavia. Se reintentara al adjuntar el Codespace."
  exit 0
fi

if "${CODE_CLI}" --list-extensions | tr '[:upper:]' '[:lower:]' | grep -qx "${ADACEEN_EXTENSION}"; then
  echo "[ADACEEN] ${ADACEEN_EXTENSION} ya esta instalada."
  exit 0
fi

echo "[ADACEEN] Instalando ${ADACEEN_EXTENSION}..."
"${CODE_CLI}" --install-extension "${ADACEEN_EXTENSION}" --force
echo "[ADACEEN] Instalacion completada."
