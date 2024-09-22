import path from "path";
import fs from "fs";
import matter from "gray-matter";

const directoryPath = path.join(process.cwd(), "blog-contents");

// Note: 개별 mdx 파일 데이터 파싱
const readMDXFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const mdxData = matter(fileContent);

  return mdxData;
};

// Note: 디렉토리의 mdx 파일들을 파싱해 배열에 담아 반환
const getMDXDatas = (dir: string) => {
  const fileNames = fs.readdirSync(dir);

  const allPosts = fileNames.map((fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const { data: frontMatter, content } = readMDXFile(filePath);
    const slug = fileName.replace(/\.mdx$/, "");

    return { frontMatter, content, slug };
  });

  return allPosts;
};

// Note: 모든 블로그 포스트 호출
export const getAllPosts = () => {
  return getMDXDatas(directoryPath);
};
