# GŌKAI Web — Redesign Visual Premium

**Data:** 2026-04-14
**Escopo:** Todas as páginas de marketing + sistema de cores global + dark mode
**Abordagem:** B — Redesign de Presença

---

## Contexto

O site da GŌKAI (associação esportiva e ambiental de artes marciais) tem boa estrutura mas falha em transmitir a presença institucional séria que a marca exige. Os problemas principais:

1. **Contraste insuficiente:** 31+ instâncias de `text-white/30` em fundos escuros (falha WCAG AA)
2. **118+ cores hardcoded** (`bg-[#hex]`) em vez de variáveis CSS — impossível manter consistência
3. **Paleta monótona:** Verde domina tudo; vermelho aparece apenas em acentos mínimos de 1px
4. **Sem ritmo visual:** Seções alternam `#F5F4F0` ↔ `white` — quase indistinguível
5. **Dark mode não funciona:** Variáveis existem mas páginas usam hex hardcoded
6. **Páginas internas:** Corpo de texto longo em fundo escuro — intrinsecamente difícil de ler

**Direção aprovada:** Marca institucional séria (estilo federação/banco premium) — elegante, contida, mas que transmite poder pela precisão.

---

## 1. Sistema de Cores Semântico

### 1.1 Novas variáveis CSS (`globals.css`)

```css
:root {
  /* ── Superfícies escuras (hero, CTA, seções de impacto) ── */
  --surface-dark:       #0A1E14;
  --surface-dark-alt:   #123020;
  --surface-dark-muted: rgba(247, 246, 242, 0.06);

  /* ── Superfícies claras ── */
  --surface-light:      #F5F4F0;   /* off-white institucional */
  --surface-warm:       #EDE6D8;   /* creme quente — confiança, tradição */
  --surface-white:      #FFFFFF;

  /* ── Texto sobre fundo escuro ── */
  --text-on-dark:            #F7F6F2;
  --text-on-dark-secondary:  rgba(247, 246, 242, 0.78);
  --text-on-dark-muted:      rgba(247, 246, 242, 0.58);

  /* ── Texto sobre fundo claro ── */
  --text-on-light:           #0E2219;
  --text-on-light-secondary: #324A3C;
  --text-on-light-muted:     #5A7266;
}

.dark {
  --surface-dark:       #0A1E14;   /* mantém — já é dark */
  --surface-dark-alt:   #123020;
  --surface-dark-muted: rgba(247, 246, 242, 0.06);

  --surface-light:      #0E2A1C;
  --surface-warm:       #142E20;
  --surface-white:      #123020;

  --text-on-light:           #F7F6F2;
  --text-on-light-secondary: rgba(247, 246, 242, 0.72);
  --text-on-light-muted:     rgba(247, 246, 242, 0.50);
}
```

### 1.2 Regras de contraste mínimo

| Contexto | Opacidade mínima | Variável |
|----------|-----------------|----------|
| Títulos em fundo escuro | 100% | `--text-on-dark` |
| Corpo em fundo escuro | 78% | `--text-on-dark-secondary` |
| Labels/meta em fundo escuro | 58% | `--text-on-dark-muted` |
| **Nunca abaixo de 55%** em qualquer contexto | — | — |

### 1.3 Tailwind theme additions (`@theme inline`)

```css
--color-surface-dark:       var(--surface-dark);
--color-surface-dark-alt:   var(--surface-dark-alt);
--color-surface-light:      var(--surface-light);
--color-surface-warm:       var(--surface-warm);
--color-surface-white:      var(--surface-white);
```

### 1.4 Eliminação de hardcoded hex

**Todas** as instâncias de `bg-[#0C2418]`, `bg-[#123020]`, `bg-[#0B5A2B]`, `bg-[#EEE7D9]`, `bg-[#F5F4F0]` serão substituídas por variáveis:

