---
title: "FidanYS: Arquitectura ERP Agrícola Multi-Inquilino y Protegida contra la Inflación"
category: "SaaS & AgTech Architecture"
description: "Revisión técnica del sistema de gestión basado en la nube desarrollado con Next.js 15, Spring Boot y MongoDB para procesos de producción de plantones, integrado con contabilidad de inflación. Detalles de acceso a continuación."
date: "2025-12-14"
image: "/portfolio/fidan.png"
author: "Arquitecto de Sistemas"
---

# Planificación Integrada de Recursos para la Agricultura Moderna: Análisis Técnico de FidanYS

**Proyecto:** Sistema de Gestión de Viveros (FidanYS)

**URL de Acceso:** [app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr)

**Tipo de Documento:** Análisis de Arquitectura Técnica e Introducción al Sistema

## Resumen (Abstract)

Esta revisión técnica cubre el proyecto **FidanYS**, diseñado para gestionar las complejas estructuras de inventario (stock vivo) y los procesos financieros de las empresas dedicadas a la producción y el comercio de plantones.

Al tiempo que resuelve el seguimiento de "productos vivos", donde el software ERP estándar se queda corto, utilizando **Spring Boot** y la estructura de esquema flexible de **MongoDB**; ofrece una experiencia de usuario de alto rendimiento con **Next.js 15**. La característica más distintiva del proyecto es el módulo de inteligencia financiera que protege a las empresas contra la erosión del capital aplicando **Contabilidad de Inflación** a través de la integración del CBRT (Banco Central).

## 1. Introducción y Espacio del Problema

La producción agrícola, especialmente el cultivo de plantones, no puede gestionarse con la lógica estándar de inventario de comercio electrónico o minorista. Los principales obstáculos para la digitalización en el sector son:

1.  **Identidad de Producto Compuesto:** Un plantón no puede definirse por un solo SKU. Una combinación de 6 parámetros diferentes como Especie, Variedad, Portainjerto, Tamaño, Edad y Estado de la maceta constituye la identidad del producto.
2.  **Procesos de Producción:** Los gastos (mano de obra, fertilizantes) incurridos durante el proceso de 1 a 3 años desde la semilla hasta la formación del plantón deben reflejarse correctamente en el costo final del producto.
3.  **Incertidumbre Económica:** En entornos de alta inflación, vender un producto producido hace meses a su costo histórico hace que la empresa sufra pérdidas.

FidanYS es una solución SaaS (Software as a Service) desarrollada con principios de "Domain-Driven Design" para resolver estos problemas.

## 2. Pila Tecnológica y Arquitectura del Sistema

El sistema está estructurado en una estructura **Full-Stack** y tipo **Monorepo** (Cliente y Servidor separados pero integrados) para cumplir con los requisitos de escalabilidad y seguridad.

### 2.1. Arquitectura Frontend (Cliente)

La interfaz de usuario se ejecuta en **Next.js 15 (App Router)**, la versión más actualizada de los estándares web modernos.

* **Seguridad de Tipos:** El proyecto está desarrollado con 100% **TypeScript**, minimizando los errores en tiempo de ejecución.
* **Biblioteca de UI:** Se proporciona una interfaz receptiva y accesible con soporte de temas (modo Oscuro/Claro) utilizando **Material UI (MUI v7)**.
* **Estado y Caché:** Se utiliza la biblioteca **SWR (Stale-While-Revalidate)** para la gestión de datos. Esta estrategia asegura que el usuario vea los datos al instante (caché) mientras verifica la frescura de los datos en segundo plano.
* **Validación de Formularios:** Las entradas de datos complejas se validan tanto en el lado del cliente como en el del servidor con esquemas **React Hook Form** y **Zod**.

### 2.2. Arquitectura Backend (Servidor)

La capa de lógica de negocios está construida sobre **Spring Boot 3.x (Java 17+)**, el estándar de confiabilidad empresarial.

* **Elección de Base de Datos: MongoDB (NoSQL).**
    * *¿Por qué NoSQL?* Los atributos de los plantones son variables. En lugar de la estructura de tabla rígida de SQL, las características del producto se almacenan como objetos dinámicos e incrustados utilizando la estructura basada en documentos de MongoDB.
* **Estrategia de API:** Se ha establecido una arquitectura de API orientada a recursos que cumple totalmente con los estándares **RESTful**.
* **Integración de Servicios Externos:** Los datos diarios de inflación y los tipos de cambio fluyen automáticamente al sistema a través de una conexión segura establecida con el servicio API EVDS del CBRT.

