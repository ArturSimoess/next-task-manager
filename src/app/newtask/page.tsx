'use client';
import { TaskForm } from "@/components/taskForm";
import Link from "next/link";

export default function TaskManager() {

  return (
    <>
      <h1>Add Task</h1>
      
      <div>
        <TaskForm />
      </div>

      <div>
        <Link href="/tasklist">Task List</Link>
      </div>
    </>
  )
}