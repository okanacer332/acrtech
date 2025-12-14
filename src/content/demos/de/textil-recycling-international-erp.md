---
title: "Textilrecycling - Internationales ERP: Multi-Tenant & RBAC Architektur"
category: "SaaS Architecture"
description: "Technische Überprüfung des mandantenfähigen und rollenbasierten Managementsystems, das mit Next.js und Spring Boot für globale Textiloperationen entwickelt wurde. Zugangsdaten unten."
date: "2025-12-12"
image: "/portfolio/22.png"
---

# Mandantenfähiges (Multi-Tenant) und rollenbasiertes (RBAC) integriertes Managementsystem in der globalen Textil-Lieferkette

**Projekt:** AJ International ERP

**Zugriffs-URL:** [app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

**Dokumententyp:** Technische Architektur und Systemanalyse-Artikel

## Zusammenfassung (Abstract)

Dieser Artikel untersucht das cloudbasierte Enterprise-Resource-Planning (ERP)-System, das für den Betrieb von AJ International entwickelt wurde und geografisch verteilte Geschäftsprozesse (Türkei, Russland, Dubai) über eine einzige Kernsoftware steuert.

Die Studie behandelt die "Multi-Tenant"-Architektur (Mandantenfähigkeit), die durch die hybride Nutzung der Technologien **Next.js 14**, **Spring Boot** und **MongoDB** erstellt wurde, sowie den RBAC-Mechanismus (Role-Based Access Control), der im System aktiv arbeitet, mit technischen Details. Das System ist eine verifizierte Softwarelösung, die in einer Live-Umgebung läuft und Datenisolierung gewährleistet, während zentrale Verwaltungsfunktionen erhalten bleiben.

## 1. Einführung

Der Textilsektor benötigt aufgrund seiner variantenreichen Produktstruktur (Farbe, Größe, Stoffart) und grenzüberschreitenden Logistikprozesse ein komplexes Datenmodell.

Das Projekt AJ International hat eine nicht-monolithische, moderne servicebasierte Architektur angenommen, um diese Komplexität zu bewältigen. Das System vereint die Operationen in der Türkei, Russland und Dubai, die jeweils ihre eigenen rechtlichen und kommerziellen Regeln haben, in einer Infrastruktur, die logisch getrennt ist, aber physisch auf einem einzigen Datenbankcluster läuft.

## 2. Systemarchitektur und Technologie-Stack

Das Projekt ist so strukturiert, dass Frontend- und Backend-Schichten gemäß dem Prinzip der "Trennung der Zuständigkeiten" (Separation of Concerns) völlig unabhängig voneinander arbeiten.

### 2.1. Frontend-Architektur (Client-Schicht)

Die Benutzererfahrung baut aufgrund ihrer Server-Side-Rendering (SSR)-Fähigkeit und SEO-Kompatibilität auf der **Next.js 14 (App Router)**-Architektur auf.

* **Komponentenbibliothek:** Unter Verwendung von Shadcn/ui und TailwindCSS wurden wiederverwendbare und leichte UI-Komponenten entwickelt, die den Prinzipien des atomaren Designs entsprechen.

* **State Management:** Komplexe Formulardaten und Benutzersitzungsinformationen werden mit der **Zustand**-Bibliothek im globalen State verwaltet.

* **Data Fetching:** Die Datensynchronisation zwischen Server und Client wurde optimiert und Netzwerkanfragen wurden mit SWR- oder TanStack Query-Mustern minimiert.

### 2.2. Backend-Architektur (Server-Schicht)

Die Geschäftslogik (Business Logic) läuft auf **Spring Boot 3.x**, dem Standard des Java-Unternehmensökosystems.

* **Datenbank:** **MongoDB (NoSQL)**. Die hierarchische und variable Struktur von Textilprodukten (z. B. ein Produkt mit N Farbvarianten und jede Variante mit M Größenbeständen) machte eine dokumentenorientierte Struktur anstelle von relationalen Datenbanken erforderlich.

* **API Gateway:** Alle Anfragen werden über Endpunkte (Endpoints) bedient, die gemäß RESTful API-Standards entworfen wurden.

## 3. Sicherheitsarchitektur und Zugriffskontrolle

Die Sicherheitsschicht des Systems ist eine derzeit aktive Struktur, die nicht nur die Authentifizierung, sondern auch eine detaillierte Autorisierung abdeckt.

### 3.1. Rollenbasierte Zugriffskontrolle (RBAC)

Im System greifen Benutzer gemäß ihren zugewiesenen Rollen auf bestimmte Ressourcen zu. Diese Struktur arbeitet in der Spring Security Filter Chain mit folgender Logik:

> Permission(u) = Union( Roles(u) -> Permissions(r) )

Im System wird aktiv folgende Hierarchie angewendet:

* **Super Admin (Root):** Befugnis zur Verwaltung aller Mandanten (Länder) und Konfigurationen.

* **Länder-Admin (Tenant Admin):** Verwaltet nur Benutzer, Bestände und Finanzen im eigenen Land (z. B. TR, RU oder DU). Kann Daten anderer Länder nicht sehen.

* **Operativer Benutzer:** Hat nur Befugnis zur Dateneingabe und -anzeige; Lösch- oder Konfigurationsbefugnisse sind eingeschränkt.

### 3.2. Authentifizierung (JWT & HttpOnly)

Das System verfügt über eine "Stateless"-Architektur (zustandslos).

1.  Wenn sich der Benutzer anmeldet, generiert der Server ein signiertes **JWT (JSON Web Token)**.

2.  Dieses Token wird in einem **HttpOnly Cookie** gespeichert, auf das clientseitig nicht mit JavaScript zugegriffen werden kann. Diese Methode bietet vollen Schutz vor XSS-Angriffen (Cross-Site Scripting).

## 4. Mandantenfähigkeit (Multi-Tenancy) und Datenisolierung

Das System verwendet die Strategie der **"Diskriminatorspalte"** (Discriminator Column), nicht "Database-per-Schema", bei der eine einzige Softwareinstanz mehrere Organisationen bedient.

* **Tenant Context:** Jede HTTP-Anfrage wird von einem Interceptor abgefangen.

* **Datenfilterung:** Die `tenant_id` (z. B. tr, ru, du) wird aus dem Anforderungsheader (Header) oder dem Profil des angemeldeten Benutzers gelesen.

* **MongoDB-Abfrage:** Das Backend fügt automatisch das Kriterium `{ tenant: "current_tenant" }` zu jeder Abfrage hinzu, die an die Datenbank geht. Auf diese Weise ist es technisch unmöglich gemacht worden, dass ein Russland-Benutzer durch Manipulation der API auf Türkei-Daten zugreift.

## 5. Modul- und Funktionsdetails

Das AJ International-System besteht aus den folgenden Hauptmodulen, die Textiloperationen End-to-End verwalten:

### 5.1. Dashboard und Verwaltungspanel

Der Bildschirm, auf den der Benutzer zuerst trifft, wird dynamisch entsprechend der Berechtigungsstufe geformt.

* **KPI-Karten:** Metriken wie Gesamtumsatz, aktive Bestellungen, kritischer Lagerbestand werden sofort berechnet.

* **Grafische Analyse:** Verkaufstrends und Bestandsverteilung werden visualisiert.

### 5.2. Produkt- und Bestandsmanagement (PIM & WMS)

Dieses Modul, das Herzstück des Textilsektors, deckt das Variantenmanagement bis ins kleinste Detail ab.

* **Variantenmatrix:** Unteraufschlüsselungen (SKU) wie Farbe, Größe, Stoffart werden unter einem Hauptprodukt (Parent Product) verwaltet.

* **Warenbewegungen:** Eingangs-, Ausgangs-, Transfer- und Rückgabetransaktionen werden protokolliert. Welches Produkt sich in welchem Lager (TR Lager, RU Lager) befindet und wie viel, wird sofort verfolgt.

### 5.3. Kontokorrent und Kundenbeziehungen (CRM)

Entwickelt für B2B-Operationen.

* **Kundenkarten:** Das Kundenportfolio jedes Landes ist isoliert.

* **Saldenverfolgung:** Schulden-/Guthabenstatus der Kunden und auftragsbezogene Verrechnungstransaktionen werden über das System abgewickelt.

### 5.4. Verkaufs- und Auftragsmanagement

Deckt den Prozess vom Eingang der Bestellung bis zur Lieferung ab.

* **Auftragserstellung:** Bestellformular, das mit Warenkorblogik arbeitet, einschließlich dynamischer Preisgestaltung.

* **Statusmanagement:** Workflow-Verfolgung über die Status "Ausstehend", "Wird vorbereitet", "Versandt", "Geliefert".

## 6. Live-Demo und operative Verifizierung

Die "Multi-Tenant"-Struktur und die RBAC-Fähigkeiten des Systems können in der folgenden Live-Umgebung verifiziert werden. Diese Zugangsdaten beweisen die Isolationsfähigkeit des Systems und die Funktionsfähigkeit der Module.

**Projekt-URL:** [https://app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

Administratorkonten, die definiert wurden, um das System mit isolierten Berechtigungen zu testen, sind:

| Operationsregion | Benutzername | Passwort | Zugriffsumfang |
| :--- | :--- | :--- | :--- |
| **Türkei Operation** | `admin.tr` | `admin` | Nur TR Produkte und Kontokorrente. |
| **Russland Operation** | `admin.ru` | `admin` | Nur RU Logistik und Bestände. |
| **Dubai Operation** | `admin.du` | `admin` | Marktdaten des Nahen Ostens. |

> **Hinweis:** Wenn Sie sich mit jedem Benutzer anmelden, werden Sie sehen, dass die Daten darin (Produktliste, Kundenliste) völlig unterschiedlich sind, obwohl die Module im linken Menü gleich erscheinen.

## 7. Fazit

Das Projekt AJ International ist eine moderne SaaS-Lösung mit einer RBAC-Struktur, die keine Kompromisse bei der Sicherheit eingeht, einem leistungsstarken Next.js-Frontend und einer flexiblen MongoDB-Datenbankarchitektur.

Das System dient derzeit aktiv nicht nur als Datenaufzeichnungsumgebung, sondern als integrierte Plattform, auf der operative Entscheidungen getroffen werden und die regionenübergreifende Datenisolierung mit mathematischer Sicherheit gewährleistet wird.