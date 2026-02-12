import { router } from './trpc';
import { taskRouter } from './routers/task';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const appRouter = router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;