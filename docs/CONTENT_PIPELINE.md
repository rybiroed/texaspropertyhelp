# Texas Property Help — Content Pipeline

This document defines the end-to-end process for creating, reviewing, publishing, and measuring guide content on Texas Property Help. It is designed for both human-authored guides and AI-assisted draft generation.

---

## 1. Topic Selection

### Criteria
A topic is accepted when it meets **all** of the following:
- Addresses a real question Texas homeowners face (verified by search volume, forum data, or direct user feedback)
- Is within our topical authority: storm damage, roofing, HVAC, insurance claims, financing, emergency repair
- Does not require professional licensing to advise on (we provide information, not legal/insurance/financial advice)
- Has no adequate existing content on the site that could be updated instead

### Inputs
- Google Search Console: queries driving impressions with low CTR or low ranking
- GA4: high-traffic pages without supporting guide content
- User-submitted form data: common help types and descriptions
- Competitor gap analysis: topics covered by authoritative sites not yet on TPH
- Seasonal relevance: storm season (April–October), HVAC season (June–September)

### Output
A topic brief (see Section 2) approved by the site owner before any content work begins.

---

## 2. Research Brief

Every guide starts with a brief before any draft is written. The brief must define:

| Field | Description |
|-------|-------------|
| **Slug** | The proposed URL slug (`/guides/[slug]`) |
| **Title** | Working title (H1) |
| **Target intent** | Informational / navigational / transactional |
| **Primary keyword** | The main search phrase this guide targets |
| **Secondary keywords** | 3–5 supporting phrases |
| **Target audience** | Who is reading this and when (e.g., "homeowner who just filed a claim") |
| **Key questions to answer** | 5–8 specific questions the guide must address |
| **Facts needed** | Texas-specific statutes, deadlines, limits, program names |
| **Disclaimers required** | Insurance / legal / financing / general |
| **Internal links to include** | Which TPH pages to link to and why |
| **Competing pages** | 2–3 URLs of existing high-ranking content on this topic |
| **Estimated word count** | Minimum target |
| **Schema types** | Article, FAQPage, HowTo, etc. |
| **Spanish version needed?** | Yes / No / Later |

---

## 3. Draft Generation

### AI-Assisted Drafts
When using an AI tool (Claude or similar) to generate content:

1. Provide the complete research brief as context
2. Specify the site's disclaimer requirements explicitly — TPH is not a contractor, insurer, law firm, lender, or public adjuster
3. Request factual citations inline so reviewers can verify claims
4. Request schema markup (Article, FAQPage) to be drafted alongside content
5. Do not publish AI-generated content without human review (see Section 4)

### Draft File Location
Draft content lives in `/content/drafts/[slug].md` (or inline in the page file for standalone guides).

### Draft Checklist (writer/AI)
Before submitting for review:
- [ ] Covers all key questions from the brief
- [ ] All Texas-specific facts are sourced (cite TDI, TDLR, Texas Insurance Code, etc.)
- [ ] Disclaimer included and accurate
- [ ] No fake credentials, testimonials, guarantees, or specific outcome claims
- [ ] Internal links drafted and plausible hrefs included
- [ ] FAQ section with 5–8 questions drafted
- [ ] CTA to /request-help included
- [ ] Word count meets minimum target
- [ ] Schema (Article + FAQ where applicable) drafted

---

## 4. Human Review

Every guide must be reviewed by a human before publication. AI drafts require additional scrutiny.

### Reviewer Responsibilities
- Verify every factual claim, statute reference, and deadline independently
- Confirm no language implies TPH is a licensed professional or service provider
- Check for AI hallucinations (plausible-sounding but inaccurate facts)
- Evaluate tone: helpful and honest, not alarmist or promotional
- Confirm the guide actually answers the stated questions in the brief

### Review Sign-off
Record the reviewer's name/initials and date in the guide's `GuideCard.reviewedBy` field (available in the `ContentMeta` type in `src/types/index.ts`).

