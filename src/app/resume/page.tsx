import CoverImage from "@/components/CoverImage";
import Inner from "@/components/Inner";
import { ReactNode } from "react";
import { getResumeMDXDatas } from "../blog/utils";
import path from "path";
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

export const metadata = {
  title: "Resume",
  description: "To Zenith",
};

const Title = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-end mb-4">
      <h3 className="text-3xl font-semibold mr-2">{title}</h3>
      <span className="text-muted-foreground">{description}</span>
    </div>
  );
};

const SubTitle = ({
  title,
  period,
  link,
  href,
  className,
}: {
  title: string;
  period?: string;
  link?: boolean;
  href?: string;
  className?: string;
}) => {
  return (
    <div className="flex flex-col gap-y-1 sm:gap-y-0 sm:flex-row sm:items-center justify-start sm:justify-between mb-3 break-keep">
      {link && href ? (
        <Link
          href={href}
          target="_blank"
          className={cn(
            "text-xl w-fit font-semibold text-primary hover:underline underline-offset-4 decoration-dashed",
            className
          )}
        >
          {title}
        </Link>
      ) : (
        <h4 className={cn("text-xl w-fit font-semibold", className)}>
          {title}
        </h4>
      )}
      <span className="text-xs sm:text-sm w-fit">{period ?? ""}</span>
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
        "flex flex-col border-2 border-muted rounded-lg px-4 pt-4 pb-3 mx-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const Resume = () => {
  const coverData = {
    imageSrc: "/resume-cover.jpg",
    title: "Resume",
    description: "저는 이런 개발자 입니다.",
  };

  const directoryPath = path.join(process.cwd(), "resume-contents");

  const contents = getResumeMDXDatas(directoryPath);

  const about = contents.get("about") as string;
  const reactQueryTutorial = contents.get("react-query-tutorial") as string;
  const fastCampus = contents.get("fast-campus") as string;
  const epson = contents.get("epson") as string;
  const aigoo = contents.get("aigoo") as string;
  const foodieLog = contents.get("foodie-log") as string;
  const pokehub = contents.get("pokehub") as string;

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

        {/* // Info: 경력사항 */}
        {/* // TODO: 경력 사항 업데이트 */}
        {/* <div>
          <Title title="Careers" description="경력 사항" />
          <ContentContainer>
            <SubTitle title="경력 1" />
            <div className="prose dark:prose-invert">
              <CustomMDX source={""} />
            </div>
          </ContentContainer>
          <ContentContainer>
            <SubTitle title="경력 2" />
            <div className="prose dark:prose-invert">
              <CustomMDX source={""} />
            </div>
          </ContentContainer>
        </div> */}

        {/* // Info: 프로젝트 */}
        <div>
          <Title title="Projects" description="프로젝트" />
          <div className="flex flex-col gap-y-4">
            {/* // Note: AIGOO */}
            <ContentContainer className="pt-1 pb-0">
              <Accordion type="single" collapsible>
                <AccordionItem value="aigoo">
                  <AccordionTrigger>아이고</AccordionTrigger>
                  <AccordionContent>
                    <SubTitle title="AIGOO" period="2024.05 ~ 2024.06" />
                    <div className="prose dark:prose-invert">
                      <CustomMDX source={aigoo} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ContentContainer>

            {/* // Note: Foodie Log */}
            <ContentContainer className="pt-1 pb-0">
              <Accordion type="single" collapsible>
                <AccordionItem value="foodie">
                  <AccordionTrigger>푸디로그</AccordionTrigger>
                  <AccordionContent>
                    <SubTitle title="Foodie Log" period="2024.03 ~ 2024.04" />{" "}
                    <div className="prose dark:prose-invert">
                      <CustomMDX source={foodieLog} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ContentContainer>

            {/* // Note: Pokehub */}
            <ContentContainer className="pt-1 pb-0">
              <Accordion type="single" collapsible>
                <AccordionItem value="pokehub">
                  <AccordionTrigger>포켓허브</AccordionTrigger>
                  <AccordionContent>
                    <SubTitle title="Pokehub" period="2023.11 ~ 2024.02" />
                    <div className="prose dark:prose-invert">
                      <CustomMDX source={pokehub} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ContentContainer>
          </div>
        </div>

        {/* // Info: 경험 */}
        <div>
          <Title title="Experiences" description="다양한 경험" />
          <div className="flex flex-col gap-y-4">
            {/* // Note: Epson Innovation Challenge */}
            <ContentContainer className="pt-1 pb-0">
              <Accordion type="single" defaultValue="epson" collapsible>
                <AccordionItem value="epson">
                  <AccordionTrigger>
                    앱손 & 멋쟁이 사자처럼 주관 해커톤 참여
                  </AccordionTrigger>
                  <AccordionContent>
                    <SubTitle
                      title="Epson Innovation Challenge Korea"
                      period="2024.05 ~ 2024.06"
                    />
                    <div className="prose dark:prose-invert">
                      <CustomMDX source={epson} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ContentContainer>
          </div>
        </div>

        {/* // Info: 오픈소스 */}
        <div>
          <Title title="Open Scources" description="오픈소스" />
          <div className="flex flex-col gap-y-4">
            {/* // Note: react query tutorial */}
            <ContentContainer className="pt-1 pb-0">
              <Accordion
                type="single"
                defaultValue="react-query-tutorial"
                collapsible
              >
                <AccordionItem value="react-query-tutorial">
                  <AccordionTrigger>
                    react query 한글문서 코드 오류 해결
                  </AccordionTrigger>
                  <AccordionContent>
                    <SubTitle
                      title="react-query-tutorial"
                      link
                      href="https://github.com/ssi02014/react-query-tutorial"
                      period="2024.08"
                    />
                    <div className="prose dark:prose-invert">
                      <CustomMDX source={reactQueryTutorial} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ContentContainer>
          </div>
        </div>

        {/* // Info: 교육사항 */}
        <div>
          <Title title="Educations" description="교육" />
          <div className="flex flex-col gap-y-4">
            {/* // Note: fast campus */}
            <ContentContainer className="pt-1 pb-0">
              <Accordion type="single" defaultValue="fastcampus" collapsible>
                <AccordionItem value="fastcampus">
                  <AccordionTrigger>프론트엔드 부트캠프 수료</AccordionTrigger>
                  <AccordionContent>
                    <SubTitle
                      title="패스트 캠퍼스 프론트엔드 부트캠프 5기"
                      period="2023.03 ~ 2023.10"
                    />
                    <div className="prose dark:prose-invert">
                      <CustomMDX source={fastCampus} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ContentContainer>
          </div>
        </div>
      </Inner>
    </section>
  );
};

export default Resume;
