import { appRouter } from "@/server/root";
import TaskList from "@/components/taskList";
import Link from "next/link";

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
        <header>
          <div className="pt-4 border-t border-slate-200">
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              ← Back to Home
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Task Manager
          </h1>
        </header>

        <TaskList initialTasks={serializedTasks} />
      </div>
    </div>
  );
}