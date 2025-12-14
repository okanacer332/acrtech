---
title: "FidanYS: Inflationsgeschützte & Mandantenfähige Agrar-ERP-Architektur"
category: "SaaS & AgTech Architecture"
description: "Technische Überprüfung des cloudbasierten Managementsystems, das mit Next.js 15, Spring Boot und MongoDB für die Setzlingsproduktion entwickelt wurde und eine Inflationsbuchhaltung integriert. Zugangsdaten unten."
date: "2025-12-14"
image: "/portfolio/fidan.png"
author: "Systemarchitekt"
---

# Integrierte Ressourcenplanung für moderne Landwirtschaft: FidanYS Technische Analyse

**Projekt:** Setzlingsmanagementsystem (FidanYS)

**Zugriffs-URL:** [app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr)

**Dokumententyp:** Technische Architekturanalyse und Systemvorstellung

## Zusammenfassung (Abstract)

Diese technische Übersicht behandelt das Projekt **FidanYS**, das entwickelt wurde, um die komplexen Bestandsstrukturen (lebender Bestand) und Finanzprozesse von Unternehmen zu verwalten, die in der Setzlingsproduktion und im Handel tätig sind.

Das System löst die Verfolgung von "lebenden Produkten", bei der Standard-ERP-Software versagt, durch die Verwendung von **Spring Boot** und der flexiblen Schemastruktur von **MongoDB**; es bietet mit **Next.js 15** eine leistungsstarke Benutzererfahrung. Das markanteste Merkmal des Projekts ist das Modul für finanzielle Intelligenz, das Unternehmen durch die Anwendung der **Inflationsbuchhaltung** über die Integration der Zentralbank (TCMB) vor Kapitalerosion schützt.

## 1. Einführung und Problemfeld

Die landwirtschaftliche Produktion, insbesondere die Setzlingszucht, kann nicht mit der Standardlogik von E-Commerce oder Einzelhandelsbeständen verwaltet werden. Die Haupthindernisse für die Digitalisierung in diesem Sektor sind:

1.  **Zusammengesetzte Produktidentität:** Ein Setzling kann nicht durch eine einzige SKU (Artikelnummer) definiert werden. Eine Kombination aus 6 verschiedenen Parametern wie Art, Sorte, Unterlage, Größe, Alter und Topfstatus bildet die Identität des Produkts.
2.  **Produktionsprozesse:** Kosten (Arbeit, Dünger), die während des 1-3-jährigen Prozesses vom Samen bis zur Setzlingsbildung anfallen, müssen korrekt in den Endproduktkosten abgebildet werden.
3.  **Wirtschaftliche Unsicherheit:** In Umgebungen mit hoher Inflation führt der Verkauf eines vor Monaten produzierten Produkts zu historischen Kosten zu Verlusten für das Unternehmen.

FidanYS ist eine SaaS-Lösung (Software as a Service), die nach den Prinzipien des "Domain-Driven Design" entwickelt wurde, um diese Probleme zu lösen.

## 2. Technologie-Stack und Systemarchitektur

Das System ist in einer **Full-Stack**- und **Monorepo**-ähnlichen Struktur (Client und Server getrennt, aber integriert) aufgebaut, um Skalierbarkeits- und Sicherheitsanforderungen zu erfüllen.

### 2.1. Frontend-Architektur (Client)

Die Benutzeroberfläche läuft auf **Next.js 15 (App Router)**, der aktuellsten Version moderner Webstandards.

* **Typsicherheit:** Das Projekt wurde zu 100% mit **TypeScript** entwickelt, was Laufzeitfehler minimiert.
* **UI-Bibliothek:** Mit **Material UI (MUI v7)** wurde eine responsive, barrierefreie Oberfläche mit Themenunterstützung (Dark/Light Mode) bereitgestellt.
* **State & Cache:** Für das Datenmanagement wird die Bibliothek **SWR (Stale-While-Revalidate)** verwendet. Diese Strategie stellt sicher, dass der Benutzer Daten sofort sieht (Cache), während im Hintergrund die Aktualität der Daten geprüft wird.
* **Formularvalidierung:** Komplexe Dateneingaben werden sowohl auf Client- als auch auf Serverseite mit **React Hook Form** und **Zod**-Schemata validiert.

### 2.2. Backend-Architektur (Server)

Die Geschäftslogikschicht baut auf **Spring Boot 3.x (Java 17+)** auf, dem Standard für Unternehmenszuverlässigkeit.

* **Datenbankwahl: MongoDB (NoSQL).**
    * *Warum NoSQL?* Die Attribute von Setzlingen sind variabel. Anstelle der starren Tabellenstruktur von SQL werden Produktmerkmale als dynamische und eingebettete Objekte unter Verwendung der dokumentbasierten Struktur von MongoDB gespeichert.
* **API-Strategie:** Es wurde eine ressourcenorientierte API-Architektur etabliert, die vollständig den **RESTful**-Standards entspricht.
* **Integration externer Dienste:** Tägliche Inflationsdaten und Wechselkurse fließen automatisch über eine sichere Verbindung zum CBRT EVDS API-Dienst in das System ein.

