// ─── Enums ────────────────────────────────────────────────────────────────────

export type AssociadoStatus = "ativo" | "inativo" | "suspenso"
export type AssociadoTipo =
  | "fundador"
  | "efetivo"
  | "contribuinte"
  | "honorario"
export type CargoDiretoria =
  | "presidente"
  | "vice_presidente"
  | "diretor_administrativo"
  | "diretor_financeiro"
  | "diretor_tecnico_esportivo"
export type ProfessorStatus = "ativo" | "inativo" | "licenciado"
export type TurmaStatus = "ativa" | "inativa" | "encerrada"
export type AlunoStatus = "ativo" | "inativo" | "trancado" | "transferido"
export type InscricaoStatus =
  | "pendente"
  | "contatado"
  | "matriculado"
  | "recusado"
export type EventoTipo =
  | "treino_especial"
  | "seminario"
  | "campeonato"
  | "social"
  | "outro"
export type PatrocinadorTipo = "pessoa_fisica" | "pessoa_juridica"
export type PatrocinadorNivel = "ouro" | "prata" | "bronze" | "apoiador"
export type TransparenciaTipo =
  | "ata"
  | "balanco"
  | "relatorio"
  | "estatuto"
  | "outro"
export type ContatoStatus = "novo" | "lido" | "respondido" | "arquivado"
export type UserRole =
  | "presidente"
  | "vice_presidente"
  | "diretor_administrativo"
  | "diretor_financeiro"
  | "diretor_tecnico_esportivo"
  | "professor"
export type AlunoTurmaStatus = "ativo" | "inativo" | "trancado"
export type SituacaoAtualTipo = "estudante" | "trabalhador" | "ambos"
export type DocumentoTipo =
  | "boletim_escolar"
  | "comprovante_matricula"
  | "comprovante_trabalho"
  | "historico_escolar"
  | "outro"
export type OcorrenciaTipo = "advertencia" | "suspensao" | "exclusao"
export type ProjetoTipo = "social" | "esportivo" | "educacional" | "outro"
export type ProjetoStatus = "planejamento" | "ativo" | "concluido" | "cancelado"
export type ProjetoMembroStatus = "ativo" | "inativo" | "desligado"

// ─── Shared nested types ───────────────────────────────────────────────────────

export interface Endereco {
  rua?: string | null
  numero?: string | null
  complemento?: string | null
  bairro?: string | null
  cidade?: string | null
  estado?: string | null
  cep?: string | null
}

// ─── Entity interfaces ─────────────────────────────────────────────────────────

export interface Pessoa {
  id: string
  nome_completo: string
  cpf: string | null
  email: string | null
  telefone: string | null
  data_nascimento: string | null
  endereco: Endereco | null
  created_at?: string
  updated_at?: string
}

export interface Associado {
  id: string
  pessoa_id: string
  numero_matricula: string | null
  tipo: AssociadoTipo
  status: AssociadoStatus
  data_filiacao: string | null
  data_desfiliacao: string | null
  observacoes: string | null
  created_at?: string
  updated_at?: string
}

export interface Diretor {
  id: string
  associado_id: string
  cargo: CargoDiretoria
  data_inicio: string
  data_fim: string | null
  ativo: boolean
  created_at?: string
  updated_at?: string
}

export interface ConselheiroFiscal {
  id: string
  associado_id: string
  cargo: string
  data_inicio: string
  data_fim: string | null
  ativo: boolean
  created_at?: string
  updated_at?: string
}

export interface Professor {
  id: string
  pessoa_id: string
  especialidades: string[] | null
  graduacao: string | null
  registro_federacao: string | null
  bio: string | null
  status: ProfessorStatus
  exibir_site: boolean
  created_at?: string
  updated_at?: string
}

export interface Modalidade {
  id: string
  nome: string
  slug: string
  descricao: string | null
  conteudo: string | null
  imagem_url: string | null
  ativa: boolean
  ordem: number | null
  created_at?: string
  updated_at?: string
}

export interface Turma {
  id: string
  modalidade_id: string
  professor_id: string
  nome: string
  dia_semana: number[] | null
  horario_inicio: string | null
  horario_fim: string | null
  local: string | null
  vagas: number | null
  status: TurmaStatus
  created_at?: string
  updated_at?: string
}

export interface Aluno {
  id: string
  pessoa_id: string
  matricula: string | null
  graduacao: string | null
  status: AlunoStatus
  situacao_atual: SituacaoAtualTipo | null
  observacoes_medicas: string | null
  eh_menor: boolean
  created_at?: string
  updated_at?: string
}

export interface ResponsavelLegal {
  id: string
  aluno_id: string
  nome: string
  telefone: string | null
  email: string | null
  parentesco: string | null
  created_at?: string
  updated_at?: string
}

export interface AlunoTurma {
  id: string
  aluno_id: string
  turma_id: string
  data_entrada: string | null
  data_saida: string | null
  status: AlunoTurmaStatus
  created_at?: string
  updated_at?: string
}

export interface Frequencia {
  id: string
  aluno_id: string
  turma_id: string
  data: string
  presente: boolean
  observacoes: string | null
  created_at?: string
  updated_at?: string
}

