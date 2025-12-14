---
title: "Gestión de Fincas ACR: Arquitectura ERP Híbrida de Escritorio y Nube"
category: "Desktop & Cloud Architecture"
description: "Sistema de gestión desarrollado con Electron.js, React y Spring Boot para la gestión colectiva de fincas, con capacidades de adeudo asincrónico e informes financieros. Detalles de acceso a continuación."
date: "2025-12-14"
image: "/portfolio/site.png"
author: "Arquitecto de Sistemas"
---

# Arquitectura Híbrida en la Gestión Colectiva de Estructuras e Instalaciones: Sistema de Gestión de Fincas ACR

**Proyecto:** Sistema de Gestión de Fincas ACR

**Dirección de Acceso:** [app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)

**Tipo de Documento:** Análisis de Arquitectura Técnica y Revisión del Sistema



## Resumen (Abstract)

El Sistema de Gestión de Fincas ACR está diseñado para gestionar los procesos financieros y administrativos de espacios de vida colectivos como apartamentos, complejos y centros de negocios.

El proyecto combina la fluidez de una aplicación de escritorio (**Electron.js & React**) en términos de experiencia de usuario con la arquitectura backend empresarial (**Spring Boot & MongoDB**) para la seguridad de los datos y la integridad de las transacciones. Se distingue del software estándar específicamente con principios de contabilidad "Storno", servicios de adeudo masivo asincrónico y un motor de informes dinámicos basado en NoSQL.

## 1. Introducción y Espacio del Problema

La gestión de fincas se realiza generalmente con archivos de Excel o software de escritorio de vieja generación. Esta situación conduce a los siguientes problemas:

1.  **Inconsistencia de Datos:** Cuando se elimina la deuda de un piso, el destino del dinero en la caja se vuelve incierto (Falta de Pista de Auditoría).
2.  **Problemas de Rendimiento:** En un complejo con cientos de pisos, agregar deuda de cuotas a todos con un solo clic puede bloquear los sistemas.
3.  **Falta de Flexibilidad:** Aparte de los gastos fijos, los gastos extraordinarios como "Reparación de Techo" no pueden reflejarse instantáneamente a los propietarios de los pisos.

La Gestión de Fincas ACR resuelve estos problemas con un enfoque moderno "Event-Driven" (impulsado por eventos) y "Asincrónico".

## 2. Arquitectura del Sistema y Pila Tecnológica

El proyecto tiene una arquitectura **Cliente-Servidor** y utiliza una estructura híbrida en el lado del cliente.



### 2.1. Backend (Capa Servidor)

El cerebro del sistema es el servicio API RESTful que se ejecuta en **Spring Boot 3.5**.
* **Base de Datos:** **MongoDB**. En la gestión de fincas, el esquema de datos (propiedades de accesorios, tipos de transacciones) puede cambiar con el tiempo. La estructura sin esquema (schemaless) de MongoDB proporciona esta flexibilidad.
* **Integridad de Datos:** A pesar de usar NoSQL, la unicidad de la combinación "ID de Bloque + Nº de Puerta" está garantizada a nivel de base de datos utilizando `@CompoundIndex` en el modelo `Flat`.
* **Arquitectura Asincrónica:** Los procesos de larga duración (por ejemplo, acumular deuda a 500 pisos) se ejecutan en segundo plano sin bloquear el hilo principal utilizando la anotación `@Async` y la estructura `TaskExecutor` de Spring.

### 2.2. Frontend y Escritorio (Capa Cliente)

La interfaz de usuario está desarrollada con **React** y **Material UI (MUI)**, compilada con **Vite** y empaquetada con **Electron**.
* **Integración de Electron:** La interfaz desarrollada con tecnologías web (HTML/CSS/JS) funciona como una aplicación de escritorio nativa (Windows/macOS/Linux) gracias a Electron.
* **Arquitectura de Hook CRUD:** El hook personalizado `useCrudApi` desarrollado en el lado frontend gestiona todas las solicitudes de API, el manejo de errores y los estados de carga desde un punto central.

## 3. Características Técnicas Críticas y Soluciones

Aplicaciones de "Mejores Prácticas" que destacan en los códigos fuente del proyecto:

### 3.1. Adeudo Masivo Asincrónico (Async Processing)
Agregar deuda de cuotas a cientos de pisos al mismo tiempo es una operación costosa.
* **Problema:** El navegador se congela cuando el usuario hace clic en el botón "Adeudar".
* **Solución:** Se utiliza `@Async` en la clase `TopluBorclandirmaService.java`. Mientras se devuelve una respuesta "202 Accepted" al usuario tan pronto como se recibe la solicitud, el proceso continúa en segundo plano en un hilo separado.



### 3.2. Integridad Financiera y Lógica "Storno" (Pista de Auditoría)
Un registro contable nunca debe eliminarse físicamente.
* **Mecanismo:** En el método de cancelación dentro de `FinansalIslemController.java`, una transacción errónea no se elimina (se marca `isCancelled=true`).
* **Registro Inverso:** Un "Registro de Corrección" se lanza automáticamente al sistema en la dirección opuesta (Gasto si Ingreso, Ingreso si Gasto) y por la misma cantidad. De esta manera, el saldo de caja se corrige matemáticamente, pero el historial de transacciones no se pierde.



### 3.3. Informes con MongoDB Aggregation
Los cálculos financieros realizados con bucles estándar (for-loop) son lentos.
* **Solución:** Se utiliza `Aggregation Pipeline` dentro de `AidatKaydiRepository`.
* **Técnica:** En lugar de extraer datos al lado de Java y procesarlos, el cálculo lo realiza el motor de la base de datos (MongoDB) (`$group`, `$sum`, `$cond`). Esto aumenta la velocidad de los informes de 10x a 100x.

### 3.4. Reflexión de Gastos Extraordinarios
Una de las características más "inteligentes" del sistema.
* Un "Gasto" ingresado en los movimientos de caja (por ejemplo, Mantenimiento de Ascensor) se puede dividir equitativamente entre todos los pisos y reflejar como "Deuda" con un solo clic si se desea (`BorclandirmaController`).

## 4. Módulos y Funcionalidad



### 4.1. Tablero y Visión General
* El saldo de Ingresos-Gastos de los últimos 6 meses se visualiza con la integración de **Chart.js**.
* El saldo de caja instantáneo y las tasas de ocupación se presentan en tarjetas de resumen.

### 4.2. Gestión de Pisos y Bloques
* Los pisos se rastrean bajo los estados "Propietario", "Inquilino" o "Vacío".
* La información de contacto y el historial de residentes están registrados.

### 4.3. Gestión de Accesorios
* Los activos físicos del sitio (Cortacésped, Generador, etc.) se rastrean junto con su estado (En Uso, Roto, En Servicio).

### 4.4. Seguimiento de Caja y Cuenta Corriente
* Las partidas de ingresos y gastos se categorizan (Electricidad, Agua, Personal).
* El seguimiento de recibos o facturas se realiza en un entorno digital.

## 5. Demostración en Vivo y Acceso

El entorno de demostración en vivo que simula la experiencia de escritorio del sistema a través de un navegador web está activo.

**Dirección de Demostración:** [https://app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)
*(Nota: Los cambios realizados en el entorno de demostración pueden restablecerse periódicamente.)*

## 6. Conclusión

El Sistema de Gestión de Fincas ACR no es solo un software simple que cobra cuotas; es una solución ERP moderna que aplica **estándares contables (Storno)** en segundo plano, optimiza el rendimiento de la base de datos con **Aggregation** y lleva la experiencia del usuario al escritorio con **Electron**.