import Link from "next/link";

export default function Home() {
  return (
    <div>
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
