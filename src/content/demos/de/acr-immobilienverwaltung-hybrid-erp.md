---
title: "ACR Immobilienverwaltung: Hybride Desktop- & Cloud-ERP-Architektur"
category: "Desktop & Cloud Architecture"
description: "Ein Managementsystem, entwickelt mit Electron.js, React und Spring Boot für die kollektive Immobilienverwaltung, mit Funktionen für asynchrone Belastung und Finanzberichterstattung. Zugangsdaten unten."
date: "2025-12-14"
image: "/portfolio/site.png"
author: "Systemarchitekt"
---

# Hybride Architektur in der kollektiven Gebäude- und Anlagenverwaltung: ACR Immobilienverwaltungssystem

**Projekt:** ACR Immobilienverwaltungssystem

**Zugriffsadresse:** [app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)

**Dokumententyp:** Technische Architekturanalyse und Systemüberprüfung



## Zusammenfassung (Abstract)

Das ACR Immobilienverwaltungssystem wurde entwickelt, um die finanziellen und administrativen Prozesse von kollektiven Lebensräumen wie Wohnungen, Komplexen und Geschäftszentren zu verwalten.

Das Projekt kombiniert die Flüssigkeit einer Desktop-Anwendung (**Electron.js & React**) in Bezug auf die Benutzererfahrung mit einer Unternehmens-Backend-Architektur (**Spring Boot & MongoDB**) für Datensicherheit und Transaktionsintegrität. Es unterscheidet sich von Standardsoftware insbesondere durch "Storno"-Buchhaltungsprinzipien, asynchrone Massenbelastungsdienste und eine NoSQL-basierte dynamische Berichts-Engine.

## 1. Einführung und Problemfeld

Die Verwaltung von Wohnanlagen wird im Allgemeinen mit Excel-Dateien oder Desktop-Software der alten Generation durchgeführt. Diese Situation führt zu folgenden Problemen:

1.  **Dateninkonsistenz:** Wenn die Schulden einer Wohnung gelöscht werden, wird das Schicksal des Geldes in der Kasse unklar (Fehlen eines Audit Trails).
2.  **Leistungsprobleme:** In einem Komplex mit Hunderten von Wohnungen kann das Hinzufügen von Beitragsschulden für alle mit einem einzigen Klick die Systeme blockieren.
3.  **Mangelnde Flexibilität:** Außer festen Ausgaben können außergewöhnliche Ausgaben wie "Dachreparatur" nicht sofort auf die Wohnungseigentümer umgelegt werden.

ACR Immobilienverwaltung löst diese Probleme mit einem modernen "Event-Driven" (ereignisgesteuerten) und "Asynchronen" Ansatz.

## 2. Systemarchitektur und Technologie-Stack

Das Projekt befindet sich in einer **Client-Server**-Architektur und verwendet auf der Client-Seite eine hybride Struktur.



### 2.1. Backend (Server-Schicht)

Das Gehirn des Systems ist der RESTful API-Dienst, der auf **Spring Boot 3.5** läuft.
* **Datenbank:** **MongoDB**. In der Wohnanlagenverwaltung kann sich das Datenschema (Inventareigenschaften, Transaktionstypen) im Laufe der Zeit ändern. Die schemalose Struktur von MongoDB bietet diese Flexibilität.
* **Datenintegrität:** Trotz der Verwendung von NoSQL wird die Einzigartigkeit der Kombination "Block-ID + Türnummer" auf Datenbankebene unter Verwendung von `@CompoundIndex` im `Wohnung`-Modell garantiert.
* **Asynchrone Architektur:** Langlaufende Prozesse (z. B. Schuldenfeststellung für 500 Wohnungen) werden im Hintergrund ausgeführt, ohne den Haupt-Thread zu blockieren, indem die `@Async`-Annotation und die `TaskExecutor`-Struktur von Spring verwendet werden.

### 2.2. Frontend & Desktop (Client-Schicht)

Die Benutzeroberfläche wurde mit **React** und **Material UI (MUI)** entwickelt, mit **Vite** kompiliert und mit **Electron** paketiert.
* **Electron-Integration:** Die mit Webtechnologien (HTML/CSS/JS) entwickelte Oberfläche funktioniert dank Electron wie eine native Desktop-Anwendung (Windows/macOS/Linux).
* **CRUD-Hook-Architektur:** Der auf der Frontend-Seite entwickelte benutzerdefinierte Hook `useCrudApi` verwaltet alle API-Anfragen, Fehlerbehandlung und Ladestatus von einem zentralen Punkt aus.

