/**
 * GŌKAI Transparency Hub — local document source.
 *
 * Documents are stored here as structured data until the Supabase
 * instance is fully provisioned. To publish a new document: add an
 * entry to the `documentos` array below.
 *
 * Future migration path:
 *   - Swap `getDocumento` and `getAllDocumentos` to async Supabase fetches
 *     with no changes required to the page components.
 */

import type { TransparenciaTipo } from "@/types/database"

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface DocumentoTransparencia {
  id: string
  titulo: string
  descricao: string | null
  tipo: TransparenciaTipo
  arquivo_url: string | null
  conteudo: string | null
  data_referencia: string
  publicado: boolean
}

// ─── Documents ─────────────────────────────────────────────────────────────────

export const documentos: DocumentoTransparencia[] = [
  {
    id: "00000000-0000-0000-0000-000000000601",
    titulo: "Estatuto Social",
    descricao: "Estatuto social da GŌKAI com disposições preliminares, finalidade, quadro associativo e governança.",
    tipo: "estatuto",
    arquivo_url: null,
    data_referencia: "2024-01-01",
    publicado: true,
    conteudo: `# Estatuto Social – GŌKAI

## Disposições Preliminares

Art. 1 – A GŌKAI – Clube de Artes Marciais é uma associação civil sem fins lucrativos, com sede na Rua Melo Franco, nº 68, bairro São Mateus, Juiz de Fora/MG, constituída por prazo indeterminado.

## Finalidade

A associação tem como objetivo:

- Promover e desenvolver artes marciais e esportes de combate
- Realizar ações socioeducativas e culturais
- Organizar eventos, cursos e competições
- Firmar parcerias com instituições e projetos
- Captar recursos por meio de contribuições, doações e patrocínios

É vedada qualquer atividade político-partidária e distribuição de lucros.

## Associados

### Categorias

- Fundadores
- Efetivos
- Colaboradores

### Direitos

- Participar das atividades
- Votar e ser votado
- Apresentar propostas

### Deveres

- Cumprir o estatuto
- Contribuir financeiramente
- Zelar pela associação

### Exclusão

Pode ocorrer por:

- Descumprimento de regras
- Inadimplência
- Conduta inadequada

Garantido direito de defesa.

## Estrutura Organizacional

### Assembleia Geral

- Órgão máximo da associação
- Responsável por eleições e decisões estratégicas

### Diretoria Executiva

- Presidente
- Vice-Presidente
- Diretor Administrativo
- Diretor Financeiro
- Diretor Técnico/Esportivo

Mandato de 3 anos.

### Conselho Fiscal

- 3 membros
- Fiscalização financeira

## Patrimônio

Formado por:

- Contribuições
- Doações
- Eventos
- Parcerias

## Relações com Dirigentes

A GŌKAI poderá firmar contratos com seus associados ou dirigentes, desde que tais relações sejam realizadas em condições transparentes, compatíveis com o mercado e previamente aprovadas pela Assembleia Geral.

Em especial, a utilização de imóvel pertencente a membro da Diretoria poderá ocorrer mediante cessão onerosa ou sublocação, desde que formalizada por instrumento próprio e devidamente aprovada, garantindo-se a ausência de favorecimento indevido.

## Prestação de Contas

- Transparência obrigatória
- Balanço anual
- Avaliação pelo Conselho Fiscal

## Alterações e Dissolução

- Alterações: 2/3 dos votos
- Dissolução: 3/4 dos votos
- Patrimônio destinado a entidade similar`,
  },
  {
    id: "00000000-0000-0000-0000-000000000602",
    titulo: "Ata de Fundação",
    descricao: "Minuta inicial da ata de fundação da associação, pendente de preenchimento da data da reunião.",
    tipo: "ata",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: false,
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
    id: "00000000-0000-0000-0000-000000000603",
    titulo: "Regimento Interno",
    descricao: "Regimento interno com regras de assembleias, eleições, conduta, estrutura técnica e penalidades.",
    tipo: "outro",
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
    id: "00000000-0000-0000-0000-000000000604",
    titulo: "Memorando de Uso do Espaço",
    descricao: "Instrumento para formalização da cessão onerosa de uso do espaço utilizado pela associação.",
    tipo: "outro",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: false,
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

/** Returns a single document by ID (published or not). */
export function getDocumento(id: string): DocumentoTransparencia | undefined {
  return documentos.find((d) => d.id === id)
}

/** Returns all published document IDs — used by generateStaticParams. */
export function getAllDocumentoIds(): string[] {
  return documentos.filter((d) => d.publicado).map((d) => d.id)
}
