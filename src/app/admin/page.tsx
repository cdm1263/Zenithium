import type { Metadata } from "next";
import Link from "next/link";
import { FilePenLine, LogIn, LogOut } from "lucide-react";
import { getAdminSession } from "@/auth";
import Inner from "@/components/Inner";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminPage = async () => {
  const session = await getAdminSession();

  return (
    <Inner className="max-w-screen-md">
      <section className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            GitHub allowlist 관리자만 글을 발행할 수 있습니다.
          </p>
        </div>

        <div className="rounded-md border bg-background p-5">
          {session ? (
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold">로그인됨</p>
                <p className="text-sm text-muted-foreground">
                  {session.user.githubLogin || session.user.name}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/admin/posts/new"
                  className={cn(buttonVariants(), "gap-2")}
                >
                  <FilePenLine className="h-4 w-4" />새 글 작성
                </Link>
                <Button asChild variant="outline">
                  <Link href="/api/auth/signout" className="gap-2">
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <Button asChild>
              <Link href="/api/auth/signin" className="gap-2">
                <LogIn className="h-4 w-4" />
                GitHub 로그인
              </Link>
            </Button>
          )}
        </div>
      </section>
    </Inner>
  );
};

export default AdminPage;
