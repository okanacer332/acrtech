---
title: "Next.js 15 Server Actions"
category: "Development"
description: "Modern web uygulamalarında form yönetimi ve backend iletişiminde devrim."
date: "10 Dec 2024"
image: "/portfolio/article.jpg"
---

## Server Actions Nedir?

Next.js 14 ile hayatımıza giren ve 15 ile stabilize olan Server Actions, API endpoint yazmadan backend fonksiyonlarını doğrudan frontend bileşenlerinden çağırmamızı sağlar. Bu, **"Code Co-location"** (kodun aynı yerde bulunması) prensibini bir üst seviyeye taşır.

### Geleneksel Yöntem vs Server Actions

Eskiden bir form göndermek için:
1.  API route oluştur (`/api/submit`).
2.  Frontend'de `fetch` veya `axios` kullan.
3.  Loading ve Error state'lerini manuel yönet.

**Server Actions ile:**
```tsx
// actions.ts
'use server'

export async function createTodo(formData: FormData) {
  const title = formData.get('title')
  await db.todo.create({ data: { title } })
}