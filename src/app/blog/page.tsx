import PostLists from "@/components/PostLists";
import { getAllTagsAndSeries } from "./utils";
import Inner from "@/components/Inner";
import Filter from "@/components/Filter";
import { filterPosts } from "./action";
import Seperator from "@/components/Seperator";
import CoverImage from "@/components/CoverImage";
import { Metadata } from "next";
import { baseUrl } from "../sitemap";

const description = "블로그 포스트 목록입니다.";

export const metadata: Metadata = {
  title: "Blog",
  description: "To Zenith. 어제보다 한 걸음 위로",
  openGraph: {
    title: "Blog - 개발 블로그 Zenithium",
    description,
    images: [
      {
        url: `${baseUrl}/api/og?description=${description}&bg=blog-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "개발 블로그 Zenithium OG 이미지",
      },
    ],
  },
};

type Props = {
  searchParams: { [key: string]: string };
};

export const revalidate = 0;

const Page = async ({ searchParams }: Props) => {
  const { series, tag: tags, search, sort } = searchParams;
  const filteredPosts = await filterPosts({ series, tags, search, sort });
  const { allTags, allSeries } = getAllTagsAndSeries();

  const coverData = {
    imageSrc: "/blog-cover.jpg",
    title: "Blog",
    description,
  };

  return (
    <section>
      <CoverImage coverData={coverData} />
      <Inner className="flex flex-col lg:flex-row gap-5 z-20">
        <Filter tags={allTags} series={allSeries} />
        <Seperator className="w-full border-b my-2 lg:hidden" />
        <PostLists posts={filteredPosts} />
      </Inner>
    </section>
  );
};

export default Page;
