# start-ts-by


快速透過 **任意 git 或本地模板** 建立 TypeScript 專案。
支援 GitHub/GitLab/自架 Git/SSH/HTTP/本地資料夾，彈性指定 branch/tag、子目錄。

---

## 🚀 快速開始

```sh
npx start-ts-by [專案名稱]
# 或
npx start-ts-by create [專案名稱]
```

### 互動式選單模式

```sh
npx start-ts-by
🚀 開始建立專案...
✔ 請輸入專案名稱 my-app
✔ 請輸入模板 (如 user/repo, ./local-path, git@domain:group/repo.git):
? 請選擇模板 (方向鍵選擇)
❯ royfuwei/starter-ts-app (Starter TypeScript App)
  royfuwei/starter-ts-lib (Starter TypeScript Library)
  ...
```

### 直接指定模板

```sh
npx start-ts-by my-app --skip-prompt -t royfuwei/starter-ts-app
# 支援自訂 branch/tag、子目錄
npx start-ts-by my-app -t royfuwei/starter-ts-app#dev/subdir
npx start-ts-by my-app -t git@your.gitlab:group/repo.git#v2/templates
npx start-ts-by my-app -t ./my-template-folder/subdir
```

---

## 📝 支援的模板來源與語法

* **GitHub**
  `user/repo`
  `user/repo#branch`
  `user/repo#branch/subdir`
  `user/repo/subdir`

* **自架 Git、GitLab、Bitbucket、Gitea 等**
  `git@your.gitlab:group/repo.git#branch/subdir`
  `https://your.gitlab/group/repo.git#tag/subdir`

* **本地資料夾**
  `./my-template`
  `./my-template/subdir`
  `file:./my-template#subdir`

---

## ⚡ 運作方式

* **已移除 degit 相依，全部改用 git 指令。**
* 會根據解析後的模板來源，用 git clone 或直接複製資料夾。
* 所有 git repo 均可指定 branch/tag 及子目錄。
* 相容 GitHub、GitLab、自架、私有 git、SSH/HTTP、本地路徑。

---

## CLI 說明

```sh
npx start-ts-by --help

Usage: start-ts-by [options] [command]

Start TypeScript project by git repo or local folder templates

Options:
  -V, --version            顯示版本
  -h, --help               顯示說明

Commands:
  create [options] [name]  從模板建立新專案 (預設)
  help [command]           顯示說明文件
```

---

## 參考文件

* [Development](./development.md)

---

**重點說明：**

* 已經不再依賴 degit，所有模板皆以 git 指令或複製本地資料夾方式取得。
* Template source 字串可同時指定 repo、branch/tag、子目錄。
