import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { FrontMatter, Mdx } from "@/lib/types";

const directoryPath = path.join(process.cwd(), "blog-contents");

// Info: 개별 mdx 파일 데이터 파싱
const readMDXFile = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const mdxData = matter(fileContent);

  return mdxData;
};

// Info: 디렉토리의 mdx 파일들을 파싱해 배열에 담아 반환
const getMDXDatas: (dir: string) => Mdx[] = (dir: string) => {
  const directoryNames = fs.readdirSync(dir);

  const allPosts = directoryNames.map((dirName) => {
    const filePath = path.join(directoryPath, dirName, "content.mdx");
    const { data: frontMatter, content } = readMDXFile(filePath);
    const slug = dirName;

    return { frontMatter: frontMatter as FrontMatter, content, slug };
  });

  return allPosts;
};

// Info: resume 페이지에서 사용
export const getResumeMDXDatas: (dir: string) => Map<string, string> = (
  dir: string
) => {
  const fileNames = fs.readdirSync(dir);
  const contents = new Map();

  fileNames.forEach((fileName) => {
    const filePath = path.join(dir, fileName);
    const { content } = readMDXFile(filePath);

    contents.set(fileName.replace(".mdx", ""), content);
  });

  return contents;
};

// Info: 모든 태그와 시리즈 배열 반환
export const getAllTagsAndSeries = () => {
  const directoryNames = fs.readdirSync(directoryPath);
  const allTags: string[][] = [];
  const allSeries: string[] = [];
  directoryNames.forEach((dirName) => {
    const filePath = path.join(directoryPath, dirName, "content.mdx");
    const { data } = readMDXFile(filePath);

    allSeries.push(data.series);
    allTags.push(data.tags);
  });

  return {
    allTags: [...new Set(allTags.flat())],
    allSeries: [...new Set(allSeries)],
  };
};

// Info: 모든 블로그 포스트 호출
export const getAllPosts = () => {
  return getMDXDatas(directoryPath).sort((a, b) => {
    return new Date(b.frontMatter.date) > new Date(a.frontMatter.date) ? 1 : -1;
  });
};
