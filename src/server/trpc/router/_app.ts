import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { scheduleRouter } from "./schedule";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  schedule: scheduleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
