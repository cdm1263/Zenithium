"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type Props = {
  tags: string[];
  series: string[];
  className?: string;
};

const Filter = ({ tags, series, className }: Props) => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const sortHandler = (value: string) => {
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  const seriesHandler = (value: string) => {
    if (value === "전체") {
      params.delete("series");
    } else {
      params.set("series", value);
    }
    router.push(`?${params.toString()}`);
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //TODO: 디바운스 적용해야함
    setSearch(e.target.value);
    e.target.value
      ? params.set("search", e.target.value)
      : params.delete("search");
    router.push(`?${params.toString()}`);
  };

  const tagHandler = (tag: string) => {
    const currentTags = params.getAll("tag");
    if (currentTags.includes(tag)) {
      const newTags = currentTags.filter((currentTag) => currentTag !== tag);
      params.delete("tag");
      newTags.forEach((newTag) => params.append("tag", newTag));
    } else params.append("tag", tag);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn("flex flex-col gap-2 lg:w-2/6", className)}>
      {/* // Note: 정렬 */}
      <Select onValueChange={sortHandler}>
        <SelectTrigger>
          <SelectValue placeholder="정렬" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">최신순</SelectItem>
          <SelectItem value="oldest">오래된순</SelectItem>
        </SelectContent>
      </Select>

      {/* // Note: 시리즈 */}
      <Select onValueChange={seriesHandler}>
        <SelectTrigger>
          <SelectValue placeholder="시리즈" />
        </SelectTrigger>
        <SelectContent>
          {["전체", ...series].map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* // Note: 검색 */}
      <Input
        type="text"
        value={search}
        onChange={searchHandler}
        placeholder="키워드 검색"
      />

      {/* // Note: 태그 */}
      <div className="flex gap-1 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-primary px-2 py-1 rounded-sm text-white shrink-0"
            onClick={() => tagHandler(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Filter;
