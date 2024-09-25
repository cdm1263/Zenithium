import { TOCItem } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
  toc: TOCItem[];
};

const useObserveTOC = ({ toc }: Props) => {
  const [activeId, setActiveId] = useState("");
  const observerOptions = {
    rootMargin: "0px 0px -40% 0px",
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Note: h1~h6 에 해당하는 요소 관찰
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  return { activeId };
};

export default useObserveTOC;
