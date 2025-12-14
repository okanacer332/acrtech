---
title: "Reciclaje Textil - ERP Internacional: Arquitectura Multi-Tenant y RBAC"
category: "SaaS Architecture"
description: "Revisión técnica del sistema de gestión multi-inquilino y basado en roles desarrollado con Next.js y Spring Boot para operaciones textiles globales. Detalles de acceso a continuación."
date: "2025-12-12"
image: "/portfolio/22.png"
---

# Sistema de Gestión Integrada Multi-Inquilino (Multi-Tenant) y Basado en Roles (RBAC) en la Cadena de Suministro Textil Global

**Proyecto:** AJ International ERP

**URL de Acceso:** [app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

**Tipo de Documento:** Artículo de Arquitectura Técnica y Análisis del Sistema

## Resumen (Abstract)

Este artículo examina el sistema de planificación de recursos empresariales (ERP) basado en la nube desarrollado para las operaciones de AJ International, que gestiona procesos comerciales distribuidos geográficamente (Turquía, Rusia, Dubái) a través de un único software central.

El estudio analiza la arquitectura "Multi-Tenant" (Multi-Inquilino) creada con el uso híbrido de tecnologías **Next.js 14**, **Spring Boot** y **MongoDB**, y el mecanismo RBAC (Control de Acceso Basado en Roles) que funciona activamente en el sistema con detalles técnicos. El sistema es una solución de software verificada que se ejecuta en un entorno en vivo y garantiza el aislamiento de datos al tiempo que mantiene capacidades de gestión centralizada.

## 1. Introducción

El sector textil requiere un modelo de datos complejo debido a su estructura de productos variante (color, talla, tipo de tejido) y procesos logísticos transfronterizos.

El proyecto AJ International ha adoptado una arquitectura moderna basada en servicios, no monolítica, para gestionar esta complejidad. El sistema combina operaciones en Turquía, Rusia y Dubái, cada una con sus propias reglas legales y comerciales, en una infraestructura que está lógicamente separada pero que físicamente se ejecuta en un único clúster de base de datos.

## 2. Arquitectura del Sistema y Pila Tecnológica

El proyecto está estructurado de modo que las capas Frontend y Backend operan de forma completamente independiente, de acuerdo con el principio de "Separación de Intereses" (Separation of Concerns).

### 2.1. Arquitectura Frontend (Capa Cliente)

La experiencia del usuario se basa en la arquitectura **Next.js 14 (App Router)** debido a su capacidad de renderizado del lado del servidor (SSR) y compatibilidad con SEO.

* **Biblioteca de Componentes:** Se han desarrollado componentes de UI reutilizables y ligeros que cumplen con los principios de diseño atómico utilizando Shadcn/ui y TailwindCSS.

* **Gestión de Estado:** Los datos de formularios complejos y la información de sesión del usuario se gestionan en el estado global con la biblioteca **Zustand**.

* **Obtención de Datos:** La sincronización de datos entre el servidor y el cliente se optimiza y las solicitudes de red se minimizan con patrones SWR o TanStack Query.

### 2.2. Arquitectura Backend (Capa Servidor)

La Lógica de Negocio (Business Logic) se ejecuta en **Spring Boot 3.x**, el estándar del ecosistema empresarial Java.

* **Base de Datos:** **MongoDB (NoSQL)**. La estructura jerárquica y variable de los productos textiles (por ejemplo, un producto que tiene N variantes de color y cada variante tiene M existencias de talla) requería una estructura orientada a documentos en lugar de bases de datos relacionales.

* **API Gateway:** Todas las solicitudes se atienden a través de puntos finales (endpoints) diseñados de acuerdo con los estándares de la API RESTful.

## 3. Arquitectura de Seguridad y Control de Acceso

La capa de seguridad del sistema es una estructura actualmente activa que cubre no solo la Autenticación sino también la Autorización detallada.

### 3.1. Control de Acceso Basado en Roles (RBAC)

En el sistema, los usuarios acceden a recursos específicos según sus roles asignados. Esta estructura funciona en la Cadena de Filtros de Spring Security con la siguiente lógica:

> Permission(u) = Union( Roles(u) -> Permissions(r) )

La siguiente jerarquía se aplica activamente en el sistema:

* **Super Admin (Root):** Autoridad para gestionar todos los inquilinos (países) y configuraciones.

* **Admin de País (Tenant Admin):** Gestiona solo usuarios, existencias y finanzas en su propio país (por ejemplo, TR, RU o DU). No puede ver datos de otros países.

* **Usuario Operativo:** Tiene autoridad solo para ingresar y ver datos; la autoridad de eliminación o configuración está restringida.

### 3.2. Autenticación (JWT y HttpOnly)

El sistema tiene una arquitectura "Stateless" (sin estado).

1.  Cuando el usuario inicia sesión, el servidor genera un **JWT (JSON Web Token)** firmado.

2.  Este token se almacena en una **Cookie HttpOnly** inaccesible por JavaScript en el lado del cliente. Este método proporciona protección total contra ataques XSS (Cross-Site Scripting).

## 4. Multi-Tenencia y Aislamiento de Datos

El sistema utiliza la estrategia de **"Columna Discriminadora"** (Discriminator Column), no "Base de datos por esquema" (Database-per-Schema), donde una única instancia de software sirve a múltiples organizaciones.

* **Contexto del Inquilino:** Cada solicitud HTTP es capturada por un Interceptor.

* **Filtrado de Datos:** El `tenant_id` (por ejemplo, tr, ru, du) se lee del encabezado de la solicitud (Header) o del perfil del usuario que inició sesión.

* **Consulta MongoDB:** El backend agrega automáticamente el criterio `{ tenant: "current_tenant" }` a cada consulta que va a la base de datos. De esta manera, se hace técnicamente imposible que un usuario de Rusia acceda a datos de Turquía manipulando la API.

## 5. Detalles de Módulos y Funciones

El sistema AJ International consta de los siguientes módulos principales que gestionan las operaciones textiles de extremo a extremo:

### 5.1. Panel de Control y Tablero

La pantalla que el usuario encuentra primero se forma dinámicamente de acuerdo con el nivel de autorización.

* **Tarjetas KPI:** Métricas como ventas totales, pedidos activos, nivel de stock crítico se calculan al instante.

* **Análisis Gráfico:** Se visualizan las tendencias de ventas y la distribución de stock.

### 5.2. Gestión de Productos e Inventario (PIM y WMS)

Este módulo, el corazón del sector textil, cubre la gestión de variantes hasta el más mínimo detalle.

* **Matriz de Variantes:** Sub-desgloses (SKU) como Color, Talla, Tipo de Tejido se gestionan bajo un Producto Padre (Parent Product).

* **Movimientos de Stock:** Se registran las transacciones de entrada, salida, transferencia y devolución. Qué producto está en qué almacén (Almacén TR, Almacén RU) y cuánto se rastrea al instante.

### 5.3. Cuenta Corriente y Relaciones con Clientes (CRM)

Diseñado para operaciones B2B.

* **Tarjetas de Clientes:** La cartera de clientes de cada país está aislada.

* **Seguimiento de Saldo:** El estado de deuda/crédito de los clientes y las transacciones de compensación basadas en pedidos se llevan a cabo a través del sistema.

### 5.4. Gestión de Ventas y Pedidos

Cubre el proceso desde el momento en que se recibe el pedido hasta la entrega.

* **Creación de Pedidos:** Formulario de pedido que funciona con lógica de cesta, incluyendo precios dinámicos.

* **Gestión de Estado:** Seguimiento del flujo de trabajo a través de estados "Pendiente", "Preparando", "Enviado", "Entregado".

## 6. Demostración en Vivo y Verificación Operativa

La estructura "Multi-Tenant" y las capacidades RBAC del sistema se pueden verificar en el entorno en vivo a continuación. Estos detalles de acceso demuestran la capacidad de aislamiento del sistema y la operatividad de los módulos.

**URL del Proyecto:** [https://app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

Las cuentas de administrador definidas para probar el sistema con privilegios aislados son:

| Región de Operación | Nombre de usuario | Contraseña | Alcance de Acceso |
| :--- | :--- | :--- | :--- |
| **Operación Turquía** | `admin.tr` | `admin` | Solo productos y cuentas corrientes de TR. |
| **Operación Rusia** | `admin.ru` | `admin` | Solo logística y stock de RU. |
| **Operación Dubái** | `admin.du` | `admin` | Datos del mercado de Oriente Medio. |

> **Nota:** Al iniciar sesión con cada usuario, aunque los módulos en el menú de la izquierda parezcan los mismos, se verá que los datos internos (Lista de productos, Lista de clientes) son completamente diferentes.

## 7. Conclusión

El proyecto AJ International es una solución SaaS moderna con una estructura RBAC que no compromete la seguridad, un front-end Next.js de alto rendimiento y una arquitectura de base de datos MongoDB flexible.

El sistema actualmente está sirviendo activamente no solo como un entorno de registro de datos, sino como una plataforma integrada donde se toman decisiones operativas y se proporciona aislamiento de datos entre regiones con certeza matemática.