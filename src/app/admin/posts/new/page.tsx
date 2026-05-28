import type { Metadata } from "next";
import Inner from "@/components/Inner";
import AdminPostEditor from "./AdminPostEditor";

export const metadata: Metadata = {
  title: "새 글 작성",
  robots: {
    index: false,
    follow: false,
  },
};

const NewPostPage = () => {
  return (
    <Inner className="max-w-screen-2xl">
      <AdminPostEditor />
    </Inner>
  );
};

export default NewPostPage;