## 3. Arquitectura Multi-Inquilino (Multi-Tenancy)

FidanYS está en un modelo de "Software as a Service" donde una sola instancia de aplicación sirve a múltiples empresas.

* **Aislamiento de Inquilinos:** Cada documento crítico (Pedido, Stock, Cuenta Corriente, etc.) en la base de datos tiene un campo `tenantId`.
* **Filtrado Automático:** Los interceptores que se ejecutan a nivel de Spring Data/Security en la capa backend determinan de qué empresa (Inquilino) proviene la solicitud entrante.
    * Se lee la información del `tenantId` dentro de `AuthenticationService` y JWT.
    * El criterio `{ tenantId: "active_tenant" }` se agrega automáticamente a todas las consultas de la base de datos.
    * Esta arquitectura hace matemáticamente imposible que los datos de la Empresa A sean vistos por la Empresa B.

## 4. Módulos Funcionales Críticos

Los principales módulos que distinguen al sistema de sus competidores son:

### 4.1. Gestión Inteligente de Stock y Variaciones
Los productos en el sistema no son filas simples. Funciona con la lógica de "Familia de Productos" y "Variaciones".
* **Matriz de Variaciones:** Cuando los usuarios seleccionan la especie "Nogal", por ejemplo, el sistema presenta automáticamente las posibles variedades (Chandler, Fernor) y tamaños como una matriz.
* **Seguimiento Basado en Ubicación:** Se monitorea instantáneamente en qué parcela o almacén se encuentra el plantón.

### 4.2. Contabilidad de Inflación e Inteligencia Financiera
Esta es la capa más técnica y estratégica del proyecto.
* **Valoración Real:** `InflationService` calcula el valor "Real" actual de un gasto realizado en el pasado.
* **Análisis de Costos:** Al determinar el precio de venta de un plantón, el sistema sugiere un "Precio de Protección de Capital" sumando no solo el precio de compra en la factura, sino también la tasa de inflación que ha ocurrido desde esa fecha hasta el presente al costo.

### 4.3. Lotes de Producción (Batches)
El seguimiento se realiza sobre una base de "Lote" de acuerdo con la naturaleza de la producción agrícola.
* Se crea un `ProductionBatch` cuando se siembra una semilla.
* Todos los costos de fertilización y riego para ese lote se recopilan en el `CostPool`.
* Cuando llega el momento de la cosecha, el costo total en el grupo se divide por la cantidad de plantones producidos para calcular el **Costo Unitario Real**.

## 5. Seguridad y Autorización

La seguridad de la aplicación se proporciona con el principio de "Defensa en Profundidad".

* **Autenticación:** Autenticación sin estado basada en JWT (JSON Web Token).
* **Cifrado:** Las contraseñas de usuario se almacenan con hash utilizando el algoritmo **BCrypt**.
* **RBAC (Control de Acceso Basado en Roles):**
    * `ADMIN`: Tiene todas las autoridades.
    * `SALES`: Solo puede ver pedidos y cuentas corrientes, no puede ver costos.
    * `WAREHOUSE`: Solo puede realizar entradas y salidas de stock, no puede ver valores monetarios.
* **Sesión Única:** Cuando un usuario inicia sesión desde un dispositivo diferente, su sesión anterior se termina por seguridad (mecanismo `forceLogin`).

## 6. Sistema en Vivo y Acceso

Es posible probar la arquitectura, la estructura de datos y las capacidades de informes financieros del sistema en un entorno en vivo.

| URL de Acceso | Nombre de usuario | Contraseña | Nota |
| :--- | :--- | :--- | :--- |
| **[https://app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr/auth/sign-in)** | `admin` | `admin` | Cuenta demo con autoridad completa. |

*Las transacciones realizadas en el entorno de demostración se consideran datos de prueba y pueden restablecerse periódicamente.*

## 7. Conclusión

FidanYS ofrece una solución precisa a la necesidad de "transformación digital" del sector agrícola al combinar la estabilidad del ecosistema Java con la modernidad de Next.js. Especialmente con el módulo de **Contabilidad de Inflación**, ha ido más allá de ser solo un programa de seguimiento de stock y se ha transformado en un sistema de apoyo a la toma de decisiones estratégicas para los propietarios de empresas.