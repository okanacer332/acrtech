import Script from 'next/script';

interface SchemaProps {
  type: 'Article' | 'Product' | 'Organization' | 'WebSite';
  data: any;
}

export function SchemaMarkup({ type, data }: SchemaProps) {
  let schema = {};

  if (type === 'Article') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image ? [data.image] : [],
      datePublished: data.date,
      dateModified: data.date, // Güncellenme tarihini de eklemek iyidir
      author: [{
          '@type': 'Organization',
          name: 'ACR Tech',
          url: 'https://acrtech.com.tr'
      }]
    };
  } else if (type === 'Product') { // Projelerin için
    schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: data.title,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: data.description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    };
  }

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}