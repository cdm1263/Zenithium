import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { rehypeAddRelativeToHeadings, rehypeMessageBox } from "@/lib/plugin";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings, {
  type Options as RehypeAutoLinkOptions,
} from "rehype-autolink-headings";
import SmoothScroll from "./SmoothScroll";
import components from "./CustomMDXComponents";

const CustomMDX = (props: MDXRemoteProps) => {
  const prettyCodeOptions: RehypePrettyCodeOptions = {
    theme: { dark: "material-theme-darker", light: "github-light" },
  };

  const AutoLinkOptions: RehypeAutoLinkOptions = {
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
            remarkPlugins: [remarkGfm, remarkBreaks],
            rehypePlugins: [
              [rehypePrettyCode, prettyCodeOptions],
              rehypeMessageBox,
              rehypeSlug,
              rehypeAddRelativeToHeadings,
              [rehypeAutolinkHeadings, AutoLinkOptions],
            ],
          },
        }}
      />
    </>
  );
};

export default CustomMDX;
