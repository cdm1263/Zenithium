import { getGitHubToken } from "./env.server";

type FetchGQLResponse = {
  data: {
    repository: {
      discussions: {
        nodes: Discussion[];
      };
    };
  };
};

type Discussion = {
  title: string;
  comments: {
    totalCount: number;
  };
};

export type CommentCounts = {
  [key: string]: number;
};

const getDiscussionPath = (title: string) => {
  if (title.startsWith("http://") || title.startsWith("https://")) {
    try {
      return new URL(title).pathname;
    } catch {
      return title;
    }
  }

  const blogPathIndex = title.indexOf("/blog/");
  if (blogPathIndex >= 0) {
    return title.slice(blogPathIndex);
  }

  return title;
};

const fetchGQL = async <T>(
  query: string,
  owner: string,
  repo: string,
  category: string
): Promise<T> => {
  const token = getGitHubToken();

  if (!token || !category) {
    throw new Error("Missing GitHub discussion credentials.");
  }

  const variables = { owner, repo, category };
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub discussions.");
  }

  return await res.json();
};

export const getCommentCounts = async (
  owner: string,
  repo: string,
  category: string,
  slugs: string[]
) => {
  if (!category || !slugs.length) {
    return {};
  }

  const query = `
    query($owner: String!, $repo: String!, $category: ID!) {
      repository(owner: $owner, name: $repo) {
        discussions(first: 100, categoryId: $category) {
          nodes {
            title
            comments {
              totalCount
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await fetchGQL<FetchGQLResponse>(
      query,
      owner,
      repo,
      category
    );
    const discussions = data.repository.discussions.nodes;
    const postsCommentCounts: CommentCounts = {};

    slugs.forEach((slug) => {
      const expectedPath = `/blog/${slug}`;
      const post = discussions.find(
        (discussion) => getDiscussionPath(discussion.title) === expectedPath
      );

      postsCommentCounts[slug] = post ? post.comments.totalCount : 0;
    });

    return postsCommentCounts;
  } catch (error) {
    console.error("Failed to load comment counts:", error);
    return {};
  }
};