export interface Inscricao {
  id: string
  nome_completo: string
  email: string | null
  telefone: string | null
  data_nascimento: string | null
  modalidade_interesse: string | null
  experiencia_previa: string | null
  observacoes: string | null
  eh_menor: boolean
  situacao_atual: SituacaoAtualTipo | null
  responsavel_nome: string | null
  responsavel_telefone: string | null
  responsavel_parentesco: string | null
  status: InscricaoStatus
  created_at?: string
  updated_at?: string
}

export interface Evento {
  id: string
  titulo: string
  slug: string
  descricao: string | null
  conteudo: string | null
  data_inicio: string
  data_fim: string | null
  local: string | null
  tipo: EventoTipo
  publicado: boolean
  destaque: boolean
  campeonato_id: string | null
  imagem_url: string | null
  created_at?: string
  updated_at?: string
}

export interface Campeonato {
  id: string
  evento_id: string | null
  nome: string
  modalidade_id: string | null
  data: string | null
  local: string | null
  organizador: string | null
  regulamento_url: string | null
  observacoes: string | null
  created_at?: string
  updated_at?: string
}

export interface CampeonatoParticipante {
  id: string
  campeonato_id: string
  aluno_id: string
  categoria: string | null
  resultado: string | null
  medalha: string | null
  observacoes: string | null
  created_at?: string
  updated_at?: string
}

export interface Patrocinador {
  id: string
  nome: string
  website: string | null
  logo_url: string | null
  tipo: PatrocinadorTipo
  nivel: PatrocinadorNivel
  contato: string | null
  valor_mensal: number | null
  ativo: boolean
  exibir_site: boolean
  created_at?: string
  updated_at?: string
}

export interface Transparencia {
  id: string
  titulo: string
  descricao: string | null
  tipo: TransparenciaTipo
  arquivo_url: string | null
  data_referencia: string
  publicado: boolean
  created_at?: string
  updated_at?: string
}

export interface UsuarioInterno {
  id: string
  pessoa_id: string
  auth_user_id: string | null
  role: UserRole
  ativo: boolean
  created_at?: string
  updated_at?: string
}

export interface Contato {
  id: string
  nome: string
  email: string
  telefone: string | null
  assunto: string
  mensagem: string
  status: ContatoStatus
  created_at?: string
  updated_at?: string
}

// ─── New entity interfaces (member rules) ─────────────────────────────────────

export interface DocumentoComprobatorio {
  id: string
  aluno_id: string
  tipo: DocumentoTipo
  arquivo_url: string
  data_upload: string
  data_validade: string | null
  validado: boolean
  validado_por: string | null
  created_at?: string
  updated_at?: string
}

export interface DesempenhoEscolar {
  id: string
  aluno_id: string
  periodo: string
  media_geral: number | null
  arquivo_url: string | null
  validado: boolean
  created_at?: string
  updated_at?: string
}

export interface OcorrenciaDisciplinar {
  id: string
  aluno_id: string
  tipo: OcorrenciaTipo
  motivo: string
  data: string
  registrado_por: string
  created_at?: string
  updated_at?: string
}

export interface AvaliacaoEvolucao {
  id: string
  aluno_id: string
  periodo: string
  comportamento: number | null
  disciplina: number | null
  frequencia: number | null
  desempenho: number | null
  observacoes: string | null
  avaliado_por: string
  created_at?: string
  updated_at?: string
}

export interface Projeto {
  id: string
  nome: string
  descricao: string | null
  tipo: ProjetoTipo
  status: ProjetoStatus
  created_at?: string
  updated_at?: string
}

export interface ProjetoMembro {
  id: string
  projeto_id: string
  aluno_id: string
  data_entrada: string
  data_saida: string | null
  status: ProjetoMembroStatus
  created_at?: string
  updated_at?: string
}

// ─── "With relations" types ────────────────────────────────────────────────────

export interface ProfessorWithPessoa extends Professor {
  pessoa: Pessoa
}

export interface AlunoWithPessoa extends Aluno {
  pessoa: Pessoa
}

export interface TurmaWithRelations extends Turma {
  modalidade: Modalidade
  professor: ProfessorWithPessoa
}

export interface DiretorWithAssociado extends Diretor {
  associado: Associado & { pessoa: Pessoa }
}

export interface EventoWithCampeonato extends Evento {
  campeonato?: Campeonato | null
}

export interface UsuarioInternoWithPessoa extends UsuarioInterno {
  pessoa: Pessoa
}

export interface FrequenciaWithAluno extends Frequencia {
  aluno: AlunoWithPessoa
}

export interface AlunoWithResponsavel extends AlunoWithPessoa {
  responsavel_legal?: ResponsavelLegal | null
}

export interface AlunoTurmaWithRelations extends AlunoTurma {
  aluno: AlunoWithPessoa
  turma: TurmaWithRelations
}

export interface CampeonatoWithParticipantes extends Campeonato {
  participantes: (CampeonatoParticipante & { aluno: AlunoWithPessoa })[]
}

export interface CampeonatoWithRelations extends Campeonato {
  evento: Evento | null
  modalidade: Modalidade | null
  participantes: (CampeonatoParticipante & { aluno: AlunoWithPessoa })[]
}

export interface EventoWithCampeonatoRelations extends Evento {
  campeonato?: (Campeonato & { modalidade: Modalidade | null }) | null
}

export interface InscricaoComStatus extends Inscricao {
  status: InscricaoStatus
}
