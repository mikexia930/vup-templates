import simpleGit, { SimpleGit } from "simple-git";
import i18next from "../i18n";
import FileManager from "./file";
import Logger from "./logger";

export interface GitConfig {
  url: string;
  branch?: string;
  depth?: number;
}

export default class GitManager {
  private git: SimpleGit;

  constructor(workingDir?: string) {
    this.git = simpleGit(workingDir);
  }

  /**
   * 克隆仓库
   */
  async clone(config: GitConfig, targetPath: string): Promise<void> {
    const { url, branch = "main", depth = 1 } = config;

    Logger.step(i18next.t("git.clone.begin"));
    // Logger.info(i18next.t("git.branch", { branch, depth }));

    try {
      const options = ["--branch", branch, "--depth", depth.toString()];
      await this.git.clone(url, targetPath, options);
      Logger.success(i18next.t("git.clone.success"));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : i18next.t("error.unknown");

      if (errorMessage.includes("Repository not found")) {
        throw new Error(i18next.t("git.notFound"));
      } else if (errorMessage.includes("Authentication failed")) {
        throw new Error(i18next.t("git.authenticationFailed"));
      } else if (errorMessage.includes("could not read Username")) {
        throw new Error(i18next.t("git.error.authenticationRequired"));
      } else {
        throw new Error(
          i18next.t("git.clone.failed", { message: errorMessage }),
        );
      }
    }
  }

  /**
   * 拉取最新代码
   */
  async pull(branch: string = "main"): Promise<void> {
    Logger.step(i18next.t("git.pull.begin", { branch }));
    try {
      await this.git.pull("origin", branch);
      Logger.success(i18next.t("git.pull.success"));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : i18next.t("error.unknown");
      Logger.error(i18next.t("git.pull.failed", { message: errorMessage }));
      throw new Error(i18next.t("git.pull.failed", { message: errorMessage }));
    }
  }

  /**
   * 检查仓库是否存在
   */
  async isRepo(): Promise<boolean> {
    try {
      await this.git.checkIsRepo();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 获取当前分支
   */
  async getCurrentBranch(): Promise<string> {
    try {
      const branches = await this.git.branch();
      return branches.current;
    } catch (error) {
      Logger.error(
        i18next.t("git.getBranchFailed", {
          message:
            error instanceof Error ? error.message : i18next.t("error.unknown"),
        }),
      );
      return "main";
    }
  }

  /**
   * 获取远程仓库信息
   */
  async getRemoteUrl(): Promise<string | null> {
    try {
      const remotes = await this.git.getRemotes(true);
      return (
        remotes.find((remote) => remote.name === "origin")?.refs?.fetch || null
      );
    } catch (error) {
      Logger.error(
        i18next.t("git.getRemoteUrlFailed", {
          message:
            error instanceof Error ? error.message : i18next.t("error.unknown"),
        }),
      );
      return null;
    }
  }

  /**
   * 检查是否有更新
   */
  async hasUpdates(): Promise<boolean> {
    try {
      await this.git.fetch();
      const status = await this.git.status();
      return status.behind > 0;
    } catch (error) {
      Logger.warning(
        i18next.t("git.hasUpdatesFailed", {
          message:
            error instanceof Error ? error.message : i18next.t("error.unknown"),
        }),
      );
      return false;
    }
  }

  /**
   * 删除 .git 目录
   */
  async removeGitDir(repoPath: string): Promise<void> {
    const gitDir = FileManager.join(repoPath, ".git");
    if (await FileManager.exists(gitDir)) {
      await FileManager.remove(gitDir);
    }
  }

  /**
   * 克隆并清理（删除 .git 目录）
   */
  async cloneAndClean(config: GitConfig, targetPath: string): Promise<void> {
    await this.clone(config, targetPath);
    await this.removeGitDir(targetPath);
  }
}
