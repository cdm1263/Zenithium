"use server";

import { baseUrl } from "@/app/sitemap";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export const getPageViews = async (slug: string) => {
  noStore();
  const res = await fetch(`${baseUrl}/api/pageviews?path=/blog/${slug}`);

  if (!res.ok) {
    throw new Error("페이지 조회수 호출 실패");
  }

  const { pageViews } = await res.json();
  revalidatePath(`/blog/${slug}`);
  return pageViews;
};
