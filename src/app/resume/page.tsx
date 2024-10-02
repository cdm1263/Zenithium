import CoverImage from "@/components/CoverImage";
import Inner from "@/components/Inner";
import { ReactNode } from "react";
import CustomMDX from "@/components/CustomMDX";
import SocialIcons from "@/components/SocialIcons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { about, ResumeContent, sections } from "./resume";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Resume",
  description: "To Zenith",
};

const SubTitle = ({
  subtitle,
  period,
  href,
  className,
}: {
  subtitle: string;
  period?: string;
  href?: string | never;
  className?: string;
}) => {
  const titleClassName = cn(
    "text-xl w-fit font-semibold",
    href && "text-primary hover:underline underline-offset-4 decoration-dashed",
    className
  );

  return (
    <div className="flex flex-col gap-y-1 sm:gap-y-0 sm:flex-row sm:items-center justify-start sm:justify-between mb-3 break-keep">
      {href ? (
        <Link href={href} target="_blank" className={titleClassName}>
          {subtitle}
        </Link>
      ) : (
        <h4 className={titleClassName}>{subtitle}</h4>
      )}
      {period && <span className="text-xs sm:text-sm w-fit">{period}</span>}
    </div>
  );
};

const ContentContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col border-2 border-muted rounded-lg px-4 pt-4 pb-3 sm:mx-2",
        className
      )}
    >
      {children}
    </div>
  );
};

const AccordionSection = ({
  title,
  subtitle,
  content,
  period,
  href,
  open,
}: ResumeContent) => (
  <ContentContainer className="pt-1 pb-0">
    <Accordion
      type="single"
      defaultValue={open ? title : undefined}
      collapsible
    >
      <AccordionItem value={title}>
        <AccordionTrigger className="text-md sm:text-xl">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <SubTitle subtitle={subtitle} period={period} href={href} />
          <div className="prose dark:prose-invert">
            <CustomMDX source={content} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </ContentContainer>
);

const Resume = () => {
  const coverData = {
    imageSrc: "/resume-cover.jpg",
    title: "Resume",
    description: "저를 소개합니다.",
  };

  return (
    <section>
      <CoverImage coverData={coverData} />

      <Inner className="max-w-screen-md flex flex-col gap-y-8">
        {/* // Info: 소개 */}
        <div className="flex flex-col gap-y-4 mb-10">
          <div className="prose dark:prose-invert">
            <h2 className="text-5xl">차동민</h2>
            <CustomMDX source={about} />
          </div>
          <SocialIcons />
        </div>

        {/* // Info: 경력사항, 프로젝트, 경험, 오픈소스, 교육 */}
        {sections.map((section) => (
          <div key={section.title}>
            <SectionTitle
              title={section.title}
              description={section.description}
            />
            <div className="flex flex-col gap-y-4">
              {section.items.map((item) => (
                <AccordionSection key={item.title} {...item} />
              ))}
            </div>
          </div>
        ))}
      </Inner>
    </section>
  );
};

export default Resume;
