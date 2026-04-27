"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const Giscus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const repoId = process.env.NEXT_PUBLIC_REPO_KEY;
  const categoryId = process.env.NEXT_PUBLIC_CATEGORY_KEY;

  useEffect(() => {
    const element = ref.current;

    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes() || !isVisible) return;
    if (!repoId || !categoryId) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "cdm1263/Zenithium");
    scriptElem.setAttribute("data-repo-id", repoId);
    scriptElem.setAttribute("data-category", "General");
    scriptElem.setAttribute("data-category-id", categoryId);
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "top");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", "ko");

    ref.current.appendChild(scriptElem);
  }, [categoryId, isVisible, repoId, theme]);

  useEffect(() => {
    if (!isVisible) return;

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [isVisible, theme]);

  return (
    <div className="w-full max-w-screen-sm h-full self-center">
      <section ref={ref} />
    </div>
  );
};

export default Giscus;
