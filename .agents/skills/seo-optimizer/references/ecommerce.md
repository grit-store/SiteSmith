# E-commerce Playbook

For online stores of any size.

## What's different

The unit of ranking is the product page and the collection page, and the killer problems are structural: duplicate content, thin manufacturer descriptions, and crawl waste. A store with 40 products has 40 chances to rank and 40 chances to be filtered as thin content. Uniqueness is the whole game.

## Page architecture

**Collection/category pages** — these usually outrank product pages for the money terms ("mens gym shorts", "handmade candles"). Each needs: unique intro copy (not one line — real category expertise), sensible sort, and internal links to the best products. Target "[category] [qualifier]" terms.

**Product pages** — one primary term each: "[product name]" + attribute variants. Requirements:
- Unique description — NEVER the manufacturer's stock text (every other stockist has it; Google filters duplicates)
- Real specifics: materials, sizing truth, use cases, care
- Real photos with descriptive alt text
- Price, availability visible in HTML (not JS-only)

**Buying-guide content** — "best [category] for [use]", "[product A] vs [product B]", "how to choose [category]". This is the roadmap content; it captures pre-purchase intent stores usually ignore.

## Crawl traps to audit for

- Faceted navigation (filters/sorts) generating infinite URL variants — canonical to the clean category URL; block crawl of filter params in robots.txt where appropriate
- Session IDs or tracking params in internal links
- Out-of-stock pages returning 200 with no content — keep the page, mark availability, suggest alternatives; don't 404 products that will return
- Pagination: rel-canonical each page to itself, not all to page 1

## Schema

`Product` on every product page: name, image, description, sku, brand, offers (price, priceCurrency, availability, url). `BreadcrumbList` sitewide. `aggregateRating` ONLY if real ratings display on the page with a real count — fabricated review markup is a manual-action magnet. `Organization` on the homepage.

## Copy notes

Product copy is where AI-sameness shows worst. Per the copy-voice rules, plus: lead with the specific (what it's made of, what it fits, what it survives), not the aspirational ("elevate your everyday"). If every description could describe every product, rewrite them all.

## Report items for the user's half

- Google Merchant Center + free product listings
- Review platform integration (real reviews, on-page)
- Category-level link building: gift guides, niche press
