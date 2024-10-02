import Inner from "@/components/Inner";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const NotFoundCategory = () => {
  return (
    <Inner className="-mt-[600px] flex-1 z-10 flex flex-col items-center justify-center ">
      <h1 className="text-3xl sm:text-6xl font-bold mb-10">
        페이지가 없습니다
      </h1>
      <p className="text-sm sm:text-lg flex flex-col sm:flex-row sm:gap-x-1.5 mb-16">
        <span>요청하신 페이지를 찾을 수 없습니다.</span>
        <span>입력한 URL이 맞는지 확인해 주세요.</span>
      </p>
      <Link
        href="/"
        className={buttonVariants({
          variant: "default",
          size: "lg",
        })}
      >
        홈으로 돌아가기
      </Link>
    </Inner>
  );
};

export default NotFoundCategory;
