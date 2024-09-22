import PostLists from "@/components/PostLists";
import { getAllPosts } from "./utils";
import Inner from "@/components/Inner";

export const metadata = {
  title: "Blog - 개발 블로그 Zenithium",
  description: "To Zenith, 최고의 개발자를 향해",
};

const Page = () => {
  // TODO: 날짜순 정렬해야됨
  const posts = getAllPosts();
  return (
    <section>
      <Inner>
        <div className="grid">
          <PostLists posts={posts} />
        </div>
      </Inner>
    </section>
  );
};

export default Page;
