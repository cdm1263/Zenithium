"use client";

import Link from "next/link";
import Inner from "./Inner";
import { Switch } from "./ui/switch";
import Seperator from "./Seperator";
import { motion, useScroll, useTransform } from "framer-motion";

const Nav = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["transparent", "hsla(var(--background)/ 0.8)"]
  );
  const color = useTransform(
    scrollY,
    [0, 50],
    ["hsl(0, 0%, 100%)", "hsl(var(--foreground))"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["transparent", "hsla(var(--muted)/ 0.8)"]
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(8px)"]
  );

  return (
    <motion.header className="z-50 fixed top-0 inset-x-0 w-full">
      <motion.nav
        className="h-14 md:h-16 border-b-2 transition-colors ease-in"
        style={{
          backgroundColor,
          color,
          borderColor,
          backdropFilter,
        }}
      >
        <Inner className="flex justify-between items-center h-full relative z-10">
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
            <Seperator className="h-2/5 border-l" />
            <Switch className="text-foreground" />
          </div>
        </Inner>
      </motion.nav>
    </motion.header>
  );
};

export default Nav;
