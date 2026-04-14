# GŌKAI Web — Redesign Visual "Tradição e Disciplina" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebranding visual completo da GŌKAI Web focado em tradição e disciplina marcial, resolvendo problemas de contraste e legibilidade através da abordagem "Pergaminho e Nanquim".

**Architecture:** Substituição do sistema de cores atual por uma paleta semântica baseada em tons orgânicos (Papel Osso, Nanquim, Floresta, Imperial). Uso de tipografia pesada (Black 900) e redução de arredondamentos para passar rigidez institucional.

**Tech Stack:** Next.js, Tailwind CSS (v4 style), Lucide React.

---

### Task 1: Sistema de Cores e Variáveis Semânticas

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Atualizar as variáveis CSS no `:root` e `.dark`**

```css
:root {
  --font-sans: var(--font-manrope);

  /* ── Superfícies ── */
  --surface-paper:      #F2EFE9;   /* Papel Osso */
  --surface-ink:        #1A1A1B;   /* Nanquim Profundo */
  --surface-forest:     #142D1F;   /* Musgo Floresta */
  --surface-white:      #FFFFFF;

  /* ── Acentos ── */
  --accent-red:         #A6261F;   /* Vermelho Imperial */
  --accent-bronze:      #B08D57;   /* Bronze Envelhecido */

  /* ── Texto ── */
  --text-primary:       #1A1A1B;
  --text-secondary:     rgba(26, 26, 27, 0.82);
  --text-on-dark:       #F7F6F2;
  --text-on-dark-secondary: rgba(247, 246, 242, 0.92);
  --text-on-dark-muted:     rgba(247, 246, 242, 0.68);

  /* ── Shadcn / Base Overrides ── */
  --background: var(--surface-paper);
  --foreground: var(--text-primary);
  --primary: var(--accent-red);
  --primary-foreground: #FFFFFF;
  --secondary: var(--surface-forest);
  --secondary-foreground: #FFFFFF;
  --border: color-mix(in srgb, var(--surface-ink) 12%, transparent);
  --radius: 0.5rem;
}
```

- [ ] **Step 2: Mapear as variáveis no `@theme inline` do Tailwind**

```css
@theme inline {
  --color-surface-paper: var(--surface-paper);
  --color-surface-ink: var(--surface-ink);
  --color-surface-forest: var(--surface-forest);
  --color-accent-red: var(--accent-red);
  --color-accent-bronze: var(--accent-bronze);
}
```

- [ ] **Step 3: Verificar contraste via inspeção visual (dev server)**
Run: `npm run dev` e verifique se as cores de fundo mudaram para o tom de papel.

- [ ] **Step 4: Commit**
```bash
git add src/app/globals.css
git commit -m "style: define new 'Tradição e Disciplina' color system"
```

---

### Task 2: Refatoração do GokaiButton

**Files:**
- Modify: `src/components/branding/gokai-button.tsx`

- [ ] **Step 1: Atualizar estilos de tons e reduzir radius**
Mudar `rounded-full` para `rounded-md` e atualizar os hexadecimais para as novas variáveis.

```tsx
const VARIANT_CLASS: Record<GokaiButtonVariant, string> = {
  primary: "bg-[var(--accent-red)] text-white hover:brightness-110 active:scale-[0.98]",
  secondary: "bg-[var(--surface-forest)] text-white hover:brightness-110 active:scale-[0.98]",
  outline: "border-2 border-[var(--surface-ink)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-ink)] hover:text-white active:scale-[0.98]",
  ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-ink)]/5",
  accent: "bg-[var(--accent-red)] text-white font-bold hover:brightness-110 active:scale-[0.98]",
}
```

- [ ] **Step 2: Ajustar tipografia do botão**
Adicionar `font-bold uppercase tracking-wider text-xs`.

- [ ] **Step 3: Commit**
```bash
git add src/components/branding/gokai-button.tsx
git commit -m "style: update GokaiButton to tradition-inspired rigid style"
```

---

### Task 3: Header Adaptativo (Hero vs Scrolled)

**Files:**
- Modify: `src/components/marketing/site-header.tsx`

- [ ] **Step 1: Atualizar cores do header scrolled**
Mudar de `bg-white` para `bg-[var(--surface-paper)]` e adicionar a borda inferior de 2px em `ink`.

- [ ] **Step 2: Ajustar lógica de cores dos links**
Garantir que os links usem `text-[var(--text-on-dark)]` quando transparente e `text-[var(--text-primary)]` quando scrolled.

- [ ] **Step 3: Commit**
```bash
git add src/components/marketing/site-header.tsx
git commit -m "style: adapt SiteHeader for new color states"
```

---

### Task 4: Redesenho do Hero e Ritmo da Landing Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Atualizar o Hero Section**
Fundo `surface-forest`, H1 com peso 900 e tamanho clamp expandido. "GŌKAI" em `accent-red`.

- [ ] **Step 2: Ajustar ritmo das seções**
- Sobre: `bg-[var(--surface-paper)]`
- Modalidades: `bg-[var(--surface-ink)]`
- Governança: `bg-[var(--surface-paper)]`

- [ ] **Step 3: Commit**
```bash
git add src/app/page.tsx
git commit -m "style: implement high-impact Hero and section rhythm"
```

---

### Task 5: Componentes de Suporte (Footer e Cards)

**Files:**
- Modify: `src/components/marketing/site-footer.tsx`
- Modify: `src/components/branding/institutional-card.tsx`

- [ ] **Step 1: Footer Nanquim Profundo**
Atualizar `bg-[#0C2418]` para `bg-[var(--surface-ink)]` e ajustar opacidades de texto.

- [ ] **Step 2: InstitutionalCard adaptive**
Garantir que o card use bordas de 1px em vez de sombras e cores semânticas.

- [ ] **Step 3: Commit**
```bash
git add src/components/marketing/site-footer.tsx src/components/branding/institutional-card.tsx
git commit -m "style: finalize branding components with new palette"
```
