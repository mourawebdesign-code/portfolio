# Image slot manifest

Every image box in the layout is rendered by `components/ui/Media.tsx`. Each one
currently draws a neutral placeholder at the **exact aspect ratio and crop
position** the layout reserves, so composition and vertical rhythm already match
the reference. Nothing is stretched — `object-fit: cover` plus the listed
`focal` value handles the crop once a real file is supplied.

## How to fill a slot

```tsx
<Media id="hero-portrait" ratio="429 / 466" src="/images/portrait.jpg" alt="…" />
```

Drop files into `public/images/` and pass `src`. The `ratio` and `focal` props
should stay as listed below — they are what keeps the layout faithful.

## Slots

| id | ratio | focal | Where it appears |
|---|---|---|---|
| `hero-portrait` | 429 / 466 | 50% 22% | Hero, centre card — clinician portrait with the "How can I help you?" pill |
| `hero-treatment` | 444 / 482 | 50% 45% | Hero, right card — treatment photo behind the copy + "Find Consultation" |
| `journey-feature` | 4 / 3 | 50% 40% | Our Journey — large team photo carrying the "400+ Expert Doctors" badge |
| `journey-stat-1` | 1 / 1 | centre | Our Journey — image under "Year Of Experience" |
| `journey-stat-2` | 1 / 1 | centre | Our Journey — image under "Happy Patients" |
| `journey-stat-3` | 1 / 1 | centre | Our Journey — image under "Professional Dentist" |
| `solution-1..4` | 327 / 200 | centre | Our Solutions — card thumbnails in the auto-scrolling rail |
| `case-1..8` | 416 / 373 | centre | Success Stories — two-column case grid |
| `appointment-bg` | 16 / 9 | 50% 40% | Appointment — full-bleed background plate behind the dark scrim |
| `appointment-side` | 550 / 560 | centre | Appointment — left media column above the phone card |
| `avatar-1..3` | 1 / 1 | centre | Testimonials — author avatars |
| `emergency-bg` | 16 / 7 | 70% 40% | Emergency CTA — full-bleed background plate |
| `blog-1..3` | 439 / 500 | centre | Latest Blogs — post thumbnails |

## Not reproduced from the reference

The reference's photographs and its longer descriptive prose belong to the
template's author and are not copied here. Short functional strings — navigation
labels, button text, form field labels, section eyebrows and headings — are kept
as-is so the structure reads the same. Descriptive paragraphs are placeholder
copy written to the same length so line counts and block heights match.

The hero backdrop is the one photographic element rebuilt rather than reserved:
the reference uses a photographic sky-blue plate, reproduced here as an
equivalent CSS gradient (`components/sections/Hero.module.css` → `.backdrop`).
Swap it for a real image if you want the exact texture.
