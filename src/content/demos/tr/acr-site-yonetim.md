---
title: "ACR Site Yönetim: Hibrit Masaüstü & Cloud ERP Mimarisi"
category: "Desktop & Cloud Architecture"
description: "Toplu yapı yönetimleri için Electron.js, React ve Spring Boot ile geliştirilen, asenkron borçlandırma ve finansal raporlama yeteneklerine sahip yönetim sistemi.Erişim bilgileri aşağıdadır."
date: "2025-12-14"
image: "/portfolio/site.png"
author: "Sistem Mimarı"
---

# Toplu Yapı ve Tesis Yönetiminde Hibrit Mimari: ACR Site Yönetim Sistemi

**Proje:** ACR Site Yönetim Sistemi

**Erişim Adresi:** [app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)

**Doküman Tipi:** Teknik Mimari Analizi ve Sistem İncelemesi

## Özet (Abstract)

ACR Site Yönetim Sistemi; apartman, site ve iş merkezi gibi toplu yaşam alanlarının finansal ve idari süreçlerini yönetmek için tasarlanmıştır.

Proje, kullanıcı deneyimi açısından masaüstü uygulamasının seriliğini (**Electron.js & React**), veri güvenliği ve işlem bütünlüğü açısından ise kurumsal backend mimarisini (**Spring Boot & MongoDB**) birleştirir. Özellikle "Storno" muhasebe prensipleri, asenkron toplu borçlandırma servisleri ve NoSQL tabanlı dinamik raporlama motoru ile standart yazılımlardan ayrışır.

## 1. Giriş ve Problem Uzayı

Site yönetimleri genellikle Excel dosyaları veya eski nesil masaüstü yazılımlarla yönetilmektedir. Bu durum şu sorunlara yol açar:

1.  **Veri Tutarsızlığı:** Bir dairenin borcu silindiğinde, kasadaki paranın akıbetinin belirsizleşmesi (Audit Trail eksikliği).
2.  **Performans Sorunları:** Yüzlerce dairesi olan bir sitede, herkese tek tuşla aidat borcu eklemek sistemleri kilitleyebilir.
3.  **Esneklik Eksikliği:** Sabit giderler dışında, "Çatı Tamiri" gibi olağanüstü giderlerin kat maliklerine anlık yansıtılamaması.

ACR Site Yönetim, bu sorunları modern bir "Event-Driven" (Olay Güdümlü) ve "Asenkron" yaklaşımla çözer.

## 2. Sistem Mimarisi ve Teknoloji Yığını

Proje, **Client-Server** mimarisinde olup, istemci tarafında hibrit bir yapı kullanır.

### 2.1. Backend (Sunucu Katmanı)

Sistemin beyni, **Spring Boot 3.5** üzerinde koşan RESTful API servisidir.
* **Veritabanı:** **MongoDB**. Site yönetiminde veri şeması (demirbaş özellikleri, işlem tipleri) zamanla değişebilir. MongoDB'nin şemasız (schemaless) yapısı bu esnekliği sağlar.
* **Veri Bütünlüğü:** NoSQL kullanılmasına rağmen, `Daire` modelinde `@CompoundIndex` kullanılarak "Blok ID + Kapı No" kombinasyonunun benzersizliği veritabanı seviyesinde garanti altına alınmıştır.
* **Asenkron Mimari:** Uzun süren işlemler (örn: 500 daireye borç tahakkuk ettirme) `@Async` anotasyonu ve Spring'in `TaskExecutor` yapısı ile ana thread'i bloklamadan arka planda yürütülür.

### 2.2. Frontend & Desktop (İstemci Katmanı)

Kullanıcı arayüzü **React** ve **Material UI (MUI)** ile geliştirilmiş, **Vite** ile derlenmiş ve **Electron** ile paketlenmiştir.
* **Electron Entegrasyonu:** Web teknolojileriyle (HTML/CSS/JS) geliştirilen arayüz, Electron sayesinde yerel bir masaüstü uygulaması (Windows/macOS/Linux) gibi çalışır.
* **CRUD Hook Mimarisi:** Frontend tarafında geliştirilen `useCrudApi` özel kancası (custom hook), tüm API isteklerini, hata yönetimini ve yükleme durumlarını (loading states) merkezi bir noktadan yönetir.

