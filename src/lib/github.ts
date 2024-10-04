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

const fetchGQL = async <T>(
  query: string,
  owner: string,
  repo: string,
  category: string
): Promise<T> => {
  // Note: GQL을 fetch로 불러오기 위해서는 body에 query와 함께 쿼리 인자를 객체에 담아서 보내야 한다.
  const variables = { owner, repo, category };

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error("GitHub API 호출 실패");
  }

  return await res.json();
};

export const getCommentCounts = async (
  owner: string,
  repo: string,
  category: string,
  slugs: string[]
) => {
  // Note: Github API로 Discussion에 접근하기 위해서는 GraphQL을 사용해야 한다.
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

    // Note: discussion은 pathname으로 설정을 해놓았기 때문에 /blog/{slug} 형태로 생성된다.
    // Note: endsWith로 포스트별 댓글 수를 불러온다.
    slugs.forEach((slug) => {
      const post = discussions.find((discussion) =>
        discussion.title.endsWith(slug)
      );

      postsCommentCounts[slug] = post ? post.comments.totalCount : 0;
    });

    return postsCommentCounts;
  } catch (error) {
    console.error("댓글 수 가져오기 실패:", error);
    return {};
  }
};
