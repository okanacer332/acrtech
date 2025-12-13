---
title: "FidanYS: Enflasyon Korumalı & Multi-Tenant Tarımsal ERP Mimarisi"
category: "SaaS & AgTech Architecture"
description: "Fidan üretim süreçleri için Next.js 15, Spring Boot ve MongoDB ile geliştirilen, enflasyon muhasebesi entegreli bulut tabanlı yönetim sisteminin teknik incelemesi.Erişim bilgileri aşağıdadır."
date: "2025-12-14"
image: "/portfolio/fidan.png"
author: "Sistem Mimarı"
---

# Modern Tarım İçin Bütünleşik Kaynak Planlama: FidanYS Teknik Analizi

**Proje:** Fidanlık Yönetim Sistemi (FidanYS)

**Erişim Adresi:** [app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr)

**Doküman Tipi:** Teknik Mimari Analizi ve Sistem Tanıtımı

## Özet (Abstract)

Bu teknik inceleme, fidan üretimi ve ticareti yapan işletmelerin karmaşık envanter yapılarını (canlı stok) ve finansal süreçlerini yönetmek için tasarlanan **FidanYS** projesini ele almaktadır.

Sistem, standart ERP yazılımlarının yetersiz kaldığı "yaşayan ürün" takibini, **Spring Boot** ve **MongoDB**'nin esnek şema yapısıyla çözerken; **Next.js 15** ile yüksek performanslı bir kullanıcı deneyimi sunar. Projenin en ayırt edici özelliği, TCMB (Merkez Bankası) entegrasyonu ile **Enflasyon Muhasebesi** uygulayarak, işletmeleri sermaye erimesine karşı koruyan finansal zeka modülüdür.

## 1. Giriş ve Problem Uzayı

Tarımsal üretim, özellikle fidan yetiştiriciliği, standart e-ticaret veya perakende stok mantığıyla yönetilemez. Sektörün dijitalleşmesindeki temel engeller şunlardır:

1.  **Kompozit Ürün Kimliği:** Bir fidan tek bir SKU (Stok Kodu) ile tanımlanamaz. Tür, Çeşit, Anaç, Boy, Yaş ve Saksı durumu gibi 6 farklı parametrenin kombinasyonu ürünün kimliğini oluşturur.
2.  **Üretim Süreçleri:** Tohumdan fidan oluşumuna kadar geçen 1-3 yıllık süreçte yapılan masrafların (işçilik, gübre) nihai ürün maliyetine doğru yansıtılması gerekir.
3.  **Ekonomik Belirsizlik:** Yüksek enflasyonist ortamlarda, aylar önce üretilen bir ürünün tarihi maliyeti ile satılması, işletmeyi zarara uğratır.

FidanYS, bu sorunları çözmek için "Domain-Driven Design" (Alan Güdümlü Tasarım) prensipleriyle geliştirilmiş bir SaaS (Software as a Service) çözümüdür.

## 2. Teknoloji Yığını ve Sistem Mimarisi

Sistem, ölçeklenebilirlik ve güvenlik gereksinimlerini karşılamak adına **Full-Stack** ve **Monorepo** benzeri bir yapıda (Client ve Server ayrık ancak entegre) kurgulanmıştır.

### 2.1. Frontend Mimarisi (İstemci)

Kullanıcı arayüzü, modern web standartlarının en güncel sürümü olan **Next.js 15 (App Router)** üzerinde çalışmaktadır.

* **Tip Güvenliği:** Proje %100 **TypeScript** ile geliştirilmiş, çalışma zamanı hataları minimize edilmiştir.
* **UI Kütüphanesi:** **Material UI (MUI v7)** kullanılarak responsive, erişilebilir ve tema desteği olan (Dark/Light mode) bir arayüz sağlanmıştır.
* **State & Cache:** Veri yönetimi için **SWR (Stale-While-Revalidate)** kütüphanesi kullanılmıştır. Bu strateji, kullanıcının veriyi anında görmesini (cache) ve arka planda verinin güncelliğinin kontrol edilmesini sağlar.
* **Form Validasyonu:** Karmaşık veri girişleri **React Hook Form** ve **Zod** şemaları ile hem istemci hem sunucu tarafında doğrulanır.

### 2.2. Backend Mimarisi (Sunucu)

İş mantığı katmanı, kurumsal güvenilirlik standardı olan **Spring Boot 3.x (Java 17+)** üzerine inşa edilmiştir.

* **Veritabanı Tercihi: MongoDB (NoSQL).**
    * *Neden NoSQL?* Fidanların özellikleri (attributes) değişkendir. SQL'in katı tablo yapısı yerine, MongoDB'nin doküman tabanlı yapısı kullanılarak ürün özellikleri dinamik ve iç içe geçmiş (embedded) objeler olarak saklanmıştır.
