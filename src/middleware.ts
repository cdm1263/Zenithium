import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ token }) {
      return token?.isAdmin === true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
