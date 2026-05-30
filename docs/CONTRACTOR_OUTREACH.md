# Contractor Outreach System — Texas Property Help

## Goal
Attract qualified Texas roofing, HVAC, and restoration contractors to the platform.
Target: 10 approved contractors in 30 days across Houston, San Antonio, Dallas, Austin.

---

## Email Template A — Cold Outreach (EN)

**Subject:** Get Homeowner Leads in [CITY] — Texas Property Help

Hi [NAME],

I came across [COMPANY] and wanted to reach out directly.

We run Texas Property Help (texaspropertyhelp.com) — a homeowner assistance platform that connects Texas homeowners with qualified contractors after storm damage, roofing issues, HVAC failures, and insurance claims.

**What we offer contractors:**
- Pre-qualified homeowner leads in your service area
- No monthly fees — pay only when we send a lead
- Bilingual platform (EN/ES) — access to Hispanic homeowners in Texas
- Simple online contractor portal to manage your leads

We're currently expanding our contractor network in [CITY] and have open capacity for [TRADE] contractors.

Interested? Apply at: https://texaspropertyhelp.com/for-professionals

Or reply here and I'll walk you through it in 5 minutes.

Best,
Viktor
Texas Property Help
help@texaspropertyhelp.com

---

## Email Template B — After Storm Event (EN) — HIGH PRIORITY

**Subject:** [STORM NAME] Leads Available — [CITY] Area Roofers Needed

Hi [NAME],

Following [recent storm] in [CITY], we're receiving homeowner requests for roof inspections and repairs that we can't currently fulfill — our contractor network in [CITY] is at capacity.

If your team is available and licensed in Texas, we'd like to add you to our network immediately.

**Quick facts:**
- We've received [X] homeowner requests in [CITY] this week
- We need licensed roofers who can do insurance-related work
- You receive leads directly — no middleman on the job
- Apply takes 5 minutes: texaspropertyhelp.com/for-professionals

Let me know if you have capacity this week.

Viktor
Texas Property Help

---

## Email Template C — Spanish (Para contratistas hispanos)

**Asunto:** Reciba referidos de propietarios en [CIUDAD] — Texas Property Help

Hola [NOMBRE],

Vi el trabajo de [EMPRESA] y quería contactarle directamente.

Manejamos Texas Property Help (texaspropertyhelp.com/es) — una plataforma bilingüe que conecta propietarios de viviendas en Texas con contratistas calificados después de daños por tormenta, problemas de techo, fallas de HVAC y reclamaciones de seguros.

**Lo que ofrecemos:**
- Referidos de propietarios pre-calificados en su área
- Sin cuotas mensuales
- Plataforma en español — acceso a la comunidad hispana de Texas
- Portal de contratista simple para gestionar sus referidos

Estamos expandiendo nuestra red en [CIUDAD] y tenemos capacidad para contratistas de [OFICIO].

¿Le interesa? Aplique en: https://texaspropertyhelp.com/es/para-profesionales

O responda aquí y le explico en 5 minutos.

Saludos,
Viktor
Texas Property Help

---

## Where to Find Contractors (Sources for GrymmanOps)

### Online directories to scrape/search:
1. **Google Maps** — search "roofing contractor [city] TX" — get name, phone, website
2. **Yelp** — https://www.yelp.com/search?find_desc=roofing&find_loc=Houston+TX
3. **Angi (formerly Angie's List)** — angi.com/companylist/us/tx/
4. **HomeAdvisor** — homeadvisor.com
5. **BBB Texas** — bbb.org/local/0825-1 (San Antonio) — pre-verified businesses
6. **NRCA Member Directory** — nrca.net/roofing-resources/member-directory
7. **ACCA HVAC** — acca.org/find-a-contractor

### Texas-specific:
- **RCAT** (Roofing Contractors Association of Texas) — rcat.org
- **TACA** (Texas Air Conditioning & Heating) — members list
- **Texas REALTORS vendor directory** — connects to home service pros

### Social media:
- Facebook Groups: "Houston Roofing Contractors", "DFW Home Contractors"
- Nextdoor Business — Texas homeowner communities
- LinkedIn: search "roofing contractor Texas owner"

---

## GrymmanOps Automation Script (n8n workflow concept)

```
TRIGGER: Every Monday 9am CT

STEP 1 — Find contractors:
  - Google Maps API: search roofing/HVAC contractors in [Houston, Dallas, San Antonio, Austin]
  - Filter: rating >= 4.0, reviews >= 10, has website
  - Extract: company name, email (from website), phone, city

STEP 2 — Check against Supabase:
  - Query contractors table WHERE email = found_email
  - Skip if already in database

STEP 3 — Send outreach email via Resend:
  - Use Template A (EN) or Template C (ES) based on company language signals
  - Track: sent_at, source

STEP 4 — Follow up (Day 4):
  - If no response AND no contractor signup → send 1 follow-up
  - Subject: "Following up — homeowner leads in [CITY]"

STEP 5 — Log to Supabase:
  - outreach_log table: company, email, sent_at, template, city, status
```

---

## Target: 10 Contractors in 30 Days

| Week | Goal | Action |
|------|------|--------|
| Week 1 | 50 emails sent | GrymmanOps finds & emails Houston + SA contractors |
| Week 2 | 10 replies | Follow up + Dallas/Austin batch |
| Week 3 | 5 applications | Review + approve 3-5 contractors |
| Week 4 | 10 approved | Full network active, leads flowing |

---

## Approval Criteria (for admin review)

- [ ] Texas contractor license (check TDLR.texas.gov)
- [ ] Valid liability insurance ($1M minimum)
- [ ] Service area covers at least 1 major Texas city
- [ ] 4.0+ Google rating OR 3+ verifiable references
- [ ] Agrees to platform terms
