import Inner from "@/components/Inner";
import PostLists from "@/components/PostLists";
import { getAllPosts } from "./blog/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";

const Home = () => {
  const posts = getAllPosts()
    .sort((a, b) => {
      return new Date(b.frontMatter.date) > new Date(a.frontMatter.date)
        ? 1
        : -1;
    })
    .slice(0, 3);

  return (
    <Inner>
      <CoverImage />
      <PostLists posts={posts} postsLength={false} />
      <Link
        href="/blog"
        className={buttonVariants({
          size: "lg",
        })}
      >
        더 보기
      </Link>
    </Inner>
  );
};

export default Home;
