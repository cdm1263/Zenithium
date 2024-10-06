"use server";

import { baseUrl } from "@/app/sitemap";

export const getPageViews = async (slug: string) => {
  const res = await fetch(`${baseUrl}/api/pageviews?path=/blog/${slug}`, {
    // Note: 캐시 재검증을 1시간 단위로 하도록 해 조회수의 최신화가 1시간 간격으로 동작하도록 설정
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
