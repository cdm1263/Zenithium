import { FrontMatter } from "@/lib/types";
import PostDateAndReadingTime from "./PostDateAndReadingTime";
import TagSelector from "./TagSelector";
import { Eye } from "lucide-react";
import { Suspense } from "react";
import PageViewCounter from "./PageViewCounter";
import CoverImageLayout from "./CoverImageLayout";

type Props = {
  coverData?: { imageSrc: string; title: string; description: string };
  slug?: string;
  frontMatter?: FrontMatter;
  content?: string;
  views?: boolean;
};

const CoverImage = ({
  slug,
  frontMatter,
  content,
  views,
  coverData,
}: Props) => {
  return (
    <CoverImageLayout
      coverData={coverData}
      slug={slug}
      frontMatter={frontMatter}
    >
      {frontMatter && content && (
        <div className="flex flex-col gap-y-5">
          <div className="flex gap-x-4 flex-wrap">
            <PostDateAndReadingTime
              date={frontMatter.date}
              updated={frontMatter.updated}
              content={content}
              readingClassName="text-slate-200 "
              dateClassName="text-slate-200 "
            />

            {views && slug && (
              <div className="flex items-center text-slate-200 gap-x-1">
                <Eye className="h-4 w-4" />
                <p className="text-sm">
                  <Suspense fallback={<span>---</span>}>
                    <PageViewCounter slug={slug} />
                  </Suspense>
                  회 조회
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {frontMatter.tags.map((tag) => (
              <TagSelector
                key={tag}
                tagName={tag}
                tagEvent={`/blog?tag=${tag}`}
                className="text-gray-200/80 border-gray-200/20"
              />
            ))}
          </div>
        </div>
      )}
    </CoverImageLayout>
  );
};
export default CoverImage;
