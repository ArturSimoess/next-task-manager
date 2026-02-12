import { appRouter } from "@/server/root";
import { TaskList } from "@/components/taskList";

export default async function TaskListPage() {
  const caller = appRouter.createCaller({});
  const tasks = await caller.task.list();

  const serializedTasks = tasks.map(task => ({
    ...task,
    createdAt: task.createdAt.toISOString(),
  }));

  return (
    <div className="flex justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Task Manager
          </h1>
        </header>

        <TaskList initialTasks={serializedTasks} />
      </div>
    </div>
  );
}