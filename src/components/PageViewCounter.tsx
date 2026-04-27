import { getPageViews } from "@/app/blog/[slug]/actions";

type Props = {
  slug: string;
};

const PageViewCounter = async ({ slug }: Props) => {
  try {
    const pageViews = await getPageViews(slug);
    return <span>{pageViews}</span>;
  } catch {
    return <span>---</span>;
  }
};

export default PageViewCounter;
