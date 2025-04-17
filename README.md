start-ts-by
===

Create typescript project by clone empty typescript templates.


## Get Started
```sh
npx start-ts-by [projectName]
# or
npx start-ts-by create [projectName]


# use inquirer 
npx start-ts-by
🚀 開始建立專案...
✔ 請輸入專案名稱 my-app
✔ 請輸入模板 (如 user/repo): (press enter to select template) 
? 請選擇模板 (Use arrow keys)
❯ royfuwei/starter-ts-app (Starter TypeScript App)
  royfuwei/starter-ts-lib (Starter TypeScript Library)
  royfuwei/starter-turbo (Starter TypeScript TurboRepo)
  royfuwei/starter-ts-bin (Starter TypeScript Bin Command)
...

#########

# skip inquirer
npx start-ts-by [projectName] --skip-prompt -t royfuwei/starter-ts-app
```

### Help
```sh
npx start-ts-by --help
#
Usage: start-ts-by [options] [command]

Start TypeScript project by git repo templates

Options:
  -V, --version            output the version number
  -h, --help               display help for command

Commands:
  create [options] [name]  從 GitHub 模板建立新專案 (Default)
  help [command]           display help for command
```

### Default `npx start-ts-by`

```sh
Usage: start-ts-by create [options] [name]

從 GitHub 模板建立新專案 (Default)

Options:
  -t, --template <repo>  GitHub 模板，如 user/repo
  --skip-prompt          skip prompt (default: false)
  --rm <files...>        initial remove files (default: [])
  --no-husky             remove .husky
  --github               keep .github/workflows (default: false)
  --git-init             run git init (default: false)
  --npm-install          run npm install (default: false)
  -h, --help             display help for command
```




## References
- [Development](./docs/development.md)