---

## 5. SEO QA

Run this checklist before publishing:

**On-page**
- [ ] Title tag (50–60 chars) contains primary keyword
- [ ] Meta description (140–155 chars) contains primary keyword and a value statement
- [ ] H1 matches or closely mirrors the title tag
- [ ] H2s address secondary keywords and key questions
- [ ] Primary keyword appears in first 100 words of body content
- [ ] Image alt text if any images are added

**Technical**
- [ ] `pageAlternates()` called correctly with the guide's EN and ES paths
- [ ] `lastUpdated` date is accurate
- [ ] Article schema present with `datePublished` and `dateModified`
- [ ] FAQPage schema present (via `<FAQ includeSchema={true} />` component)
- [ ] Guide is in `src/lib/guides.ts` so it appears in sitemap and /guides listing
- [ ] No canonical conflicts (check `alternates.canonical` output)

**Content**
- [ ] Reading level is accessible (aim for Grade 9–11)
- [ ] No duplicate content from other TPH pages
- [ ] Internal links are naturally placed and contextually relevant

---

## 6. Legal / Compliance QA

Texas Property Help is an informational and referral platform. Every published guide must pass this check:

- [ ] No claim that TPH is or works with a licensed contractor, adjuster, insurer, attorney, or lender
- [ ] No guarantee of outcomes (approval, coverage, financing, settlement amounts)
- [ ] Disclaimer box present using the correct type (`insurance` / `legal` / `financing` / `general`)
- [ ] Any Texas statutes referenced are accurate and cite the correct code section
- [ ] No advice telling a user to take a specific legal or financial action — only explaining options and recommending they consult appropriate professionals
- [ ] Contractor fraud warnings (deductible waiver, AOB) are legally accurate for Texas
- [ ] Content does not constitute the practice of law, insurance adjustment, or financial advising

If any compliance concern is flagged, pause publication and resolve before proceeding.

---

## 7. Internal Linking QA

- [ ] Every guide links to at least 2 other TPH pages (service pages or other guides)
- [ ] The `/request-help` page is linked at least once (CTA)
- [ ] No orphan guide — it is reachable from the /guides listing and at least one service page
- [ ] Consider adding a link to this guide from any related existing service pages or guides
- [ ] Check that linked pages actually exist and are not redirects or 404s

After publishing, manually add a contextual link to the new guide from any existing pages where it would add value.

---

## 8. Publish Checklist

Before merging to main and deploying:

- [ ] Research brief is complete
- [ ] Draft checklist passed
- [ ] Human review signed off
- [ ] SEO QA passed
- [ ] Legal/compliance QA passed
- [ ] Internal linking QA passed
- [ ] Guide added to `src/lib/guides.ts` with correct status, category, readTime, and lastUpdated
- [ ] Guide added to `src/lib/metadata.ts` slug maps if a Spanish version exists or is planned
- [ ] `npm run build` passes with no errors
- [ ] Deployed to preview URL — spot check rendering on mobile and desktop
- [ ] No console errors in browser

---

## 9. Submit to Google / Bing / AI Search Engines

After deploying to production:

**Google Search Console**
1. Navigate to the property for texaspropertyhelp.com
2. Use the URL Inspection tool: paste the new guide URL
3. Click "Request Indexing"
4. Record the submission date

**IndexNow (Bing, Yandex, and AI-connected engines)**

The site has an IndexNow endpoint at `/api/indexnow`. Submit new or updated URLs immediately after deployment:

```bash
curl -X POST https://texaspropertyhelp.com/api/indexnow \
  -H "Authorization: Bearer <INDEXNOW_SUBMIT_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"urls":["/guides/your-new-guide-slug", "/es/guides/tu-guia-nueva"]}'
```

Prerequisites (one-time setup):
1. Generate a hex key: `openssl rand -hex 16`
2. Set `INDEXNOW_KEY` and `INDEXNOW_SUBMIT_SECRET` in Vercel environment variables
3. Verify the key is accessible at `https://texaspropertyhelp.com/api/indexnow-key`

