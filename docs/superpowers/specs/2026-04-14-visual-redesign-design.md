# GŌKAI Web — Redesign Visual "Tradição e Disciplina"

**Data:** 2026-04-14
**Escopo:** Rebranding visual completo (Cores, Tipografia, Ritmo e Componentes)
**Abordagem:** Pergaminho e Nanquim (Foco em Tradição e Autoridade)

---

## 1. Contexto e Objetivos

O site atual da GŌKAI sofre de falta de contraste (texto ilegível em fundos escuros) e uma paleta de cores que parece "moderna demais" ou "amadora", sem transmitir a seriedade de uma associação de artes marciais.

**Objetivos principais:**
1. **Contraste Absoluto:** Eliminar textos de baixa opacidade. Todo texto deve ser legível (WCAG AA).
2. **Identidade de Autoridade:** Transmitir disciplina através de cores sóbrias e tipografia pesada.
3. **Ritmo Institucional:** Alternar seções escuras de impacto com seções claras de leitura confortável.

---

## 2. Sistema de Cores (Paleta de Herança)

### 2.1 Variáveis Semânticas (`globals.css`)

Substituiremos o preto digital (#000) e os verdes vibrantes por tons orgânicos e tradicionais.

```css
:root {
  /* ── Superfícies ── */
  --surface-paper:      #F2EFE9;   /* Papel Osso - Fundo principal */
  --surface-ink:        #1A1A1B;   /* Nanquim Profundo - Títulos e Rodapé */
  --surface-forest:     #142D1F;   /* Musgo Floresta - Hero e CTAs de peso */
  --surface-white:      #FFFFFF;   /* Branco puro para documentos específicos */

  /* ── Acentos ── */
  --accent-red:         #A6261F;   /* Vermelho Imperial - Selos e detalhes */
  --accent-bronze:      #B08D57;   /* Bronze Envelhecido - Bordas e ícones */

  /* ── Texto ── */
  --text-primary:       #1A1A1B;   /* Nanquim sobre Papel */
  --text-secondary:     rgba(26, 26, 27, 0.82);
  --text-on-dark:       #F7F6F2;   /* Branco Marfim sobre Musgo/Nanquim */
  --text-on-dark-secondary: rgba(247, 246, 242, 0.92);
  --text-on-dark-muted:     rgba(247, 246, 242, 0.68);
}

.dark {
  /* No modo escuro, mantemos a sobriedade mas invertemos as superfícies claras */
  --surface-paper:      #121213;   /* Nanquim suave */
  --text-primary:       #F7F6F2;
  --text-secondary:     rgba(247, 246, 242, 0.78);
  /* Musgo Forest e Accent Red permanecem idênticos para manter a marca */
}
```

### 2.2 Regras de Contraste
- **Proibido:** `text-white/30`, `text-white/45`.
- **Mínimo:** 68% de opacidade para textos "muted" sobre fundo escuro (`text-on-dark-muted`).
- **Padrão:** 92% a 100% de opacidade para corpo e títulos.

---

## 3. Tipografia (A Voz do Dojo)

- **Famílias:** Montserrat/Outfit (Heading), Manrope (Body).
- **H1 de Hero:** Peso **Black (900)**, tamanho `clamp(3.5rem, 8vw, 6.5rem)`. Tracking `-0.02em`.
- **H2 de Seção:** Peso **ExtraBold (800)**.
- **Kickers (Eyebrows):** Uppercase, Tracking `0.22em`, fonte Sans-serif.
- **Corpo:** Manrope, peso Medium (500) para melhor legibilidade em fundos de "papel".

---

## 4. Componentes e Estrutura

### 4.1 Hero (A Primeira Impressão)
- **Fundo:** `bg-surface-forest` (#142D1F).
- **Efeito:** Gradiente radial sutil em `--accent-red` (8% opacidade) no canto inferior esquerdo.
- **H1:** "Disciplina. Honra." (Branco Marfim) e "**GŌKAI.**" (Vermelho Imperial).
- **Selo do Logo:** Círculo em `bg-surface-paper` com borda fina em Vermelho Imperial (30%).

### 4.2 Header (Navegação Scrolled)
- **Transparente:** Texto em `text-on-dark`.
- **Scrolled:** Fundo `bg-surface-paper`, borda inferior de 2px em `bg-surface-ink`.
- **Botão "Associe-se":** Sempre `bg-accent-red text-white`.

### 4.3 GokaiButton (Disciplina em Cliques)
- **Radius:** Reduzir de pílula total para `rounded-lg` (aprox. 0.5rem - 0.75rem). Passa mais rigidez.
- **Tones:**
  - `primary`: `bg-accent-red` (Vermelho Imperial).
  - `secondary`: `bg-surface-forest` (Musgo Floresta).
  - `outline`: Borda de 2px `border-surface-ink`.

### 4.4 InstitutionalCard (O Papel de Parede)
- **Variante Clara:** Fundo `bg-white`, borda fina em `accent-bronze/20`, sem sombras pesadas.
- **Variante Escura:** Fundo `bg-surface-ink`, borda `white/8`.

---

## 5. Ritmo da Landing Page

1. **Hero:** Forest (Impacto/Escuro)
2. **Sobre:** Paper (Leitura/Claro)
3. **Modalidades:** Ink (Atmosfera/Escuro)
4. **Governança:** Paper (Claro)
5. **Eventos/Conteúdos:** Paper ou White (Claro)
6. **CTA Final:** Forest (Fechamento/Escuro)

---

## 6. Verificação e Acessibilidade

- [ ] Lighthouse Accessibility Score > 95.
- [ ] Testar legibilidade em dispositivos móveis (o fundo "Papel Osso" ajuda no reflexo do sol).
- [ ] Garantir que o modo dark não quebre o "feeling" de documento tradicional.

---

## Arquivos Afetados

- `src/app/globals.css` (Update variables e classes)
- `src/app/page.tsx` (Update hero, section colors e typography)
- `src/components/marketing/site-header.tsx`
- `src/components/marketing/site-footer.tsx`
- `src/components/branding/gokai-button.tsx` (Radius e cores)
- `src/components/branding/institutional-card.tsx`
- `src/components/branding/section-header.tsx`
