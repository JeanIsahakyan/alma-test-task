import type { NextAuthConfig } from "next-auth";
import NextAuth, { User } from "next-auth";
import { z } from 'zod';
import CredentialsProvider from "next-auth/providers/credentials";

const users: { [key: string]: User } = {
  'admin@gmail.com': {
    id: '1',
    name: 'Admin',
    email: 'admin@gmail.com',
  },
  'jeanisahakyan@gmail.com': {
    id: '2',
    name: 'Zhan',
    email: 'jeanisahakyan@gmail.com',
  },
  'shuo@tryalma.ai': {
    id: '3',
    name: 'Shuo',
    email: 'shuo@tryalma.ai',
  },
}

export const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: "Email", type: "email", placeholder: "example@email.com"},
      },
      async authorize(credentials) {
        const parsedCredentials = z
        .object({ email: z.string().email() })
        .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email } = parsedCredentials.data;
          if (!users.hasOwnProperty(email)) {
            return null;
          }
          return users[email];
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV === "development",
};

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth(config);

