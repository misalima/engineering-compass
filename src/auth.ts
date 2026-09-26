import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { isOwnerGithubId, sessionIsOwner } from "@/lib/owner";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    signIn: ({ account }) => account?.provider === "github" && isOwnerGithubId(account.providerAccountId),
    jwt: ({ token, account }) => {
      if (account) token.githubId = account.providerAccountId;
      return token;
    },
    session: ({ session, token }) => ({ ...session, githubId: token.githubId as string | undefined }),
    authorized: ({ auth }) => sessionIsOwner(auth),
  },
});
