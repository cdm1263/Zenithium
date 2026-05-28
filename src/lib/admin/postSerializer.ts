import type { PublishPostInput } from "./types";

const quoteYaml = (value: string) => JSON.stringify(value);

const formatTags = (tags: string[]) =>
  tags.length ? tags.map((tag) => `  - ${quoteYaml(tag)}`).join("\n") : "  - 기타";

export const buildPostMdx = (input: PublishPostInput) => {
  const imagePath = input.coverImage
    ? `/postAssets/${input.slug}/${input.coverImage.fileName}`
    : "";

  return [
    "---",
    `title: ${quoteYaml(input.title)}`,
    `description: ${quoteYaml(input.description)}`,
    `date: ${input.date}`,
    `updated: ${quoteYaml(input.updated || "")}`,
    `series: ${quoteYaml(input.series || "")}`,
    `image: ${quoteYaml(imagePath)}`,
    "tags:",
    formatTags(input.tags),
    "---",
    "",
    input.content.trim(),
    "",
  ].join("\n");
};
