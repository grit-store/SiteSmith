---
name: seo-optimizer
description: Humanized professional SEO optimization for client websites. Use this skill whenever the user wants to SEO-optimize a website, audit a site's SEO, improve search rankings, generate SEO audit reports for prospects, create keyword strategies, add schema markup, fix meta tags, or prepare a site for Google indexing. Trigger on phrases like "optimize this site", "SEO audit", "make this rank", "check this prospect's website", "add schema", or any mention of search visibility for a client site. Works in two modes — Build (edit real source files) and Audit (report-only from a URL).
---

# SEO Optimizer

Optimize client websites for search the way a careful professional would: audit first, validate assumptions with the human, edit with a paper trail, verify everything, and never invent facts.

This skill produces two kinds of value: an optimized site (Build mode) and a client-facing audit report that doubles as a sales asset (both modes).

## Modes — decide first, never mix

**Build mode** — you have the site's source files. You will edit them, phase by phase, with approval gates.

**Audit mode** — you have only a URL (typically a prospect's site). Fetch the public pages, run the same checklist, produce `audit-report.md` and the content roadmap. Make NO edits and do not ask for source files. This is a pitch asset.

Confirm the mode with the user before doing anything else.

## Required inputs

1. **The site** — source files (Build) or URL (Audit).
2. **`client-profile.md`** — if it doesn't exist, create it WITH the user before proceeding. Do not fill it in yourself from guesses. Template below.

### client-profile.md template

```markdown
# Client Profile: [Business Name]

## Business
- Legal/display name:
- Type: [local-service | nonprofit | ecommerce]
- NAP (exactly as on Google Business Profile):
  - Name:
  - Address:
  - Phone:
- Website URL:
- Primary service area / market:

## Services (or Programs / Product categories)
- [one per line — real offerings only]

## Claims — ONLY these may appear in copy
- Years in business:
- Licenses / certifications:
- Insurance / bonding:
- Warranties offered:
- Response time commitments:
- Awards / memberships:
(Empty field = that claim NEVER appears in copy. No exceptions.)

## Locations — each requires evidence
### [City/Area 1]
- Jobs or work actually done here:
- Neighborhood / local specifics known:
- Photos available: [yes/no]
### [City/Area 2]
...
(An area with no evidence gets NO dedicated page.)

## Target customer
- Who they are, what they search when they need this business:

## Competitors
- [names/URLs if known]

## Voice
- How the client talks (formal/plain/technical):
- Phrases the client uses:
- Banned phrases:
```

## The claims rule (absolute)

Copy may state ONLY what appears in the Claims section of the profile. Never write "licensed and insured," "24/7," "family-owned," years of experience, guarantees, or certifications unless the profile lists them. An invented claim on a contractor's site is the client's legal exposure. When in doubt, leave it out and note the gap in the change log so the user can supply the fact.

## The data rule (absolute)

You have no live keyword tool. NEVER state search volumes, keyword difficulty scores, traffic estimates, or ranking positions as facts. All keyword work is labeled **hypothesis** until the user validates it. Never fabricate "this gets 1,200 searches/month." If asked for numbers, explain they must come from Google Keyword Planner or Search Console and hand the user the exact terms to check.

## Design boundaries (Build mode)

Freely change: `<head>` contents, text content, headings and their levels, alt/aria/title attributes, semantic container tags, internal links, JSON-LD blocks, meta files (sitemap, robots), image loading attributes, and spacing needed to fit new content cleanly.

Change only with stated reason + approval: section reordering, new sections or templates, font size/weight changes.

Never change: brand colors and tokens, typefaces, layout language, component style, logo, imagery style. Test: a returning visitor must recognize the site instantly. If a change would make someone ask "did you rebuild this?", it's out of scope.

## Workflow — phases in order, gate at each

Work one phase at a time. Present results, wait for approval, proceed. Never run ahead.

### Phase 0 — Baseline (Build mode; abbreviated in Audit mode)

Before touching anything, write `baseline.md`:
- Page inventory (every page/route found)
- Current title tags and meta descriptions, verbatim
- Heading structure per page (count of H1s, hierarchy issues)
- Images missing alt text (count + list)
- Existing schema markup (or none)
- Page weight: total size, largest assets
- sitemap.xml / robots.txt present or absent
- If user has Search Console access: ask them for current indexed count and impressions; record as reported

This file is the "before" in every before/after the user will ever show a client. Git-commit it (or instruct the user to) before phase 1.

### Phase 1 — Audit

Run the full checklist (see the matching `references/` file for the business type — read ONLY the one that applies). Produce findings ranked by impact: 
1. Blockers (site can't be properly indexed)
2. High (missing schema, bad/missing titles, no H1s, thin pages)
3. Medium (internal linking, alt text, meta descriptions)
4. Low (minor semantics, image names)

No edits in this phase. Gate: user approves the findings.

### Phase 2 — Keyword hypothesis

From the profile (services × areas × customer language), produce a keyword list explicitly titled "HYPOTHESIS — validate before build". For each term: the intent behind it, the page that would target it, and what to check (Keyword Planner volume; who currently ranks — if the first page is all national brands, flag as likely unwinnable).

Gate: HARD STOP. Page architecture rests on this list. Do not proceed until the user reports back which terms survived validation.

### Phase 3 — Architecture

Map validated keywords to pages: one primary intent per page, no two pages competing for the same term. Propose the site structure and internal linking plan.

**Location page rule (default-on):** a dedicated location page is generated ONLY for areas with evidence in the profile. Areas without evidence become sections on a broader service page. If the user overrides this, comply — but record in the change log: "Location page for [X] generated without substantiating evidence; doorway-page spam risk." The paper trail is the point.

Gate: user approves structure before any file is created or edited.

### Phase 4 — On-page fixes

Category by category, one file at a time. For each file: show a summary diff of what changes and why, apply on approval, log it. Order:
1. Title tags (primary keyword + qualifier + brand, ≤60 chars)
2. Meta descriptions (click-worthy, use real differentiators from Claims, ≤155 chars)
3. Headings (exactly one H1 per page, matching page intent; logical H2/H3 nesting)
4. Body copy (see `references/copy-voice.md` — read it before writing any copy)
5. Internal links (descriptive anchors, every page reachable, money pages get the most internal links)
6. Alt text + semantic image filenames

### Phase 5 — Technical

1. JSON-LD schema per `references/schema-templates.md` — populate ONLY from the profile
2. Canonical tags
3. sitemap.xml + robots.txt
4. OpenGraph / Twitter cards
5. Semantic HTML corrections
6. Speed: image compression/formats, lazy-loading below the fold, explicit width/height to prevent layout shift

### Phase 6 — Verify

Run every check; fix failures; re-run until clean:
- [ ] Exactly one H1 per page
- [ ] Every title unique, ≤60 chars; every meta description unique, ≤155 chars
- [ ] Every `<img>` has alt (empty alt only for decorative)
- [ ] All JSON-LD parses (actually parse it — write a script if needed)
- [ ] Schema contains no claim absent from the profile
- [ ] No orphan pages; no broken internal links
- [ ] sitemap lists all indexable pages; robots doesn't block anything needed
- [ ] Canonicals self-consistent
- [ ] Copy contains no banned phrases and no unlisted claims (grep for them)

## Re-run safety

Maintain `.seo-manifest.json` at the site root:

```json
{
  "skill_version": 1,
  "last_run": "YYYY-MM-DD",
  "changes": [
    {"file": "index.html", "phase": 4, "what": "title tag rewritten", "date": "..."}
  ],
  "schema_blocks": [{"file": "index.html", "type": "RoofingContractor"}]
}
```

On every run, read it first. If it exists, this is an UPDATE run: modify existing schema/meta in place, never append duplicates. Recommend a git branch per phase so any phase is independently revertable.

## Outputs

Every engagement ends with:
1. Edited files (Build mode only)
2. `change-log.md` — every edit, per file, with reason
3. `audit-report.md` — client-facing. Structure:
   - What we found (plain language, no jargon dump)
   - What we fixed / what we recommend (Audit mode)
   - What's left that the website can't do: Google Business Profile, reviews, citations, backlinks — as a checklist with owner (this is the user's half)
   - Honest timeline: indexing in days, long-tail traction 2–4 months, competitive terms 12+ months with authority growth
4. `content-roadmap.md` — 90 days, 2–3 intent-targeting pages/posts per month with target keyword hypotheses. This is the retainer deliverable; always produce it.

## What this skill will not do

- Promise rankings or timelines beyond the honest ranges above
- State keyword/traffic numbers without external validation
- Invent claims, reviews, or testimonials
- Generate evidence-free location pages silently
- Touch Google Business Profile, reviews, or link-building (off-site; user's half — always list it in the report so nothing is silently dropped)

## References

- `references/local-service.md` — contractors, realtors, local pros (map-pack economics, service×city structure)
- `references/nonprofit.md` — orgs, associations (mission/program pages, event & donation intent)
- `references/ecommerce.md` — stores (Product schema, collections, faceted-nav traps)
- `references/schema-templates.md` — JSON-LD templates, profile-field-mapped
- `references/copy-voice.md` — humanized copy rules; read before writing ANY body copy

Read only what the engagement needs.
