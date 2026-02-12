'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import type { RouterOutputs } from '@/server/root';
import { TaskItem } from './taskItem';

type Task = RouterOutputs['task']['list'][number];

type Props = {
  initialTasks: Task[];
};

export default function TaskList({ initialTasks }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const utils = trpc.useUtils();

  const { data } = trpc.task.list.useQuery(undefined, {
    initialData: initialTasks,
  });

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => utils.task.list.invalidate(),
  });

  const updateTask = trpc.task.update.useMutation({
    onSuccess: () => utils.task.list.invalidate(),
  });

  if (!data?.length) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onStartEdit={() => setEditingId(task.id)}
          onCancelEdit={() => setEditingId(null)}
          onDelete={() => deleteTask.mutate({ id: task.id })}
          onSave={(title, description) =>
            updateTask.mutate({
              id: task.id,
              title,
              description,
            })
          }
        />
      ))}
    </div>
  );
}
