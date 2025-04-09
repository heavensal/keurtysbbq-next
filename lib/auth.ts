import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
      // Enable email and password authentication
      enabled: true,
      async sendResetPassword(data, request) {
        // Send the reset password email
        console.log("Sending reset password email to:", data.email);
      }
    },
    user: {
      fields: {
        name: "firstName",
      }
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
});
