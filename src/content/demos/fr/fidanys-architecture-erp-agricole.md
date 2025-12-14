---
title: "FidanYS : Architecture ERP Agricole Multi-Locataire & Protégée contre l'Inflation"
category: "SaaS & AgTech Architecture"
description: "Revue technique du système de gestion basé sur le cloud développé avec Next.js 15, Spring Boot et MongoDB pour les processus de production de jeunes plants, intégré avec la comptabilité d'inflation. Détails d'accès ci-dessous."
date: "2025-12-14"
image: "/portfolio/fidan.png"
author: "Architecte Système"
---

# Planification Intégrée des Ressources pour l'Agriculture Moderne : Analyse Technique de FidanYS

**Projet :** Système de Gestion de Pépinière (FidanYS)

**URL d'Accès :** [app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr)

**Type de Document :** Analyse de l'Architecture Technique et Présentation du Système

## Résumé (Abstract)

Cette revue technique couvre le projet **FidanYS**, conçu pour gérer les structures d'inventaire complexes (stock vivant) et les processus financiers des entreprises engagées dans la production et le commerce de jeunes plants.

Tout en résolvant le suivi des "produits vivants", là où les logiciels ERP standard échouent, en utilisant **Spring Boot** et la structure de schéma flexible de **MongoDB** ; il offre une expérience utilisateur haute performance avec **Next.js 15**. La caractéristique la plus distinctive du projet est le module d'intelligence financière qui protège les entreprises contre l'érosion du capital en appliquant la **Comptabilité d'Inflation** via l'intégration de la CBRT (Banque Centrale).

## 1. Introduction et Espace du Problème

La production agricole, en particulier la culture de jeunes plants, ne peut pas être gérée avec la logique d'inventaire standard du commerce électronique ou de la vente au détail. Les principaux obstacles à la numérisation dans le secteur sont :

