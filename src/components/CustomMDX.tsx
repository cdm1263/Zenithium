import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { rehypeAddRelativeToHeadings, rehypeMessageBox } from "@/lib/plugin";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// TODO: 스타일링 필요

const components = {};

const CustomMDX = (props: MDXRemoteProps) => {
  const prettyCodeOptions = {
    theme: { dark: "houston", light: "github-light" },
    grid: true,
  };

  const AutoLinkOptions = {
    content: [
      {
        type: "element",
        tagName: "span",
        properties: {
          className:
            "text-primary text-2xl opacity-50 hover:opacity-100 transition-opacity duration-200 absolute -left-6",
        },
        children: [{ type: "text", value: "#" }],
      },
    ],
  };

  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [
            [rehypePrettyCode, prettyCodeOptions],
            [rehypeMessageBox],
            [rehypeSlug],
            [rehypeAddRelativeToHeadings],
            [rehypeAutolinkHeadings, AutoLinkOptions],
          ],
        },
      }}
    />
  );
};

export default CustomMDX;
