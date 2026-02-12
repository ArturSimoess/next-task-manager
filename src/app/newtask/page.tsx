'use client';

import { TaskForm } from "@/components/taskForm";
import Link from "next/link";

export default function TaskManager() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 space-y-8">
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Add new Task
          </h1>
        </div>

        <TaskForm />

        <div className="pt-4 border-t border-slate-200">
          <Link
            href="/tasklist"
            className="text-sm text-slate-600 hover:text-slate-900 transition"
          >
            ← Back to Task List
          </Link>
        </div>

      </div>
    </main>
  );
}