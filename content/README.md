# Content Directory

This directory stores content item metadata files. All content is human-reviewed before publishing.

## Folder Structure

```
content/
  guides/         # Homeowner guides (step-by-step, reference)
  news/           # Storm alerts, local news updates
  procedures/     # Insurance and claim procedure updates
  service-pages/  # Local service area pages (Austin, Houston, etc.)
```

## Content Metadata Schema

Each content item has a `.json` metadata file. See `src/types/index.ts` for the full `ContentMeta` type.

Required fields:
- `title` — Page/article title
- `slug` — URL-safe identifier (e.g. `what-to-do-after-hail-damage`)
- `description` — SEO meta description (140–160 chars)
- `category` — One of: storm-damage, roofing, hvac, insurance-claims, financing, emergency-repair, general
- `language` — `en` or `es`
- `lastUpdated` — ISO date string (YYYY-MM-DD)
- `status` — `draft` | `review` | `published`

Optional but recommended:
- `reviewedBy` — Human reviewer name or ID (required before publishing)
- `sourceNotes` — Where facts came from
- `disclaimerRequired` — true if legal/insurance disclaimer needed
- `region` — Geographic scope ("Texas", "Austin", etc.)
- `tags` — Array of topic tags

## Content Workflow

```
AI or staff drafts content
        ↓
status: "draft"
        ↓
Human edits and reviews for accuracy
        ↓
status: "review"
        ↓
Final human approval — reviewedBy is populated
        ↓
status: "published"
        ↓
Guide appears on website
```

**IMPORTANT**: No content with `status: "draft"` or `status: "review"` should be served publicly.
The `getPublishedGuides()` function in `src/lib/guides.ts` controls what appears on the site.

## Adding a New Guide

1. Create a metadata file: `content/guides/your-slug.json`
2. Add the guide entry to `src/lib/guides.ts`
3. Add guide content to `src/app/guides/[slug]/page.tsx` (v1) OR create an MDX file (future)
4. Set `status: "published"` only after human review
5. Populate `reviewedBy` with the reviewer's name/ID

## Future: MDX Content

As the content library grows, migrate guide body content from inline code to MDX files:
- `content/guides/your-slug.mdx`
- Use `next-mdx-remote` or `@next/mdx` to render
- Metadata stays in `.json` file or as frontmatter in the `.mdx` file
