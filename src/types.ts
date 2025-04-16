import { CommandOptions } from 'commander';

export type ActionArgsType = {
  [key: string]: string | boolean | undefined;
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

export type CreateProjectParams = {
  name: string;
  template: string;
};
