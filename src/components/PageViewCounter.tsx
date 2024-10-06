import { getPageViews } from "@/app/blog/[slug]/actions";

type Props = {
  slug: string;
};

const PageViewCounter = async ({ slug }: Props) => {
  const pageViews = await getPageViews(slug);

  return <span>{pageViews}</span>;
};

export default PageViewCounter;
