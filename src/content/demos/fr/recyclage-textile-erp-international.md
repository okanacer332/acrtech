---
title: "Recyclage Textile - ERP International : Architecture Multi-Tenant & RBAC"
category: "SaaS Architecture"
description: "Revue technique du système de gestion multi-locataire et basé sur les rôles développé avec Next.js et Spring Boot pour les opérations textiles mondiales. Détails d'accès ci-dessous."
date: "2025-12-12"
image: "/portfolio/22.png"
---

# Système de Gestion Intégré Multi-Locataire (Multi-Tenant) et Basé sur les Rôles (RBAC) dans la Chaîne d'Approvisionnement Textile Mondiale

**Projet :** AJ International ERP

**URL d'Accès :** [app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

**Type de Document :** Article d'Architecture Technique et d'Analyse Système

## Résumé (Abstract)

Cet article examine le système de planification des ressources de l'entreprise (ERP) basé sur le cloud développé pour les opérations d'AJ International, gérant des processus commerciaux géographiquement répartis (Turquie, Russie, Dubaï) via un logiciel central unique.

L'étude traite de l'architecture "Multi-Tenant" (Multi-Locataire) créée avec l'utilisation hybride des technologies **Next.js 14**, **Spring Boot** et **MongoDB**, ainsi que du mécanisme RBAC (Contrôle d'Accès Basé sur les Rôles) fonctionnant activement dans le système avec des détails techniques. Le système est une solution logicielle vérifiée fonctionnant dans un environnement réel qui assure l'isolation des données tout en maintenant des capacités de gestion centralisée.

## 1. Introduction

Le secteur textile nécessite un modèle de données complexe en raison de sa structure de produits variée (couleur, taille, type de tissu) et de ses processus logistiques transfrontaliers.

Le projet AJ International a adopté une architecture moderne basée sur des services, non monolithique, pour gérer cette complexité. Le système combine les opérations en Turquie, en Russie et à Dubaï, chacune ayant ses propres règles juridiques et commerciales, dans une infrastructure logiquement séparée mais fonctionnant physiquement sur un cluster de base de données unique.

## 2. Architecture du Système et Pile Technologique

Le projet est structuré de manière à ce que les couches Frontend et Backend fonctionnent de manière totalement indépendante, conformément au principe de "Séparation des Préoccupations" (Separation of Concerns).

### 2.1. Architecture Frontend (Couche Client)

L'expérience utilisateur est construite sur l'architecture **Next.js 14 (App Router)** en raison de sa capacité de rendu côté serveur (SSR) et de sa compatibilité SEO.

* **Bibliothèque de Composants :** Des composants d'interface utilisateur réutilisables et légers conformes aux principes de conception atomique ont été développés à l'aide de Shadcn/ui et TailwindCSS.

* **Gestion d'État :** Les données de formulaires complexes et les informations de session utilisateur sont gérées sur l'état global avec la bibliothèque **Zustand**.

* **Récupération de Données :** La synchronisation des données entre le serveur et le client est optimisée et les requêtes réseau sont minimisées avec les modèles SWR ou TanStack Query.

### 2.2. Architecture Backend (Couche Serveur)

La Logique Métier (Business Logic) fonctionne sur **Spring Boot 3.x**, le standard de l'écosystème Java d'entreprise.

* **Base de Données :** **MongoDB (NoSQL)**. La structure hiérarchique et variable des produits textiles (par exemple, un produit ayant N variantes de couleur et chaque variante ayant M stocks de taille) a nécessité une structure orientée document plutôt que des bases de données relationnelles.

* **Passerelle API :** Toutes les requêtes sont satisfaites via des points de terminaison (endpoints) conçus conformément aux normes API RESTful.

## 3. Architecture de Sécurité et Contrôle d'Accès

La couche de sécurité du système est une structure actuellement active couvrant non seulement l'Authentification mais aussi l'Autorisation détaillée.

### 3.1. Contrôle d'Accès Basé sur les Rôles (RBAC)

Dans le système, les utilisateurs accèdent à des ressources spécifiques en fonction de leurs rôles attribués. Cette structure fonctionne sur la Chaîne de Filtres Spring Security avec la logique suivante :

> Permission(u) = Union( Roles(u) -> Permissions(r) )

La hiérarchie suivante est activement appliquée dans le système :

* **Super Admin (Root) :** Autorité pour gérer tous les locataires (pays) et configurations.

* **Admin Pays (Tenant Admin) :** Gère uniquement les utilisateurs, les stocks et les finances dans son propre pays (par exemple, TR, RU ou DU). Ne peut pas voir les données des autres pays.

