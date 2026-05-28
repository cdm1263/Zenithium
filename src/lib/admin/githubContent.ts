import "server-only";

import {
  getGitHubContentBranch,
  getGitHubContentOwner,
  getGitHubContentRepo,
  getGitHubContentToken,
} from "@/lib/env.server";

type CommitFile = {
  path: string;
  content: string;
  encoding: "utf-8" | "base64";
};

type GitHubRefResponse = {
  object: {
    sha: string;
  };
};

type GitHubCommitResponse = {
  tree: {
    sha: string;
  };
};

type GitHubBlobResponse = {
  sha: string;
};

type GitHubTreeResponse = {
  sha: string;
};

type GitHubCreateCommitResponse = {
  sha: string;
};

const githubFetch = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const owner = getGitHubContentOwner();
  const repo = getGitHubContentRepo();
  const token = getGitHubContentToken();
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`GitHub API request failed: ${res.status} ${message}`);
  }

  return (await res.json()) as T;
};

export const githubPathExists = async (filePath: string) => {
  const owner = getGitHubContentOwner();
  const repo = getGitHubContentRepo();
  const token = getGitHubContentToken();
  const branch = getGitHubContentBranch();
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(
      filePath
    ).replace(/%2F/g, "/")}?ref=${encodeURIComponent(branch)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (res.status === 404) return false;
  if (res.ok) return true;

  const message = await res.text();
  throw new Error(`GitHub path check failed: ${res.status} ${message}`);
};

const createBlob = async (file: CommitFile) => {
  const blob = await githubFetch<GitHubBlobResponse>("/git/blobs", {
    method: "POST",
    body: JSON.stringify({
      content: file.content,
      encoding: file.encoding,
    }),
  });

  return blob.sha;
};

export const commitFilesToGitHub = async (message: string, files: CommitFile[]) => {
  const branch = getGitHubContentBranch();
  const ref = await githubFetch<GitHubRefResponse>(
    `/git/ref/heads/${encodeURIComponent(branch)}`
  );
  const baseCommitSha = ref.object.sha;
  const baseCommit = await githubFetch<GitHubCommitResponse>(
    `/git/commits/${baseCommitSha}`
  );

  const treeEntries = await Promise.all(
    files.map(async (file) => ({
      path: file.path,
      mode: "100644",
      type: "blob",
      sha: await createBlob(file),
    }))
  );

  const tree = await githubFetch<GitHubTreeResponse>("/git/trees", {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseCommit.tree.sha,
      tree: treeEntries,
    }),
  });

  const commit = await githubFetch<GitHubCreateCommitResponse>("/git/commits", {
    method: "POST",
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [baseCommitSha],
    }),
  });

  await githubFetch(`/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: "PATCH",
    body: JSON.stringify({
      sha: commit.sha,
      force: false,
    }),
  });

  return commit.sha;
};
