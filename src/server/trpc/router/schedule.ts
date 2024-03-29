import { z } from "zod";
import * as short from "short-uuid";
import { router, protectedProcedure } from "../trpc";
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex";

export const scheduleRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        chatTime: z.number(),
        timeZone: z.string(),
        availability: z.record(
          z.object({
            from: z.string(),
            to: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, description, chatTime, timeZone, availability } = input;
      const userId = ctx.session.user.id;
      const username = ctx.session.user.name?.replaceAll(" ", "");

      const { id } = await ctx.prisma.schedule.create({
        data: {
          title,
          description,
          chatTime,
          timeZone,
          userId,
        },
      });

      const availabilities = Object.entries(availability).map((item) => {
        const [date, { from, to }] = item;
        return ctx.prisma.availability.create({
          data: {
            scheduleId: id,
            date,
            from,
            to,
          },
        });
      });

      const uniqueCalendarId = `${username}-${userId}-${short.generate()}`;

      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          calLink: uniqueCalendarId,
        },
      });

      return await Promise.all(availabilities);
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    const schedule = await ctx.prisma.schedule.findFirst({
      where: {
        userId,
      },
    });

    if (schedule) {
      const availability = await ctx.prisma.availability.findMany({
        where: {
          scheduleId: schedule.id,
        },
      });
      return { ...schedule, availability };
    }

    return null;
  }),
});
