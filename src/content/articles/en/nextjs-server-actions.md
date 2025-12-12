---
title: "Next.js 15 Server Actions"
category: "Development"
description: "A revolution in form management and backend communication in modern web apps."
date: "10 Dec 2024"
image: "/portfolio/article.jpg"
---

## What are Server Actions?

Server Actions, introduced in Next.js 14 and stabilized in 15, allow us to call backend functions directly from frontend components without writing API endpoints. This takes the principle of **"Code Co-location"** to the next level.

### Traditional Method vs Server Actions

Previously, to submit a form:
1.  Create an API route (`/api/submit`).
2.  Use `fetch` or `axios` on the frontend.
3.  Manually manage Loading and Error states.

**With Server Actions:**
```tsx
// actions.ts
'use server'

export async function createTodo(formData: FormData) {
  const title = formData.get('title')
  await db.todo.create({ data: { title } })
}