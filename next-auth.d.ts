// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  confirmed: Date | null;
  role: string;
  jwt?: string;
};

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: ExtendedUser & DefaultUser;
  }

  // Extend the User type to include the jwt property
  interface User extends DefaultUser {
    jwt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      username: string;
      first_name: string | null;
      last_name: string | null;
      email: string;
      confirmed: Date | null;
      jwt?: string;
    };
  }
}
