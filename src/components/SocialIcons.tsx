"use client";

import SVGtoComponent from "@/components/SVGtoComponent";
import Github from "/public/github.svg";
import LinkedIn from "/public/linkedin.svg";
import { Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const SocialIcons = () => {
  const email = "cdm1263@gmail.com";
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast({
        title: "메일 주소가 클립보드에 복사되었습니다.",
      });
    } catch (error) {
      console.error("복사에 실패했습니다.", error);
      toast({
        variant: "destructive",
        title: "복사에 실패했습니다.",
      });
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <Link
        href="https://github.com/cdm1263"
        target="_blank"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "group"
        )}
      >
        <SVGtoComponent
          SVG={Github}
          className="h-5 w-5 text-foreground fill-foreground group-hover:fill-primary transition-colors"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/dongmincha/"
        target="_blank"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "group"
        )}
      >
        <SVGtoComponent
          SVG={LinkedIn}
          className="h-5 w-5 text-foreground fill-foreground group-hover:fill-primary transition-colors"
        />
      </Link>
      <button
        onClick={handleCopy}
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "group"
        )}
      >
        <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
      </button>
    </div>
  );
};

export default SocialIcons;
