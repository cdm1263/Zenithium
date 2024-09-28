import Inner from "@/components/Inner";
import PostLists from "@/components/PostLists";
import { getAllPosts } from "./blog/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";

const Home = () => {
  const posts = getAllPosts().slice(0, 3);

  // Todo: 커버 데이터 설정 필요
  const coverData = {
    imageSrc: "/home-cover.jpg",
    title: "홈화면",
    description: "홈화면 설명",
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
