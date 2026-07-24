# Schema Templates

Rules first:
1. Every value comes from `client-profile.md` or the visible page. If the profile lacks a field, OMIT the property — never guess.
2. One `<script type="application/ld+json">` block per schema type per page. Check `.seo-manifest.json` before adding; update in place on re-runs.
3. Parse every block before shipping (JSON.parse or python json.loads — actually run it).
4. NAP strings must be character-identical to the profile's NAP section.
5. No `aggregateRating` / `review` markup unless real reviews render on that page.

## LocalBusiness (use most specific subtype: RoofingContractor, RealEstateAgent, Plumber, etc.)

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "FROM_PROFILE_NAP_NAME",
  "url": "FROM_PROFILE_URL",
  "telephone": "FROM_PROFILE_NAP_PHONE",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "FROM_PROFILE",
    "addressLocality": "FROM_PROFILE",
    "addressRegion": "FROM_PROFILE",
    "postalCode": "FROM_PROFILE",
    "addressCountry": "US"
  },
  "geo": {"@type": "GeoCoordinates", "latitude": 0, "longitude": 0},
  "areaServed": ["EVIDENCED_AREAS_ONLY"],
  "openingHours": "FROM_PROFILE_IF_PRESENT",
  "image": "REAL_IMAGE_URL",
  "sameAs": ["SOCIAL_PROFILES_FROM_PROFILE"]
}
```

Place on homepage (and contact page). `areaServed` lists only areas with evidence in the profile — it must match the location-page decisions from Phase 3.

## FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "QUESTION_AS_ON_PAGE",
      "acceptedAnswer": {"@type": "Answer", "text": "ANSWER_AS_ON_PAGE"}
    }
  ]
}
```

Only for Q&A that visibly renders on the page. Schema must mirror the visible text, not extend it.

## Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "FROM_PROFILE_SERVICES",
  "provider": {"@type": "RoofingContractor", "name": "FROM_PROFILE_NAP_NAME"},
  "areaServed": ["EVIDENCED_AREAS_ONLY"]
}
```

One per service page.

## NonprofitOrganization

```json
{
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  "name": "FROM_PROFILE",
  "alternateName": ["ACRONYM_AND_VARIANTS_FROM_PROFILE"],
  "url": "FROM_PROFILE",
  "logo": "REAL_LOGO_URL",
  "address": {"@type": "PostalAddress", "...": "FROM_PROFILE"},
  "sameAs": ["SOCIAL_PROFILES"]
}
```

## Event

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "AS_ON_PAGE",
  "startDate": "ISO8601",
  "endDate": "ISO8601_IF_KNOWN",
  "location": {
    "@type": "Place",
    "name": "VENUE",
    "address": {"@type": "PostalAddress", "...": "..."}
  },
  "organizer": {"@type": "Organization", "name": "FROM_PROFILE"},
  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "TICKET_OR_PAGE_URL"}
}
```

## Product

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AS_ON_PAGE",
  "image": ["REAL_URLS"],
  "description": "THE_UNIQUE_DESCRIPTION_FROM_PAGE",
  "sku": "IF_EXISTS",
  "brand": {"@type": "Brand", "name": "FROM_PROFILE"},
  "offers": {
    "@type": "Offer",
    "price": "AS_ON_PAGE",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "PRODUCT_URL"
  }
}
```

## BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "SITE_URL"},
    {"@type": "ListItem", "position": 2, "name": "SECTION", "item": "SECTION_URL"},
    {"@type": "ListItem", "position": 3, "name": "CURRENT_PAGE"}
  ]
}
```

Last item carries no `item` URL.
