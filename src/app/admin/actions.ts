"use server";

import { getAdminSession } from "@/auth";
import { getPostBySlug } from "@/app/blog/utils";
import { commitFilesToGitHub, githubPathExists } from "@/lib/admin/githubContent";
import { buildPostMdx } from "@/lib/admin/postSerializer";
import type { PublishPostInput, PublishPostResult } from "@/lib/admin/types";
import { validatePublishSafety } from "@/lib/admin/publishSafety.mjs";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const stripDataUrlPrefix = (base64: string) =>
  base64.replace(/^data:[^;]+;base64,/, "");

const normalizeTags = (tags: string[]) =>
  [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];

const validateRequiredFields = (input: PublishPostInput) => {
  const errors: string[] = [];

  if (!SLUG_PATTERN.test(input.slug)) {
    errors.push("slug는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.");
  }

  if (!input.title.trim()) errors.push("제목을 입력해야 합니다.");
  if (!input.description.trim()) errors.push("설명을 입력해야 합니다.");
  if (!input.date.trim()) errors.push("작성일을 입력해야 합니다.");
  if (!input.content.trim()) errors.push("본문을 입력해야 합니다.");

  return errors;
};

export const publishPostAction = async (
  input: PublishPostInput
): Promise<PublishPostResult> => {
  const session = await getAdminSession();

  if (!session) {
    return { ok: false, errors: ["관리자 권한이 없습니다."] };
  }

  const normalizedInput: PublishPostInput = {
    ...input,
    slug: input.slug.trim(),
    title: input.title.trim(),
    description: input.description.trim(),
    date: input.date.trim(),
    updated: input.updated?.trim(),
    series: input.series?.trim(),
    tags: normalizeTags(input.tags),
    content: input.content,
    bodyImages: input.bodyImages || [],
  };

  const errors = validateRequiredFields(normalizedInput);
  const safety = validatePublishSafety(normalizedInput);

  if (!safety.ok) errors.push(...safety.errors);

  if (errors.length) {
    return { ok: false, errors };
  }

  if (getPostBySlug(normalizedInput.slug)) {
    return { ok: false, errors: ["이미 존재하는 slug입니다."] };
  }

  const postPath = `blog-contents/${normalizedInput.slug}/content.mdx`;

  if (await githubPathExists(postPath)) {
    return { ok: false, errors: ["GitHub에 이미 존재하는 slug입니다."] };
  }

  const images = [
    ...(normalizedInput.coverImage ? [normalizedInput.coverImage] : []),
    ...normalizedInput.bodyImages,
  ];
  const imageFiles = images.map((image) => ({
    path: `public/postAssets/${normalizedInput.slug}/${image.fileName}`,
    content: stripDataUrlPrefix(image.base64),
    encoding: "base64" as const,
  }));

  for (const file of imageFiles) {
    if (await githubPathExists(file.path)) {
      return {
        ok: false,
        errors: [`이미 존재하는 이미지 파일입니다: ${file.path}`],
      };
    }
  }

  const postMdx = buildPostMdx(normalizedInput);

  await commitFilesToGitHub(`post: publish ${normalizedInput.slug}`, [
    ...imageFiles,
    {
      path: postPath,
      content: postMdx,
      encoding: "utf-8",
    },
  ]);

  return { ok: true, slug: normalizedInput.slug };
};