| Hex atual | Variável de substituição |
|-----------|-------------------------|
| `bg-[#0C2418]` | `bg-surface-dark` |
| `bg-[#123020]` | `bg-surface-dark-alt` |
| `bg-[#0B5A2B]` | `bg-primary` |
| `bg-[#EEE7D9]` | `bg-surface-warm` |
| `bg-[#F5F4F0]` | `bg-surface-light` |
| `text-white/30` | `text-[var(--text-on-dark-muted)]` (mínimo) |
| `text-white/45` | `text-[var(--text-on-dark-muted)]` |
| `text-white/62` | `text-[var(--text-on-dark-secondary)]` |
| `text-white/72` | `text-[var(--text-on-dark-secondary)]` |
| `text-[#0B5A2B]/55` | `text-primary/70` (bump opacity) |

---

## 2. Ritmo Visual — Landing Page

### 2.1 Sequência de seções

| # | Seção | Fundo | Tipo |
|---|-------|-------|------|
| 1 | Hero | `--surface-dark` | Escuro |
| 2 | Institucional (Sobre) | `--surface-light` | Claro |
| 3 | Modalidades | `--surface-dark` | **Escuro** |
| 4 | Governança | `--surface-warm` | Quente |
| 5 | Eventos | `--surface-white` | Branco |
| 6 | Parceiros | `--surface-light` | Claro |
| 7 | Conteúdos | `--surface-warm` | Quente |
| 8 | CTA Final | `--surface-dark` | Escuro |

**Ritmo:** Escuro → Claro → **Escuro** → Quente → Branco → Claro → Quente → **Escuro**

### 2.2 Transição entre seções

Cada transição de tom (escuro→claro ou claro→escuro) pode ter uma fina borda de 1px (`border-white/8` ou `border-border`) para separação visual limpa.

---

## 3. Hero Redesenhado

### 3.1 Tipografia

