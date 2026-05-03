import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const publicDir = path.join(process.cwd(), "public");

async function readAsArrayBuffer(relPath: string): Promise<ArrayBuffer | undefined> {
  try {
    const buf = await readFile(path.join(publicDir, relPath));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    return undefined;
  }
}

async function readAsDataUrl(relPath: string): Promise<string | null> {
  try {
    const buf = await readFile(path.join(publicDir, relPath));
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "개발 블로그 Zenithium";
  const description =
    url.searchParams.get("description") ?? "To Zenith. 어제보다 한 걸음 위로";
  const bgPath = url.searchParams.get("bg");

  const bgRelPath =
    bgPath === "resume-cover.jpg" || bgPath === "blog-cover.jpg"
      ? bgPath
      : bgPath
      ? `postAssets/${bgPath}/cover.jpg`
      : "home-cover.jpg";

  // 폰트와 배경 이미지를 파일시스템에서 병렬로 읽기
  const [font, bgDataUrl] = await Promise.all([
    readAsArrayBuffer("font/NanumSquareRoundB.ttf"),
    readAsDataUrl(bgRelPath).then(
      (result) => result ?? readAsDataUrl("home-cover.jpg")
    ),
  ]);

  const response = new ImageResponse(
    (
      <div tw="flex w-full h-full items-center justify-center relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgDataUrl ?? ""}
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

  response.headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");

  return response;
};
