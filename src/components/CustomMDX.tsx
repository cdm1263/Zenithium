import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

// TODO: 스타일링 필요
const components = {};

const CustomMDX = (props: MDXRemoteProps) => {
  const options = {
    theme: "one-dark-pro",
  };

  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, options]],
        },
      }}
    />
  );
};

export default CustomMDX;
