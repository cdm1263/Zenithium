import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "개발 블로그 Zenithium";
  const description =
    url.searchParams.get("description") ?? "To Zenith. 어제보다 한 걸음 위로";
  const bgPath = url.searchParams.get("bg");

  const bgData = await readFile(
    join(
      process.cwd(),
      bgPath ? `postAssets/${bgPath}` : "home-cover.jpg",
      bgPath ? "cover.jpg" : ""
    )
  );
  const base64Image = Buffer.from(bgData).toString("base64");
  const bgSrc = `data:image/jpeg;base64,${base64Image}`;

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center relative">
        <img src={bgSrc} alt={`${title} 이미지`} tw="absolute inset-0" />
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
