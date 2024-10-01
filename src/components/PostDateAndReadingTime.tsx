import { cn, formatDate } from "@/lib/utils";
import { CalendarDays, Clock, RefreshCw } from "lucide-react";
import readingTime from "reading-time";

type Props = {
  date: string;
  content: string;
  updated?: string;
  dateClassName?: string;
  readingClassName?: string;
};

const PostDateAndReadingTime = ({
  date,
  content,
  updated,
  dateClassName,
  readingClassName,
}: Props) => {
  return (
    <div className="flex gap-x-4 text-sm text-muted-foreground flex-wrap">
      <p className={cn("flex gap-1 items-center", dateClassName)}>
        <CalendarDays className="w-4 h-4" />
        {formatDate(date)} 작성
      </p>
      {updated && (
        <p className={cn("flex gap-1 items-center", dateClassName)}>
          <RefreshCw className="w-4 h-4" />
          {formatDate(updated)} 업데이트
        </p>
      )}
      <p className={cn("flex gap-1 items-center", readingClassName)}>
        <Clock className="w-4 h-4" />
        평균 {Math.ceil(readingTime(content).minutes)}분 소요
      </p>
    </div>
  );
};

export default PostDateAndReadingTime;
