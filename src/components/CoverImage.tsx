"use client";

import { FrontMatter } from "@/lib/types";
import NextImage from "next/image";
import Inner from "./Inner";
import PostDateAndReadingTime from "./PostDateAndReadingTime";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import TagSelector from "./TagSelector";
import { useRouter } from "next/navigation";
import { ChartColumnStacked, Eye } from "lucide-react";
import { Suspense } from "react";

type Props = {
  coverData?: { imageSrc: string; title: string; description: string };
  slug?: string;
  frontMatter?: FrontMatter;
  content?: string;
  views?: number;
};

const CoverImage = ({
  coverData,
  slug,
  frontMatter,
  content,
  views,
}: Props) => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const srpingOptions = { stiffness: 200, damping: 20 };

  const transfromedScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const transfromedY = useTransform(scrollY, [0, 600], [0, -100]);
  const transfromedOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const scale = useSpring(transfromedScale, srpingOptions);
  const y = useSpring(transfromedY, srpingOptions);
  const opacity = useSpring(transfromedOpacity, srpingOptions);

  return (
    <div className="fixed inset-x-0 top-0 h-[600px] -z-10 overflow-hidden">
      <Inner className="absolute inset-0 z-10">
        <motion.div
          className="flex flex-col h-full justify-center text-slate-200"
          style={{ opacity, y }}
        >
          {frontMatter && (
            <p className="mb-5 text-md flex items-center gap-1 text-gray-200/80">
              <ChartColumnStacked className="h-5 w-5" />
              {frontMatter.series}
            </p>
          )}
          <motion.p className="text-3xl md:text-5xl font-bold mb-10 break-keep">
            {coverData?.title || frontMatter?.title}
          </motion.p>
          <motion.p className="text-md md:text-xl font-semibold mb-3 break-keep ">
            {coverData?.description || frontMatter?.description}
          </motion.p>
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

                {views && (
                  <Suspense>
                    <div className="flex items-center text-slate-200 gap-x-2">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{views}회 조회</span>
                    </div>
                  </Suspense>
                )}
              </div>

              <div className="flex gap-x-2">
                {frontMatter.tags.map((tag) => (
                  <TagSelector
                    key={tag}
                    tagName={tag}
                    handler={() => router.push(`/blog?tag=${tag}`)}
                    className="text-gray-200/80 border-gray-200/20"
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </Inner>
      <motion.div style={{ y, scale }} className="h-full w-full">
        <NextImage
          src={coverData?.imageSrc || `/postAssets/${slug}/cover.jpg`}
          alt="cover"
          fill
          priority
          className="object-cover z-0"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-50" />
    </div>
  );
};

export default CoverImage;
