import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-10 space-y-8 text-center">
        
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Task Manager
          </h1>
          <p className="text-slate-500">
            A simple task management system built with Next.js 15, tRPC and TailwindCSS.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tasklist"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
          >
            View Tasks
          </Link>

          <Link
            href="/newtask"
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
          >
            Create Task
          </Link>
        </div>

      </div>
    </main>
  );
}