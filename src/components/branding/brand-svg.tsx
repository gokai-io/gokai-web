/**
 * GŌKAI Brand SVG Components
 *
 * Redesigned to faithfully match the official GŌKAI brand guide.
 *
 * Logo composition (from brand guide):
 *  - Kneeling samurai silhouette with raised katana (blade goes upper-left)
 *  - Red rising sun circle with radiating rays behind the samurai
 *  - Green leaf cluster to the upper-right
 *  - Dark green background for the badge/mark icon variant
 *
 * Font: Outfit (brand guide spec) — loaded via next/font in layout.tsx
 */

import { useId } from "react"
import { cn } from "@/lib/utils"

// ─── GŌKAI Mark ────────────────────────────────────────────────────────────────
// Circular badge version of the mark for header, favicon and icon contexts.
// Composition: dark green bg → red sun with rays → samurai silhouette → green leaves.

export function GokaiMarkSvg({ className }: { className?: string }) {
  const uid = useId()
  const clipId = `${uid}-clip`
  const bgId   = `${uid}-bg`
  const sunId  = `${uid}-sun`

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
        {/* Clip everything to inner circle */}
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>

        {/* Background gradient — richer green at center-top */}
        <radialGradient id={bgId} cx="44%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#1A6E38" />
          <stop offset="60%"  stopColor="#0E5628" />
          <stop offset="100%" stopColor="#083A18" />
        </radialGradient>

        {/* Sun — warm red with bright core */}
        <radialGradient id={sunId} cx="36%" cy="30%" r="60%">
          <stop offset="0%"   stopColor="#E83838" />
          <stop offset="100%" stopColor="#B82020" />
        </radialGradient>
      </defs>

      {/* ── Outer border ── */}
      <circle cx="100" cy="100" r="100" fill="#0A4820" />

      {/* ── Background fill ── */}
      <circle cx="100" cy="100" r="96" fill={`url(#${bgId})`} />

      {/* ── Subtle ring ── */}
      <circle cx="100" cy="100" r="93" fill="none" stroke="rgba(247,246,242,0.12)" strokeWidth="1" />

      {/* ── All content clipped to circle ── */}
      <g clipPath={`url(#${clipId})`}>

        {/* ──────── SUN RAYS ──────── */}
        {/* 12 rays from sun centre (94, 100) — behind everything */}
        <g transform="translate(94,100)" opacity="0.55">
          {([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as const).map((deg) => (
            <line
              key={deg}
              x1="0" y1="-50"
              x2="0" y2="-84"
              stroke="#CF2E24"
              strokeWidth={deg % 90 === 0 ? 2 : 1.2}
              strokeLinecap="round"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* ──────── SUN DISC ──────── */}
        <circle cx="94" cy="100" r="44" fill={`url(#${sunId})`} />
        {/* Sun specular highlight */}
        <ellipse cx="82" cy="88" rx="12" ry="10" fill="rgba(255,255,255,0.14)" />

        {/* ──────── GREEN LEAF CLUSTER (upper right) ──────── */}
        {/*
          Three pointed leaves on a branch, positioned upper-right.
          They partially overlap the sun circle for a natural feel.
        */}
        <g opacity="0.95">
          {/* Branch stem */}
          <path
            d="M 156,88 C 158,74 160,58 155,38"
            stroke="#5DAE22"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Leaf 3 — lower */}
          <ellipse
            cx="153" cy="82"
            rx="18" ry="6"
            fill="#7AC943"
            transform="rotate(-22 153 82)"
          />
          {/* Leaf 2 — middle */}
          <ellipse
            cx="160" cy="62"
            rx="18" ry="6"
            fill="#8ED94E"
            transform="rotate(-44 160 62)"
          />
          {/* Leaf 1 — upper */}
          <ellipse
            cx="157" cy="42"
            rx="16" ry="5.5"
            fill="#7AC943"
            transform="rotate(-62 157 42)"
          />
        </g>

        {/* ──────── SAMURAI SILHOUETTE ──────── */}
        {/*
          Kneeling samurai in cream/off-white, in front of the sun.
          The figure faces slightly left; right arm is raised holding the katana
          so the blade extends toward the upper-left of the composition.
        */}

        {/* Head */}
        <circle cx="90" cy="52" r="13" fill="#F7F6F2" />

        {/* Topknot / chonmage */}
        <ellipse cx="90" cy="37" rx="4" ry="8" fill="#F7F6F2" />

        {/* ── Right arm raised with katana (goes upper-left) ── */}
        {/* Arm/sleeve from shoulder */}
        <path
          d="M 80,66 C 74,60 68,54 60,46"
          stroke="#F7F6F2"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />

        {/* Katana grip / tsuka */}
        <line
          x1="60" y1="46"
          x2="52" y2="38"
          stroke="#F7F6F2"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Katana guard / tsuba — perpendicular to blade */}
        <line
          x1="56" y1="50"
          x2="64" y2="42"
          stroke="#F7F6F2"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Katana blade — long diagonal going upper-left */}
        <path
          d="M 52,38 C 44,30 34,20 22,8"
          stroke="#F7F6F2"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Blade tip — slightly narrower */}
        <line
          x1="22" y1="8"
          x2="18" y2="4"
          stroke="rgba(247,246,242,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ── Kimono / body (wide flowing shape) ── */}
        {/*
          Wide at the shoulders, flowing down to the kneeling hakama base.
          Deliberately asymmetric — left side (raised arm) is higher than right.
        */}
        <path
          d="
            M 80,64
            C 94,62 104,64 108,68
            C 112,72 112,82 110,96
            L 114,128
            L 122,156
            L 55,156
            L 62,128
            L 66,96
            C 64,82 64,72 68,68
            C 70,65 76,65 80,64
            Z
          "
          fill="#F7F6F2"
        />

        {/* Left arm — alongside body */}
        <path
          d="M 68,72 L 58,90"
          stroke="#F7F6F2"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Obi / belt — thin red accent at waist */}
        <line
          x1="68" y1="110"
          x2="110" y2="110"
          stroke="#CF2E24"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ── Kneeling legs / seiza base ── */}
        <path
          d="M 50,158 L 128,158 L 132,176 C 130,182 46,182 44,176 Z"
          fill="#F7F6F2"
          opacity="0.92"
        />

        {/* Subtle ground shadow */}
        <ellipse
          cx="88" cy="182"
          rx="36" ry="6"
          fill="rgba(4,16,8,0.35)"
        />

      </g>
    </svg>
  )
}

// ─── GŌKAI Wordmark ────────────────────────────────────────────────────────────
// "GŌKAI" in Outfit SemiBold — the official brand typeface.
// Uses currentColor so it adapts to any text-* parent class.
// Size with h-XX className — width auto-scales from the viewBox aspect ratio.

export function GokaiWordmarkSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 58"
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
          fontSize: "52px",
          letterSpacing: "2px",
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
