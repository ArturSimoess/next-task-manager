import { TaskEditForm } from './taskEditForm';
import type { RouterOutputs } from '@/server/root';

type Task = RouterOutputs['task']['list'][number];

type Props = {
  task: Task;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onSave: (title: string, description: string) => void;
};

export function TaskItem({
  task,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onDelete,
  onSave,
}: Props) {
  if (isEditing) {
    return (
      <TaskEditForm
        task={task}
        onCancel={onCancelEdit}
        onSave={onSave}
      />
    );
  }

  return (
    <div className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
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
            onClick={onStartEdit}
            className="text-blue-500 text-sm"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="text-red-500 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
