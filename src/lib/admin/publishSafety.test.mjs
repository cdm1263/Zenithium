import assert from "node:assert/strict";
import test from "node:test";

import {
  validatePublishSafety,
  MAX_IMAGE_BYTES,
  MAX_TOTAL_PAYLOAD_BYTES,
} from "./publishSafety.mjs";

const safeInput = {
  slug: "safe-post",
  title: "Safe post",
  description: "Safe description",
  date: "2026-05-28 12:00:00",
  tags: ["blog"],
  content: "## Safe content",
  bodyImages: [],
};

test("rejects secret-like content without echoing the secret", () => {
  const result = validatePublishSafety({
    ...safeInput,
    content: "GITHUB_CONTENT_TOKEN=github_pat_secretvalue",
  });

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /본문/);
  assert.doesNotMatch(result.errors.join("\n"), /github_pat_secretvalue/);
});

test("rejects unsafe image file names", () => {
  const result = validatePublishSafety({
    ...safeInput,
    coverImage: {
      fileName: "credential.json",
      contentType: "image/png",
      base64: "AAAA",
    },
  });

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /이미지 파일명/);
});

test("rejects image file names with unsupported extensions", () => {
  const result = validatePublishSafety({
    ...safeInput,
    coverImage: {
      fileName: "cover.txt",
      contentType: "image/png",
      base64: "AAAA",
    },
  });

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /확장자/);
});

test("rejects oversized payloads", () => {
  const result = validatePublishSafety({
    ...safeInput,
    coverImage: {
      fileName: "cover.png",
      contentType: "image/png",
      base64: "A".repeat(Math.ceil((MAX_IMAGE_BYTES + 1) / 3) * 4),
    },
  });

  assert.equal(result.ok, false);
  assert.match(result.errors.join("\n"), /5MB/);
});

test("accepts safe post content and safe images", () => {
  const result = validatePublishSafety({
    ...safeInput,
    coverImage: {
      fileName: "cover-image.webp",
      contentType: "image/webp",
      base64: "AAAA",
    },
    bodyImages: [
      {
        fileName: "diagram_01.png",
        contentType: "image/png",
        base64: "AAAA",
      },
    ],
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
  assert.ok(MAX_TOTAL_PAYLOAD_BYTES > MAX_IMAGE_BYTES);
});
