import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, canonicalUrl, schemaData }) {
  const defaultDomain = 'https://opencurbmedia.site';
  const fullCanonical = canonicalUrl ? `${defaultDomain}${canonicalUrl}` : defaultDomain;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={`${defaultDomain}/logo.jpeg`} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${defaultDomain}/logo.jpeg`} />

      {/* JSON-LD Schema Markup */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
