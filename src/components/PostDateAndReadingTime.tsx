import { formatDate } from "@/lib/utils";
import { CalendarDays, Clock } from "lucide-react";
import readingTime from "reading-time";

type Props = {
  date: string;
  content: string;
};

const PostDateAndReadingTime = ({ date, content }: Props) => {
  return (
    <div className="flex gap-x-4 text-sm text-muted-foreground">
      <p className="flex gap-1 items-center">
        <CalendarDays className="w-4 h-4" />
        {formatDate(date)}
      </p>
      <p className="flex gap-1 items-center">
        <Clock className="w-4 h-4" />
        평균 {Math.ceil(readingTime(content).minutes)}분 소요
      </p>
    </div>
  );
};

export default PostDateAndReadingTime;
