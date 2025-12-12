---
title: "AJ International ERP: Multi-Tenant & RBAC Mimarisi"
category: "SaaS Architecture"
description: "Küresel tekstil operasyonları için Next.js ve Spring Boot ile geliştirilen çoklu kiracı ve rol tabanlı yönetim sisteminin teknik incelemesi."
date: "2025-12-12"
image: "/portfolio/22.png"
---

# Küresel Tekstil Tedarik Zincirinde Çoklu Kiracı (Multi-Tenant) ve Rol Tabanlı (RBAC) Bütünleşik Yönetim Sistemi

**Proje:** AJ International ERP

**Erişim Adresi:** [app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

**Doküman Tipi:** Teknik Mimari ve Sistem Analiz Makalesi

## Özet (Abstract)

Bu makale, AJ International operasyonları için geliştirilen, coğrafi olarak dağıtık (Türkiye, Rusya, Dubai) iş süreçlerini tek bir çekirdek yazılım üzerinden yöneten bulut tabanlı kurumsal kaynak planlama (ERP) sistemini incelemektedir.

Çalışma, **Next.js 14**, **Spring Boot** ve **MongoDB** teknolojilerinin hibrit kullanımıyla oluşturulan "Multi-Tenant" (Çoklu Kiracı) mimarisini ve sistemde aktif olarak çalışan RBAC (Role-Based Access Control) mekanizmasını teknik detaylarla ele alır. Sistem, veri izolasyonunu sağlarken aynı zamanda merkezi yönetim kabiliyetlerini koruyan, canlı ortamda çalışan doğrulanmış bir yazılım çözümüdür.

## 1. Giriş

Tekstil sektörü, varyantlı ürün yapısı (renk, beden, kumaş tipi) ve sınır ötesi lojistik süreçleri nedeniyle karmaşık bir veri modeline ihtiyaç duyar.

AJ International projesi, bu karmaşıklığı yönetmek adına monolitik olmayan, modern servis tabanlı bir mimari benimsemiştir. Sistem, her biri kendi yasal ve ticari kurallarına sahip olan Türkiye, Rusya ve Dubai operasyonlarını, mantıksal olarak ayrıştırılmış ancak fiziksel olarak tek bir veritabanı kümesi üzerinde çalışan bir altyapıda birleştirir.

## 2. Sistem Mimarisi ve Teknoloji Yığını

Proje, "Separation of Concerns" (İlgi Alanlarının Ayrımı) prensibi gereği Frontend ve Backend katmanlarının tam bağımsız çalıştığı bir yapıda kurgulanmıştır.

### 2.1. Frontend Mimarisi (İstemci Katmanı)

Kullanıcı deneyimi, sunucu tarafı render (SSR) yeteneği ve SEO uyumluluğu nedeniyle **Next.js 14 (App Router)** mimarisi üzerine inşa edilmiştir.

* **Bileşen Kütüphanesi:** Shadcn/ui ve TailwindCSS kullanılarak, atomik tasarım prensiplerine uygun, yeniden kullanılabilir ve hafif UI bileşenleri geliştirilmiştir.

* **State Management:** Karmaşık form verileri ve kullanıcı oturum bilgisi **Zustand** kütüphanesi ile global state üzerinde yönetilmektedir.

* **Veri Fetching:** SWR veya TanStack Query desenleri ile sunucu ile istemci arasındaki veri senkronizasyonu optimize edilmiş, ağ istekleri minimize edilmiştir.

### 2.2. Backend Mimarisi (Sunucu Katmanı)

İş mantığı (Business Logic), kurumsal Java ekosisteminin standardı olan **Spring Boot 3.x** üzerinde çalışmaktadır.

* **Veritabanı:** **MongoDB (NoSQL)**. Tekstil ürünlerinin hiyerarşik ve değişken yapısı (örneğin bir ürünün N adet renk varyantı ve her varyantın M adet beden stoğu olması) ilişkisel veritabanları yerine, doküman tabanlı (document-oriented) bir yapıyı zorunlu kılmıştır.

* **API Gateway:** Tüm istekler RESTful API standartlarına uygun olarak tasarlanmış uç noktalar (endpoints) üzerinden karşılanmaktadır.

## 3. Güvenlik Mimarisi ve Erişim Kontrolü

Sistemin güvenlik katmanı, sadece kimlik doğrulamayı (Authentication) değil, aynı zamanda detaylı yetkilendirmeyi (Authorization) kapsayan, halihazırda aktif bir yapıdır.

### 3.1. Rol Tabanlı Erişim Kontrolü (RBAC)

Sistemde kullanıcılar, atanmış rollerine göre belirli kaynaklara erişim sağlarlar. Bu yapı, Spring Security filtre zinciri (Filter Chain) üzerinde şu mantıkla çalışır:

> Permission(u) = Union( Roles(u) -> Permissions(r) )

Sistemde aktif olarak şu hiyerarşi uygulanmaktadır:

* **Süper Admin (Root):** Tüm tenant'ları (ülkeleri) ve konfigürasyonları yönetme yetkisi.

* **Ülke Admini (Tenant Admin):** Sadece kendi ülkesindeki (örn: TR, RU veya DU) kullanıcıları, stokları ve finansı yönetir. Diğer ülkelerin verisini göremez.

* **Operasyonel Kullanıcı:** Sadece veri girişi ve görüntüleme yetkisine sahiptir, silme veya yapılandırma yetkisi kısıtlıdır.

### 3.2. Kimlik Doğrulama (JWT & HttpOnly)

Sistem, "Stateless" (durumsuz) bir mimariye sahiptir.

1.  Kullanıcı giriş yaptığında sunucu, imzalı bir **JWT (JSON Web Token)** üretir.

2.  Bu token, istemci tarafında JavaScript ile erişilemeyen **HttpOnly Cookie** içerisinde saklanır. Bu yöntem, XSS (Cross-Site Scripting) saldırılarına karşı tam koruma sağlar.

## 4. Çoklu Kiracı (Multi-Tenancy) ve Veri İzolasyonu

Sistem, tek bir yazılım örneğinin (instance) birden fazla organizasyona hizmet verdiği "Database-per-Schema" değil, **"Discriminator Column"** stratejisini kullanır.

* **Tenant Context:** Her HTTP isteği, bir Interceptor (araya giren katman) tarafından yakalanır.

* **Veri Süzme:** İstek başlığından (Header) veya giriş yapan kullanıcının profilinden `tenant_id` (örn: tr, ru, du) okunur.

* **MongoDB Sorgusu:** Backend, veritabanına giden her sorguya otomatik olarak `{ tenant: "current_tenant" }` kriterini ekler. Bu sayede bir Rusya kullanıcısının API'yi manipüle ederek Türkiye verisine erişmesi teknik olarak imkansız hale getirilmiştir.

## 5. Modül ve Fonksiyonel Detaylar

AJ International sistemi, tekstil operasyonlarını uçtan uca yöneten aşağıdaki ana modüllerden oluşmaktadır:

### 5.1. Dashboard ve Yönetim Paneli

Kullanıcının ilk karşılaştığı ekran, yetki seviyesine göre dinamik olarak şekillenir.

* **KPI Kartları:** Toplam satış, aktif sipariş, kritik stok seviyesi gibi metrikler anlık hesaplanır.

* **Grafiksel Analiz:** Satış trendleri ve stok dağılımı görselleştirilir.

### 5.2. Ürün ve Envanter Yönetimi (PIM & WMS)

Tekstil sektörünün kalbi olan bu modül, en ince detayına kadar varyant yönetimini kapsar.

* **Varyant Matrisi:** Bir ana ürün (Parent Product) altında Renk, Beden, Kumaş Tipi gibi alt kırılımlar (SKU) yönetilir.

* **Stok Hareketleri:** Giriş, çıkış, transfer ve iade işlemleri loglanır. Hangi ürünün hangi depoda (TR Depo, RU Depo) ne kadar olduğu anlık takip edilir.

### 5.3. Cari Hesap ve Müşteri İlişkileri (CRM)

B2B operasyonlar için tasarlanmıştır.

* **Müşteri Kartları:** Her ülkenin kendi müşteri portföyü izole edilmiştir.

* **Bakiye Takibi:** Müşterilerin borç/alacak durumları, sipariş bazlı mahsuplaşma işlemleri sistem üzerinden yürütülür.

### 5.4. Satış ve Sipariş Yönetimi

Siparişin alındığı andan teslimata kadar olan süreci kapsar.

* **Sipariş Oluşturma:** Sepet mantığıyla çalışan, dinamik fiyatlandırma içeren sipariş formu.

* **Durum Yönetimi:** "Beklemede", "Hazırlanıyor", "Sevk Edildi", "Teslim Edildi" statüleri üzerinden iş akışı takibi.

## 6. Canlı Demo ve Operasyonel Doğrulama

Sistemin "Multi-Tenant" yapısı ve RBAC yetenekleri, aşağıdaki canlı ortam üzerinde doğrulanabilir durumdadır. Bu erişim bilgileri, sistemin izolasyon yeteneğini ve modüllerin çalışırlığını kanıtlar niteliktedir.

**Proje URL:** [https://app-tekstil.acrtech.com.tr](https://app-tekstil.acrtech.com.tr)

Sistemi test etmek için tanımlanmış, yetkileri izole edilmiş yönetici hesapları şunlardır:

| Operasyon Bölgesi | Kullanıcı Adı | Şifre | Erişim Kapsamı |
| :--- | :--- | :--- | :--- |
| **Türkiye Operasyonu** | `admin.tr` | `admin` | Sadece TR ürünleri ve carileri. |
| **Rusya Operasyonu** | `admin.ru` | `admin` | Sadece RU lojistik ve stokları. |
| **Dubai Operasyonu** | `admin.du` | `admin` | Orta Doğu pazarı verileri. |

> **Not:** Her kullanıcı ile giriş yapıldığında, sol menüdeki modüller aynı görünse de, içerisindeki verilerin (Ürün listesi, Müşteri listesi) tamamen farklı olduğu görülecektir.

## 7. Sonuç

AJ International projesi; güvenlikten ödün vermeyen RBAC yapısı, yüksek performanslı Next.js ön yüzü ve esnek MongoDB veri tabanı mimarisi ile modern bir SaaS çözümüdür.

Sistem, sadece bir veri kayıt ortamı değil, operasyonel kararların alındığı, bölgeler arası veri izolasyonunun matematiksel kesinlikle sağlandığı bütünleşik bir platform olarak şu an aktif hizmet vermektedir.