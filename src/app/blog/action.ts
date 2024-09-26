"use server";

import { getAllPosts } from "./utils";

type Props = {
  series: string;
  tags: string | string[];
  search: string;
  sort: string;
};

export const filterPosts = async ({ series, tags, search, sort }: Props) => {
  const originalPosts = getAllPosts();
  let posts = originalPosts;

  // Note: 태그 필터링
  if (tags) {
    posts = posts.filter((post) => {
      if (typeof tags === "string") {
        return post.frontMatter.tags.includes(tags);
      } else {
        return tags.some((tag) => post.frontMatter.tags.includes(tag));
      }
    });
  }

  // Note: 시리즈 필터링
  if (series) {
    posts = posts.filter((post) => post.frontMatter.series.includes(series));
  }

  // Note: 검색 필터링
  if (search) {
    const searchLower = search.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.frontMatter.title.toLowerCase().includes(searchLower) ||
        post.frontMatter.description.toLowerCase().includes(searchLower)
    );
  }

  // Note: 정렬
  posts.sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.frontMatter.date) > new Date(b.frontMatter.date)
        ? 1
        : -1;
    }
    return new Date(a.frontMatter.date) > new Date(b.frontMatter.date) ? -1 : 1;
  });

  return posts;
};
