// src/app/cerez-politikasi/page.tsx
import React from 'react';
import { Container, Typography, List, ListItem, Link as MuiLink } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'acrtech web sitesi çerez politikası ve kişisel verilerin korunması hakkında bilgilendirme.',
};

const PolicyPage = () => {
    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
            {children}
        </Typography>
    );

    const SubTitle = ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
            {children}
        </Typography>
    );

    const Paragraph = ({ children }: { children: React.ReactNode }) => (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {children}
        </Typography>
    );
    
    const ListItemText = ({ children }: { children: React.ReactNode }) => (
        <ListItem sx={{ display: 'list-item', pl: 0 }}>
             <Typography variant="body1" component="span" color="text.secondary">{children}</Typography>
        </ListItem>
    );

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        Çerez Politikası
      </Typography>
      <Paragraph>
        Son güncellenme: 26 Temmuz 2025
      </Paragraph>
      <Paragraph>
        Bu Çerez Politikası, acrtech ("biz", "bize" veya "bizim") tarafından işletilen acrtech.com.tr web sitesinde ("Site") kullanılan çerezler ve benzeri teknolojiler hakkında size bilgi vermek amacıyla hazırlanmıştır. Sitemizi kullanarak, bu politikada açıklanan çerezlerin kullanımını kabul etmiş olursunuz.
      </Paragraph>

      <SectionTitle>Çerez Nedir?</SectionTitle>
      <Paragraph>
        Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, siteyi tekrar ziyaret ettiğinizde cihazınızı tanımak ve tercihlerinizi hatırlamak gibi işlevler görür.
      </Paragraph>

      <SectionTitle>Neden Çerezleri Kullanıyoruz?</SectionTitle>
      <Paragraph>
        Sitemizde çerezleri aşağıdaki amaçlarla kullanmaktayız:
      </Paragraph>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        <ListItemText>Sitenin temel işlevlerini yerine getirmek.</ListItemText>
        <ListItemText>Site kullanımınızı analiz ederek performansı artırmak ve kullanıcı deneyimini iyileştirmek.</ListItemText>
        <ListItemText>İçerik ve reklamları ilgi alanlarınıza göre kişiselleştirmek.</ListItemText>
      </List>

      <SectionTitle>Kullandığımız Çerez Türleri</SectionTitle>
      <SubTitle>1. Zorunlu Çerezler</SubTitle>
      <Paragraph>
        Bu çerezler, web sitesinin düzgün bir şekilde çalışması için kesinlikle gereklidir. Genellikle, gizlilik tercihlerinizi ayarlamak, oturum açmak veya formları doldurmak gibi eylemlerinize yanıt olarak ayarlanırlar. Bu çerezler olmadan sitenin bazı bölümleri çalışmaz.
      </Paragraph>

      <SubTitle>2. Performans ve Analitik Çerezler</SubTitle>
      <Paragraph>
        Bu çerezler, ziyaretçilerin siteyi nasıl kullandığı hakkında (örneğin en çok hangi sayfaları ziyaret ettikleri) anonim bilgiler toplamamızı sağlar. Google Analytics gibi araçlar aracılığıyla toplanan bu veriler, sitemizin performansını ölçmemize ve iyileştirmemize yardımcı olur.
      </Paragraph>
      
      <SubTitle>3. İşlevsel Çerezler</SubTitle>
      <Paragraph>
        Bu çerezler, dil tercihi veya bölge seçimi gibi yaptığınız seçimleri hatırlayarak size daha gelişmiş ve kişisel bir deneyim sunmamızı sağlar.
      </Paragraph>

      <SectionTitle>Çerezleri Nasıl Kontrol Edebilirsiniz?</SectionTitle>
      <Paragraph>
        Tarayıcınızın ayarlarını kullanarak çerezleri yönetebilir, silebilir veya tamamen engelleyebilirsiniz. Ancak, zorunlu çerezleri engellemenin sitenin işlevselliğini olumsuz etkileyebileceğini unutmayın. Tarayıcınızda çerez ayarlarını nasıl değiştireceğinize dair bilgilere aşağıdaki linklerden ulaşabilirsiniz:
      </Paragraph>
       <List>
            <ListItem><MuiLink href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</MuiLink></ListItem>
            <ListItem><MuiLink href="https://support.mozilla.org/tr/kb/web-sitesi-tercihleri-cerezleri-etkinlestirme-ve-devre-disi-birakma" target="_blank" rel="noopener">Mozilla Firefox</MuiLink></ListItem>
            <ListItem><MuiLink href="https://support.microsoft.com/tr-tr/windows/tan%C4%B1mlama-bilgilerini-silme-ve-y%C3%B6netme-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener">Microsoft Edge</MuiLink></ListItem>
       </List>
       <Paragraph>
        Ayrıca, sitemizi ilk ziyaret ettiğinizde karşınıza çıkan çerez banner'ı üzerinden de tercihlerinizi yönetebilirsiniz.
      </Paragraph>
    </Container>
  );
};

export default PolicyPage;
