import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const hasGitHubAuthConfig = Boolean(
  process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
);

const getAdminLogins = () =>
  (process.env.ADMIN_GITHUB_LOGINS || "")
    .split(",")
    .map((login) => login.trim())
    .filter(Boolean);

export const isAllowedAdminLogin = (login?: string | null) =>
  Boolean(login && getAdminLogins().includes(login));

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: hasGitHubAuthConfig
    ? [
        GitHubProvider({
          clientId: process.env.AUTH_GITHUB_ID as string,
          clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
      ]
    : [],
  callbacks: {
    async signIn({ profile }) {
      const login =
        typeof profile === "object" && profile && "login" in profile
          ? String(profile.login)
          : null;

      return isAllowedAdminLogin(login);
    },
    async jwt({ token, profile }) {
      if (profile && "login" in profile) {
        token.githubLogin = String(profile.login);
        token.isAdmin = isAllowedAdminLogin(token.githubLogin);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.githubLogin = token.githubLogin;
        session.user.isAdmin = token.isAdmin === true;
      }

      return session;
    },
  },
};

export const getAdminSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return null;
  }

  return session;
};