## 3. Kritische technische Merkmale und Lösungen

"Best Practice"-Anwendungen, die in den Quellcodes des Projekts hervorstechen:

### 3.1. Asynchrone Massenbelastung (Async Processing)
Das gleichzeitige Hinzufügen von Beitragsschulden zu Hunderten von Wohnungen ist ein kostspieliger Vorgang.
* **Problem:** Das Einfrieren des Browsers, wenn der Benutzer auf die Schaltfläche "Belasten" klickt.
* **Lösung:** `@Async` wird in der Klasse `TopluBorclandirmaService.java` verwendet. Während dem Benutzer sofort nach Eingang der Anfrage eine Antwort "202 Accepted" zurückgegeben wird, wird der Vorgang im Hintergrund in einem separaten Thread fortgesetzt.



### 3.2. Finanzielle Integrität und "Storno"-Logik (Audit Trail)
Ein Buchhaltungssatz sollte niemals physisch gelöscht werden.
* **Mechanismus:** In der Stornierungsmethode innerhalb von `FinansalIslemController.java` wird eine fehlerhafte Transaktion nicht gelöscht (sie wird als `isCancelled=true` markiert).
* **Gegenbuchung:** Ein "Korrektursatz" wird automatisch in entgegengesetzter Richtung (Ausgabe bei Einnahme, Einnahme bei Ausgabe) und in gleicher Höhe in das System eingeworfen. Auf diese Weise wird der Kassenbestand mathematisch korrigiert, aber der Transaktionsverlauf geht nicht verloren.



### 3.3. Berichterstattung mit MongoDB Aggregation
Finanzberechnungen, die mit Standardschleifen (for-loop) durchgeführt werden, sind langsam.
* **Lösung:** `Aggregation Pipeline` wird innerhalb von `AidatKaydiRepository` verwendet.
* **Technik:** Anstatt Daten auf die Java-Seite zu ziehen und zu verarbeiten, wird die Berechnung von der Datenbank-Engine (MongoDB) durchgeführt (`$group`, `$sum`, `$cond`). Dies erhöht die Berichtsgeschwindigkeit um das 10- bis 100-fache.

### 3.4. Außerordentliche Ausgabenumlage
Eine der "intelligentesten" Funktionen des Systems.
* Eine in den Kassenbewegungen eingegebene "Ausgabe" (z. B. Aufzugswartung) kann auf Wunsch mit einem einzigen Klick gleichmäßig auf alle Wohnungen aufgeteilt und als "Schuld" umgelegt werden (`BorclandirmaController`).

## 4. Module und Funktionalität



### 4.1. Dashboard und Übersicht
* Das Einnahmen-Ausgaben-Gleichgewicht der letzten 6 Monate wird mit der **Chart.js**-Integration visualisiert.
* Sofortiger Kassenbestand und Belegungsraten werden in Zusammenfassungskarten präsentiert.

### 4.2. Wohnungs- und Blockmanagement
* Wohnungen werden unter den Status "Eigentümer", "Mieter" oder "Leer" verfolgt.
* Kontaktinformationen und Bewohnerhistorie werden aufgezeichnet.

### 4.3. Inventarverwaltung
* Physische Vermögenswerte der Anlage (Rasenmäher, Generator usw.) werden zusammen mit ihrem Status (In Gebrauch, Defekt, Im Service) verfolgt.

### 4.4. Kassen- und Kontokorrentverfolgung
* Einnahmen- und Ausgabenposten werden kategorisiert (Strom, Wasser, Personal).
* Quittungs- oder Rechnungsverfolgung erfolgt in einer digitalen Umgebung.

## 5. Live-Demo und Zugang

Die Live-Demo-Umgebung, die das Desktop-Erlebnis des Systems über einen Webbrowser simuliert, ist aktiv.

**Demo-Adresse:** [https://app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)
*(Hinweis: Änderungen, die in der Demo-Umgebung vorgenommen wurden, können periodisch zurückgesetzt werden.)*

## 6. Fazit

Das ACR Immobilienverwaltungssystem ist nicht nur eine einfache Software, die Beiträge sammelt; es ist eine moderne ERP-Lösung, die im Hintergrund **Buchhaltungsstandards (Storno)** anwendet, die Datenbankleistung mit **Aggregation** optimiert und die Benutzererfahrung mit **Electron** auf den Desktop bringt.