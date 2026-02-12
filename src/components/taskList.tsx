'use client';

import { trpc } from '@/lib/trpc';

type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
};

type Props = {
  initialTasks: Task[];
};

export function TaskList({ initialTasks }: Props) {
  const utils = trpc.useUtils();

  const { data } = trpc.task.list.useQuery(undefined, {
    initialData: initialTasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
    })),
  });

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
    },
  });

  return (
    <div className="flex flex-col gap-3">
      {data?.map(task => (
        <div
          key={task.id}
          className="border p-4 rounded flex justify-between items-start"
        >
          <div>
            <h2 className="font-semibold">{task.title}</h2>
            <p className="text-sm text-gray-600">
              {task.description}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => deleteTask.mutate({ id: task.id })}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      ))}

      {data?.length === 0 && (
        <p className="text-gray-500">No tasks yet.</p>
      )}
    </div>
  );
}