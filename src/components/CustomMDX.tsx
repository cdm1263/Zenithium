import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import {
  rehypeAddRelativeToHeadings,
  rehypeImageCaption,
  rehypeMessageBox,
} from "@/lib/plugin";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import SmoothScroll from "./SmoothScroll";
import remarkUnwrapImages from "remark-unwrap-images";

// TODO: 추후 컴포넌트 추가
const components = {};

const CustomMDX = (props: MDXRemoteProps) => {
  const prettyCodeOptions = {
    theme: { dark: "github-dark-dimmed", light: "github-light" },
    grid: true,
  };

  const AutoLinkOptions = {
    properties: {
      className: ["anchor"],
    },
    content: [
      {
        type: "element",
        tagName: "span",
        properties: {
          className:
            "text-primary text-2xl absolute hidden lg:block lg:-left-6",
        },
        children: [{ type: "text", value: "#" }],
      },
    ],
  };

  return (
    <>
      <SmoothScroll />
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks, remarkUnwrapImages],
            rehypePlugins: [
              [rehypePrettyCode, prettyCodeOptions],
              rehypeImageCaption,
              rehypeMessageBox,
              rehypeSlug,
              [rehypeAddRelativeToHeadings],
              [rehypeAutolinkHeadings, AutoLinkOptions],
            ],
          },
        }}
      />
    </>
  );
};

export default CustomMDX;
