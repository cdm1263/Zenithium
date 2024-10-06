"use server";

import { baseUrl } from "@/app/sitemap";

export const getPageViews = async (slug: string) => {
  const res = await fetch(`${baseUrl}/api/pageviews?path=/blog/${slug}`, {
    next: {
      revalidate: 60 * 60 * 1,
    },
  });

  if (!res.ok) {
    throw new Error("페이지 조회수 호출 실패");
  }

  const { pageViews } = await res.json();
  return pageViews;
};
