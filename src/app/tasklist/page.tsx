import { appRouter } from "@/server/root";
import { TaskList } from "@/components/taskList";

export default async function TaskListPage() {
  const caller = appRouter.createCaller({});
  const tasks = await caller.task.list();

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      <TaskList initialTasks={tasks} />
    </div>
  );
}