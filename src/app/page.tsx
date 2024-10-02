import Inner from "@/components/Inner";
import PostLists from "@/components/PostLists";
import { getAllPosts } from "./blog/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import CoverImage from "@/components/CoverImage";
import SocialIcons from "@/components/SocialIcons";
import Seperator from "@/components/Seperator";
import SectionTitle from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
      <Inner className="max-w-screen-lg">
        <div className="flex flex-col text-center w-full justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-primary">
            Zenithium에 오신 것을 <br /> 환영합니다
          </h2>

          <p className="text-md font-semibold leading-7">
            프론트엔드 개발자로서 나만의 집을 지어야겠다는 마음으로 블로그를
            만들게 되었습니다.
            <br />
            <br />
            시행 착오를 겪으며 지은 첫 번째 집이지만, 계속해서 보완해 나가며
            멋진 집으로 가꾸어 나갈 계획입니다.
            <br />제 집에 놀러오셔서 편히 즐기다 가시면 좋겠습니다.
          </p>
        </div>

        <Seperator className="border-b my-10" />

        <div>
          <SectionTitle title="차동민" description="저는 이런 개발자입니다" />
          <p className="mb-3 text-sm leading-7">
            To Zenith, 더 높은 곳에 오르기 위해 고민합니다.
            <br /> 함께 생각하고 지식을 나누며 부족했던 부분을 채우는걸
            좋아합니다.
            <br /> 고민하고 그것을 풀어나가는 과정을 공유하고자 합니다.
          </p>
          <SocialIcons />
        </div>

        <Seperator className="border-b my-10" />

        <div className="flex flex-col md:flex-row md:justify-between mb-5">
          <SectionTitle
            title="블로그 포스트"
            description="다양한 기록들을 읽어보세요"
          />
          <Link
            href="/blog"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "lg",
              }),
              "flex gap-2 text-muted-foreground"
            )}
          >
            포스트 더 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <PostLists posts={posts} postsLength={false} />
      </Inner>
    </>
  );
};

export default Home;
