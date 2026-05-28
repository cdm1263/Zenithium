"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Send, Trash2 } from "lucide-react";
import { publishPostAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PublishPostInput, UploadedPostImage } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

const DRAFT_KEY = "zenithium-admin-post-draft";

type DraftState = Omit<PublishPostInput, "bodyImages"> & {
  tagsText: string;
  bodyImages: UploadedPostImage[];
};

const getDefaultDate = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
};

const defaultDraft: DraftState = {
  slug: "",
  title: "",
  description: "",
  date: getDefaultDate(),
  updated: "",
  series: "",
  tags: [],
  tagsText: "",
  content: "",
  bodyImages: [],
};

const readImageFile = (file: File): Promise<UploadedPostImage> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result);

      resolve({
        fileName: file.name,
        contentType: file.type as UploadedPostImage["contentType"],
        base64: result.replace(/^data:[^;]+;base64,/, ""),
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const AdminPostEditor = () => {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftState>(defaultDraft);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [savedAt, setSavedAt] = useState<string>("");

  useEffect(() => {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    if (!stored) return;

    try {
      setDraft({ ...defaultDraft, ...JSON.parse(stored) });
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setSavedAt(new Date().toLocaleTimeString());
  }, [draft]);

  const tags = useMemo(
    () =>
      draft.tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [draft.tagsText]
  );

  const updateDraft = <K extends keyof DraftState>(key: K, value: DraftState[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleCoverChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    updateDraft("coverImage", await readImageFile(file));
  };

  const handleBodyImagesChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const images = await Promise.all(files.map(readImageFile));
    setDraft((current) => ({
      ...current,
      bodyImages: [...current.bodyImages, ...images],
      content: [
        current.content,
        ...images.map(
          (image) =>
            `![${image.fileName}](/postAssets/${current.slug}/${image.fileName})`
        ),
      ]
        .filter(Boolean)
        .join("\n\n"),
    }));
  };

  const removeBodyImage = (fileName: string) => {
    setDraft((current) => ({
      ...current,
      bodyImages: current.bodyImages.filter((image) => image.fileName !== fileName),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setIsPublishing(true);

    const result = await publishPostAction({
      slug: draft.slug,
      title: draft.title,
      description: draft.description,
      date: draft.date,
      updated: draft.updated,
      series: draft.series,
      tags,
      content: draft.content,
      coverImage: draft.coverImage,
      bodyImages: draft.bodyImages,
    });

    setIsPublishing(false);

    if (!result.ok) {
      setErrors(result.errors || ["발행에 실패했습니다."]);
      return;
    }

    window.localStorage.removeItem(DRAFT_KEY);
    router.push(`/blog/${result.slug}`);
  };

  return (
    <form className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]" onSubmit={handleSubmit}>
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">새 글 작성</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            자동저장 {savedAt || "-"}
          </p>
        </div>

        {errors.length > 0 && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            <p className="font-semibold">발행 차단</p>
            <ul className="mt-2 list-disc pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          <Input
            placeholder="slug"
            value={draft.slug}
            onChange={(event) => updateDraft("slug", event.target.value)}
          />
          <Input
            placeholder="date"
            value={draft.date}
            onChange={(event) => updateDraft("date", event.target.value)}
          />
          <Input
            placeholder="title"
            value={draft.title}
            onChange={(event) => updateDraft("title", event.target.value)}
          />
          <Input
            placeholder="series"
            value={draft.series}
            onChange={(event) => updateDraft("series", event.target.value)}
          />
        </div>

        <Input
          placeholder="description"
          value={draft.description}
          onChange={(event) => updateDraft("description", event.target.value)}
        />
        <Input
          placeholder="tags: react, nextjs"
          value={draft.tagsText}
          onChange={(event) => updateDraft("tagsText", event.target.value)}
        />

        <textarea
          className="min-h-[520px] w-full rounded-md border border-input bg-transparent p-4 text-sm leading-7 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          placeholder="MDX 본문"
          value={draft.content}
          onChange={(event) => updateDraft("content", event.target.value)}
        />
      </section>

      <aside className="flex flex-col gap-4">
        <div className="rounded-md border p-4">
          <p className="text-sm font-semibold">이미지</p>
          <div className="mt-3 flex flex-col gap-3">
            <label className={cn("flex cursor-pointer items-center gap-2 text-sm")}>
              <ImagePlus className="h-4 w-4" />
              cover
              <input
                className="sr-only"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleCoverChange}
              />
            </label>
            {draft.coverImage && (
              <p className="break-all text-xs text-muted-foreground">
                {draft.coverImage.fileName}
              </p>
            )}
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <ImagePlus className="h-4 w-4" />
              본문 이미지
              <input
                className="sr-only"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleBodyImagesChange}
              />
            </label>
            {draft.bodyImages.map((image) => (
              <div
                key={image.fileName}
                className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-xs"
              >
                <span className="break-all">{image.fileName}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeBodyImage(image.fileName)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border p-4">
          <p className="text-sm font-semibold">발행 전 검사</p>
          <p className="mt-2 text-sm text-muted-foreground">
            발행 시 서버에서 관리자 권한, secret 패턴, 파일명, 파일 크기, 중복 slug를 다시 검사합니다.
          </p>
        </div>

        <Button type="submit" disabled={isPublishing} className="gap-2">
          {isPublishing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          발행
        </Button>
      </aside>
    </form>
  );
};

export default AdminPostEditor;
