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

export function TaskForm() {
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
      utils.task.list.invalidate(); // atualiza lista
      reset();
    },
  });

  async function onSubmit(data: TaskFormData) {
    await createTask.mutateAsync(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md"
    >
      <div>
        <input
          {...register('title')}
          placeholder="Task title"
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || createTask.isPending}
        className="bg-black text-white p-2 disabled:opacity-50"
      >
        {createTask.isPending ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
}
