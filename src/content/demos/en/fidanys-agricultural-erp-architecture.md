---
title: "FidanYS: Inflation-Protected & Multi-Tenant Agricultural ERP Architecture"
category: "SaaS & AgTech Architecture"
description: "Technical review of the cloud-based management system developed with Next.js 15, Spring Boot, and MongoDB for sapling production processes, integrated with inflation accounting. Access details are below."
date: "2025-12-14"
image: "/portfolio/fidan.png"
author: "System Architect"
---

# Integrated Resource Planning for Modern Agriculture: FidanYS Technical Analysis

**Project:** Sapling Management System (FidanYS)

**Access URL:** [app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr)

**Document Type:** Technical Architecture Analysis and System Introduction

## Abstract

This technical review covers the **FidanYS** project, designed to manage the complex inventory structures (live stock) and financial processes of businesses engaged in sapling production and trade.

While solving the tracking of "living products," where standard ERP software falls short, using **Spring Boot** and the flexible schema structure of **MongoDB**; it offers a high-performance user experience with **Next.js 15**. The most distinctive feature of the project is the financial intelligence module that protects businesses against capital erosion by applying **Inflation Accounting** via CBRT (Central Bank) integration.

## 1. Introduction and Problem Space

Agricultural production, especially sapling cultivation, cannot be managed with standard e-commerce or retail inventory logic. The main obstacles to digitalization in the sector are:

1.  **Composite Product Identity:** A sapling cannot be defined by a single SKU. A combination of 6 different parameters such as Species, Variety, Rootstock, Size, Age, and Pot status constitutes the product's identity.
2.  **Production Processes:** Expenses (labor, fertilizer) incurred during the 1-3 year process from seed to sapling formation must be correctly reflected in the final product cost.
3.  **Economic Uncertainty:** In high inflation environments, selling a product produced months ago at its historical cost causes the business to suffer a loss.

FidanYS is a SaaS (Software as a Service) solution developed with "Domain-Driven Design" principles to solve these problems.

## 2. Technology Stack and System Architecture

The system is structured in a **Full-Stack** and **Monorepo**-like structure (Client and Server separate but integrated) to meet scalability and security requirements.

### 2.1. Frontend Architecture (Client)

The user interface runs on **Next.js 15 (App Router)**, the most up-to-date version of modern web standards.

* **Type Safety:** The project is developed with 100% **TypeScript**, minimizing runtime errors.
* **UI Library:** A responsive, accessible interface with theme support (Dark/Light mode) is provided using **Material UI (MUI v7)**.
* **State & Cache:** The **SWR (Stale-While-Revalidate)** library is used for data management. This strategy ensures the user sees data instantly (cache) while checking for data freshness in the background.
* **Form Validation:** Complex data entries are validated on both client and server sides with **React Hook Form** and **Zod** schemas.

### 2.2. Backend Architecture (Server)

The business logic layer is built on **Spring Boot 3.x (Java 17+)**, the standard for enterprise reliability.

* **Database Choice: MongoDB (NoSQL).**
    * *Why NoSQL?* The attributes of saplings are variable. Instead of the rigid table structure of SQL, product features are stored as dynamic and embedded objects using MongoDB's document-based structure.
* **API Strategy:** A resource-oriented API architecture fully compliant with **RESTful** standards has been established.
* **External Service Integration:** Daily inflation data and exchange rates flow automatically into the system via a secure connection established with the CBRT EVDS API service.

## 3. Multi-Tenancy Architecture

FidanYS is in a "Software as a Service" model where a single application instance serves multiple companies.

* **Tenant Isolation:** Every critical document (Order, Stock, Current Account, etc.) in the database has a `tenantId` field.
* **Automatic Filtering:** Interceptors running at the Spring Data/Security level in the backend layer determine which company (Tenant) the incoming request comes from.
    * The `tenantId` information within `AuthenticationService` and JWT is read.
    * The `{ tenantId: "active_tenant" }` criterion is automatically added to all database queries.
    * This architecture makes it mathematically impossible for Company A's data to be seen by Company B.

## 4. Critical Functional Modules

The main modules that distinguish the system from its competitors are:

### 4.1. Smart Stock and Variation Management
Products in the system are not simple rows. It works with the logic of "Product Family" and "Variations".
* **Variation Matrix:** When users select the "Walnut" species, for example, the system automatically presents possible varieties (Chandler, Fernor) and sizes as a matrix.
* **Location-Based Tracking:** Which parcel or warehouse the sapling is in is monitored instantly.

### 4.2. Inflation Accounting and Financial Intelligence
This is the most technical and strategic layer of the project.
* **Real Valuation:** `InflationService` calculates the current "Real" value of an expense made in the past.
* **Cost Analysis:** When determining the sales price of a sapling, the system suggests a "Capital Protection Price" by adding not only the purchase price on the invoice but also the inflation rate that has occurred from that date to the present to the cost.

### 4.3. Production Batches
Tracking is done on a "Batch" basis in accordance with the nature of agricultural production.
* A `ProductionBatch` is created when a seed is sown.
* All fertilization and irrigation costs for that batch are collected in the `CostPool`.
* When harvest time comes, the total cost in the pool is divided by the number of saplings produced to calculate the **Real Unit Cost**.

## 5. Security and Authorization

Application security is provided with the "Defense in Depth" principle.

* **Authentication:** JWT (JSON Web Token) based stateless authentication.
* **Encryption:** User passwords are stored hashed with the **BCrypt** algorithm.
* **RBAC (Role-Based Access Control):**
    * `ADMIN`: Has all authorities.
    * `SALES`: Can only see orders and current accounts, cannot see costs.
    * `WAREHOUSE`: Can only perform stock entry-exit, cannot see monetary values.
* **Single Session:** When a user logs in from a different device, their old session is terminated for security (`forceLogin` mechanism).

## 6. Live System and Access

It is possible to test the system's architecture, data structure, and financial reporting capabilities in a live environment.

| Access URL | Username | Password | Note |
| :--- | :--- | :--- | :--- |
| **[https://app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr/auth/sign-in)** | `admin` | `admin` | Full authority demo account. |

*Transactions made in the demo environment are considered test data and may be reset periodically.*

## 7. Conclusion

FidanYS offers a pinpoint solution to the agriculture sector's need for "digital transformation" by combining the stability of the Java ecosystem with the modernity of Next.js. Especially with the **Inflation Accounting** module, it has gone beyond being just a stock tracking program and has transformed into a strategic decision support system for business owners.