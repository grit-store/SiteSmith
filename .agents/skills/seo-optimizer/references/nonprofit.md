# Nonprofit / Association Playbook

For nonprofits, cultural associations, community organizations, member groups.

## What's different

Search intent splits three ways: people looking for the org by name (navigational), people looking for what it offers (events, programs, membership), and people looking to give (donations, volunteering). Commercial keyword competition is usually low — the fight is being findable at all, not outranking rivals. Blockers and basics matter more than clever strategy here.

Community/diaspora orgs (cultural associations, regional groups) have an extra pattern: searches in mixed language or with alternate spellings of the org's name and community terms. Capture the variants people actually type.

## Page architecture

**Homepage** — org name + what it is + who it serves. Must survive the "someone heard the name at an event and Googled it" test: name variants and acronym should all resolve here.

**About / Mission** — targets "[org name]", "what is [org]". Real history, real people, real photos.

**Programs/Services pages** — one per real program. Targets "[program type] [city/community]".

**Events** — upcoming + past. Event pages with `Event` schema get event-rich results. Past-event pages with photos build long-tail equity — don't delete them after the event; mark them past.

**Membership / Get Involved** — targets "join [community] association [city]", "volunteer [cause] [city]".

**Donate** — clear, prominent, minimal friction. Targets "[cause] donate".

## Keyword patterns worth hypothesizing

- "[community/cause] association [city]"
- "[cultural event name] [city] [year]"
- "[community] events near me"
- "volunteer [cause] [city]"
- Name variants, acronym, and common misspellings of the org name

## Schema

`NonprofitOrganization` (or `Organization`): name, alternateName (acronym + variants), address, url, logo, sameAs (social profiles), foundingDate if in profile. `Event` schema on every event page: name, startDate, location, offers (even if free — price 0). `FAQPage` on membership/program FAQs.

## Trust signals

Nonprofits live on legitimacy: leadership names, registered status (EIN/registration if the profile lists it), photos of real activity, contact that works. Flag anonymous-looking orgs in the audit — it hurts both Google trust and human trust.

## Report items for the user's half

- Google Business Profile as nonprofit category (yes, orgs should have one)
- Google for Nonprofits — free Ad Grants eligibility worth flagging
- Event listings on local calendars, community boards
- Links from member businesses, partner orgs, local press
