# GŌKAI — Brand Assets

This directory contains the official brand assets for GŌKAI – Associação Esportiva e Ambiental.

## Files

| File | Format | Usage |
|------|--------|-------|
| `gokai-mark.svg` | SVG 192×192 | Emblem/icon — standalone circular mark |
| `gokai-wordmark.svg` | SVG 272×56 | Text wordmark — "GŌKAI" only |
| `gokai-logo-dark.svg` | SVG 320×400 | Full logo on dark green background |
| `gokai-logo-light.svg` | SVG 320×400 | Full logo on off-white background |

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Green (primary) | `#0B5A2B` | Institutional color — dominant |
| Red (secondary) | `#CF2E24` | Highlights, CTAs, energy accents |
| Lime (accent) | `#7AC943` | Nature balance, secondary accents |
| Off-white | `#F7F6F2` | Page background, text on dark |
| Ink | `#123020` | Body text, dark elements |

## Typography

| Role | Font | Weight |
|------|------|--------|
| Headings / Wordmark | Montserrat | 700–900 |
| Body / UI | Manrope | 400–700 |

## Usage in Code

The site uses **inline SVG React components** — no external file loading.
See `src/components/branding/brand-svg.tsx` for the implementation.

```tsx
import { GokaiMarkSvg, GokaiWordmarkSvg } from "@/components/branding/brand-svg"
import { BrandLogo, BrandMark, BrandWordmark } from "@/components/branding/brand-logo"

// Circular mark (h/w controlled by className)
<BrandMark className="h-10 w-10 rounded-xl" />

// Text wordmark (color via text-* class)
<BrandWordmark className="h-7 w-auto text-white" />

// Flexible by variant
<BrandLogo variant="mark" className="h-[18rem] w-[18rem]" />
```

## Brand Essence

> Disciplina. Honra. Tradição marcial. Força controlada.

The GŌKAI mark depicts a samurai kneeling in meditation with katana raised,
the rising red sun behind, and a green leaf as the symbol of nature and balance.
