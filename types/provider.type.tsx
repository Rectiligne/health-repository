import { GithubIcon, GitlabIcon } from "lucide-react";

export enum Provider {
  GIT = "git",
}

export interface ProviderIcon {
  [key: string]: JSX.Element;
}

export const providerIcon: ProviderIcon = {
  gitlab: <GitlabIcon />,
  github: <GithubIcon />,
  unknown: <></>,
};
