#!/usr/bin/env bash
set -euo pipefail

ADACEEN_INSTALL_SCRIPT_VERSION="2026-06-29-rag-actions-vsix-refresh"
ADACEEN_EXTENSION="adaceen.adaceen"
ADACEEN_VSIX_CANDIDATES=(
  "${ADACEEN_VSIX_PATH:-}"
  ".devcontainer/adaceen.vsix"
  "adaceen.vsix"
)

detect_code_cli() {
  if command -v code >/dev/null 2>&1; then
    echo "code"
    return 0
  fi
  if command -v code-server >/dev/null 2>&1; then
    echo "code-server"
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

for vsix in "${ADACEEN_VSIX_CANDIDATES[@]}"; do
  if [ -n "${vsix}" ] && [ -f "${vsix}" ]; then
    echo "[ADACEEN] Instalando ADACEEN desde VSIX: ${vsix}"
    "${CODE_CLI}" --install-extension "${vsix}" --force || true
    echo "[ADACEEN] Instalacion completada."
    exit 0
  fi
done

latest_vsix="$(
  find . .devcontainer -maxdepth 1 -type f -name 'adaceen-*.vsix' 2>/dev/null \
    | sort -V \
    | tail -n 1
)"
if [ -n "${latest_vsix}" ] && [ -f "${latest_vsix}" ]; then
  echo "[ADACEEN] Instalando ultimo VSIX local: ${latest_vsix}"
  "${CODE_CLI}" --install-extension "${latest_vsix}" --force || true
  echo "[ADACEEN] Instalacion completada."
  exit 0
fi

echo "[ADACEEN] Instalando/actualizando ${ADACEEN_EXTENSION} desde Marketplace..."
"${CODE_CLI}" --install-extension "${ADACEEN_EXTENSION}" --force || true
echo "[ADACEEN] Instalacion completada."
