import { CommandOptions } from 'commander';

export type ParsedTemplateType = {
  repoUrl: string;
  ref: string;
  subdir: string;
  isGithub: boolean;
  isLocal: boolean;
};

export type ActionArgsType = {
  [key: string]: string | string[] | boolean | undefined;
};

export type OptionsType = {
  [key: string]: string | number | boolean | undefined;
};

export type PackageJsonType = {
  name: string;
  version: string;
  description: string;
  [key: string]: string | number | boolean | undefined;
};

export type TemplateInfoType = {
  name: string;
  repo: string;
};

export type ProjectConfigType = {
  name: string;
  version: string;
  description: string;
  templates: TemplateInfoType[];
  packageJson: PackageJsonType;
};

export type FlagsOptionType = {
  flags: string;
  description: string;
  defaultValue?: string | boolean | string[];
};

export type ActionCommandType = {
  name: string;
  description: string;
  flagsOptions: FlagsOptionType[];
  action: (name?: string, actionArgs?: ActionArgsType) => Promise<void>;
  commandOptions?: CommandOptions;
};

export type RemoveFileInfoType = {
  field: string;
  isRemove: boolean;
};

export type RnuExecInfoType = {
  key: string;
  command: string;
  isExec: boolean;
};

export type CreateProjectParams = {
  name: string;
  template: string;
  removeList: RemoveFileInfoType[];
  execList: RnuExecInfoType[];
};

export type PromptCheckArgsType = {
  key: string;
  message: string;
};
