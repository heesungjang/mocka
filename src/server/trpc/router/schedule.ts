import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const scheduleRouter = router({
  create: protectedProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
