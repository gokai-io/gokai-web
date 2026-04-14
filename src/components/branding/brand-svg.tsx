/**
 * GŌKAI Brand SVG Components
 *
 * Redesigned to faithfully replicate the official GŌKAI brand guide.
 *
 * Logo composition (from gokai-branding.png):
 *  - Samurai in left-facing 3/4 profile, right arm raised with katana going upper-left
 *  - Flowing kimono body with wide seiza (kneeling) base
 *  - Large red rising sun disc with radiating rays, centered behind the figure
 *  - Green leaf cluster upper-right, overlapping the sun
 *  - Dark green background for the badge/icon variant
 *
 * Fonts: Outfit (brand spec) + Montserrat fallback
 */

import { useId } from "react"
import { cn } from "@/lib/utils"

// ─── GŌKAI Mark — circular badge icon ─────────────────────────────────────────
// Used in header, favicons, and anywhere a compact square/circular mark is needed.

export function GokaiMarkSvg({ className }: { className?: string }) {
  const uid = useId()
  const bgId  = `${uid}-bg`
  const sunId = `${uid}-sun`

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      aria-label="Marca GŌKAI"
      role="img"
    >
      <defs>
        {/* Background — rich dark green, lighter at top-center */}
        <radialGradient id={bgId} cx="46%" cy="28%" r="72%">
          <stop offset="0%"   stopColor="#1C6E38" />
          <stop offset="55%"  stopColor="#0D5228" />
          <stop offset="100%" stopColor="#083A18" />
        </radialGradient>

        {/* Sun — bright warm red with highlight */}
        <radialGradient id={sunId} cx="32%" cy="26%" r="62%">
          <stop offset="0%"   stopColor="#E83030" />
          <stop offset="100%" stopColor="#B81E18" />
        </radialGradient>

        {/* Clip to inner circle */}
        <clipPath id={`${uid}-clip`}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
      </defs>

      {/* ── Outer border ring ── */}
      <circle cx="100" cy="100" r="100" fill="#094020" />

      {/* ── Background fill ── */}
      <circle cx="100" cy="100" r="97" fill={`url(#${bgId})`} />

      {/* ── Subtle inner ring ── */}
      <circle cx="100" cy="100" r="93" fill="none" stroke="rgba(247,246,242,0.10)" strokeWidth="1" />

      {/* ── Clipped content ── */}
      <g clipPath={`url(#${uid}-clip)`}>

        {/* ──── SUN RAYS (12, behind everything) ──── */}
        {/* Centered at (90, 102) — slightly left+down so samurai overlaps naturally */}
        <g transform="translate(90,102)" opacity="0.55">
          {([0,30,60,90,120,150,180,210,240,270,300,330] as const).map((deg) => (
            <line
              key={deg}
              x1="0" y1="-50" x2="0" y2="-84"
              stroke="#CF2E24"
              strokeWidth={deg % 90 === 0 ? 2.2 : 1.4}
              strokeLinecap="round"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* ──── SUN DISC ──── */}
        <circle cx="90" cy="102" r="46" fill={`url(#${sunId})`} />
        {/* Specular highlight — top-left of disc */}
        <ellipse cx="76" cy="88" rx="13" ry="11" fill="rgba(255,255,255,0.14)" />

        {/* ──── GREEN LEAVES (upper right, overlapping sun) ──── */}
        {/*
          Three smooth pointed leaves on a curved stem — faithful to brand guide.
          Positioned upper-right of the composition.
        */}
        <g opacity="0.95">
          {/* Stem — curves from lower to upper */}
          <path
            d="M 152,82 C 154,68 156,52 150,34"
            stroke="#5DAE22"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Leaf bottom */}
          <ellipse
            cx="150" cy="76" rx="20" ry="6.5"
            fill="#7AC943"
            transform="rotate(-20 150 76)"
          />
          {/* Leaf middle */}
          <ellipse
            cx="158" cy="57" rx="20" ry="6.5"
            fill="#8BD944"
            transform="rotate(-42 158 57)"
          />
          {/* Leaf top */}
          <ellipse
            cx="153" cy="38" rx="17" ry="5.5"
            fill="#7AC943"
            transform="rotate(-62 153 38)"
          />
        </g>

        {/* ──── SAMURAI SILHOUETTE ──── */}
        {/*
          Left-facing profile (3/4 view), right arm raised with katana.
          Katana blade extends upper-left. Wide seiza base.
          Cream/off-white (#F5F3EE) to pop off the red sun and green background.
        */}

        {/* Head */}
        <circle cx="88" cy="50" r="13" fill="#F5F3EE" />

        {/* Topknot / chonmage */}
        <path
          d="M 84,38 C 83,30 87,24 88,24 C 89,24 93,30 92,38 Z"
          fill="#F5F3EE"
        />

        {/* ── Raised right arm — thick smooth stroke from shoulder to grip ── */}
        {/* The arm goes from the upper-left of the torso to the katana handle */}
        <path
          d="M 78,67 C 72,60 66,53 58,45"
          stroke="#F5F3EE"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Katana handle / tsuka ── */}
        <line
          x1="58" y1="45" x2="50" y2="36"
          stroke="#F5F3EE"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* ── Katana guard / tsuba — perpendicular cross at handle ── */}
        {/* Blade direction is roughly (-1,-1) so perpendicular is (1,-1) */}
        <line
          x1="54" y1="49" x2="62" y2="41"
          stroke="#F5F3EE"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* ── Katana blade — long diagonal to upper-left ── */}
        <path
          d="M 50,36 C 42,28 32,18 20,6"
          stroke="#F5F3EE"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Fine tip */}
        <line
          x1="20" y1="6" x2="16" y2="2"
          stroke="rgba(245,243,238,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ── Main body — flowing kimono + hakama silhouette ── */}
        {/*
          Wide shoulders tapering slightly at waist, then flaring into the
          hakama (traditional trousers). The left side of the torso is where
          the raised arm connects — it's slightly indented there.
          The seiza base creates a wide rounded rectangle at the bottom.
        */}
        <path
          d="
            M 88,62
            C 102,62 114,66 117,76
            L 120,110
            L 125,138
            L 130,165
            C 130,174 58,174 56,165
            L 60,138
            L 65,110
            L 68,76
            C 70,66 76,62 88,62
            Z
          "
          fill="#F5F3EE"
        />

        {/* ── Left arm — beside body, at rest ── */}
        <path
          d="M 68,76 L 58,94"
          stroke="#F5F3EE"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Obi — red belt accent at waist ── */}
        <line
          x1="68" y1="114" x2="120" y2="114"
          stroke="#CF2E24"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* ── Ground shadow ── */}
        <ellipse
          cx="93" cy="174"
          rx="34" ry="6"
          fill="rgba(4,18,8,0.32)"
        />

      </g>
    </svg>
  )
}

