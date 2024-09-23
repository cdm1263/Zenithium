"use client";

import Link from "next/link";
import Inner from "./Inner";
import { Switch } from "./ui/switch";
import Seperator from "./Seperator";
import useScrollNav from "@/hooks/useScrollNav";
import { cn } from "@/lib/utils";

const Nav = () => {
  const { isScrolled } = useScrollNav();

  return (
    <header
      className={cn(
        "z-10 sticky top-0 inset-x-0 w-full h-14 md:h-16 bg-background transition-colors backdrop-blur-md duration-300",
        isScrolled ? "bg-background/90" : "bg-transparent"
      )}
    >
      <Inner>
        <nav className="flex justify-between items-center h-full">
          <Link href="/" className="flex font-semibold text-xl">
            ZENITH<span className="text-primary">IUM</span>
          </Link>

          <div className="flex h-full items-center space-x-4">
            <Link
              href="/blog"
              className="flex font-semibold hover:text-primary/80 transition-all"
            >
              Blog
            </Link>
            <Link
              href="/resume"
              className="flex font-semibold hover:text-primary/80 transition-all"
            >
              Resume
            </Link>
            <Seperator className="h-2/5" />
            <Switch />
          </div>
        </nav>
      </Inner>
    </header>
  );
};

export default Nav;
