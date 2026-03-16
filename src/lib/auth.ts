import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/auth",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      isOnboarded: {
        type: "boolean",
        default: false,
        required: true,
      },
      role: {
        type: ["CONSUMER", "FOOD_COACH"],
        default: "CONSUMER",
        required: true,
      },
    },
  },
  advanced: {
    crossSubdomainCookies: {
      enabled: true,
      // Root domain — all subdomains will share cookies
      domain:
        process.env.NODE_ENV === "production"
          ? ".gloop.com" // note the leading dot
          : ".localhost", // works for *.localhost in dev
    },
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
      path: "/",
    },
  },

  trustedOrigins: [
    "https://app.gloop.com",
    "https://expert.gloop.com",
    "http://app.localhost:3000",
    "http://expert.localhost:3000",
  ],
});
