import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { randomUUID } from 'crypto';

type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

const globalForTasks = globalThis as unknown as {
  tasks?: Task[];
};

const tasks: Task[] =
  globalForTasks.tasks ?? (globalForTasks.tasks = []);

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return tasks;
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const newTask: Task = {
        id: randomUUID(),
        title: input.title,
        description: input.description ?? '',
        createdAt: new Date(),
      };

      tasks.push(newTask);
      return newTask;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const task = tasks.find(t => t.id === input.id);
      if (!task) throw new Error('Task not found');

      if (input.title !== undefined) task.title = input.title;
      if (input.description !== undefined)
        task.description = input.description;

      return task;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const index = tasks.findIndex(t => t.id === input.id);
      if (index === -1) throw new Error('Task not found');

      tasks.splice(index, 1); // ✅ muta o array original
      return { success: true };
    }),
});