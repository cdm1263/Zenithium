import { FrontMatter } from "@/lib/types";
import NextImage from "next/image";
import Inner from "./Inner";
import PostDateAndReadingTime from "./PostDateAndReadingTime";

type Props = {
  coverData?: { imageSrc: string; title: string; description: string };
  slug?: string;
  frontMatter?: FrontMatter;
  content?: string;
};

const CoverImage = ({ coverData, slug, frontMatter, content }: Props) => {
  return (
    <div className={"fixed inset-x-0 top-0 h-[500px] -z-10"}>
      <Inner className="flex flex-col absolute inset-0 z-10 justify-center text-slate-200">
        <p className="text-5xl font-bold mb-10">
          {coverData?.title || frontMatter?.title}
        </p>
        <p className="text-xl font-semibold mb-3">
          {coverData?.description || frontMatter?.description}
        </p>
        {frontMatter && content && (
          <PostDateAndReadingTime date={frontMatter.date} content={content} />
        )}
      </Inner>
      <NextImage
        src={coverData?.imageSrc || `/postAssets/${slug}/cover.jpg`}
        alt="cover"
        fill
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black opacity-40" />
    </div>
  );
};

export default CoverImage;