**Sitemap ping** (optional, for bulk updates)
- The sitemap at `/sitemap.xml` is auto-generated from `getPublishedGuides()`. No manual update needed.
- Bing: `https://www.bing.com/ping?sitemap=https://texaspropertyhelp.com/sitemap.xml`

---

## 10. Performance Tracking

### Week 1 (post-publish)
- Confirm URL is indexed: use Google Search Console URL Inspection
- Check for crawl errors in GSC Coverage report
- Verify GA4 is receiving sessions to the new URL

### Month 1
- Google Search Console: check Impressions and Clicks for the guide URL
- Identify the top queries the guide is appearing for
- Note average position — anything below position 20 for target keyword is worth investigating

### Month 2–3
- Is the guide ranking in positions 1–10 for any queries? Note them.
- Are users bouncing quickly (low engagement rate in GA4)? Consider expanding thin sections.
- Are users clicking internal links to /request-help or other service pages?

### Ongoing Metrics to Track in GA4
| Metric | Target |
|--------|--------|
| Sessions to guide | Trending up month-over-month |
| Engagement rate | >50% |
| Average engagement time | >90 seconds |
| Clicks to /request-help from guide | Track as a conversion event |
| Scroll depth | >60% reaching bottom of article |

### GA4 Conversion Event (manual setup required)
In GA4, create a custom event to track clicks on `/request-help` links that originate from guide pages:
- Event name: `guide_cta_click`
- Trigger: click on links with `href` containing `/request-help` where page path contains `/guides/`

### Search Console Reporting Cadence
- Weekly: check for new impressions on new guide URLs
- Monthly: review ranking position changes for all guide slugs
- Quarterly: audit lowest-performing guides for update or expansion

---

## Appendix: Content Categories and Intended Guides

| Category | Slug pattern | Examples |
|----------|-------------|---------|
| `storm-damage` | `[action]-after-[event]-texas` | What to do after hail damage |
| `insurance-claims` | `[process]-[claim-type]-[action]` | Roof insurance claim timeline |
| `roofing` | `[topic]-roofing-texas` | How to choose a roofing contractor |
| `hvac` | `[topic]-hvac-texas` | When to repair vs replace HVAC |
| `financing` | `[financing-type]-texas-homeowners` | Home equity options for repairs |
| `emergency-repair` | `emergency-[situation]-steps` | Emergency roof leak steps |

---

---

## Appendix: Standalone Guide Template Structure

Use this structure for new standalone authority guides (e.g., `texas-hail-damage-homeowner-checklist`):

**File location:** `src/app/(en)/guides/[slug]/page.tsx`

**Minimum required sections:**
1. Hero section — navy bg, badge, H1, short description, primary CTA button
2. Lead body — article content using `.article-body` CSS class for readable typography
3. Tables — use `.article-table` class, `<th scope="col">` for accessibility
4. Scam/fraud warning (where applicable) — use `<DisclaimerBox type="general" />`
5. FAQ — use `<FAQ items={faqs} heading="..." includeSchema={true} />` for FAQPage schema
6. CTA section — use `<CTASection />` component

**Required schema markup (inline in page.tsx):**
```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "...",
  datePublished: "YYYY-MM-DD",
  dateModified: "YYYY-MM-DD",
  author: { "@type": "Organization", name: "Texas Property Help" },
  publisher: { "@type": "Organization", name: "Texas Property Help", url: "https://texaspropertyhelp.com" },
};
```

**Required in `src/lib/guides.ts`:**
- Add entry with `standalonePageExists: true`
- Set `lastUpdated` to the ISO date of publication

**Required in `src/lib/metadata.ts`:**
- Add EN↔ES slug pair to `GUIDE_SLUG_EN_TO_ES` if a Spanish version exists or is planned

---

*This document is maintained by the site owner. Update it when the pipeline process changes.*
