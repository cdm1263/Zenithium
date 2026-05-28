import { visit } from "unist-util-visit";
import type { Root, Element, ElementContent } from "hast";
import type { Root as MdastRoot } from "mdast";
import { path } from "./iconPath";

type ContainerDirectiveNode = {
  name?: unknown;
  data?: Record<string, unknown>;
};

const MESSAGE_BOX_TYPES = ["note", "tip", "important", "warning", "caution"];

const isMessageBoxType = (type: unknown): type is string => {
  return typeof type === "string" && MESSAGE_BOX_TYPES.includes(type);
};

const createMessageIcon = (type: string): Element => ({
  type: "element",
  tagName: "svg",
  properties: {
    className: `message-icon message-icon-${type}`,
    xmlns: "http://www.w3.org/2000/svg",
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: {
        fill: "currentColor",
        d: path[type],
      },
      children: [],
    },
  ],
});

const addClassNames = (node: Element, classNamesToAdd: string[]) => {
  node.properties = node.properties || {};

  const className = node.properties.className;
  let classNames: (string | number)[] = [];

  if (Array.isArray(className)) {
    classNames = className;
  } else if (typeof className === "string" || typeof className === "number") {
    classNames = [className];
  }

  node.properties.className = [...classNames, ...classNamesToAdd];
};

export const remarkMessageBox = () => {
  return (tree: MdastRoot) => {
    visit(tree, "containerDirective", (node) => {
      const directive = node as ContainerDirectiveNode;

      if (!isMessageBoxType(directive.name)) {
        return;
      }

      directive.data = {
        ...directive.data,
        hName: "div",
        hProperties: {
          className: ["message-box", `message-box-${directive.name}`],
          dataMessageBoxType: directive.name,
        },
      };
    });
  };
};

export const rehypeMessageBox = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const messageBoxType = node.properties?.dataMessageBoxType;

      if (isMessageBoxType(messageBoxType)) {
        node.children.unshift(createMessageIcon(messageBoxType));
        return;
      }

      if (
        node.tagName === "p" &&
        node.children &&
        node.children[0] &&
        node.children[0].type === "text"
      ) {
        const firstChildValue = node.children[0].value;
        const messageBoxMatch = firstChildValue.match(/^:{3,}\s*(\w+)\s*/);

        if (!messageBoxMatch) {
          return;
        }

        const type = messageBoxMatch[1];

        if (!isMessageBoxType(type)) {
          return;
        }

        addClassNames(node, ["message-box", `message-box-${type}`]);

        const remainingFirstText = firstChildValue
          .slice(messageBoxMatch[0].length)
          .trimStart();
        const remainingChildren: ElementContent[] = remainingFirstText
          ? [{ ...node.children[0], value: remainingFirstText }]
          : [];

        node.children = [
          createMessageIcon(type),
          ...remainingChildren,
          ...node.children.slice(1),
        ];
      }
    });
  };
};

export const rehypeAddRelativeToHeadings = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        node.properties = {
          ...node.properties,
          className: (node.properties.className || "") + " relative",
        };
      }
    });
  };
};
