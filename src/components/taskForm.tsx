'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const utils = trpc.useUtils();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const createTask = trpc.task.create.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      reset();
    },
  });

  async function onSubmit(data: TaskFormData) {
    await createTask.mutateAsync(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md space-y-5"
      >
        <div>
          <input
            {...register('title')}
            placeholder="Task title"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register('description')}
            placeholder="Task description"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || createTask.isPending}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          {createTask.isPending ? 'Creating...' : 'Create Task'}
        </button>
      </form>

      {createTask.isSuccess && (
        <p className="text-green-500 text-sm mt-2">
          Task created successfully!
        </p>
      )}
    </>
  );
}
