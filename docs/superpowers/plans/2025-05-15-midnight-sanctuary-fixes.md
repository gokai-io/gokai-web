# Midnight Sanctuary Visual Redesign - Task 4 & 5 Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix visual rhythm issues, replace legacy variables, and update typography in `src/app/page.tsx` and related components to align with the "Midnight Sanctuary" (Dark/Immersive) direction.

**Architecture:** Surgical updates to Tailwind classes and CSS variable references in React components.

**Tech Stack:** Next.js, React, Tailwind CSS.

---

### Task 1: Update src/components/branding/institutional-card.tsx

**Files:**
- Modify: `src/components/branding/institutional-card.tsx`

- [ ] **Step 1: Update accent bar colors and surface styles**

Replace legacy variables with new ones:
- `--surface-ink` -> `--surface-obsidian`
- `--accent-red` -> `--accent-carmine`
- `--accent-bronze` -> `--accent-gold`
- `--surface-forest` -> `--accent-gold` (as a suitable replacement for green accent in this context)

Update the component to use `bg-[var(--surface-obsidian)]` and `border-[var(--accent-gold)]/15` for both light and dark modes (making it immersive).

### Task 2: Update src/components/branding/section-header.tsx

**Files:**
- Modify: `src/components/branding/section-header.tsx`

- [ ] **Step 1: Update typography and colors**

- Update `font-bold` to `font-extrabold` (800) for titles.
- Update `text-muted-foreground` and `text-[var(--text-on-dark-muted)]` to `text-[var(--accent-gold)]` for kickers (eyebrows).
- Update the gradient rule to use `var(--accent-carmine)` and `var(--accent-gold)`.

### Task 3: Update src/components/marketing/site-footer.tsx

**Files:**
- Modify: `src/components/marketing/site-footer.tsx`

- [ ] **Step 1: Update background and text colors**

- Update `bg-[var(--surface-ink)]` to `bg-[var(--surface-obsidian)]`.
- Replace legacy text variables:
  - `text-[var(--text-on-dark)]` -> `text-[var(--text-ivory)]`
  - `text-[var(--text-on-dark-secondary)]` -> `text-[var(--text-ivory-dim)]`
  - `text-[var(--text-on-dark-muted)]` -> `text-[var(--text-ivory-muted)]`
- Update `var(--accent-red)` to `var(--accent-carmine)` in the gradient divider.
- Update `var(--accent-bronze)` to `var(--accent-gold)` in the separator.

### Task 4: Update src/app/page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update section backgrounds and rhythm**

- "Sobre a Associação": Update panels from `bg-white` to `bg-[var(--surface-obsidian)]`.
- "Próximos eventos", "Parceiros", and "Conteúdos": Ensure backgrounds are `bg-[var(--surface-midnight)]` or `bg-[var(--surface-obsidian)]`.
- Replace legacy variable `--surface-paper` with `var(--surface-midnight)`.

- [ ] **Step 2: Cleanup legacy text variables**

Replace all instances of:
- `text-[var(--text-on-dark)]` -> `text-[var(--text-ivory)]`
- `text-[var(--text-on-dark-secondary)]` -> `text-[var(--text-ivory-dim)]`
- `text-[var(--text-on-dark-muted)]` -> `text-[var(--text-ivory-muted)]`

- [ ] **Step 3: Update typography**

Ensure `font-extrabold` (800) is used for titles and `font-medium` (500) for body text. Specifically check sections where `font-bold` or `font-semibold` might be used for titles.

### Task 5: Commit changes

- [ ] **Step 1: Stage and commit**

```bash
git add src/app/page.tsx src/components/branding/institutional-card.tsx src/components/branding/section-header.tsx src/components/marketing/site-footer.tsx
git commit -m "style: fix Task 4 issues and align all components with 'Midnight Sanctuary' spec"
```
