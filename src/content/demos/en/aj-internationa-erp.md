---
title: "AJ International ERP: Multi-Tenant & RBAC Architecture"
category: "SaaS Architecture"
description: "Technical review of the multi-tenant and role-based management system developed for global textile operations using Next.js and Spring Boot."
date: "2025-12-12"
image: "/portfolio/22.png"
---

# Multi-Tenant and Role-Based (RBAC) Integrated Management System in Global Textile Supply Chain: A Technical Review

**Project:** AJ International ERP
**Access URL:** [app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)
**Document Type:** Technical Architecture and System Analysis Article

## Abstract

This article examines the cloud-based enterprise resource planning (ERP) system developed for AJ International operations, managing geographically distributed (Turkey, Russia, Dubai) business processes through a single core software. The study discusses the "Multi-Tenant" architecture created using a hybrid use of **Next.js 14**, **Spring Boot**, and **MongoDB** technologies, and the RBAC (Role-Based Access Control) mechanism actively running in the system with technical details. The system is a validated software solution running in a live environment that ensures data isolation while maintaining central management capabilities.

## 1. Introduction

The textile sector requires a complex data model due to its variant product structure (color, size, fabric type) and cross-border logistics processes. The AJ International project has adopted a non-monolithic, modern service-based architecture to manage this complexity. The system combines operations in Turkey, Russia, and Dubai, each with its own legal and commercial rules, in an infrastructure that is logically separated but physically runs on a single database cluster.

## 2. System Architecture and Technology Stack

The project is structured in a way that the Frontend and Backend layers operate completely independently, in accordance with the "Separation of Concerns" principle.

### 2.1. Frontend Architecture (Client Layer)
Built on **Next.js 14 (App Router)** architecture for user experience, server-side rendering (SSR) capability, and SEO compatibility.

* **Component Library:** Reusable and lightweight UI components have been developed using Shadcn/ui and TailwindCSS, in accordance with atomic design principles.
* **State Management:** Complex form data and user session information are managed on a global state with the **Zustand** library.
* **Data Fetching:** Data synchronization between the server and the client has been optimized and network requests minimized with SWR or TanStack Query patterns.

### 2.2. Backend Architecture (Server Layer)
Business Logic runs on **Spring Boot 3.x**, the standard of the corporate Java ecosystem.

* **Database:** **MongoDB (NoSQL)**. The hierarchical and variable structure of textile products (e.g., a product having N color variants and each variant having M size stocks) necessitated a document-oriented structure instead of relational databases.
* **API Gateway:** All requests are met through endpoints designed in accordance with RESTful API standards.

## 3. Security Architecture and Access Control

The system's security layer is an currently active structure that covers not only authentication but also detailed authorization.

### 3.1. Role-Based Access Control (RBAC)
Users in the system access specific resources according to their assigned roles. This structure works on the Spring Security filter chain with the following mathematical logic:

Let $u$ be a user, $R$ a set of roles, and $P$ a set of permissions.

$$
Permission(u) = \bigcup_{r \in Roles(u)} Permissions(r)
$$

The following hierarchy is actively applied in the system:
* **Super Admin (Root):** Authority to manage all tenants (countries) and configurations.
* **Country Admin (Tenant Admin):** Manages only the users, stocks, and finance in their own country (e.g., TR, RU, or DU). Cannot see data from other countries.
* **Operational User:** Has only data entry and viewing authority; deletion or configuration authority is restricted.

### 3.2. Authentication (JWT & HttpOnly)
The system has a "Stateless" architecture.
When a user logs in, the server generates a signed **JWT (JSON Web Token)**.
This token is stored in an **HttpOnly Cookie** inaccessible to JavaScript on the client side. This method provides full protection against XSS (Cross-Site Scripting) attacks.

## 4. Multi-Tenancy and Data Isolation

The system uses the "Discriminator Column" strategy, not "Database-per-Schema," where a single software instance serves multiple organizations.

1.  **Tenant Context:** Every HTTP request is intercepted by an Interceptor layer.
2.  **Data Filtering:** `tenant_id` (e.g., tr, ru, du) is read from the request header or the logged-in user's profile.
3.  **MongoDB Query:** The backend automatically adds the `{ tenant: "current_tenant" }` criterion to every query going to the database. This makes it technically impossible for a Russia user to access Turkey data by manipulating the API.

## 5. Module and Functional Details

The AJ International system consists of the following main modules that manage textile operations end-to-end:

### 5.1. Dashboard and Management Panel
The screen the user first encounters is dynamically shaped according to the authorization level.
* **KPI Cards:** Metrics such as total sales, active orders, critical stock levels are calculated instantly.
* **Graphical Analysis:** Sales trends and stock distribution are visualized.

### 5.2. Product and Inventory Management (PIM & WMS)
This module, the heart of the textile sector, covers variant management down to the finest detail.
* **Variant Matrix:** Sub-breakdowns (SKU) such as Color, Size, Fabric Type are managed under a main product (Parent Product).
* **Stock Movements:** Entry, exit, transfer, and return transactions are logged. How much of which product is in which warehouse (TR Warehouse, RU Warehouse) is tracked instantly.

### 5.3. Current Account and Customer Relations (CRM)
Designed for B2B operations.
* **Customer Cards:** Each country's customer portfolio is isolated.
* **Balance Tracking:** Customers' debt/credit status, order-based offsetting transactions are carried out through the system.

### 5.4. Sales and Order Management
Covers the process from the moment the order is received until delivery.
* **Order Creation:** Order form working with basket logic, including dynamic pricing.
* **Status Management:** Workflow tracking through "Pending", "Preparing", "Shipped", "Delivered" statuses.

## 6. Live Demo and Operational Validation

The system's "Multi-Tenant" structure and RBAC capabilities are verifiable on the live environment below. This access information proves the system's isolation capability and the functionality of the modules.

**Project URL:** [https://app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

Restricted administrator accounts defined to test the system are as follows:

| Operation Region | Username (Tenant ID) | Password | Access Scope (RBAC & Tenant) |
|---|---|---|---|
| **Turkey Operation** | `admin.tr` | `admin` | Only TR-origin products, stocks, current accounts, and TL-based financial data. |
| **Russia Operation** | `admin.ru` | `admin` | Only logistics data, customer portfolio, and stocks belonging to the RU region. |
| **Dubai Operation** | `admin.du` | `admin` | Data filtered specifically for the Middle East market and English/Arabic focused structure. |

*Note: Although the modules in the left menu appear the same when logged in with each user, it will be seen that the data inside (Product list, Customer list) is completely different.*

## 7. Conclusion

The AJ International project is a modern SaaS solution with an RBAC structure that does not compromise on security, a high-performance Next.js front end, and a flexible MongoDB database architecture. The system currently serves actively not just as a data recording environment, but as an integrated platform where operational decisions are made and cross-regional data isolation is ensured with mathematical precision.