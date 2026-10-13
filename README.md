# UPEDGE website

Premium construction company site. Next.js 16 (App Router), TypeScript, Tailwind v4, Motion, Lenis, React Hook Form + Zod, Cloudinary, Resend.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

The site runs without any environment variables: images show as clearly labelled placeholders and the quote form accepts submissions without sending email (development only).

Production build: `npm run build && npm start`.

---

## 1. Where things live

| What you want to change | File |
| --- | --- |
| Colours, radii, spacing, z-index, dark mode | `styles/tokens.css` |
| Company details, nav, stats, differentiators, process, team, values | `data/site.ts` |
| Projects (case studies and photos) | `data/projects.ts` |
| Services | `data/services.ts` |
| Testimonials | `data/testimonials.ts` |
| Blog posts | `data/posts.ts` |
| Quote form dropdown options | `lib/contact-schema.ts` |
| Logo | `components/brand/logo-paths.ts` (generated, see "Logo") |

Anything written in `[BRACKETS]` is an unknown that still needs a real value (`[PHONE]`, `[EMAIL]`, `[ADDRESS LINE 1]`, `[YEAR]`...).

---

## 2. Cloudinary

1. Create a Cloudinary account and copy the **cloud name**, **API key** and **API secret** (Dashboard).
2. Put them in `.env.local`:

   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

   Only the cloud name is public. The key and secret are used on the server only (never prefix them with `NEXT_PUBLIC_`).
3. Every image goes through `components/media/CloudImage.tsx`, which delivers `f_auto` and `q_auto`, a responsive `srcset`, a blur-up preview and lazy loading (the hero and first story frame are preloaded).

### Folder and file naming

```
upedge/
  site/        hero, about-main, about-detail
  team/        01, 02, 03, 04
  services/    residential-construction, commercial-construction, renovation-and-remodelling,
               interiors-and-fit-outs, architectural-planning, project-management
  blog/        home-construction-budget, before-construction, renovate-or-rebuild
  projects/
    {project-slug}/
      01-before
      02-foundation
      03-structure
      04-finishing
      05-final
      06-...     (any number of images, minimum 5, sorted by the number prefix)
```

Upload with **Public ID** set to the path above (no file extension), for example `upedge/projects/courtyard-residence/02-foundation`. Each placeholder on the site prints the exact public ID it expects.

### Switching a placeholder to a real image

* **Site, team, services, blog images:** in the relevant data file, change `placeholder: true` to `placeholder: false` on that image (and set `publicId` if you used a different path).
* **Project photos:** set `status: "live"` on the project in `data/projects.ts`. All of its frames switch to Cloudinary at once. To swap a single photo, change its public ID in the `shots` list (one line per image).

---

## 3. Add a new project

**Manual (default)**

1. Upload the photos to `upedge/projects/{slug}/` named `01-before`, `02-foundation`, ...
2. In `data/projects.ts`, copy an existing `project({...})` entry and change `slug`, `title`, `category`, `location`, `area`, `duration`, `year`, `clientType`, `summary`, `story` and the `shots` list (`[file name, stage label, caption]`).
3. Set `status: "live"`. Optionally set `pair: true` to show the before/after slider (it uses the first and last photo).
4. Add the slug to `featuredSlugs` if it should appear on the home page.

**Automatic (optional): "upload and add one entry"**

1. In `.env.local` set `CLOUDINARY_DISCOVERY=true` (the three Cloudinary variables are required).
2. Add the project entry as above (the `shots` list can be a placeholder, it is ignored once 5 or more images are found).
3. Images are read from the project's Cloudinary asset folder `upedge/projects/{slug}` via the Admin Search API, sorted by filename, and cached for one hour (`lib/cloudinary-discover.ts`). The stage label comes from the file name: `02-foundation` becomes "Foundation". Captions and alt text are read from the image's Cloudinary contextual metadata (`caption`, `alt`) when present.
4. To switch it off again, set `CLOUDINARY_DISCOVERY=false`. Nothing else changes.

This needs your Cloudinary folders to be **asset folders** (the default on new accounts). If you use the legacy "fixed folder" mode, change the search expression in `lib/cloudinary-discover.ts` to `folder="upedge/projects/{slug}"`.

