/**
 * GŌKAI Transparency Hub — local document source.
 *
 * Documents are stored here as structured data until the Supabase
 * instance is fully provisioned. To publish a new document: add an
 * entry to the `documentos` array below.
 *
 * Future migration path:
 *   - Swap accessors to async Supabase fetches with no changes
 *     required to the page components.
 */

import type { TransparenciaTipo } from "@/types/database"

// ─── Types ─────────────────────────────────────────────────────────────────────

export type SecaoTransparencia =
  | "fundacionais"
  | "governanca"
  | "associacao"
  | "estrutura"

export interface DocumentoTransparencia {
  id: string
  titulo: string
  descricao: string | null
  tipo: TransparenciaTipo
  secao: SecaoTransparencia
  arquivo_url: string | null
  conteudo: string | null
  data_referencia: string
  publicado: boolean
}

export const secaoMeta: Record<SecaoTransparencia, { titulo: string; descricao: string }> = {
  fundacionais: {
    titulo: "Documentos Fundacionais",
    descricao: "Documentos que estabelecem a existência legal e as diretrizes da associação.",
  },
  governanca: {
    titulo: "Governança",
    descricao: "Regras de funcionamento, estrutura organizacional e processos internos.",
  },
  associacao: {
    titulo: "Associação",
    descricao: "Documentos relacionados ao ingresso e participação dos membros.",
  },
  estrutura: {
    titulo: "Estrutura e Parcerias",
    descricao: "Acordos, parcerias e informações sobre a infraestrutura da associação.",
  },
}

export const secaoOrder: SecaoTransparencia[] = ["fundacionais", "governanca", "associacao", "estrutura"]

// ─── Documents ─────────────────────────────────────────────────────────────────

