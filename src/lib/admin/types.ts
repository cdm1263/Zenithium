export type UploadedPostImage = {
  fileName: string;
  contentType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  base64: string;
};

export type PublishPostInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  series?: string;
  tags: string[];
  content: string;
  coverImage?: UploadedPostImage;
  bodyImages: UploadedPostImage[];
};

export type PublishPostResult = {
  ok: boolean;
  slug?: string;
  errors?: string[];
};
