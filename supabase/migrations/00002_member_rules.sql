-- =============================================================================
-- GŌKAI — Member Rules: Documents, Discipline, Evaluation, Projects
-- Migration: 00002_member_rules.sql
-- =============================================================================

-- =============================================================================
-- NEW ENUMS
-- =============================================================================

CREATE TYPE situacao_atual_tipo AS ENUM ('estudante', 'trabalhador', 'ambos');
CREATE TYPE documento_tipo AS ENUM ('boletim_escolar', 'comprovante_matricula', 'comprovante_trabalho', 'historico_escolar', 'outro');
CREATE TYPE ocorrencia_tipo AS ENUM ('advertencia', 'suspensao', 'exclusao');
CREATE TYPE projeto_tipo AS ENUM ('social', 'esportivo', 'educacional', 'outro');
CREATE TYPE projeto_status AS ENUM ('planejamento', 'ativo', 'concluido', 'cancelado');
CREATE TYPE projeto_membro_status AS ENUM ('ativo', 'inativo', 'desligado');

-- =============================================================================
-- ALTER EXISTING TABLES
-- =============================================================================

ALTER TABLE aluno ADD COLUMN IF NOT EXISTS situacao_atual situacao_atual_tipo;
ALTER TABLE inscricao ADD COLUMN IF NOT EXISTS situacao_atual situacao_atual_tipo;

-- =============================================================================
-- NEW TABLES
-- =============================================================================

-- documento_comprobatorio
CREATE TABLE documento_comprobatorio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID NOT NULL REFERENCES aluno(id) ON DELETE CASCADE,
  tipo documento_tipo NOT NULL,
  arquivo_url TEXT NOT NULL,
  data_upload TIMESTAMPTZ NOT NULL DEFAULT now(),
  data_validade DATE,
  validado BOOLEAN NOT NULL DEFAULT false,
  validado_por UUID REFERENCES usuario_interno(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- desempenho_escolar
CREATE TABLE desempenho_escolar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID NOT NULL REFERENCES aluno(id) ON DELETE CASCADE,
  periodo TEXT NOT NULL,
  media_geral NUMERIC(4,2),
  arquivo_url TEXT,
  validado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ocorrencia_disciplinar
CREATE TABLE ocorrencia_disciplinar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID NOT NULL REFERENCES aluno(id) ON DELETE CASCADE,
  tipo ocorrencia_tipo NOT NULL,
  motivo TEXT NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  registrado_por UUID NOT NULL REFERENCES usuario_interno(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- avaliacao_evolucao
CREATE TABLE avaliacao_evolucao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID NOT NULL REFERENCES aluno(id) ON DELETE CASCADE,
  periodo TEXT NOT NULL,
  comportamento SMALLINT CHECK (comportamento BETWEEN 1 AND 10),
  disciplina SMALLINT CHECK (disciplina BETWEEN 1 AND 10),
  frequencia SMALLINT CHECK (frequencia BETWEEN 1 AND 10),
  desempenho SMALLINT CHECK (desempenho BETWEEN 1 AND 10),
  observacoes TEXT,
  avaliado_por UUID NOT NULL REFERENCES usuario_interno(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- projeto
CREATE TABLE projeto (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo projeto_tipo NOT NULL DEFAULT 'outro',
  status projeto_status NOT NULL DEFAULT 'planejamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- projeto_membro
CREATE TABLE projeto_membro (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  projeto_id UUID NOT NULL REFERENCES projeto(id) ON DELETE CASCADE,
  aluno_id UUID NOT NULL REFERENCES aluno(id) ON DELETE CASCADE,
  data_entrada DATE NOT NULL DEFAULT CURRENT_DATE,
  data_saida DATE,
  status projeto_membro_status NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (projeto_id, aluno_id)
);

-- =============================================================================
-- TRIGGERS (set_updated_at)
-- =============================================================================

CREATE TRIGGER set_updated_at BEFORE UPDATE ON documento_comprobatorio
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON desempenho_escolar
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON ocorrencia_disciplinar
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON avaliacao_evolucao
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON projeto
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON projeto_membro
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- RLS
-- =============================================================================

ALTER TABLE documento_comprobatorio ENABLE ROW LEVEL SECURITY;
ALTER TABLE desempenho_escolar ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocorrencia_disciplinar ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaliacao_evolucao ENABLE ROW LEVEL SECURITY;
ALTER TABLE projeto ENABLE ROW LEVEL SECURITY;
ALTER TABLE projeto_membro ENABLE ROW LEVEL SECURITY;

-- Authenticated users with any internal role can read all new tables
CREATE POLICY "internal_read_documento_comprobatorio" ON documento_comprobatorio
  FOR SELECT USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_read_desempenho_escolar" ON desempenho_escolar
  FOR SELECT USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_read_ocorrencia_disciplinar" ON ocorrencia_disciplinar
  FOR SELECT USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_read_avaliacao_evolucao" ON avaliacao_evolucao
  FOR SELECT USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_read_projeto" ON projeto
  FOR SELECT USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_read_projeto_membro" ON projeto_membro
  FOR SELECT USING (public.get_user_role() IS NOT NULL);

-- Directors and professors can insert/update
CREATE POLICY "internal_write_documento_comprobatorio" ON documento_comprobatorio
  FOR ALL USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_write_desempenho_escolar" ON desempenho_escolar
  FOR ALL USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_write_ocorrencia_disciplinar" ON ocorrencia_disciplinar
  FOR ALL USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_write_avaliacao_evolucao" ON avaliacao_evolucao
  FOR ALL USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_write_projeto" ON projeto
  FOR ALL USING (public.get_user_role() IS NOT NULL);

CREATE POLICY "internal_write_projeto_membro" ON projeto_membro
  FOR ALL USING (public.get_user_role() IS NOT NULL);
