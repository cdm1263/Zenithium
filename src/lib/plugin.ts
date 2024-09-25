import { visit } from "unist-util-visit";
import { Root, Element } from "hast";
import { path } from "./iconPath";

export const rehypeMessageBox = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "p" &&
        node.children &&
        node.children[0] &&
        node.children[0].type === "text"
      ) {
        const firstChildValue = node.children[0].value.trim();

        if (firstChildValue.startsWith(":::")) {
          const type = firstChildValue.split(" ")[1];

          // Note: node.properties와 className이 없으면 초기화
          node.properties = node.properties || {};

          // Note: className이 배열인지, 아니면 문자열/숫자인지 확인
          // Note: 배열이 아니면 배열에 담음
          let classNames: (string | number)[] = [];
          if (Array.isArray(node.properties.className)) {
            classNames = node.properties.className;
          } else if (
            typeof node.properties.className === "string" ||
            typeof node.properties.className === "number"
          ) {
            classNames = [node.properties.className];
          }

          // Note: classNames에 Tailwind Typhgraphy 클래스네임 추가
          classNames.push("message-box", `message-box-${type}`);

          // Note: 업데이트된 classNames 배열을 다시 설정
          node.properties.className = classNames;

          // Note: ::: 기호 이후 텍스트에서 줄바꿈 제거 (모든 텍스트를 하나로 합침)
          const combinedText = node.children[0].value
            .replace(/^:::\s*\w+/, "") // Note: ::: 및 그 뒤의 type 제거
            .trim();

          // Note: 아이콘 구성
          const svgIcon: Element = {
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
          };

          // Note: 텍스트를 하나의 child로 재구성
          node.children = [svgIcon, { type: "text", value: combinedText }];
        }
      }
    });
  };
};

export const rehypeAddRelativeToHeadings = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        // Note: h1 ~ h6 태그에 relative 클래스네임 추가
        node.properties = {
          ...node.properties,
          className: (node.properties.className || "") + "relative",
        };
      }
    });
  };
};
