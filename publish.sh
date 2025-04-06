#!/bin/bash

set -e  # 只要出錯就終止腳本
set -o pipefail

# ====== 設定變數 ======
DIST_DIR="dist"
ROOT_DIR=$(pwd)
DRY_RUN=false
if [ "$1" == "--dry-run" ]; then
  DRY_RUN=true
fi

npm run build
echo "📦 構建完成，準備發佈到 npm"

echo "📄 複製說明文件 (README.md)..."

if [ -f ".npmrc" ]; then
  echo "🔐 複製 .npmrc ..."
  cp .npmrc "$DIST_DIR/"
fi

echo "🚀 切換至 $DIST_DIR 並發佈到 npm ..."
cd "$DIST_DIR"

if [ "$DRY_RUN" = true ]; then
  echo "🔍 執行 dry-run 模式，顯示將要發佈的內容..."
  npm publish --dry-run
  echo "🔍 dry-run 完成，請檢查上面的輸出"
else
  echo "🔍 執行發佈..."
  npm publish
  echo "✅ 發佈完成，請檢查上面的輸出"
  if [ $? -eq 0 ]; then
    echo "✅ 發佈成功！"
  else
    echo "❌ 發佈失敗！"
    exit 1
  fi
fi


echo "✅ 發佈完成，回到專案根目錄"
cd "$ROOT_DIR"
