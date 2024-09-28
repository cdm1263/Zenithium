"use client";

import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingScroller = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
  const [progressValue, setProgressValue] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    return progress.on("change", (value) => {
      setProgressValue(value);
    });
  }, [progress]);

  return (
    <motion.div
      onClick={scrollToTop}
      className="w-12 h-12 fixed bottom-4 right-4 md:bottom-8 md:right-8 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer group"
      style={{
        background: `conic-gradient(
            hsl(var(--primary) / 0.6) ${progressValue * 360}deg, 
            hsla(var(--accent-2)) ${progressValue * 360}deg
          )`,
      }}
      whileHover={{
        background: `conic-gradient(
            hsl(var(--primary) / 1) ${progressValue * 360}deg, 
            hsla(var(--accent-2)) ${progressValue * 360}deg
        )`,
        transition: { duration: 0.1 },
      }}
    >
      <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
        <ArrowUp className="text-primary/60 group-hover:text-primary transition-colors duration-150 w-8 h-8" />
      </div>
    </motion.div>
  );
};

export default FloatingScroller;
