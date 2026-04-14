# GŌKAI Web — Redesign Visual "Midnight Sanctuary"

**Data:** 2026-04-14
**Escopo:** Rebranding visual premium completo (Cores, Tipografia, Luz e Sombras)
**Abordagem:** Midnight Sanctuary (Foco em Autoridade, Imersão e Luxo Cinematográfico)

---

## 1. Contexto e Objetivos

O redesenho anterior ("Pergaminho e Nanquim") resultou em um visual pesado e pouco moderno. O objetivo agora é elevar a GŌKAI para o patamar de uma **Academia de Elite**, utilizando uma estética de "Santuário das Sombras" que equilibra a tradição das artes marciais com o refino do design premium de 2026.

**Objetivos principais:**
1. **Atmosfera Cinematográfica:** Uso de fundos profundos, sombras tridimensionais e luz centralizada (spotlight).
2. **Tipografia Editorial:** Pesos equilibrados (ExtraBold 800) e hierarquia clara com detalhes em ouro.
3. **Refino Técnico (Polish):** Bordas de 1px, Glassmorphism de alta qualidade e micro-interações fluidas.

---

## 2. Sistema de Cores (Paleta "Midnight Sanctuary")

### 2.1 Variáveis Semânticas (`globals.css`)

Substituiremos os tons amarelados e o preto chapado por cores com profundidade e brilho sutil.

```css
:root {
  /* ── Superfícies — Profundidade de Camadas ── */
  --surface-midnight:   #08100D;   /* Midnight Emerald - Fundo Imersivo */
  --surface-obsidian:   #050807;   /* Deep Obsidian - Cards e seções de destaque */
  --surface-glass:      rgba(255, 255, 255, 0.03); /* Vidro para componentes */

  /* ── Acentos — Ouro e Carmim ── */
  --accent-gold:        #C5A059;   /* Champagne Gold - Detalhes e bordas */
  --accent-carmine:     #8E1610;   /* Crimson Seal - CTAs e Logo */

  /* ── Texto — Máxima Legibilidade e Nobreza ── */
  --text-ivory:         #F8F7F3;   /* Ivory Silk - Títulos e Corpo */
  --text-ivory-dim:     rgba(248, 247, 243, 0.78);
  --text-ivory-muted:   rgba(248, 247, 243, 0.58);

  /* ── Shadcn / Base Overrides ── */
  --background: var(--surface-midnight);
  --foreground: var(--text-ivory);
  --primary: var(--accent-carmine);
  --primary-foreground: #FFFFFF;
  --secondary: var(--surface-obsidian);
  --secondary-foreground: var(--text-ivory);
  --border: rgba(197, 160, 89, 0.15); /* Borda Ouro Sutil */
  --radius: 0.25rem; /* Radius rígido (4px) para disciplina */
}

.dark {
  /* No Midnight Sanctuary, o dark mode é a experiência padrão */
  --background: var(--surface-midnight);
  --foreground: var(--text-ivory);
}
```

---

## 3. Tipografia (A Elegância da Força)

- **H1 e H2:** Peso **ExtraBold (800)**. Menos agressivo que o 900, permitindo mais refino na forma.
- **Tracking:** `-0.03em` para títulos, garantindo um visual de "bloco de autoridade".
- **Kickers (Chapéus):** Texto pequeno (11px), Uppercase, Tracking largo (`0.32em`), Cor `--accent-gold`.
- **Corpo:** Manrope Medium (500), `leading-relaxed` (1.75) para máximo respiro.

---

## 4. Componentes "Santuário"

### 4.1 Hero "O Spotlight"
- **Design:** Centralizado, minimalista e focado no selo da GŌKAI.
- **Iluminação:** `radial-gradient(circle at center, #142D23 0%, var(--surface-midnight) 70%)` — simula um foco de luz suave atrás do logo.
- **Selo do Logo:** Centralizado, com sombra externa profunda (`shadow-[0_48px_100px_rgba(0,0,0,0.8)]`).
- **Título H1:** Abaixo do logo, centrado, peso 800, cor Ivory Silk.

### 4.2 Header "A Lâmina Invisível"
- **Transparente (Hero):** Sem fundo, apenas Ivory Silk flutuando.
- **Scrolled:** `bg-[rgba(8,16,13,0.72)]` com `backdrop-blur-xl`. Borda inferior de 1px em Ouro Champagne (12% opacity).
- **Links:** Hover com brilho Ouro Champagne e linha inferior expansiva.

### 4.3 GokaiButton (O Selo de Autoridade)
- **Radius:** Rígido (`0.25rem` / 4px).
- **Tones:**
  - `primary`: `bg-accent-carmine` (Vermelho Carmim Profundo).
  - `outline`: Borda 1px `accent-gold`, texto `accent-gold`.
  - `ghost`: Apenas texto Ivory Silk, sem fundo.

### 4.4 InstitutionalCard (A Camada Obsidian)
- **Design:** Fundo em `surface-obsidian`, borda de 1px em `accent-gold/15`.
- **Hover:** Glow sutil na borda e leve translação vertical (-2px).
- **Glassmorphism:** Em seções especiais, usar `surface-glass` com blur.

---

## 5. Ritmo da Experiência

1. **Hero:** Midnight Emerald com Spotlight (Foco na Marca).
2. **Sobre:** Deep Obsidian (Imersão e Texto).
3. **Modalidades:** Midnight Emerald (Grid em Glassmorphism).
4. **Governança:** Deep Obsidian (Autoridade Institucional).
5. **CTA Final:** Midnight Emerald com Botão Carmine.

---

## 6. Verificação e Acessibilidade

- [ ] Contraste Ivory Silk / Midnight Emerald: 14.5:1 (Supera WCAG AAA).
- [ ] Tempo de transição de 400ms para todos os estados de hover (suavidade premium).
- [ ] Eliminar qualquer sombra preta pura; usar sombras em tons de verde profundo ou ouro escuro.

---

## Arquivos Afetados

- `src/app/globals.css` (Update total das variáveis e estilos de animação)
- `src/app/page.tsx` (Update layout centralizado, ritmos e tipografia)
- `src/components/marketing/site-header.tsx` (Glassmorphism e transição)
- `src/components/marketing/site-footer.tsx` (Deep Obsidian e Ouro)
- `src/components/branding/gokai-button.tsx` (Radius e tons)
- `src/components/branding/institutional-card.tsx` (Border focus e Glassmorphism)
- `src/components/branding/section-header.tsx` (Cores de ouro e hierarquia centrada)
