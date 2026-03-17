import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authProcedure, createTRPCRouter } from "../init";

export default createTRPCRouter({
  getUser: authProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        id: ctx.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),

  completeOnboarding: authProcedure
    .input(
      z.object({
        conditions: z.array(z.string()),
        goals: z.array(z.string()),
        loggingFrequency: z.string(),
        timezone: z.string(),
        checkInTimes: z.object({
          morning: z.string(),
          afternoon: z.string(),
          evening: z.string(),
        }),
        notificationsEnabled: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.update({
          where: {
            id: ctx.userId,
          },
          data: {
            isOnboarded: true,
            conditions: input.conditions,
            goals: input.goals,
            loggingFrequency: input.loggingFrequency,
            timezone: input.timezone,
            notificationsEnabled: input.notificationsEnabled,
            checkInAfternoon: input.checkInTimes.afternoon,
            checkInEvening: input.checkInTimes.evening,
            checkInMorning: input.checkInTimes.morning,
          },
        });

        return { userId: user.id };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while completing onboarding",
          cause: error,
        });
      }
    }),
});
