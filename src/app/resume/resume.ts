import { getResumeMDXDatas } from "@/app/blog/utils";
import path from "path";

const directoryPath = path.join(process.cwd(), "resume-contents");

const contents = getResumeMDXDatas(directoryPath);

export const about = contents.get("about") as string;

export type ResumeContent = {
  title: string;
  subtitle: string;
  content: string;
  period?: string;
  open?: boolean;
  href?: string;
};

type ResumeSection = {
  title: string;
  description: string;
  items: ResumeContent[];
};

export const sections: ResumeSection[] = [
  {
    title: "Projects",
    description: "프로젝트",
    items: [
      {
        title: "AIGOO",
        subtitle: "아이고",
        period: "2024.05 ~ 2024.06",
        content: contents.get("aigoo") as string,
      },
      {
        title: "Foodie Log",
        subtitle: "푸디로그",
        period: "2024.03 ~ 2024.04",
        content: contents.get("foodie-log") as string,
      },
      {
        title: "Pokehub",
        subtitle: "포켓허브",
        period: "2023.11 ~ 2024.02",
        content: contents.get("pokehub") as string,
      },
    ],
  },
  {
    title: "Experiences",
    description: "다양한 경험",
    items: [
      {
        title: "앱손 & 멋쟁이 사자처럼 해커톤 참여",
        subtitle: "Epson Innovation Challenge Korea",
        period: "2024.05 ~ 2024.06",
        content: contents.get("epson") as string,
        open: true,
      },
    ],
  },
  {
    title: "Open Sources",
    description: "오픈소스",
    items: [
      {
        title: "react query 한글문서 코드 오류 해결",
        subtitle: "react-query-tutorial",
        period: "2024.08",
        content: contents.get("react-query-tutorial") as string,
        href: "https://github.com/ssi02014/react-query-tutorial",
        open: true,
      },
    ],
  },
  {
    title: "Educations",
    description: "교육",
    items: [
      {
        title: "프론트엔드 부트캠프 수료",
        subtitle: "패스트 캠퍼스 프론트엔드 부트캠프 5기",
        period: "2023.03 ~ 2023.10",
        content: contents.get("fast-campus") as string,
        open: true,
      },
    ],
  },
];
