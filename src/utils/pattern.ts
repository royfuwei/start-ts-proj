// 只支援 user/project、user/project/subdir、user/project#branch、user/project#branch/subdir 等 github 風格
export const githubPattern = /^([\w.-]+)\/([\w.-]+)(\/[\w./_-]*)?$/;

// 支援 ssh、http、https、ssh://
export const gitUrlPattern =
  /^(git@[\w.-]+:.*|https?:\/\/.*|ssh:\/\/.*)(\.git)?(\/[\w./_-]*)?$/;