1.  **Identité de Produit Composite :** Un jeune plant ne peut pas être défini par un seul SKU. Une combinaison de 6 paramètres différents tels que l'Espèce, la Variété, le Porte-greffe, la Taille, l'Âge et l'État du pot constitue l'identité du produit.
2.  **Processus de Production :** Les dépenses (main-d'œuvre, engrais) engagées au cours du processus de 1 à 3 ans, de la graine à la formation du jeune plant, doivent être correctement reflétées dans le coût final du produit.
3.  **Incertitude Économique :** Dans des environnements à forte inflation, vendre un produit fabriqué il y a des mois à son coût historique entraîne une perte pour l'entreprise.

FidanYS est une solution SaaS (Software as a Service) développée avec les principes du "Domain-Driven Design" pour résoudre ces problèmes.

## 2. Pile Technologique et Architecture du Système

Le système est structuré dans une structure **Full-Stack** et de type **Monorepo** (Client et Serveur séparés mais intégrés) pour répondre aux exigences d'évolutivité et de sécurité.

### 2.1. Architecture Frontend (Client)

L'interface utilisateur fonctionne sur **Next.js 15 (App Router)**, la version la plus récente des standards web modernes.

* **Sécurité de Type :** Le projet est développé à 100 % avec **TypeScript**, minimisant les erreurs d'exécution.
* **Bibliothèque d'UI :** Une interface réactive et accessible avec prise en charge des thèmes (mode Sombre/Clair) est fournie à l'aide de **Material UI (MUI v7)**.
* **État et Cache :** La bibliothèque **SWR (Stale-While-Revalidate)** est utilisée pour la gestion des données. Cette stratégie garantit que l'utilisateur voit les données instantanément (cache) tout en vérifiant la fraîcheur des données en arrière-plan.
* **Validation de Formulaire :** Les saisies de données complexes sont validées à la fois côté client et serveur avec des schémas **React Hook Form** et **Zod**.

### 2.2. Architecture Backend (Serveur)

La couche de logique métier est construite sur **Spring Boot 3.x (Java 17+)**, la norme de fiabilité pour les entreprises.

* **Choix de Base de Données : MongoDB (NoSQL).**
    * *Pourquoi NoSQL ?* Les attributs des jeunes plants sont variables. Au lieu de la structure de table rigide de SQL, les caractéristiques du produit sont stockées sous forme d'objets dynamiques et imbriqués utilisant la structure basée sur des documents de MongoDB.
* **Stratégie API :** Une architecture d'API orientée ressources entièrement conforme aux normes **RESTful** a été établie.
* **Intégration de Services Externes :** Les données d'inflation quotidiennes et les taux de change affluent automatiquement dans le système via une connexion sécurisée établie avec le service API EVDS de la CBRT.

## 3. Architecture Multi-Locataire (Multi-Tenancy)

FidanYS est dans un modèle "Software as a Service" où une seule instance d'application dessert plusieurs entreprises.

* **Isolation des Locataires :** Chaque document critique (Commande, Stock, Compte Courant, etc.) dans la base de données possède un champ `tenantId`.
* **Filtrage Automatique :** Les intercepteurs fonctionnant au niveau Spring Data/Security dans la couche backend déterminent de quelle entreprise (Locataire) provient la demande entrante.
    * Les informations `tenantId` dans `AuthenticationService` et JWT sont lues.
    * Le critère `{ tenantId: "active_tenant" }` est automatiquement ajouté à toutes les requêtes de base de données.
    * Cette architecture rend mathématiquement impossible pour l'Entreprise A de voir les données de l'Entreprise B.

## 4. Modules Fonctionnels Critiques

Les principaux modules qui distinguent le système de ses concurrents sont :

### 4.1. Gestion Intelligente des Stocks et des Variations
Les produits dans le système ne sont pas de simples lignes. Il fonctionne avec la logique de "Famille de Produits" et de "Variations".
* **Matrice de Variations :** Lorsque les utilisateurs sélectionnent l'espèce "Noyer", par exemple, le système présente automatiquement les variétés possibles (Chandler, Fernor) et les tailles sous forme de matrice.
* **Suivi Basé sur la Localisation :** On surveille instantanément dans quelle parcelle ou quel entrepôt se trouve le jeune plant.

### 4.2. Comptabilité d'Inflation et Intelligence Financière
C'est la couche la plus technique et stratégique du projet.
* **Valorisation Réelle :** `InflationService` calcule la valeur "Réelle" actuelle d'une dépense effectuée dans le passé.
* **Analyse des Coûts :** Lors de la détermination du prix de vente d'un jeune plant, le système suggère un "Prix de Protection du Capital" en ajoutant au coût non seulement le prix d'achat sur la facture, mais aussi le taux d'inflation survenu depuis cette date jusqu'à présent.

### 4.3. Lots de Production (Batches)
Le suivi se fait sur une base de "Lot" conformément à la nature de la production agricole.
* Un `ProductionBatch` est créé lorsqu'une graine est semée.
* Tous les coûts de fertilisation et d'irrigation pour ce lot sont collectés dans le `CostPool`.
* Lorsque vient le temps de la récolte, le coût total dans le pool est divisé par le nombre de jeunes plants produits pour calculer le **Coût Unitaire Réel**.

## 5. Sécurité et Autorisation

La sécurité de l'application est assurée selon le principe de "Défense en Profondeur".

* **Authentification :** Authentification sans état basée sur JWT (JSON Web Token).
* **Chiffrement :** Les mots de passe utilisateurs sont stockés hachés avec l'algorithme **BCrypt**.
* **RBAC (Contrôle d'Accès Basé sur les Rôles) :**
    * `ADMIN` : A toutes les autorités.
    * `SALES` : Peut seulement voir les commandes et les comptes courants, ne peut pas voir les coûts.
    * `WAREHOUSE` : Peut seulement effectuer les entrées et sorties de stock, ne peut pas voir les valeurs monétaires.
* **Session Unique :** Lorsqu'un utilisateur se connecte depuis un appareil différent, son ancienne session est terminée pour des raisons de sécurité (mécanisme `forceLogin`).

## 6. Système en Direct et Accès

Il est possible de tester l'architecture, la structure des données et les capacités de reporting financier du système dans un environnement réel.

| URL d'Accès | Nom d'utilisateur | Mot de passe | Note |
| :--- | :--- | :--- | :--- |
| **[https://app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr/auth/sign-in)** | `admin` | `admin` | Compte démo avec autorité complète. |

*Les transactions effectuées dans l'environnement de démonstration sont considérées comme des données de test et peuvent être réinitialisées périodiquement.*

## 7. Conclusion

FidanYS offre une solution précise au besoin de "transformation numérique" du secteur agricole en combinant la stabilité de l'écosystème Java avec la modernité de Next.js. Surtout avec le module de **Comptabilité d'Inflation**, il est allé au-delà d'un simple programme de suivi des stocks et s'est transformé en un système d'aide à la décision stratégique pour les propriétaires d'entreprises.