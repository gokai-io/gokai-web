# GŌKAI Web — Redesign Visual "Midnight Sanctuary" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar o rebranding visual premium "Midnight Sanctuary", transformando o site em uma experiência cinematográfica focada em autoridade, imersão e legibilidade absoluta.

**Architecture:** Transição para uma paleta de cores profunda (Emerald/Obsidian/Gold) com iluminação centralizada (spotlight), tipografia editorial refinada (800 weight) e componentes com bordas rígidas (4px) e glassmorphism.

**Tech Stack:** Next.js, Tailwind CSS (v4 style), Lucide React.

---

### Task 1: Core System — Midnight Emerald & Ivory Silk

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Atualizar variáveis semânticas para o "Midnight Sanctuary"**

```css
:root {
  --font-sans: var(--font-manrope);

  /* ── Superfícies — Profundidade de Camadas ── */
  --surface-midnight:   #08100D;   /* Midnight Emerald */
  --surface-obsidian:   #050807;   /* Deep Obsidian */
  --surface-glass:      rgba(255, 255, 255, 0.03);

  /* ── Acentos — Ouro e Carmim ── */
  --accent-gold:        #C5A059;   /* Champagne Gold */
  --accent-carmine:     #8E1610;   /* Crimson Seal */

  /* ── Texto — Máxima Legibilidade ── */
  --text-ivory:         #F8F7F3;   /* Ivory Silk */
  --text-ivory-dim:     rgba(248, 247, 243, 0.78);
  --text-ivory-muted:   rgba(248, 247, 243, 0.58);

  /* ── Shadcn / Base Overrides ── */
  --background: var(--surface-midnight);
  --foreground: var(--text-ivory);
  --primary: var(--accent-carmine);
  --primary-foreground: #FFFFFF;
  --secondary: var(--surface-obsidian);
  --secondary-foreground: var(--text-ivory);
  --border: rgba(197, 160, 89, 0.15);
  --radius: 0.25rem;
}

.dark {
  --background: var(--surface-midnight);
  --foreground: var(--text-ivory);
}
```

- [ ] **Step 2: Mapear as variáveis no `@theme inline` do Tailwind**

```css
@theme inline {
  --color-surface-midnight: var(--surface-midnight);
  --color-surface-obsidian: var(--surface-obsidian);
  --color-accent-gold: var(--accent-gold);
  --color-accent-carmine: var(--accent-carmine);
  --color-text-ivory: var(--text-ivory);
}
```

- [ ] **Step 3: Adicionar o efeito de Spotlight no Hero**

```css
@layer components {
  .gokai-hero-spotlight {
    background: radial-gradient(
      circle at center,
      #142D23 0%,
      var(--surface-midnight) 70%
    );
  }
}
```

- [ ] **Step 4: Commit**
```bash
git add src/app/globals.css
git commit -m "style: define 'Midnight Sanctuary' premium color system"
```

---

### Task 2: GokaiButton — Precisão e Autoridade

**Files:**
- Modify: `src/components/branding/gokai-button.tsx`

- [ ] **Step 1: Aplicar radius rígido (4px) e novos tons premium**
Mudar `rounded-md` para `rounded-[0.25rem]` e atualizar os estilos de tons para a paleta Carmine/Gold.

- [ ] **Step 2: Ajustar tipografia e padding**
Usar `font-bold uppercase tracking-[0.1em] text-[11px]` e ajustar o padding para um visual mais denso e "técnico".

- [ ] **Step 3: Commit**
```bash
git add src/components/branding/gokai-button.tsx
git commit -m "style: update GokaiButton to rigid premium style"
```

---

### Task 3: SiteHeader — A Lâmina Invisível (Glassmorphism)

**Files:**
- Modify: `src/components/marketing/site-header.tsx`

- [ ] **Step 1: Aplicar Backdrop Blur e borda de ouro champagne no estado scrolled**
Usar `bg-[rgba(8,16,13,0.72)]`, `backdrop-blur-xl` e borda inferior em `var(--accent-gold)`.

- [ ] **Step 2: Ajustar lógica de cores dos links**
Garantir que os links usem `var(--text-ivory)` e ganhem brilho `gold` no hover.

- [ ] **Step 3: Commit**
```bash
git add src/components/marketing/site-header.tsx
git commit -m "style: implement glassmorphism and gold details in SiteHeader"
```

---

### Task 4: HomePage — O Spotlight e Ritmo Imersivo

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Centralizar Hero e aplicar o Spotlight**
Remover o layout em colunas e centralizar o logo e o título. Aplicar `gokai-hero-spotlight`.

- [ ] **Step 2: Redesenhar tipografia do Hero**
H1 com peso 800 (ExtraBold), `tracking-[-0.03em]` e tamanho clamp centralizado.

- [ ] **Step 3: Atualizar ritmos das seções**
- Sobre e Governança: `bg-[var(--surface-obsidian)]`
- Modalidades e CTAs: `bg-[var(--surface-midnight)]`

- [ ] **Step 4: Commit**
```bash
git add src/app/page.tsx
git commit -m "style: redesign Hero as a cinematic spotlight"
```

---

### Task 5: Componentes — Obsidian Cards & Editorial Headers

**Files:**
- Modify: `src/components/branding/institutional-card.tsx`
- Modify: `src/components/branding/section-header.tsx`
- Modify: `src/components/marketing/site-footer.tsx`

- [ ] **Step 1: InstitutionalCard Obsidian & Gold**
Fundo `surface-obsidian` e bordas finas em `accent-gold/15`.

- [ ] **Step 2: SectionHeader Ouro Champagne**
Atualizar kickers para tipografia minúscula (11px) com tracking largo (`0.32em`) em ouro.

- [ ] **Step 3: SiteFooter Deep Obsidian**
Fundo `bg-[var(--surface-obsidian)]` e tipografia Ivory Silk.

- [ ] **Step 4: Commit**
```bash
git add src/components/branding/institutional-card.tsx src/components/branding/section-header.tsx src/components/marketing/site-footer.tsx
git commit -m "style: finalize obsidian components and editorial headers"
```
