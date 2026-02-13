'use client';

import { useState } from 'react';
import type { RouterOutputs } from '@/server/root';

type Task = RouterOutputs['task']['list'][number];

type TaskEditFormProps = {
  task: Task;
  onCancel: () => void;
  onSave: (title: string, description: string) => void;
};

export default function TaskEditForm({ task, onCancel, onSave }: TaskEditFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [successMessage, setSuccessMessage] = useState('');
  
  async function handleSave() {
    await onSave(title, description);
    setSuccessMessage('Saved successfully');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  }

  return (
    <div className="border p-4 rounded flex flex-col gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="text-green-600 text-sm"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="text-gray-500 text-sm"
        >
          Cancel
        </button>
      </div>

      {successMessage && (
        <span className="text-green-600 text-sm">
          {successMessage}
        </span>
      )}
    </div>
  );
}
