'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import type { RouterOutputs } from '@/server/root';

type Task = RouterOutputs['task']['list'][number];

type Props = {
  initialTasks: Task[];
};

export function TaskList({ initialTasks }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const utils = trpc.useUtils();

  const { data } = trpc.task.list.useQuery(undefined, {
    initialData: initialTasks,
  });

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
    },
  });

  const updateTask = trpc.task.update.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
    },
  });

  function startEditing(task: Task) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  }

  function cancelEditing() {
    setEditingId(null);
  }

  async function saveEdit(id: string) {
    await updateTask.mutateAsync({
      id,
      title: editTitle,
      description: editDescription,
    });

    setEditingId(null);
  }

  return (
    <div className="space-y-4">
      {data?.map(task => (
        <div
          key={task.id}
          className="border p-4 rounded flex justify-between items-start gap-4"
        >
          {editingId === task.id ? (
            <div className="flex flex-col gap-2 flex-1">
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="border p-2"
              />

              <textarea
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                className="border p-2"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(task.id)}
                  disabled={updateTask.isPending}
                  className="text-green-600 text-sm"
                >
                  {updateTask.isPending ? 'Saving...' : 'Save'}
                </button>

                <button
                  onClick={cancelEditing}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className='border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition'>
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className="font-semibold">{task.title}</h2>
                  <p className="text-sm text-gray-600">
                    {task.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTask.mutate({ id: task.id })
                    }
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {data?.length === 0 && (
        <p className="text-gray-500">No tasks yet.</p>
      )}
    </div>
  );
}