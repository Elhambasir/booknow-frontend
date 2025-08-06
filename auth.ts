import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getUserById } from "@/lib/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if(user.id) {
        const existingUser = await getUserById(user.id);
        if(!existingUser || !existingUser.confirmed) {
          return false;
        }
      }
      return true;
    },
    async session({ token, session }) {
      if(token) {
        session.user.id = token.sub;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.confirmed = token.confirmed;
        session.user.jwt = token.jwt;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.role = user.role;
        token.email = user.email;
        token.jwt = user.jwt;
      }
      if (!token.sub) return token;
      const existingUser: any = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.username;
      token.email = existingUser.email;
      token.first_name = existingUser.first_name;
      token.last_name = existingUser.last_name;
      token.confirmed = existingUser.confirmed;
      return token;
    },
  },

  session: { strategy: "jwt", maxAge: 86400 },
  ...authConfig,
});