## 3. Kritik Teknik Özellikler ve Çözümler

Projenin kaynak kodlarında öne çıkan "Best Practice" uygulamaları:

### 3.1. Asenkron Toplu Borçlandırma (Async Processing)
Yüzlerce daireye aynı anda aidat borcu eklemek maliyetli bir işlemdir.
* **Sorun:** Kullanıcı "Borçlandır" butonuna bastığında tarayıcının donması.
* **Çözüm:** `TopluBorclandirmaService.java` sınıfında `@Async` kullanılmıştır. İstek alındığı anda kullanıcıya "202 Accepted" cevabı dönerken, işlem arka planda ayrı bir thread üzerinde devam eder.

### 3.2. Finansal Bütünlük ve "Storno" Mantığı (Audit Trail)
Bir muhasebe kaydı asla fiziksel olarak silinmemelidir.
* **Mekanizma:** `FinansalIslemController.java` içindeki iptal metodunda, hatalı bir işlem silinmez (`isIptalEdildi=true` yapılır).
* **Ters Kayıt:** Sisteme otomatik olarak ters yönde (Gelir ise Gider, Gider ise Gelir) ve aynı tutarda bir "Düzeltme Kaydı" atılır. Bu sayede kasa bakiyesi matematiksel olarak düzelir ancak işlem tarihçesi kaybolmaz.

### 3.3. MongoDB Aggregation ile Raporlama
Standart döngülerle (for-loop) yapılan finansal hesaplamalar yavaştır.
* **Çözüm:** `AidatKaydiRepository` içerisinde `Aggregation Pipeline` kullanılmıştır.
* **Teknik:** Veriyi Java tarafına çekip işlemek yerine, hesaplama veritabanı motoruna (MongoDB) yaptırılır (`$group`, `$sum`, `$cond`). Bu, raporlama hızını 10x-100x artırır.

### 3.4. Olağanüstü Gider Yansıtma (Expense Reflection)
Sistemin en "akıllı" özelliklerinden biridir.
* Kasa hareketlerinde girilen bir "Gider" (örn: Asansör Bakımı), istenirse tek tıkla tüm dairelere eşit şekilde bölünerek "Borç" olarak yansıtılabilir (`BorclandirmaController`).

## 4. Modüller ve İşlevsellik

### 4.1. Dashboard ve Genel Bakış
* **Chart.js** entegrasyonu ile son 6 ayın Gelir-Gider dengesi görselleştirilir.
* Anlık kasa bakiyesi ve doluluk oranları özet kartlarda sunulur.

### 4.2. Daire ve Blok Yönetimi
* Daireler; "Mülk Sahibi", "Kiracı" veya "Boş" statülerinde takip edilir.
* İletişim bilgileri ve oturan kişi geçmişi kayıt altındadır.

### 4.3. Demirbaş Yönetimi
* Sitenin fiziksel varlıkları (Çim biçme makinesi, Jeneratör vb.) durumuyla (Kullanımda, Arızalı, Serviste) birlikte takip edilir.

### 4.4. Kasa ve Cari Takip
* Gelir ve gider kalemleri kategorize edilir (Elektrik, Su, Personel).
* Makbuz veya fatura takibi dijital ortamda yapılır.

## 5. Canlı Demo ve Erişim

Sistemin masaüstü deneyimini web tarayıcısı üzerinden simüle eden canlı demo ortamı aktiftir.

**Demo Adresi:** [https://app-siteyonetim.acrtech.com.tr](https://app-siteyonetim.acrtech.com.tr)
*(Not: Demo ortamında yapılan değişiklikler periyodik olarak sıfırlanabilir.)*

## 6. Sonuç

ACR Site Yönetim Sistemi; sadece aidat toplayan basit bir yazılım değil, arka planda **muhasebe standartlarını (Storno)** uygulayan, veritabanı performansını **Aggregation** ile optimize eden ve kullanıcı deneyimini **Electron** ile masaüstüne taşıyan modern bir ERP çözümüdür.