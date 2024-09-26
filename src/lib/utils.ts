import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TOCItem } from "./types";
import { unified } from "unified";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { Element, Node, Text } from "hast";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentYear = date.getUTCFullYear();
  const currentMonth = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const currentDate = date.getUTCDate().toString().padStart(2, "0");

  return `${currentYear}-${currentMonth}-${currentDate}`;
};

const getTextFromNode = (node: Node): string => {
  if (node.type === "text") {
    return (node as Text).value;
  }

  if ((node as Element).children) {
    return (node as Element).children.map(getTextFromNode).join("");
  }

  return "";
};

// Note: TOC headings를 rehype slug 플러그인의 규칙에 맞게 파싱
export const parseTOCHeadings = async (content: string) => {
  const tocItems: TOCItem[] = [];

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => (tree: Node) => {
      visit(tree, "element", (node: Element) => {
        if (/^h[1-6]$/.test(node.tagName)) {
          const level = parseInt(node.tagName.charAt(1));
          const id = node.properties?.id;
          const title = getTextFromNode(node);

          tocItems.push({ id: id as string, title, level });
        }
      });
    })
    .use(rehypeStringify);

  await processor.process(content);

  return tocItems;
};
