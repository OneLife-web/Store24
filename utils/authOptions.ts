import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth";
import User from "@/utils/models/User";
import { connectToDb } from "@/utils/config/mongodb";
import { NextAuthOptions } from "next-auth";

// Extend NextAuth types for session
declare module "next-auth" {
  interface Session {
    id: string; // Add any additional properties you want here
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials); // Debugging line
        await connectToDb();

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Credentials not provided.");
        }

        const user = await User.findOne({ email: credentials.email });
        console.log("Found user:", user); // Debugging line

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        console.log("Password valid:", isValid); // Debugging line

        if (!isValid) {
          throw new Error("Invalid password.");
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectToDb();
      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            image: user.image,
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && typeof token.id === "string") {
        session.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-up",
    error: "/auth/error",
  },
};
