import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { rehypeMessageBox } from "@/lib/plugin";

// TODO: 스타일링 필요
const components = {};

const CustomMDX = (props: MDXRemoteProps) => {
  const options = {
    theme: { dark: "houston", light: "github-light" },
    grid: true,
  };

  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [[rehypePrettyCode, options], [rehypeMessageBox]],
        },
      }}
    />
  );
};

export default CustomMDX;
