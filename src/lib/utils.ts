import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TOCItem } from "./types";

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

export const parseTOCHeadings = (content: string): TOCItem[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const matches = content.matchAll(headingRegex);

  return Array.from(matches).map((match) => {
    const level = match[1].length;
    const title = match[2].replace(/\.$/, "");

    const id = title.toLowerCase().replace(/\s+/g, "-");

    return { id, title, level };
  });
};
