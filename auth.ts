import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { error } from "console";

declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    role: "ADMIN" | "USER";
  }
}

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
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("checking user");
    //   console.log(user);
    //   if (!user) return false;
    //   let userS: string = user.id!;
    //   const existingUser = await getUserById(userS);
    //   if (!existingUser || !existingUser.emailVerified) {
    //     console.log("User email is not verified ");
    //     return false;
    //   }
    //   console.log("User email is verified");
    //   return true;
    // },

    async session({ session, user, token }) {
      console.log({ sessionToken: token, session });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      // if (token.role && session.user) {
      //   session.user.role = token.role;
      // }
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role as "ADMIN" | "USER",
        },
      };
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // YOU CAN ACCESS THIS TOKEN IN MIDDLEWARE in req object

      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