* **API Stratejisi:** Tamamen **RESTful** standartlara uygun, kaynak odaklı (Resource-Oriented) bir API mimarisi kurulmuştur.
* **Dış Servis Entegrasyonu:** TCMB EVDS API servisine kurulan güvenli bağlantı ile günlük enflasyon verileri ve döviz kurları sisteme otomatik akar.

## 3. Çoklu Kiracı (Multi-Tenancy) Mimarisi

FidanYS, tek bir uygulama örneğinin birden fazla şirkete hizmet verdiği "Software as a Service" modelindedir.

* **Tenant İzolasyonu:** Veritabanındaki her kritik doküman (Sipariş, Stok, Cari vb.) `tenantId` alanına sahiptir.
* **Otomatik Filtreleme:** Backend katmanında Spring Data/Security seviyesinde çalışan interceptor'lar, gelen isteğin hangi firmadan (Tenant) geldiğini belirler.
    * `AuthenticationService` ve JWT içerisindeki `tenantId` bilgisi okunur.
    * Tüm veritabanı sorgularına otomatik olarak `{ tenantId: "aktif_tenant" }` kriteri eklenir.
    * Bu mimari, Firma A'nın verilerinin Firma B tarafından görülmesini matematiksel olarak imkansız kılar.

## 4. Kritik Fonksiyonel Modüller

Sistemi rakiplerinden ayıran temel modüller şunlardır:

### 4.1. Akıllı Stok ve Varyasyon Yönetimi
Sistemde ürünler basit birer satır değildir. "Ürün Ailesi" ve "Varyasyonlar" mantığı ile çalışır.
* **Varyasyon Matrisi:** Kullanıcılar, örneğin "Ceviz" türünü seçtiğinde, sistem otomatik olarak olası çeşitleri (Chandler, Fernor) ve boyları matris olarak sunar.
* **Konum Bazlı Takip:** Fidanın hangi parselde veya hangi depoda olduğu anlık izlenir.

### 4.2. Enflasyon Muhasebesi ve Finansal Zeka
Projenin en teknik ve stratejik katmanıdır.
* **Reel Değerleme:** `InflationService`, geçmişte yapılan bir harcamanın bugünkü "Reel" değerini hesaplar.
* **Maliyet Analizi:** Bir fidanın satış fiyatı belirlenirken, sistem sadece faturadaki alış fiyatını değil, o tarihten bugüne gerçekleşen enflasyon oranını da maliyete ekleyerek "Sermaye Koruma Fiyatı" önerir.

### 4.3. Üretim Partileri (Batches)
Tarımsal üretimin doğasına uygun olarak "Parti (Batch)" bazlı takip yapılır.
* Bir tohum ekildiğinde `ProductionBatch` oluşturulur.
* O partiye yapılan tüm gübreleme ve sulama masrafları `CostPool` (Maliyet Havuzu) içinde toplanır.
* Hasat zamanı geldiğinde, havuzdaki toplam maliyet üretilen fidan sayısına bölünerek **Gerçek Birim Maliyet** hesaplanır.

## 5. Güvenlik ve Yetkilendirme (Security)

Uygulama güvenliği "Defense in Depth" (Derinlemesine Savunma) prensibiyle sağlanır.

* **Kimlik Doğrulama:** JWT (JSON Web Token) tabanlı stateless authentication.
* **Şifreleme:** Kullanıcı parolaları **BCrypt** algoritması ile hashlenerek saklanır.
* **RBAC (Rol Tabanlı Erişim):**
    * `ADMIN`: Tüm yetkilere sahip.
    * `SALES`: Sadece sipariş ve cari görebilir, maliyetleri göremez.
    * `WAREHOUSE`: Sadece stok giriş-çıkışı yapabilir, parasal değerleri göremez.
* **Tek Oturum (Single Session):** Bir kullanıcı farklı bir cihazdan giriş yaptığında, eski oturumu güvenlik gereği sonlandırılır (`forceLogin` mekanizması).

## 6. Canlı Sistem ve Erişim

Sistemin mimarisini, veri yapısını ve finansal raporlama yeteneklerini canlı ortamda test etmek mümkündür.

| Erişim URL | Kullanıcı Adı | Şifre | Not |
| :--- | :--- | :--- | :--- |
| **[https://app-fidanys.acrtech.com.tr](https://app-fidanys.acrtech.com.tr/auth/sign-in)** | `admin` | `admin` | Tam yetkili demo hesabı. |

*Demo ortamında yapılan işlemler test verisi olarak kabul edilir ve belirli periyotlarla sıfırlanabilir.*

## 7. Sonuç

FidanYS; Java ekosisteminin kararlılığını Next.js'in modernliği ile birleştirerek, tarım sektörünün "dijital dönüşüm" ihtiyacına nokta atışı bir çözüm sunmaktadır. Özellikle **Enflasyon Muhasebesi** modülü ile sadece bir stok takip programı olmanın ötesine geçerek, işletme sahipleri için stratejik bir karar destek sistemine dönüşmüştür.