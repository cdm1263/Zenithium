import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mdx } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  allSameSeries: Mdx[];
  thisSeries: string;
  thisSlug: string;
};
const SeriesAccordion = ({ allSameSeries, thisSeries, thisSlug }: Props) => {
  return (
    <div className="border-[2.5px] border-muted px-4 rounded-lg max-w-screen-sm flex flex-col self-center w-full mb-5">
      <Accordion type="single" defaultValue="series" collapsible>
        <AccordionItem value="series">
          <AccordionTrigger className="text-lg xs:text-xl text-primary">
            {thisSeries} 시리즈 글 모아보기
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              {allSameSeries.reverse().map((sameSeries, index) => (
                <Link
                  scroll
                  key={sameSeries.slug}
                  href={`/blog/${sameSeries.slug}`}
                >
                  <li
                    className={cn(
                      "text:md xs:text-lg hover:bg-primary/20 transition-colors cursor-pointer px-3 py-1 rounded-md",
                      { "bg-primary/10": thisSlug === sameSeries.slug }
                    )}
                  >
                    <span className="mr-2">{index + 1}.</span>
                    {sameSeries.frontMatter.title}
                  </li>
                </Link>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SeriesAccordion;
