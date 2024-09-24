import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
