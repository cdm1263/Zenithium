import PostLists from "@/components/PostLists";
import { getAllTagsAndSeries } from "./utils";
import Inner from "@/components/Inner";
import Filter from "@/components/Filter";
import { filterPosts } from "./action";

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
      <Inner className="flex flex-col lg:flex-row gap-5">
        <Filter tags={allTags} series={allSeries} />
        <PostLists posts={filteredPosts} />
      </Inner>
    </section>
  );
};

export default Page;
