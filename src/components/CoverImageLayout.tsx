"use client";

import { FrontMatter } from "@/lib/types";
import NextImage from "next/image";
import Inner from "./Inner";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChartColumnStacked } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  coverData?: { imageSrc: string; title: string; description: string };
  slug?: string;
  frontMatter?: FrontMatter;
};

const CoverImageLayout = ({
  children,
  coverData,
  slug,
  frontMatter,
}: Props) => {
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
          {children}
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

export default CoverImageLayout;
