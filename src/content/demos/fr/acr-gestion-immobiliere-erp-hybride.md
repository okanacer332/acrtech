---
title: "Gestion Immobilière ACR : Architecture ERP Hybride Bureau & Cloud"
category: "Desktop & Cloud Architecture"
description: "Système de gestion développé avec Electron.js, React et Spring Boot pour la gestion collective de propriétés, doté de capacités de débit asynchrone et de reporting financier. Détails d'accès ci-dessous."
date: "2025-12-14"
image: "/portfolio/site.png"
author: "Architecte Système"
---

# Architecture Hybride dans la Gestion Collective de Structures et d'Installations : Système de Gestion Immobilière ACR

**Projet :** Système de Gestion Immobilière ACR

**Adresse d'Accès :** [app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)

**Type de Document :** Analyse de l'Architecture Technique et Revue du Système



## Résumé (Abstract)

Le Système de Gestion Immobilière ACR est conçu pour gérer les processus financiers et administratifs des espaces de vie collectifs tels que les appartements, les complexes et les centres d'affaires.

Le projet combine la fluidité d'une application de bureau (**Electron.js & React**) en termes d'expérience utilisateur avec l'architecture backend d'entreprise (**Spring Boot & MongoDB**) pour la sécurité des données et l'intégrité des transactions. Il se distingue des logiciels standards spécifiquement par les principes comptables "Storno", les services de débit de masse asynchrone et un moteur de reporting dynamique basé sur NoSQL.

## 1. Introduction et Espace du Problème

Les gestions de sites sont généralement gérées avec des fichiers Excel ou des logiciels de bureau d'ancienne génération. Cette situation conduit aux problèmes suivants :

1.  **Incohérence des Données :** Lorsqu'une dette d'appartement est supprimée, le sort de l'argent dans la caisse devient incertain (Manque de Piste d'Audit).
2.  **Problèmes de Performance :** Dans un complexe avec des centaines d'appartements, l'ajout d'une dette de cotisation à tout le monde en un seul clic peut bloquer les systèmes.
3.  **Manque de Flexibilité :** Outre les dépenses fixes, les dépenses extraordinaires comme la "Réparation de Toiture" ne peuvent pas être instantanément répercutées sur les propriétaires d'appartements.

La Gestion Immobilière ACR résout ces problèmes avec une approche moderne "Pilotée par les Événements" et "Asynchrone".

## 2. Architecture du Système et Pile Technologique

Le projet est dans une architecture **Client-Serveur** et utilise une structure hybride côté client.



### 2.1. Backend (Couche Serveur)

Le cerveau du système est le service API RESTful fonctionnant sur **Spring Boot 3.5**.
* **Base de Données :** **MongoDB**. Dans la gestion de site, le schéma de données (propriétés des équipements, types de transactions) peut changer avec le temps. La structure sans schéma (schemaless) de MongoDB offre cette flexibilité.
* **Intégrité des Données :** Malgré l'utilisation de NoSQL, l'unicité de la combinaison "ID de Bloc + N° de Porte" est garantie au niveau de la base de données en utilisant `@CompoundIndex` dans le modèle `Flat`.
* **Architecture Asynchrone :** Les processus de longue durée (par exemple, accumuler une dette pour 500 appartements) sont exécutés en arrière-plan sans bloquer le thread principal en utilisant l'annotation `@Async` et la structure `TaskExecutor` de Spring.

### 2.2. Frontend & Bureau (Couche Client)

L'interface utilisateur est développée avec **React** et **Material UI (MUI)**, compilée avec **Vite** et empaquetée avec **Electron**.
* **Intégration Electron :** L'interface développée avec des technologies web (HTML/CSS/JS) fonctionne comme une application de bureau native (Windows/macOS/Linux) grâce à Electron.
* **Architecture de Hook CRUD :** Le hook personnalisé `useCrudApi` développé côté frontend gère toutes les requêtes API, la gestion des erreurs et les états de chargement depuis un point central.