- **H1:** peso 900 (extrabold), `clamp(3.2rem, 7vw, 6rem)` — 15% maior que atual
- **"GŌKAI"** na terceira linha: cor `--secondary` (#CF2E24) em vez de branco/60 — impacto, identidade
- **Kicker:** Manter estilo atual (Outfit, uppercase, tracking 0.38em) mas subir opacidade para 78%

### 3.2 Background

- Base: `--surface-dark` (#0A1E14)
- Gradiente radial sutil vermelho escuro no canto inferior-esquerdo: `radial-gradient(ellipse at 15% 85%, rgba(207,46,36,0.08), transparent 60%)` — referência ao sol nascente da marca
- Manter vertical rule decorativo (`white/6`)

### 3.3 Selo do logo (coluna direita)

- Anel externo: borda vermelha fina (`rgba(207,46,36,0.35)`) em vez de 0.25
- Anel interno: manter
- Logo no selo: manter como está

### 3.4 Stat row

- Valores: `text-2xl font-black text-[var(--text-on-dark)]` — números grandes, peso extremo
- Labels: manter estilo atual mas usar `--text-on-dark-muted`

### 3.5 CTAs

- **"Quero me associar":** Manter off-white `bg-[#F5F4F0] text-[#0B5A2B]` — contraste máximo sobre escuro
- **"Conhecer a GŌKAI":** Outline com `border-white/35` (subir de /30) e `text-white`

---

## 4. Seções da Landing — Detalhamento

### 4.1 Institucional (seção 2 — fundo claro)

- Sem mudanças grandes de layout — triptych de painéis funciona bem
- **Kicker:** `text-primary/70` (subir de /55)
- **Painéis:** Manter accent bars de 4px
- **Hover:** Manter efeito de lift + glow

### 4.2 Modalidades (seção 3 — AGORA ESCURA)

**Mudança principal:** Fundo escuro `bg-surface-dark` em vez de `bg-white`.

- **Cards:** `bg-surface-dark-alt` com `border border-white/8`
- **Títulos dos cards:** `text-[var(--text-on-dark)]`
- **Descrição:** `text-[var(--text-on-dark-secondary)]`
- **Links:** `text-accent` (#7AC943) — lime se destaca bem sobre escuro
- **Kicker:** `text-[var(--text-on-dark-muted)]`
- **Botão "Ver todas":** `bg-accent text-surface-dark` — lime sobre verde escuro

### 4.3 Governança (seção 4 — fundo quente)

- Fundo: `bg-surface-warm` (#EDE6D8)
- Títulos e texto: variáveis `--text-on-light*`
- Cards: `bg-surface-white` com sombra normal

### 4.4 CTA Final (seção 8)

- Fundo: `bg-surface-dark`
- **Novidade:** Faixa horizontal decorativa no topo da seção — gradiente `--secondary` → `--accent` (vermelho→lime), 2px de altura, largura total. Assinatura visual.
- Tipografia e CTAs: mesmos do hero

---

## 5. Páginas Internas

### 5.1 Padrão de página de detalhe (slug pages)

**Estrutura:**
1. **Hero de topo** (escuro, `--surface-dark`, ~40vh): título grande + breadcrumb + metadata
2. **Corpo** (claro, `--surface-light` ou `--surface-white`): conteúdo principal com texto legível
3. **Seção de destaque** (quente, `--surface-warm`): informações complementares
4. **CTA/rodapé** (escuro): chamada para ação

**Regra crítica:** Corpo de texto longo **sempre** em fundo claro. Texto extenso em fundo escuro é ilegível.

### 5.2 Padrão de página de listagem

1. **Hero curto** (escuro, max 40vh): título + filtros
2. **Grid de cards** (claro): cards em `bg-surface-white` com sombra
3. **CTA** (escuro): chamada para ação

### 5.3 Arquivos afetados

**Páginas de detalhe (reestruturação visual):**
- `src/app/(marketing)/modalidades/[slug]/page.tsx`
- `src/app/(marketing)/professores/[slug]/page.tsx`
- `src/app/(marketing)/conteudos/[slug]/page.tsx`
- `src/app/(marketing)/localidades/[cidade]/page.tsx`

**Páginas de listagem (ajuste de cores e hero):**
- `src/app/(marketing)/modalidades/page.tsx`
- `src/app/(marketing)/professores/page.tsx`
- `src/app/(marketing)/eventos/page.tsx`
- `src/app/(marketing)/conteudos/page.tsx`
- `src/app/(marketing)/localidades/page.tsx`

**Páginas de suporte (ajuste de cores):**
- `src/app/(marketing)/sobre/page.tsx`
- `src/app/(marketing)/transparencia/page.tsx`
- `src/app/(marketing)/governanca/page.tsx`
- `src/app/(marketing)/apoiadores/page.tsx`
- `src/app/(marketing)/inscricao/page.tsx`
- `src/app/(marketing)/contato/page.tsx`

---

## 6. Componentes

### 6.1 Site Header (`site-header.tsx`)

- Mobile menu: `bg-[#0B5A2B]` → `bg-primary`
- Inline `bg-[#F5F4F0]` overrides → usar variáveis
- Botão "Associe-se" sobre escuro: considerar `bg-secondary text-white` (vermelho) para mais presença

### 6.2 Site Footer (`site-footer.tsx`)

- `bg-[#0C2418]` → `bg-surface-dark`
- Layout: expandir para 4 colunas (Logo+desc | Nav | Institucional | Contato)
- Divider horizontal gradiente `--secondary` → `--accent` no topo do footer
- Todas as opacidades de texto: usar variáveis `--text-on-dark-*`

### 6.3 GokaiButton (`gokai-button.tsx`)

- Remover hover colors hardcoded (`#0d4a22`, `#b82218`)
- Usar `hover:brightness-110` ou variáveis derivadas
- Adicionar tone `accent` (lime) para CTAs em seções escuras

### 6.4 InstitutionalCard (`institutional-card.tsx`)

- Adicionar variante `dark` para cards em seções escuras:
  - `bg-surface-dark-alt`, `border-white/8`, sombra adaptada
- Manter variante padrão (clara) inalterada

### 6.5 SectionHeader (`section-header.tsx`)

- Adicionar prop `dark?: boolean` para adaptar cores de texto automaticamente
- Kicker: usar variáveis `--text-on-dark-muted` ou `--text-on-light-muted` conforme contexto

---

## 7. Tipografia

### 7.1 Mudanças globais

- **H1 de hero:** peso 900, size `clamp(3.2rem, 7vw, 6rem)`
- **H2 de seção:** peso 800 (subir de 700), size `text-4xl sm:text-5xl` (subir um nível)
- **Kickers:** Manter estilo, subir opacidade mínima para 70% (claro) / 58% (escuro)
- **Body text:** Manter Manrope, mas em seções de destaque usar `text-lg leading-[1.8]` para mais respiro

### 7.2 Nenhuma fonte nova

Montserrat, Manrope e Outfit são suficientes. A mudança é de peso e escala, não de família.

---

## 8. Dark Mode

### 8.1 Estratégia

Seções com fundo `--surface-dark` ficam **idênticas** em dark mode (já são escuras).
Seções claras (`--surface-light`, `--surface-warm`, `--surface-white`) adaptam via variáveis CSS.

### 8.2 Mapeamento

| Variável | Light mode | Dark mode |
|----------|-----------|-----------|
| `--surface-dark` | `#0A1E14` | `#0A1E14` |
| `--surface-dark-alt` | `#123020` | `#123020` |
| `--surface-light` | `#F5F4F0` | `#0E2A1C` |
| `--surface-warm` | `#EDE6D8` | `#142E20` |
| `--surface-white` | `#FFFFFF` | `#123020` |
| `--text-on-light` | `#0E2219` | `#F7F6F2` |
| `--text-on-light-secondary` | `#324A3C` | `rgba(247,246,242,0.72)` |
| `--text-on-light-muted` | `#5A7266` | `rgba(247,246,242,0.50)` |

---

## 9. Verificação

### 9.1 Testes visuais
- [ ] Iniciar dev server (`npm run dev`)
- [ ] Verificar landing page: ritmo escuro→claro→escuro visível
- [ ] Verificar hero: tipografia impactante, "GŌKAI" em vermelho
- [ ] Verificar seção Modalidades em fundo escuro: cards legíveis
- [ ] Verificar 3+ páginas internas: corpo de texto em fundo claro
- [ ] Verificar footer: 4 colunas, divider gradiente, texto legível
- [ ] Testar dark mode: toggle e confirmar que seções claras adaptam
- [ ] Verificar mobile: header, hero, cards responsivos

### 9.2 Testes de acessibilidade
- [ ] Nenhum `text-white/` com opacidade < 55 em todo o codebase
- [ ] Nenhum `bg-[#` hardcoded em páginas de marketing
- [ ] Grep por `text-white/30`, `text-white/40`, `text-white/45` — deve retornar zero
- [ ] Lighthouse accessibility score > 90

### 9.3 Build
- [ ] `npm run build` sem erros
- [ ] Zero erros TypeScript

---

## Arquivos a modificar (resumo)

**Core system:**
- `src/app/globals.css` — novas variáveis semânticas

**Landing:**
- `src/app/page.tsx` — ritmo de seções, hero, tipografia

**Componentes:**
- `src/components/marketing/site-header.tsx`
- `src/components/marketing/site-footer.tsx`
- `src/components/branding/gokai-button.tsx`
- `src/components/branding/institutional-card.tsx`
- `src/components/branding/section-header.tsx`

**Páginas de detalhe (reestruturação):**
- `src/app/(marketing)/modalidades/[slug]/page.tsx`
- `src/app/(marketing)/professores/[slug]/page.tsx`
- `src/app/(marketing)/conteudos/[slug]/page.tsx`
- `src/app/(marketing)/localidades/[cidade]/page.tsx`

**Páginas de listagem (ajuste de cores):**
- `src/app/(marketing)/modalidades/page.tsx`
- `src/app/(marketing)/professores/page.tsx`
- `src/app/(marketing)/eventos/page.tsx`
- `src/app/(marketing)/conteudos/page.tsx`
- `src/app/(marketing)/localidades/page.tsx`

**Páginas de suporte (ajuste de cores):**
- `src/app/(marketing)/sobre/page.tsx`
- `src/app/(marketing)/transparencia/page.tsx`
- `src/app/(marketing)/governanca/page.tsx`
- `src/app/(marketing)/apoiadores/page.tsx`
- `src/app/(marketing)/inscricao/page.tsx`
- `src/app/(marketing)/contato/page.tsx`
- `src/app/(marketing)/error.tsx`
