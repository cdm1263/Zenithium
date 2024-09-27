"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const FloatingScroller = () => {
  const handleScroll = (top: number) => {
    window.scroll({
      top,
      behavior: "smooth",
    });
  };

  const buttonStyle =
    "p-2 w-10 border border-muted-foreground hover:scale-110 transition-all";
  return (
    <div className="fixed flex flex-col right-8 bottom-8 space-y-1">
      <Button
        onClick={() => handleScroll(0)}
        className={cn("rounded-b-none", buttonStyle)}
      >
        <ArrowUp className="text-gray-200" />
      </Button>
      <Button
        onClick={() => handleScroll(document.body.scrollHeight)}
        className={cn("rounded-t-none", buttonStyle)}
      >
        <ArrowDown className="text-gray-200" />
      </Button>
    </div>
  );
};

export default FloatingScroller;
