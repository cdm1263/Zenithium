"use client";

import useObserveTOC from "@/hooks/useObserveTOC";
import useThrottle from "@/hooks/useThrottle";
import { TOCItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  toc: TOCItem[];
};

const TOC = ({ toc }: Props) => {
  const { activeId } = useObserveTOC({ toc });
  const ref = useRef<HTMLElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const MOVE_TRIGGER_TOP = 80;

  const throttledScroll = useThrottle(() => {
    if (ref.current) {
      setIsMoved(ref.current.offsetTop !== MOVE_TRIGGER_TOP);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", () => throttledScroll());

    return () => {
      window.removeEventListener("scroll", () => throttledScroll());
    };
  }, [throttledScroll]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={ref}
      style={{ translate: isMoved ? "0 60px" : "0 0" }}
      className="hidden h-full w-56 lg:block shrink-0 px-2 py-4 sticky top-20 transition-all duration-500"
    >
      <span className="absolute w-0.5 bg-primary/30 inset-y-0 left-0" />
      <ul className="flex flex-col gap-y-px">
        {toc.map((item) => (
          <div
            key={item.id}
            className={cn("text-sm", {
              "pl-3 my-1": item.level === 2,
              "pl-6": item.level === 3,
              "pl-9": item.level === 4,
              "pl-12": item.level === 5,
              "pl-[60px]": item.level === 6,
            })}
          >
            <Link
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "text-muted-foreground/70 hover:text-primary font-medium transition-color duration-300",
                activeId === item.id ? "text-primary font-bold" : ""
              )}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