## 3. Caractéristiques Techniques Critiques et Solutions

Applications de "Meilleures Pratiques" se distinguant dans les codes sources du projet :

### 3.1. Débit de Masse Asynchrone (Async Processing)
L'ajout d'une dette de cotisation à des centaines d'appartements en même temps est une opération coûteuse.
* **Problème :** Le gel du navigateur lorsque l'utilisateur clique sur le bouton "Débiter".
* **Solution :** `@Async` est utilisé dans la classe `TopluBorclandirmaService.java`. Alors qu'une réponse "202 Accepted" est renvoyée à l'utilisateur dès la réception de la demande, le processus continue en arrière-plan sur un thread séparé.



### 3.2. Intégrité Financière et Logique "Storno" (Piste d'Audit)
Un enregistrement comptable ne doit jamais être supprimé physiquement.
* **Mécanisme :** Dans la méthode d'annulation à l'intérieur de `FinansalIslemController.java`, une transaction erronée n'est pas supprimée (elle est marquée `isCancelled=true`).
* **Enregistrement Inverse :** Un "Enregistrement de Correction" est automatiquement lancé dans le système dans la direction opposée (Dépense si Revenu, Revenu si Dépense) et pour le même montant. De cette façon, le solde de caisse est mathématiquement corrigé, mais l'historique des transactions n'est pas perdu.



### 3.3. Reporting avec MongoDB Aggregation
Les calculs financiers effectués avec des boucles standard (for-loop) sont lents.
* **Solution :** `Aggregation Pipeline` est utilisé dans `AidatKaydiRepository`.
* **Technique :** Au lieu d'extraire des données côté Java et de les traiter, le calcul est effectué par le moteur de base de données (MongoDB) (`$group`, `$sum`, `$cond`). Cela augmente la vitesse de reporting de 10x à 100x.

### 3.4. Répercussion des Dépenses Extraordinaires
L'une des fonctionnalités les plus "intelligentes" du système.
* Une "Dépense" saisie dans les mouvements de caisse (par exemple, Maintenance d'Ascenseur) peut être divisée également entre tous les appartements et répercutée comme "Dette" en un seul clic si désiré (`BorclandirmaController`).

## 4. Modules et Fonctionnalités



### 4.1. Tableau de Bord et Vue d'Ensemble
* L'équilibre Revenus-Dépenses des 6 derniers mois est visualisé avec l'intégration **Chart.js**.
* Le solde de caisse instantané et les taux d'occupation sont présentés dans des cartes récapitulatives.

### 4.2. Gestion des Appartements et des Blocs
* Les appartements sont suivis sous les statuts "Propriétaire", "Locataire" ou "Vide".
* Les informations de contact et l'historique des résidents sont enregistrés.

### 4.3. Gestion des Équipements
* Les actifs physiques du site (Tondeuse à gazon, Générateur, etc.) sont suivis avec leur statut (En Utilisation, Cassé, En Service).

### 4.4. Suivi de Caisse et de Compte Courant
* Les postes de revenus et de dépenses sont catégorisés (Électricité, Eau, Personnel).
* Le suivi des reçus ou des factures se fait dans un environnement numérique.

## 5. Démo en Direct et Accès

L'environnement de démonstration en direct simulant l'expérience de bureau du système via un navigateur web est actif.

**Adresse de Démo :** [https://app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)
*(Note : Les modifications apportées dans l'environnement de démonstration peuvent être réinitialisées périodiquement.)*

## 6. Conclusion

Le Système de Gestion Immobilière ACR n'est pas seulement un simple logiciel qui collecte des cotisations ; c'est une solution ERP moderne qui applique des **normes comptables (Storno)** en arrière-plan, optimise les performances de la base de données avec **Aggregation** et porte l'expérience utilisateur sur le bureau avec **Electron**.