import Inner from "@/components/Inner";
import PostLists from "@/components/PostLists";
import { getAllPosts } from "./blog/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";

const Home = () => {
  const posts = getAllPosts().slice(0, 3);

  const coverData = {
    imageSrc: "/home-cover.jpg",
    title: "개발 블로그 Zenithium",
    description: "To Zenith. 어제보다 한 걸음 위로",
  };

  return (
    <>
      <CoverImage coverData={coverData} />
      <Inner>
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
    </>
  );
};

export default Home;
