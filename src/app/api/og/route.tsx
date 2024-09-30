import { baseUrl } from "@/app/sitemap";
import { ImageResponse } from "next/og";

export const GET = (req: Request) => {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "개발 블로그 Zenithium";
  const description = url.searchParams.get("description") ?? "To Zenith";
  const bg = url.searchParams.get("bg") ?? `${baseUrl}/home-cover.jpg`;

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center relative">
        <img src={bg} alt={`${title} 이미지`} tw="absolute inset-0" />
        <div tw="absolute inset-0 bg-black opacity-50" />
        <div tw="flex flex-col w-full py-12 px-24">
          <h2 tw="text-white text-5xl font-bold mb-3 break-keep">{title}</h2>
          <p tw="text-white text-xl font-semibold break-keep">{description}</p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
};
