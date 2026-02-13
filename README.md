# 🧩 Next Task Manager

A fullstack task management application built with Next.js (App Router) and tRPC, using SSR for the initial task listing and client-side interactions with end-to-end type safety.

The goal of this project is to demonstrate:

- Server-Side Rendering (SSR)
- Fullstack integration using tRPC
- Shared typing between frontend and backend
- Clear separation of responsibilities across components

---

## 🚀 Technologies Used

- Next.js (App Router)
- React
- TypeScript
- tRPC
- React Query
- Tailwind CSS

---

## 🏗️ Architecture

### 🔹 SSR on the Main Page

The task listing page (`/app/tasklist/page.tsx`) is rendered on the server using:

```ts
appRouter.createCaller({})
```

This allows:

- Fetching data on the server
- Sending fully populated HTML to the client
- Improving perceived performance
- Maintaining SEO compatibility

The data is serialized and passed as `initialTasks` to the client component.

---

### 🔹 Hydration with initialData

Inside the `TaskList` component:

```ts
trpc.task.list.useQuery(undefined, {
  initialData: initialTasks,
});
```

This prevents duplicate requests during the initial load and keeps the React Query cache synchronized.

---

### 🔹 Separation of Responsibilities

The structure was organized as follows:

- `page.tsx` → Server Component (SSR)
- `TaskList` → Client-side container (data + mutations)
- `TaskItem` → Presentation component
- `TaskForm` → Form to create a new task
- `TaskEditForm` → Responsible only for editing

This separation improves:

- Readability
- Maintainability
- Scalability
- Testability

---

### 🔹 Data Updates

After mutations (delete/update), the application uses:

```ts
utils.task.list.invalidate();
```

This forces React Query to revalidate the cache, ensuring the task list is always updated.

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ArturSimoess/next-task-manager.git
```

### 2️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn
```

### 3️⃣ Run the Project

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## 📌 Technical Decisions

- SSR was chosen for the initial task listing to improve performance and guarantee server-side rendering.
- tRPC was used to ensure end-to-end type safety and reduce boilerplate code.
- Editing logic was isolated into its own component to avoid excessive coupling.
- Cache invalidation was used instead of manual refetching to keep the data flow declarative.

---

## 📈 Possible Improvements

- Add unit testing
- Implement pagination/infite scrolling or filtering
- Add authentication system