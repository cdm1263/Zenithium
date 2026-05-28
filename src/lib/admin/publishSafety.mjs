export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_PAYLOAD_BYTES = 20 * 1024 * 1024;

const SAFE_IMAGE_NAME = /^[A-Za-z0-9._-]+$/;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const ALLOWED_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

const SECRET_PATTERNS = [
  /AUTH_SECRET/i,
  /GITHUB_TOKEN/i,
  /GITHUB_CONTENT_TOKEN/i,
  /PRIVATE_KEY/i,
  /BEGIN PRIVATE KEY/i,
  /sk-[A-Za-z0-9_-]{12,}/,
  /ghp_[A-Za-z0-9_]{12,}/,
  /github_pat_[A-Za-z0-9_]{12,}/,
  /AKIA[0-9A-Z]{12,}/,
  /GOOGLE_APPLICATION_CREDENTIALS/i,
  /\.env\b/i,
  /\.pem\b/i,
  /\.key\b/i,
  /\.p12\b/i,
  /credential[^/\s]*\.json/i,
];

const textByteLength = (value) => new TextEncoder().encode(value).byteLength;

const getBase64Bytes = (base64) => {
  const normalized = base64.replace(/^data:[^;]+;base64,/, "");
  return Math.floor((normalized.length * 3) / 4);
};

const hasSecretLikeValue = (value) =>
  SECRET_PATTERNS.some((pattern) => pattern.test(value));

const getImages = (input) => [
  ...(input.coverImage ? [input.coverImage] : []),
  ...(Array.isArray(input.bodyImages) ? input.bodyImages : []),
];

export const validatePublishSafety = (input) => {
  const errors = [];
  const frontMatterText = [
    input.slug,
    input.title,
    input.description,
    input.date,
    input.updated,
    input.series,
    ...(Array.isArray(input.tags) ? input.tags : []),
  ]
    .filter(Boolean)
    .join("\n");

  if (hasSecretLikeValue(frontMatterText)) {
    errors.push("frontmatter에 공개하면 안 되는 값으로 보이는 문자열이 있습니다.");
  }

  if (hasSecretLikeValue(input.content || "")) {
    errors.push("본문에 공개하면 안 되는 값으로 보이는 문자열이 있습니다.");
  }

  let totalBytes =
    textByteLength(frontMatterText) + textByteLength(input.content || "");

  for (const image of getImages(input)) {
    if (!SAFE_IMAGE_NAME.test(image.fileName) || hasSecretLikeValue(image.fileName)) {
      errors.push(`이미지 파일명 '${image.fileName}'은 사용할 수 없습니다.`);
      continue;
    }

    const extension = image.fileName.split(".").pop()?.toLowerCase();
    if (!extension || !ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
      errors.push(`이미지 파일 '${image.fileName}'의 확장자는 지원하지 않습니다.`);
    }

    if (!ALLOWED_IMAGE_TYPES.has(image.contentType)) {
      errors.push(`이미지 파일 '${image.fileName}'의 타입은 지원하지 않습니다.`);
    }

    const imageBytes = getBase64Bytes(image.base64 || "");
    totalBytes += imageBytes;

    if (imageBytes > MAX_IMAGE_BYTES) {
      errors.push(`이미지 파일 '${image.fileName}'은 5MB 이하여야 합니다.`);
    }
  }

  if (totalBytes > MAX_TOTAL_PAYLOAD_BYTES) {
    errors.push("전체 발행 payload는 20MB 이하여야 합니다.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
};
