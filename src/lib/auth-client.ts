import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const { signIn, signUp, useSession } = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
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
    }),
  ],
});
