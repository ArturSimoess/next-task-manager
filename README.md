📄 README.md
🧩 Next Task Manager

Aplicação fullstack de gerenciamento de tarefas construída com Next.js (App Router) e tRPC, utilizando SSR para a listagem inicial e interações client-side com tipagem end-to-end.

O objetivo do projeto é demonstrar:

Renderização no servidor (SSR)

Integração fullstack com tRPC

Tipagem compartilhada entre frontend e backend

Separação clara de responsabilidades nos componentes

🚀 Tecnologias Utilizadas

Next.js (App Router)

React

TypeScript

tRPC

React Query

Tailwind CSS

🏗️ Arquitetura
🔹 SSR na página principal

A página de listagem (page.tsx) é renderizada no servidor utilizando:

appRouter.createCaller({})


Isso permite:

Buscar os dados no servidor

Enviar HTML já preenchido

Melhorar performance percebida

Manter compatibilidade com SEO

Os dados são serializados e enviados como initialTasks para o componente client.

🔹 Hidratação com initialData

No componente TaskList, utilizo:

trpc.task.list.useQuery(undefined, {
  initialData: initialTasks,
});


Isso evita uma requisição duplicada no carregamento inicial e mantém o cache sincronizado.

🔹 Separação de responsabilidades

A estrutura foi organizada da seguinte forma:

page.tsx → Server Component (SSR)

TaskList → Container client-side (data + mutations)

TaskItem → Componente de apresentação

TaskEditForm → Responsável apenas pela edição

Essa divisão melhora:

Legibilidade

Manutenção

Escalabilidade

Testabilidade

🔹 Atualização de dados

Após mutações (delete/update), utilizo:

utils.task.list.invalidate();


Isso força a revalidação do cache do React Query, garantindo que a lista esteja sempre atualizada.

⚙️ Como rodar o projeto
1️⃣ Clonar o repositório
git clone https://github.com/ArturSimoess/next-task-manager.git

2️⃣ Instalar dependências
npm install


ou

yarn

3️⃣ Rodar o projeto
npm run dev


A aplicação estará disponível em:

http://localhost:3000

📌 Decisões Técnicas

SSR foi escolhido para a listagem inicial para melhorar performance e garantir renderização no servidor.

tRPC foi utilizado para garantir tipagem end-to-end e reduzir boilerplate.

A lógica de edição foi isolada em componente próprio para evitar acoplamento excessivo.

A invalidação de cache foi adotada em vez de refetch manual para manter o fluxo declarativo.

📈 Possíveis Melhorias

Implementação de optimistic updates

Testes unitários

Paginação ou filtros

Sistema de autenticação