// ─── GŌKAI Wordmark ────────────────────────────────────────────────────────────
// "GŌKAI" in Outfit 700 — official brand typeface (brand guide spec).
// Uses currentColor — set text color via parent class (text-white, text-foreground, etc.).

export function GokaiWordmarkSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 310 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block w-auto", className)}
      overflow="visible"
      role="img"
      aria-label="GŌKAI"
    >
      <text
        x="2"
        y="48"
        style={{
          fontFamily:
            'var(--font-outfit, var(--font-montserrat, "Outfit", "Montserrat", system-ui, sans-serif))',
          fontWeight: 700,
          fontSize: "50px",
          letterSpacing: "3px",
        }}
        fill="currentColor"
      >
        GŌKAI
      </text>
    </svg>
  )
}

// ─── Full logo: mark + wordmark stacked ────────────────────────────────────────

export function GokaiFullLogoSvg({
  className,
  dark = false,
  markSize = "h-28 w-28",
}: {
  className?: string
  dark?: boolean
  markSize?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3",
        dark ? "text-white" : "text-foreground",
        className
      )}
      role="img"
      aria-label="GŌKAI — Associação Esportiva e Ambiental"
    >
      <GokaiMarkSvg className={markSize} />
      <GokaiWordmarkSvg className="h-8 w-auto" />
    </div>
  )
}