* **Utilisateur Opérationnel :** A l'autorité uniquement pour la saisie et la visualisation des données ; l'autorité de suppression ou de configuration est restreinte.

### 3.2. Authentification (JWT & HttpOnly)

Le système a une architecture "Stateless" (sans état).

1.  Lorsque l'utilisateur se connecte, le serveur génère un **JWT (JSON Web Token)** signé.

2.  Ce jeton est stocké dans un **Cookie HttpOnly** inaccessible par JavaScript côté client. Cette méthode offre une protection complète contre les attaques XSS (Cross-Site Scripting).

## 4. Multi-Location et Isolation des Données

Le système utilise la stratégie de **"Colonne Discriminante"** (Discriminator Column), et non "Base de données par schéma" (Database-per-Schema), où une instance logicielle unique dessert plusieurs organisations.

* **Contexte Locataire :** Chaque requête HTTP est capturée par un Intercepteur.

* **Filtrage des Données :** L'`tenant_id` (par exemple, tr, ru, du) est lu à partir de l'en-tête de la requête (Header) ou du profil de l'utilisateur connecté.

* **Requête MongoDB :** Le backend ajoute automatiquement le critère `{ tenant: "current_tenant" }` à chaque requête allant vers la base de données. De cette façon, il est rendu techniquement impossible pour un utilisateur russe d'accéder aux données de la Turquie en manipulant l'API.

## 5. Détails des Modules et Fonctionnalités

Le système AJ International se compose des modules principaux suivants gérant les opérations textiles de bout en bout :

### 5.1. Tableau de Bord et Panneau de Gestion

L'écran que l'utilisateur rencontre en premier est dynamiquement formé en fonction du niveau d'autorisation.

* **Cartes KPI :** Des métriques telles que les ventes totales, les commandes actives, le niveau de stock critique sont calculées instantanément.

* **Analyse Graphique :** Les tendances des ventes et la distribution des stocks sont visualisées.

### 5.2. Gestion des Produits et des Stocks (PIM & WMS)

Ce module, le cœur du secteur textile, couvre la gestion des variantes dans les moindres détails.

* **Matrice de Variantes :** Les sous-catégories (SKU) telles que Couleur, Taille, Type de Tissu sont gérées sous un Produit Parent (Parent Product).

* **Mouvements de Stock :** Les transactions d'entrée, de sortie, de transfert et de retour sont enregistrées. Quel produit se trouve dans quel entrepôt (Entrepôt TR, Entrepôt RU) et en quelle quantité est suivi instantanément.

### 5.3. Compte Courant et Relations Clients (CRM)

Conçu pour les opérations B2B.

* **Fiches Clients :** Le portefeuille client de chaque pays est isolé.

* **Suivi de Solde :** L'état de dette/crédit des clients et les transactions de compensation basées sur les commandes sont effectués via le système.

### 5.4. Gestion des Ventes et des Commandes

Couvre le processus du moment où la commande est reçue jusqu'à la livraison.

* **Création de Commande :** Formulaire de commande fonctionnant avec une logique de panier, incluant une tarification dynamique.

* **Gestion de Statut :** Suivi du flux de travail via les statuts "En attente", "En préparation", "Expédié", "Livré".

## 6. Démo en Direct et Vérification Opérationnelle

La structure "Multi-Tenant" et les capacités RBAC du système peuvent être vérifiées sur l'environnement réel ci-dessous. Ces détails d'accès prouvent la capacité d'isolation du système et l'opérabilité des modules.

**URL du Projet :** [https://app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

Les comptes administrateurs définis pour tester le système avec des privilèges isolés sont :

| Région d'Opération | Nom d'utilisateur | Mot de passe | Portée d'Accès |
| :--- | :--- | :--- | :--- |
| **Opération Turquie** | `admin.tr` | `admin` | Uniquement produits et comptes courants TR. |
| **Opération Russie** | `admin.ru` | `admin` | Uniquement logistique et stocks RU. |
| **Opération Dubaï** | `admin.du` | `admin` | Données du marché du Moyen-Orient. |

> **Note :** En vous connectant avec chaque utilisateur, bien que les modules dans le menu de gauche semblent les mêmes, vous verrez que les données à l'intérieur (Liste des produits, Liste des clients) sont complètement différentes.

## 7. Conclusion

Le projet AJ International est une solution SaaS moderne avec une structure RBAC qui ne compromet pas la sécurité, un front-end Next.js haute performance et une architecture de base de données MongoDB flexible.

Le système sert actuellement activement non seulement d'environnement d'enregistrement de données, mais de plate-forme intégrée où les décisions opérationnelles sont prises et où l'isolation des données interrégionales est assurée avec une certitude mathématique.