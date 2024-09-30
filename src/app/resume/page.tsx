import CoverImage from "@/components/CoverImage";

export const metadata = {
  title: "Resume",
  description: "To Zenith",
};

const Resume = () => {
  const coverData = {
    imageSrc: "/resume-cover.jpg",
    title: "Resume",
    description: "안녕하세요, 저는 이런 개발자 입니다.",
  };
  return (
    <section>
      <CoverImage coverData={coverData} />
    </section>
  );
};

export default Resume;
