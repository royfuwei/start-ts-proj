# start-ts-by


Create ts/js projects from flexible templates using git and local folders.

---

## 🚀 Get Started

```sh
npx start-ts-by [projectName]
# or
npx start-ts-by create [projectName]
```

### Interactive Mode

```sh
npx start-ts-by
# Example workflow:
# 🚀 Start creating project...
# ✔ Enter project name: my-app
# ✔ Enter template (e.g. user/repo, ./local-path, git@domain:group/repo.git)
# ? Choose a template (Use arrow keys)
#   royfuwei/starter-ts-app (Starter TypeScript App)
#   royfuwei/starter-ts-lib (Starter TypeScript Library)
#   ...
```

### Non-interactive (specify template directly)

```sh
npx start-ts-by my-app --skip-prompt -t royfuwei/starter-ts-app
# With branch/tag/subdirectory:
npx start-ts-by my-app -t royfuwei/starter-ts-app#dev/subdir
npx start-ts-by my-app -t git@your.gitlab:group/repo.git#v2/templates
npx start-ts-by my-app -t ./my-template-folder/subdir
```

---

## 📝 Supported Template Sources & Syntax

* **GitHub**

  * `user/repo`
  * `user/repo#branch`
  * `user/repo#branch/subdir`
  * `user/repo/subdir`

* **Custom Git / GitLab / Bitbucket / Gitea / etc.**

  * `git@your.gitlab:group/repo.git#branch/subdir`
  * `https://your.gitlab/group/repo.git#tag/subdir`

* **Local Folders**

  * `./my-template`
  * `./my-template/subdir`
  * `file:./my-template#subdir`

---

## ⚡ How It Works

* **Removed degit dependency.**
* Uses native `git` commands to clone repositories based on parsed template source.
* Local folders are copied directly.
* Supports branch/tag and subdirectory selection for all git sources.
* Works with GitHub, GitLab, private git servers, SSH/HTTP URLs, and local paths.

---

## CLI Help

```sh
npx start-ts-by --help

Usage: start-ts-by [options] [command]

Start TypeScript project by git repo or local folder templates

Options:
  -V, --version            output the version number
  -h, --help               display help for command

Commands:
  create [options] [name]  Create new project from template (Default)
  help [command]           Display help for command
```

---

## References

* [Development](./development.md)

---

**Key changes:**

* degit is removed, all template fetching is handled by git commands or direct file copy.
* Template source string is parsed to support repo URLs, branches, tags, and subdirectories.
