import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">
        Tailwind funcionando
      </h1>

      <ul>
        <li>
          <Link href="/tasklist">Task List</Link>
        </li>

        <li>
          <Link href="/newtask">New Task</Link>
        </li>
      </ul>
    </div>
  );
}
