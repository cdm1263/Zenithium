import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "개발 블로그 Zenithium";
  const description =
    url.searchParams.get("description") ?? "To Zenith. 어제보다 한 걸음 위로";
  const bgPath = url.searchParams.get("bg");

  const bgSrc = `${siteConfig.baseUrl}/${
    bgPath === "resume-cover.jpg" || bgPath === "blog-cover.jpg"
      ? bgPath
      : bgPath
      ? `postAssets/${bgPath}/cover.jpg`
      : "home-cover.jpg"
  }`;

  let font: ArrayBuffer | undefined;
  try {
    font = await fetch(
      new URL(`${siteConfig.baseUrl}/font/NanumSquareRoundB.ttf`)
    ).then((res) => res.arrayBuffer());
  } catch {
    // 폰트 로드 실패 시 기본 폰트로 대체
  }

  return new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt={`${title} 이미지`}
          tw="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />
        <div tw="absolute inset-0 bg-black opacity-50" />
        <div tw="flex flex-col w-full py-12 px-24">
          <h2 tw="text-white text-[100px] font-bold mb-3">{title}</h2>
          <p tw="text-white text-[36px] font-semibold">{description}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font ? [{ name: "NanumSquareRoundB", data: font }] : [],
    }
  );
};
