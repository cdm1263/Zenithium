"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { usePathname } from "next/navigation";

const CoverImage = () => {
  const pathname = usePathname();
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const getImageSrc = () => {
      if (pathname === "/") {
        return "/home-cover.jpg";
      } else if (pathname === "/blog") {
        return "/blog-cover.jpg";
      } else if (pathname.startsWith("/blog/")) {
        const slug = pathname.replace("/blog/", "");
        return `/postAssets/${slug}/cover.jpg`;
      }
      return "/images/default-cover.jpg";
    };

    setImageSrc(getImageSrc());
  }, [pathname]);

  return (
    <div className="fixed inset-x-0 top-0 h-[500px] z-0">
      <NextImage src={imageSrc} alt="cover" fill className="object-cover" />
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  );
};

export default CoverImage;
