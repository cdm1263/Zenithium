"use client";

import SVGtoComponent from "@/components/SVGtoComponent";
import Github from "/public/github.svg";
import LinkedIn from "/public/linkedin.svg";
import Notion from "/public/notion.svg";
import { Mail } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FunctionComponent, SVGProps } from "react";

const SVGLink = ({
  href,
  SVG,
  text,
}: {
  href: string;
  SVG: FunctionComponent<SVGProps<SVGSVGElement>>;
  text?: string;
}) => (
  <Link
    href={href}
    target="_blank"
    className={cn(
      buttonVariants({
        variant: "outline",
        size: "sm",
      }),
      "group px-2",
      text &&
        "flex items-center gap-x-2 font-semibold text-sm hover:text-primary"
    )}
  >
    <SVGtoComponent
      SVG={SVG}
      className="h-5 w-5 text-foreground fill-foreground group-hover:fill-primary transition-colors"
    />
    {text}
  </Link>
);
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
    <div className="flex items-center gap-x-2 flex-wrap">
      <SVGLink href="https://github.com/cdm1263" SVG={Github} />
      <SVGLink href="https://www.linkedin.com/in/dongmincha/" SVG={LinkedIn} />

      <button
        onClick={handleCopy}
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "group px-2"
        )}
      >
        <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
      </button>

      <SVGLink
        href="https://dongmindev.notion.site/6e6ae85ddb5841e5af81b5139ce1ffea?pvs=4"
        SVG={Notion}
        text="Notion Portfolio"
      />
    </div>
  );
};

export default SocialIcons;
