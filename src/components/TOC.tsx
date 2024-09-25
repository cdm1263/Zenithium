"use client";

import useObserveTOC from "@/hooks/useObserveTOC";
import { TOCItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  toc: TOCItem[];
};

const TOC = ({ toc }: Props) => {
  const { activeId } = useObserveTOC({ toc });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="hidden h-full w-56 lg:block shrink-0 px-2 py-4 sticky top-20">
      <span className="absolute w-0.5 bg-primary/50 inset-y-0 left-0" />
      <ul className="flex flex-col gap-y-1 ml-3">
        {toc.map((item) => (
          <div
            key={item.id}
            className={cn("text-sm", {
              "pl-3": item.level === 2,
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
                "hover:text-primary font-medium",
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
