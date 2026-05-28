export const MAX_IMAGE_BYTES: number;
export const MAX_TOTAL_PAYLOAD_BYTES: number;

export type SafetyImage = {
  fileName: string;
  contentType: string;
  base64: string;
};

export type SafetyInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  series?: string;
  tags: string[];
  content: string;
  coverImage?: SafetyImage;
  bodyImages: SafetyImage[];
};

export type SafetyResult = {
  ok: boolean;
  errors: string[];
};

export function validatePublishSafety(input: SafetyInput): SafetyResult;
