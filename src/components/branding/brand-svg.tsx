/**
 * GŌKAI Brand SVG Components
 *
 * Inline SVG components — no external images, no broken references.
 * Scale perfectly from 32px icons to full-page hero displays.
 *
 * Each instance gets unique SVG IDs via React's useId() so multiple marks
 * on the same page never share gradient / clip definitions.
 */

import { useId } from "react"
import { cn } from "@/lib/utils"

// ─── Mark / Emblem ─────────────────────────────────────────────────────────────
// Circular emblem: forest-green background · rising red sun · 8 rays ·
// kneeling samurai with katana · red obi belt · lime-green leaf accent.

export function GokaiMarkSvg({ className }: { className?: string }) {
  const uid = useId()

  // Unique IDs prevent conflicts when multiple marks appear on the same page
  const ids = {
    clip: `${uid}-clip`,
    bg: `${uid}-bg`,
    sun: `${uid}-sun`,
    leaf: `${uid}-leaf`,
  } as const

  return (
    <svg
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      aria-label="Marca GŌKAI"
      role="img"
    >
      <defs>
        {/* Clip to the inner circle */}
        <clipPath id={ids.clip}>
          <circle cx="96" cy="96" r="91" />
        </clipPath>

        {/* Background — deep forest green, lighter at center-top */}
        <radialGradient id={ids.bg} cx="48%" cy="34%" r="70%">
          <stop offset="0%"   stopColor="#1A6838" />
          <stop offset="55%"  stopColor="#0D5028" />
          <stop offset="100%" stopColor="#07361A" />
        </radialGradient>

        {/* Rising sun — warm red with bright core */}
        <radialGradient id={ids.sun} cx="34%" cy="28%" r="62%">
          <stop offset="0%"   stopColor="#E83C3C" />
          <stop offset="60%"  stopColor="#CF2E24" />
          <stop offset="100%" stopColor="#A82218" />
        </radialGradient>

        {/* Leaf — bright lime fading to rich green */}
        <radialGradient id={ids.leaf} cx="30%" cy="25%" r="60%">
          <stop offset="0%"   stopColor="#8ED94E" />
          <stop offset="100%" stopColor="#5DAE22" />
        </radialGradient>
      </defs>

      {/* ── Outer border ring ── */}
      <circle cx="96" cy="96" r="96" fill="#0A4822" />

      {/* ── Green background gradient ── */}
      <circle cx="96" cy="96" r="92" fill={`url(#${ids.bg})`} />

      {/* ── Structural rings ── */}
      <circle cx="96" cy="96" r="89" fill="none" stroke="rgba(247,246,242,0.18)" strokeWidth="1.5" />
      <circle cx="96" cy="96" r="80" fill="none" stroke="rgba(247,246,242,0.06)"  strokeWidth="1" />

      {/* ── All figure content clipped to inner circle ── */}
      <g clipPath={`url(#${ids.clip})`}>

        {/* Sun rays — 8 directions from sun centre (96, 54) */}
        {/* Each ray: template line pointing "up" in local coords, then rotated */}
        <g transform="translate(96,54)" opacity="0.28">
          {([0, 45, 90, 135, 180, 225, 270, 315] as const).map((deg) => (
            <line
              key={deg}
              x1="0" y1="-28"
              x2="0" y2="-64"
              stroke="rgba(247,246,242,0.9)"
              strokeWidth={deg % 90 === 0 ? 1.5 : 1}
              strokeLinecap="round"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Rising sun disc */}
        <circle cx="96" cy="54" r="26" fill={`url(#${ids.sun})`} />
        {/* Specular highlight on sun */}
        <ellipse cx="87" cy="45" rx="9" ry="8" fill="rgba(255,255,255,0.16)" />

        {/* Subtle horizon line */}
        <line x1="20" y1="96" x2="172" y2="96" stroke="rgba(247,246,242,0.09)" strokeWidth="1" />

        {/* ── Katana ── */}
        {/* Blade: gentle curve from grip (101,99) to tip at upper-right */}
        <path
          d="M 101,99 C 112,85 132,64 152,38"
          stroke="#F7F6F2"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Blade tip — finer line, gives depth */}
        <line x1="152" y1="38" x2="157" y2="32"
          stroke="rgba(247,246,242,0.52)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tsuba / guard — perpendicular to blade at ~35% length */}
        <line x1="114" y1="74" x2="123" y2="83"
          stroke="#F7F6F2" strokeWidth="5.5" strokeLinecap="round" />
        {/* Tsuka / handle stub */}
        <line x1="101" y1="99" x2="97" y2="106"
          stroke="#F7F6F2" strokeWidth="3" strokeLinecap="round" />

        {/* ── Samurai figure ── */}
        {/* Head */}
        <circle cx="87" cy="101" r="8" fill="#F7F6F2" />
        {/* Chonmage / topknot */}
        <ellipse cx="87" cy="92" rx="2.5" ry="5" fill="#F7F6F2" />
        {/* Right arm — raising katana */}
        <path d="M 93,105 C 96,103 99,101 101,99"
          stroke="#F7F6F2" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Torso / kimono — trapezoid wider at shoulders */}
        <path
          d="M 74,110 C 74,106 80,104 87,104 C 94,104 100,106 100,110 L 104,134 C 104,136 70,136 70,134 Z"
          fill="#F7F6F2"
        />
        {/* Left arm */}
        <path d="M 76,115 L 67,130"
          stroke="#F7F6F2" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Obi / belt — brand red accent */}
        <line x1="72" y1="124" x2="102" y2="124"
          stroke="#CF2E24" strokeWidth="2.5" strokeLinecap="round" />
        {/* Kneeling legs / seiza base */}
        <path d="M 62,136 L 108,136 L 112,157 C 111,163 63,163 61,157 Z"
          fill="#F7F6F2" opacity="0.92" />
        {/* Ground shadow */}
        <ellipse cx="86" cy="163" rx="24" ry="4.5" fill="rgba(4,18,10,0.3)" />

        {/* ── Leaf accent — lower-left (nature · balance) ── */}
        <g opacity="0.88">
          <ellipse cx="47" cy="143" rx="13" ry="5"
            fill={`url(#${ids.leaf})`} transform="rotate(-38 47 143)" />
          <ellipse cx="37" cy="153" rx="12" ry="4.5"
            fill="#6DC234" transform="rotate(-58 37 153)" />
          <ellipse cx="55" cy="155" rx="11" ry="4"
            fill="#7AC943" transform="rotate(-18 55 155)" />
          {/* Stem */}
          <path d="M 43,159 C 46,150 51,143 47,140"
            stroke="#0B5A2B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

// ─── Wordmark ──────────────────────────────────────────────────────────────────
// "GŌKAI" in Montserrat 900 — uses CSS currentColor so it adapts to any context.
//
// Set text color on this element or a parent:
//   dark bg:  text-white
//   light bg: text-foreground
//
// Size with h-XX — width auto-scales from the viewBox aspect ratio.

export function GokaiWordmarkSvg({ className }: { className?: string }) {
  return (
    <svg
      // Generous viewBox — prevents the heavy bold text from clipping at the right edge
      viewBox="0 0 340 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block w-auto", className)}
      // overflow="visible" lets text render even if it marginally exceeds the viewBox
      overflow="visible"
      role="img"
      aria-label="GŌKAI"
    >
      <text
        x="4"
        y="50"
        style={{
          fontFamily:
            'var(--font-montserrat, "Montserrat", "Arial Black", system-ui, sans-serif)',
          fontWeight: 900,
          fontSize: "54px",
          letterSpacing: "1.5px",
        }}
        fill="currentColor"
      >
        GŌKAI
      </text>
    </svg>
  )
}

// ─── Full logo: emblem + wordmark stacked ──────────────────────────────────────
// Size the wrapper to control how large the logo appears.
// Example: <GokaiFullLogoSvg className="w-40" dark />

export function GokaiFullLogoSvg({
  className,
  dark = false,
  markSize = "h-32 w-32",
}: {
  className?: string
  dark?: boolean
  markSize?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4",
        dark ? "text-white" : "text-foreground",
        className
      )}
      role="img"
      aria-label="GŌKAI — Associação Esportiva e Ambiental"
    >
      <GokaiMarkSvg className={markSize} />
      <GokaiWordmarkSvg className="h-9 w-auto" />
    </div>
  )
}
