export type TOCItem = {
  id: string;
  title: string;
  level: number;
};

export type FrontMatter = {
  title: string;
  description: string;
  date: string;
  series: string;
  tags: string[];
  image?: string;
};

export type Mdx = {
  frontMatter: FrontMatter;
  content: string;
  slug: string;
};
