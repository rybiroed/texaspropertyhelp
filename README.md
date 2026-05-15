# Texas Property Help — Production Website

A homeowner assistance and contractor referral platform for Texas property owners.
Built with Next.js 15, TypeScript, and Tailwind CSS.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local` in the project root:

```env
# Lead API — where form submissions are sent
NEXT_PUBLIC_LEAD_API_URL=https://yourbackend.com/lead

# Optional: leave blank to use placeholder route during development
```

---

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Home /
    storm-damage/         # /storm-damage
    roofing/              # /roofing
    hvac/                 # /hvac
    insurance-claims/     # /insurance-claims
    financing/            # /financing
    guides/               # /guides + /guides/[slug]
    request-help/         # /request-help (lead form)
    api/lead-placeholder/ # Dev-only placeholder API route

  components/
    layout/
      Header.tsx          # Sticky nav header
      Footer.tsx          # Site footer
    sections/
      CTASection.tsx      # Reusable CTA banner
      ServiceCard.tsx     # Service link card
      GuideCard.tsx       # Guide listing card
      FAQ.tsx             # Accordion FAQ with JSON-LD schema
      LeadForm.tsx        # Main lead capture form
      DisclaimerBox.tsx   # Legal/insurance disclaimers
      TrustSection.tsx    # "How we work" trust section

  lib/
    config.ts             # Site config, API endpoints, nav links
    guides.ts             # Guide registry (what appears on /guides)

  types/
    index.ts              # All TypeScript types

content/
  guides/                 # Guide metadata JSON files
  news/                   # Storm/news updates (future)
  procedures/             # Insurance procedure updates (future)
  service-pages/          # Local area pages (future)
```

---

## How to Add a New Guide

1. **Add metadata** to `src/lib/guides.ts`:
   ```ts
   {
     title: "Your Guide Title",
     slug: "your-guide-slug",
     description: "Brief description for SEO and card display.",
     category: "roofing",
     readTime: "4 min read",
     lastUpdated: "2025-02-01",
   }
   ```

2. **Add body content** in `src/app/guides/[slug]/page.tsx` inside `getGuideBody()`:
   ```ts
   "your-guide-slug": {
     disclaimer: "general",
     sections: [
       { heading: "Section Title", content: "Section text..." },
     ],
   }
   ```

3. **Add metadata JSON** to `content/guides/your-guide-slug.json` (see content/README.md for schema).

4. Set `reviewedBy` after human review — do not publish without a reviewer.

---

## How to Add a News or Procedure Update

1. Create a metadata file in `content/news/` or `content/procedures/`
2. Create the corresponding page under `src/app/` (e.g., `src/app/news/[slug]/page.tsx`)
3. Follow the same status workflow: draft → review → published
4. Only published content should be served to visitors

---

## How to Connect the Real Lead API

The form is in `src/components/sections/LeadForm.tsx`.

### Option A: External API (simplest)
Set `NEXT_PUBLIC_LEAD_API_URL` in `.env.local` to your backend URL.
The form will POST the `LeadFormData` payload to that URL.

### Option B: Next.js API Route (recommended for CRM integrations)
1. Create `src/app/api/lead/route.ts`
2. Implement validation, transformation, and forwarding to your CRM:
   - GoHighLevel: use their REST API or webhook
   - HubSpot: use their Forms or Contacts API
   - Salesforce: use their REST API
   - Zapier: use a webhook trigger
3. Set `NEXT_PUBLIC_LEAD_API_URL=/api/lead` in `.env.local`

The `LeadFormData` type in `src/types/index.ts` defines the exact payload shape.

---

## How to Prepare Spanish (ES) Pages

The architecture is ready for bilingual content:

1. **Content metadata** already has a `language: "en" | "es"` field.
2. **Lead form** already collects `preferredLanguage`.
3. **Footer** references `SITE_CONFIG.languages`.

To add Spanish pages:
- Option A: Create parallel routes (`src/app/es/storm-damage/page.tsx`)
- Option B: Use `next-intl` or `next-i18next` for full i18n routing
- Add `lang="es"` to the `<html>` tag in Spanish page layouts
- Create Spanish guide entries in `src/lib/guides.ts` with `language: "es"`

Do NOT use machine translation without human review before publishing.

---

## Deployment

### Vercel (recommended)
```bash
# Deploy to Vercel
npx vercel
```
Set `NEXT_PUBLIC_LEAD_API_URL` in Vercel environment variables.

### Other Platforms
```bash
npm run build
npm start
```

---

## What's Not Built Yet (Next Steps)

- [ ] Connect real Lead API (`NEXT_PUBLIC_LEAD_API_URL`)
- [ ] Add real contact email/phone to `src/lib/config.ts`
- [ ] Add OG image to `public/images/og-default.png`
- [ ] Add local service area pages (Austin, Houston, DFW, etc.)
- [ ] Add news/storm update section
- [ ] Add Spanish language pages
- [ ] Set up MDX for guide body content (for larger content library)
- [ ] Add sitemap.xml (use `next-sitemap`)
- [ ] Add Google Analytics or privacy-respecting analytics
- [ ] Add Google Search Console verification
- [ ] Connect CRM for lead management
