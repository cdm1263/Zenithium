import PostLists from "@/components/PostLists";
import { getAllTagsAndSeries } from "./utils";
import Inner from "@/components/Inner";
import Filter from "@/components/Filter";
import { filterPosts } from "./action";
import Seperator from "@/components/Seperator";
import CoverImage from "@/components/CoverImage";

export const metadata = {
  title: "Blog - 개발 블로그 Zenithium",
  description: "To Zenith, 최고의 개발자를 향해",
};

type Props = {
  searchParams: { [key: string]: string };
};

export const revalidate = 0;

const Page = async ({ searchParams }: Props) => {
  const { series, tag: tags, search, sort } = searchParams;
  const filteredPosts = await filterPosts({ series, tags, search, sort });
  const { allTags, allSeries } = getAllTagsAndSeries();

  return (
    <section>
      <CoverImage imageSrc="/blog-cover.jpg" />
      <Inner className="flex flex-col lg:flex-row gap-5 z-20">
        <Filter tags={allTags} series={allSeries} />
        <Seperator className="w-full border-b my-2 lg:hidden" />
        <PostLists posts={filteredPosts} />
      </Inner>
    </section>
  );
};

export default Page;