export const documentos: DocumentoTransparencia[] = [
  // ── Fundacionais ──────────────────────────────────────────────
  {
    id: "00000000-0000-0000-0000-000000000601",
    titulo: "Estatuto Social",
    descricao: "Documento oficial que estabelece as diretrizes legais, organizacionais e operacionais da Associação Esportiva e Ambiental GŌKAI, incluindo finalidade, estrutura administrativa, direitos e deveres dos associados.",
    tipo: "estatuto",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2024-01-01",
    publicado: true,
    conteudo: `# Estatuto Social da Associação Esportiva e Ambiental GŌKAI

## CAPÍTULO I — DA DENOMINAÇÃO, SEDE E FINALIDADE

A Associação Esportiva e Ambiental GŌKAI é uma entidade sem fins lucrativos, com sede em Juiz de Fora/MG.

Tem como finalidade:

- promover artes marciais
- incentivar disciplina, ética e formação humana
- desenvolver atividades esportivas e educativas
- promover consciência ambiental e social

---

## CAPÍTULO II — DOS ASSOCIADOS

A associação será composta por associados que poderão ser:

- fundadores
- efetivos
- contribuintes

### Direitos

- participar das atividades
- votar e ser votado
- acessar informações da associação

### Deveres

- respeitar estatuto e regimento
- manter conduta ética
- contribuir com atividades

---

## CAPÍTULO III — DA ADMINISTRAÇÃO

A administração será composta por:

- Presidente
- Vice-presidente
- Diretoria

Compete à diretoria:

- gerir atividades
- administrar recursos
- representar a associação

---

## CAPÍTULO IV — DO PATRIMÔNIO

O patrimônio será composto por:

- contribuições dos associados
- doações
- parcerias

---

## CAPÍTULO V — DISPOSIÇÕES GERAIS

A associação não distribui lucros.

Os recursos serão integralmente aplicados nas atividades institucionais.`,
  },
  {
    id: "00000000-0000-0000-0000-000000000602",
    titulo: "Ata de Fundação",
    descricao: "Registro formal da criação da associação, contendo data, local, membros fundadores e deliberações iniciais.",
    tipo: "ata",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# Ata de Fundação

## Associação Esportiva e Ambiental Gōkai

---

Aos ___ dias do mês de __________ de 2025, reuniram-se os fundadores da Associação Esportiva e Ambiental Gōkai.

Ficou deliberado:

* Constituição da associação
* Aprovação do Estatuto Social
* Definição da Diretoria

Fica aprovada, por unanimidade, a utilização do imóvel localizado na Rua Melo Franco, nº 68, bairro São Mateus, Juiz de Fora/MG, de propriedade do Presidente da associação, mediante cessão onerosa de uso, conforme condições a serem formalizadas em contrato específico.

---

## Diretoria inicial

* Presidente: Thiago Mello
* Vice-Presidente: Renan Winter Spatin

---

Nada mais havendo, foi encerrada a reunião.

---

Assinaturas:

---

Presidente

---

Secretário`,
  },
  {
    id: "00000000-0000-0000-0000-000000000605",
    titulo: "Termo de Posse da Diretoria",
    descricao: "Documento que formaliza a nomeação e posse dos membros da diretoria da associação.",
    tipo: "ata",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: null,
  },

  // ── Governança ────────────────────────────────────────────────
  {
    id: "00000000-0000-0000-0000-000000000603",
    titulo: "Regimento Interno",
    descricao: "Documento que detalha as regras de funcionamento interno, disciplina, organização das atividades e conduta dos membros.",
    tipo: "outro",
    secao: "governanca",
    arquivo_url: null,
    data_referencia: "2024-01-01",
    publicado: true,
    conteudo: `# Regimento Interno – GŌKAI

## Aplicação

Aplica-se a todos os membros, dirigentes e colaboradores.

## Assembleias

- Devem seguir pauta pré-definida
- Registro em ata obrigatório
- Possibilidade de participação online

## Eleições

- Comissão eleitoral responsável
- Inscrição de chapas com 15 dias de antecedência
- Votação secreta

## Conduta e Ética

É obrigatório:

- Respeito mútuo
- Boa convivência
- Espírito esportivo

É proibido:

- Discriminação
- Preconceito
- Atividades políticas

## Estrutura Técnica

- Professores subordinados ao Diretor Técnico
- Não fazem parte da diretoria
- Podem ser remunerados via contrato

## Penalidades

- Advertência
- Suspensão
- Exclusão`,
  },
  {
    id: "00000000-0000-0000-0000-000000000606",
    titulo: "Organograma",
    descricao: "Representação da estrutura organizacional da associação, incluindo diretoria, funções e hierarquia.",
    tipo: "outro",
    secao: "governanca",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: null,
  },

  // ── Associação ────────────────────────────────────────────────
  {
    id: "00000000-0000-0000-0000-000000000607",
    titulo: "Ficha de Associação",
    descricao: "Documento utilizado para cadastro de novos membros, contendo informações pessoais e de contato.",
    tipo: "outro",
    secao: "associacao",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: null,
  },
  {
    id: "00000000-0000-0000-0000-000000000608",
    titulo: "Termo de Adesão",
    descricao: "Documento onde o associado declara concordância com o estatuto, regras e diretrizes da associação.",
    tipo: "outro",
    secao: "associacao",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: null,
  },

  // ── Estrutura e Parcerias ─────────────────────────────────────
  {
    id: "00000000-0000-0000-0000-000000000609",
    titulo: "Memorando de Parceria",
    descricao: "Documento que estabelece acordos e cooperação com parceiros estratégicos para realização das atividades da associação.",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: null,
  },
  {
    id: "00000000-0000-0000-0000-000000000604",
    titulo: "Uso da Sede",
    descricao: "Instrumento para formalização da cessão onerosa de uso do espaço utilizado pela associação.",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# Cessão de Uso do Espaço

A GŌKAI utilizará o imóvel localizado na Rua Melo Franco, nº 68, bairro São Mateus, Juiz de Fora/MG, de propriedade de membro da Diretoria Executiva.

A utilização do espaço ocorrerá mediante contrato de sublocação ou cessão onerosa de uso, com pagamento de contribuição mensal pela associação.

O valor, forma de pagamento e condições de reajuste serão definidos em instrumento próprio, devendo observar critérios de razoabilidade e compatibilidade com o mercado.

A presente relação não configura vínculo empregatício ou distribuição de lucros, tratando-se exclusivamente de relação contratual para uso de espaço físico.`,
  },
]

// ─── Accessors ─────────────────────────────────────────────────────────────────

/** Returns only published documents, newest first. */
export function getAllDocumentos(): DocumentoTransparencia[] {
  return documentos
    .filter((d) => d.publicado)
    .sort((a, b) => new Date(b.data_referencia).getTime() - new Date(a.data_referencia).getTime())
}

/** Returns a single document by ID. */
export function getDocumento(id: string): DocumentoTransparencia | undefined {
  return documentos.find((d) => d.id === id)
}

/** Returns all published document IDs — used by generateStaticParams. */
export function getAllDocumentoIds(): string[] {
  return documentos.filter((d) => d.publicado).map((d) => d.id)
}

/** Returns published documents grouped by section, in order. */
export function getDocumentosBySecao(): Record<SecaoTransparencia, DocumentoTransparencia[]> {
  const result: Record<SecaoTransparencia, DocumentoTransparencia[]> = {
    fundacionais: [],
    governanca: [],
    associacao: [],
    estrutura: [],
  }
  for (const doc of documentos) {
    if (doc.publicado) {
      result[doc.secao].push(doc)
    }
  }
  return result
}