---

## 4. The project "construction story"

On each project page the photos play as one sequence:

* **Scroll mode (desktop default):** a full-height panel stays pinned and changes frame as you scroll, with the stage label, a counter, a segmented progress bar and the caption.
* **Browse mode (always on phones, toggle on desktop):** previous/next buttons, left and right arrow keys, swipe, and a thumbnail strip.
* A fullscreen **lightbox** (zoom, arrows, Esc) and an optional **before/after slider**.

The next frame is always preloaded, and the layout is fixed-height so nothing shifts. Reduced-motion users get instant changes.

---

## 5. Theme and brand

All visual decisions are CSS variables in `styles/tokens.css`, mapped to Tailwind utilities in `app/globals.css` (`bg-paper`, `text-ink`, `bg-accent`, ...).

* Brand accent `#F99F1C` is `--accent`. It is used as a **fill** with near-black text (9.9:1 contrast), never as body text on light backgrounds (use `--accent-deep` for accent-coloured text).
* Typeface is Poppins (set in `app/layout.tsx` via `next/font`, weights 400 and 500).
* Corner radius system: pills for interactive elements, one soft card radius (`--radius-card`) for surfaces.
* **Dark mode** is already defined. Add `data-theme="dark"` to the `<html>` element to preview it (for example, `document.documentElement.dataset.theme = "dark"` in the browser console). Add a toggle later if you want one.

### Logo

The logo is real brand vector data converted from the Illustrator export. To regenerate it (for example, after a logo update):

```bash
node scripts/build-logo.mjs "path/to/folder/with/the/brand/svgs"
```

This rewrites `components/brand/logo-paths.ts`, `app/icon.svg` and `public/brand/*.svg`. The `Logo` component draws the ink in `currentColor` (so it works on light and dark surfaces) and the chevron in `--accent`.

---

## 6. Quote form and email

`POST /api/contact` validates with the same Zod schema as the form, has a honeypot field and a small in-memory rate limit, then sends the email with [Resend](https://resend.com).

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@yourcompany.com
CONTACT_FROM_EMAIL="UPEDGE <quotes@your-verified-domain.com>"
```

Verify the sending domain in Resend first. Without these variables the API returns an error in production (so a lead is never silently lost) and accepts the request without sending in development.

Prefer Nodemailer/SMTP? Replace the `resend.emails.send(...)` call in `app/api/contact/route.ts`; nothing else depends on it.

---

## 7. SEO

* Per-page metadata, canonical URLs, Open Graph and Twitter cards (`lib/seo.ts`). Live project and blog pages use their Cloudinary cover (1200 x 630) as the share image; everything else uses the generated card in `app/opengraph-image.tsx`.
* `sitemap.xml` and `robots.txt` are generated from the data files.
* JSON-LD: Organization + GeneralContractor (sitewide), BreadcrumbList, `CreativeWork` with `ImageObject` (projects), `Service` and `FAQPage` (services), `BlogPosting` (articles). Contact details are only added to the schema once they are real.
* Set `NEXT_PUBLIC_SITE_URL` to the production URL.

---

## 8. Deploy to Vercel

1. Push the project to a Git repository and import it in Vercel (framework preset: Next.js).
2. Add the environment variables from `.env.example` under Project Settings, Environment Variables.
3. Deploy. Set `NEXT_PUBLIC_SITE_URL` to your final domain and redeploy once the domain is attached.
4. Submit `https://your-domain/sitemap.xml` in Google Search Console.

---

## 9. Quality notes

* Lighthouse (mobile, simulated throttling, placeholder content): Accessibility 100, Best Practices 100, SEO 100, Performance 90+ on the home page. Re-run with your real photos, since image weight and dimensions then decide LCP.
* Above-the-fold text uses CSS-only entrances (`components/ui/Rise.tsx`) so the Largest Contentful Paint never waits on JavaScript. Keep real hero images out of `<Reveal>` for the same reason.
* Motion respects `prefers-reduced-motion` everywhere (smooth scrolling, parallax, reveals, story transitions).
* Scripts: `npm run dev`, `npm run build`, `npm start`, `npm run lint`.
