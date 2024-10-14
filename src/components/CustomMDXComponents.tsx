/* eslint-disable @next/next/no-img-element */
import { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { MDXComponents } from "mdx/types";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

// Info: 커스텀 컴포넌트

const CustomImg = ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => (
  <Dialog>
    <DialogTrigger asChild>
      <img
        src={src!}
        alt={alt!}
        className="rounded-md w-full border border-muted-foreground/20 my-0 cursor-zoom-in"
      />
    </DialogTrigger>
    {alt !== "" && (
      <span className="text-md text-center block mt-2 py-0 text-sm text-muted-foreground italic">
        {alt}
      </span>
    )}
    <DialogContent className="max-w-screen-md">
      <img src={src!} alt={alt!} className="w-full rounded-md" />
    </DialogContent>
  </Dialog>
);

const CustomAnchor = ({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a {...props} target={props.href?.startsWith("#") ? "_self" : "_blank"}>
    {children}
  </a>
);

const components: MDXComponents = {
  img: CustomImg,
  a: CustomAnchor,
};

export default components;