## 3. Mandantenfähige (Multi-Tenancy) Architektur

FidanYS arbeitet im Modell "Software as a Service", bei dem eine einzige Anwendungsinstanz mehrere Unternehmen bedient.

* **Mandantenisolierung:** Jedes kritische Dokument (Bestellung, Bestand, Kontokorrent usw.) in der Datenbank verfügt über ein Feld `tenantId`.
* **Automatische Filterung:** Interceptoren, die auf Spring Data/Security-Ebene im Backend laufen, bestimmen, von welchem Unternehmen (Mandant) die eingehende Anfrage stammt.
    * Die `tenantId`-Informationen innerhalb des `AuthenticationService` und JWT werden gelesen.
    * Das Kriterium `{ tenantId: "active_tenant" }` wird automatisch zu allen Datenbankabfragen hinzugefügt.
    * Diese Architektur macht es mathematisch unmöglich, dass Daten von Firma A von Firma B eingesehen werden können.

## 4. Kritische funktionale Module

Die Hauptmodule, die das System von seinen Wettbewerbern unterscheiden, sind:

### 4.1. Intelligentes Bestands- und Variationsmanagement
Produkte im System sind keine einfachen Zeilen. Es arbeitet mit der Logik von "Produktfamilie" und "Variationen".
* **Variationsmatrix:** Wenn Benutzer beispielsweise die Art "Walnuss" auswählen, präsentiert das System automatisch mögliche Sorten (Chandler, Fernor) und Größen als Matrix.
* **Standortbezogene Verfolgung:** Es wird sofort überwacht, auf welcher Parzelle oder in welchem Lager sich der Setzling befindet.

### 4.2. Inflationsbuchhaltung und finanzielle Intelligenz
Dies ist die technischste und strategischste Schicht des Projekts.
* **Reale Bewertung:** `InflationService` berechnet den aktuellen "realen" Wert einer in der Vergangenheit getätigten Ausgabe.
* **Kostenanalyse:** Bei der Ermittlung des Verkaufspreises eines Setzlings schlägt das System einen "Kapitalschutzpreis" vor, indem nicht nur der Einkaufspreis auf der Rechnung, sondern auch die Inflationsrate, die seit diesem Datum bis heute eingetreten ist, zu den Kosten addiert wird.

### 4.3. Produktionschargen (Batches)
Die Verfolgung erfolgt auf Basis von "Chargen" (Batches), entsprechend der Natur der landwirtschaftlichen Produktion.
* Ein `ProductionBatch` wird erstellt, wenn ein Samen gesät wird.
* Alle Düngungs- und Bewässerungskosten für diese Charge werden im `CostPool` (Kostenpool) gesammelt.
* Wenn die Erntezeit kommt, werden die Gesamtkosten im Pool durch die Anzahl der produzierten Setzlinge geteilt, um die **realen Stückkosten** zu berechnen.

## 5. Sicherheit und Autorisierung

Die Anwendungssicherheit wird nach dem Prinzip der "Defense in Depth" (Tiefenverteidigung) gewährleistet.

* **Authentifizierung:** JWT (JSON Web Token) basierte, zustandslose Authentifizierung.
* **Verschlüsselung:** Benutzerpasswörter werden mit dem **BCrypt**-Algorithmus gehasht gespeichert.
* **RBAC (Rollenbasierte Zugriffskontrolle):**
    * `ADMIN`: Hat alle Befugnisse.
    * `SALES`: Kann nur Bestellungen und Kontokorrente sehen, keine Kosten.
    * `WAREHOUSE`: Kann nur Lagerein- und -ausgänge vornehmen, keine Geldwerte sehen.
* **Einzelsitzung:** Wenn sich ein Benutzer von einem anderen Gerät aus anmeldet, wird seine alte Sitzung aus Sicherheitsgründen beendet (`forceLogin`-Mechanismus).

## 6. Live-System und Zugang

Es ist möglich, die Architektur, Datenstruktur und Finanzberichtsfähigkeiten des Systems in einer Live-Umgebung zu testen.

| Zugriffs-URL | Benutzername | Passwort | Hinweis |
| :--- | :--- | :--- | :--- |
| **[https://app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr/auth/sign-in)** | `admin` | `admin` | Demo-Konto mit vollen Rechten. |

*Transaktionen, die in der Demo-Umgebung getätigt werden, gelten als Testdaten und können periodisch zurückgesetzt werden.*

## 7. Fazit

FidanYS bietet eine zielgenaue Lösung für den Bedarf des Agrarsektors an "digitaler Transformation", indem es die Stabilität des Java-Ökosystems mit der Modernität von Next.js kombiniert. Insbesondere mit dem Modul **Inflationsbuchhaltung** geht es über ein reines Bestandsverfolgungsprogramm hinaus und hat sich zu einem strategischen Entscheidungsunterstützungssystem für Unternehmensinhaber entwickelt.