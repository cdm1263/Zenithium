"use client";

import { FrontMatter } from "@/lib/types";
import NextImage from "next/image";
import Inner from "./Inner";
import PostDateAndReadingTime from "./PostDateAndReadingTime";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  coverData?: { imageSrc: string; title: string; description: string };
  slug?: string;
  frontMatter?: FrontMatter;
  content?: string;
};

const CoverImage = ({ coverData, slug, frontMatter, content }: Props) => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="fixed inset-x-0 top-0 h-[500px] -z-10 overflow-hidden">
      <Inner className="absolute inset-0 z-10">
        <motion.div
          className="flex flex-col h-full justify-center text-slate-200"
          style={{ opacity, y }}
        >
          <motion.p className="text-5xl font-bold mb-10">
            {coverData?.title || frontMatter?.title}
          </motion.p>
          <motion.p className="text-xl font-semibold mb-3">
            {coverData?.description || frontMatter?.description}
          </motion.p>
          {frontMatter && content && (
            <PostDateAndReadingTime date={frontMatter.date} content={content} />
          )}
        </motion.div>
      </Inner>
      <motion.div style={{ y, scale }} className="h-full w-full">
        <NextImage
          src={coverData?.imageSrc || `/postAssets/${slug}/cover.jpg`}
          alt="cover"
          fill
          className="object-cover z-0"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-40" />
    </div>
  );
};

export default CoverImage;
