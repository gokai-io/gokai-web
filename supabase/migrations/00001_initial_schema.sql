-- =============================================================================
-- GŌKAI Martial Arts Club Platform — Initial Database Schema
-- Migration: 00001_initial_schema.sql
-- =============================================================================

-- =============================================================================
-- ENUMS
-- =============================================================================

CREATE TYPE associado_status AS ENUM ('ativo', 'inativo', 'suspenso');
CREATE TYPE associado_tipo AS ENUM ('fundador', 'efetivo', 'contribuinte', 'honorario');
CREATE TYPE cargo_diretoria AS ENUM ('presidente', 'vice_presidente', 'diretor_administrativo', 'diretor_financeiro', 'diretor_tecnico_esportivo');
CREATE TYPE professor_status AS ENUM ('ativo', 'inativo', 'licenciado');
CREATE TYPE turma_status AS ENUM ('ativa', 'inativa', 'encerrada');
CREATE TYPE aluno_status AS ENUM ('ativo', 'inativo', 'trancado', 'transferido');
CREATE TYPE inscricao_status AS ENUM ('pendente', 'contatado', 'matriculado', 'recusado');
CREATE TYPE evento_tipo AS ENUM ('treino_especial', 'seminario', 'campeonato', 'social', 'outro');
CREATE TYPE patrocinador_tipo AS ENUM ('pessoa_fisica', 'pessoa_juridica');
CREATE TYPE patrocinador_nivel AS ENUM ('ouro', 'prata', 'bronze', 'apoiador');
CREATE TYPE transparencia_tipo AS ENUM ('ata', 'balanco', 'relatorio', 'estatuto', 'outro');
CREATE TYPE contato_status AS ENUM ('novo', 'lido', 'respondido', 'arquivado');
CREATE TYPE user_role AS ENUM ('presidente', 'vice_presidente', 'diretor_administrativo', 'diretor_financeiro', 'diretor_tecnico_esportivo', 'professor');
CREATE TYPE aluno_turma_status AS ENUM ('ativo', 'inativo', 'trancado');

-- =============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =============================================================================
-- TABLES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. pessoa
-- -----------------------------------------------------------------------------
CREATE TABLE public.pessoa (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo    text        NOT NULL,
  cpf              text        UNIQUE,
  email            text,
  telefone         text,
  data_nascimento  date,
  endereco         jsonb,
  foto_url         text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_pessoa_updated_at
  BEFORE UPDATE ON public.pessoa
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 2. associado
-- -----------------------------------------------------------------------------
CREATE TABLE public.associado (
  id               uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id        uuid             NOT NULL REFERENCES public.pessoa(id) ON DELETE CASCADE,
  numero_registro  text             UNIQUE NOT NULL,
  data_admissao    date             NOT NULL,
  status           associado_status NOT NULL DEFAULT 'ativo',
  tipo             associado_tipo   NOT NULL DEFAULT 'efetivo',
  created_at       timestamptz      NOT NULL DEFAULT now(),
  updated_at       timestamptz      NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_associado_updated_at
  BEFORE UPDATE ON public.associado
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 3. diretor
-- -----------------------------------------------------------------------------
CREATE TABLE public.diretor (
  id             uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  associado_id   uuid            NOT NULL REFERENCES public.associado(id) ON DELETE CASCADE,
  cargo          cargo_diretoria NOT NULL,
  data_inicio date            NOT NULL,
  data_fim    date,
  ativo          boolean         NOT NULL DEFAULT true,
  created_at     timestamptz     NOT NULL DEFAULT now(),
  updated_at     timestamptz     NOT NULL DEFAULT now()
);

-- Partial unique: only one active director per role at a time
CREATE UNIQUE INDEX uq_diretor_cargo_ativo
  ON public.diretor (cargo)
  WHERE ativo = true;

CREATE TRIGGER trg_diretor_updated_at
  BEFORE UPDATE ON public.diretor
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. conselheiro_fiscal
-- -----------------------------------------------------------------------------
CREATE TABLE public.conselheiro_fiscal (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  associado_id   uuid        NOT NULL REFERENCES public.associado(id) ON DELETE CASCADE,
  data_inicio date        NOT NULL,
  data_fim    date,
  ativo          boolean     NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_conselheiro_fiscal_updated_at
  BEFORE UPDATE ON public.conselheiro_fiscal
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 5. professor
-- -----------------------------------------------------------------------------
CREATE TABLE public.professor (
  id                  uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id           uuid             NOT NULL UNIQUE REFERENCES public.pessoa(id) ON DELETE CASCADE,
  especialidades      text[]           NOT NULL DEFAULT '{}',
  graduacao           text,
  registro_federacao  text,
  bio                 text,
  status              professor_status NOT NULL DEFAULT 'ativo',
  exibir_site         boolean          NOT NULL DEFAULT true,
  created_at          timestamptz      NOT NULL DEFAULT now(),
  updated_at          timestamptz      NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_professor_updated_at
  BEFORE UPDATE ON public.professor
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 6. modalidade
-- -----------------------------------------------------------------------------
CREATE TABLE public.modalidade (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  nome        text        NOT NULL,
  slug        text        UNIQUE NOT NULL,
  descricao   text,
  imagem_url  text,
  ativa       boolean     NOT NULL DEFAULT true,
  ordem       integer     NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_modalidade_updated_at
  BEFORE UPDATE ON public.modalidade
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 7. turma
-- -----------------------------------------------------------------------------
CREATE TABLE public.turma (
  id              uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  modalidade_id   uuid         NOT NULL REFERENCES public.modalidade(id) ON DELETE RESTRICT,
  professor_id    uuid         NOT NULL REFERENCES public.professor(id) ON DELETE RESTRICT,
  nome            text         NOT NULL,
  dia_semana      integer[]    NOT NULL,
  horario_inicio  time         NOT NULL,
  horario_fim     time         NOT NULL,
  local           text,
  vagas           integer,
  status          turma_status NOT NULL DEFAULT 'ativa',
  created_at      timestamptz  NOT NULL DEFAULT now(),
  updated_at      timestamptz  NOT NULL DEFAULT now(),

  CONSTRAINT chk_turma_dia_semana CHECK (
    dia_semana <@ ARRAY[0,1,2,3,4,5,6]
  ),
  CONSTRAINT chk_turma_horario CHECK (
    horario_fim > horario_inicio
  ),
  CONSTRAINT chk_turma_vagas CHECK (
    vagas IS NULL OR vagas > 0
  )
);

CREATE TRIGGER trg_turma_updated_at
  BEFORE UPDATE ON public.turma
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 8. aluno
-- -----------------------------------------------------------------------------
CREATE TABLE public.aluno (
  id                    uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id             uuid         NOT NULL UNIQUE REFERENCES public.pessoa(id) ON DELETE CASCADE,
  matricula             text         UNIQUE NOT NULL,
  data_matricula        date         NOT NULL DEFAULT current_date,
  status                aluno_status NOT NULL DEFAULT 'ativo',
  graduacao             text,
  observacoes_medicas   text,
  eh_menor              boolean      NOT NULL DEFAULT false,
  created_at            timestamptz  NOT NULL DEFAULT now(),
  updated_at            timestamptz  NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_aluno_updated_at
  BEFORE UPDATE ON public.aluno
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 9. responsavel_legal
-- -----------------------------------------------------------------------------
CREATE TABLE public.responsavel_legal (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  pessoa_id   uuid        NOT NULL REFERENCES public.pessoa(id) ON DELETE CASCADE,
  aluno_id    uuid        NOT NULL REFERENCES public.aluno(id) ON DELETE CASCADE,
  parentesco  text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 10. aluno_turma
-- -----------------------------------------------------------------------------
CREATE TABLE public.aluno_turma (
  id           uuid              PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id     uuid              NOT NULL REFERENCES public.aluno(id) ON DELETE CASCADE,
  turma_id     uuid              NOT NULL REFERENCES public.turma(id) ON DELETE CASCADE,
  data_entrada date              NOT NULL DEFAULT current_date,
  data_saida   date,
  status       aluno_turma_status NOT NULL DEFAULT 'ativo',
  created_at   timestamptz       NOT NULL DEFAULT now(),

  CONSTRAINT uq_aluno_turma UNIQUE (aluno_id, turma_id),
  CONSTRAINT chk_aluno_turma_datas CHECK (
    data_saida IS NULL OR data_saida >= data_entrada
  )
);

-- -----------------------------------------------------------------------------
-- 11. frequencia
-- -----------------------------------------------------------------------------
CREATE TABLE public.frequencia (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  turma_id        uuid        NOT NULL REFERENCES public.turma(id) ON DELETE CASCADE,
  aluno_id        uuid        NOT NULL REFERENCES public.aluno(id) ON DELETE CASCADE,
  data            date        NOT NULL,
  presente        boolean     NOT NULL DEFAULT true,
  observacao      text,
  registrado_por  uuid        NOT NULL REFERENCES auth.users(id),
  created_at      timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_frequencia UNIQUE (turma_id, aluno_id, data)
);

-- -----------------------------------------------------------------------------
-- 12. inscricao
-- -----------------------------------------------------------------------------
CREATE TABLE public.inscricao (
  id                      uuid             PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo           text             NOT NULL,
  email                   text             NOT NULL,
  telefone                text,
  data_nascimento         date,
  modalidade_interesse    text,
  experiencia_previa      text,
  observacoes             text,
  eh_menor                boolean          NOT NULL DEFAULT false,
  responsavel_nome        text,
  responsavel_telefone    text,
  responsavel_email       text,
  responsavel_parentesco  text,
  status                  inscricao_status NOT NULL DEFAULT 'pendente',
  notas_internas          text,
  created_at              timestamptz      NOT NULL DEFAULT now(),
  updated_at              timestamptz      NOT NULL DEFAULT now(),

  CONSTRAINT chk_inscricao_menor CHECK (
    eh_menor = false
    OR (responsavel_nome IS NOT NULL AND responsavel_telefone IS NOT NULL AND responsavel_parentesco IS NOT NULL)
  )
);

CREATE TRIGGER trg_inscricao_updated_at
  BEFORE UPDATE ON public.inscricao
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 13. evento
-- -----------------------------------------------------------------------------
CREATE TABLE public.evento (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo      text        NOT NULL,
  slug        text        UNIQUE NOT NULL,
  descricao   text,
  conteudo    text,
  data_inicio timestamptz NOT NULL,
  data_fim    timestamptz,
  local       text,
  imagem_url  text,
  publicado   boolean     NOT NULL DEFAULT false,
  destaque    boolean     NOT NULL DEFAULT false,
  tipo        evento_tipo NOT NULL DEFAULT 'outro',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT chk_evento_datas CHECK (
    data_fim IS NULL OR data_fim >= data_inicio
  )
);

CREATE TRIGGER trg_evento_updated_at
  BEFORE UPDATE ON public.evento
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 14. campeonato
-- -----------------------------------------------------------------------------
CREATE TABLE public.campeonato (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id       uuid        NOT NULL UNIQUE REFERENCES public.evento(id) ON DELETE CASCADE,
  modalidade_id   uuid        NOT NULL REFERENCES public.modalidade(id) ON DELETE RESTRICT,
  regulamento_url text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_campeonato_updated_at
  BEFORE UPDATE ON public.campeonato
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 15. campeonato_participante
-- -----------------------------------------------------------------------------
CREATE TABLE public.campeonato_participante (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  campeonato_id  uuid        NOT NULL REFERENCES public.campeonato(id) ON DELETE CASCADE,
  aluno_id       uuid        NOT NULL REFERENCES public.aluno(id) ON DELETE CASCADE,
  categoria      text,
  resultado      text,
  posicao        integer,
  created_at     timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_campeonato_participante UNIQUE (campeonato_id, aluno_id),
  CONSTRAINT chk_posicao CHECK (posicao IS NULL OR posicao > 0)
);

-- -----------------------------------------------------------------------------
-- 16. patrocinador
-- -----------------------------------------------------------------------------
CREATE TABLE public.patrocinador (
  id             uuid               PRIMARY KEY DEFAULT gen_random_uuid(),
  nome           text               NOT NULL,
  logo_url       text,
  website        text,
  tipo           patrocinador_tipo  NOT NULL DEFAULT 'pessoa_juridica',
  nivel          patrocinador_nivel NOT NULL DEFAULT 'apoiador',
  contato        text,
  valor_mensal   numeric(10,2),
  contrato_url   text,
  ativo          boolean            NOT NULL DEFAULT true,
  exibir_site    boolean            NOT NULL DEFAULT true,
  created_at     timestamptz        NOT NULL DEFAULT now(),
  updated_at     timestamptz        NOT NULL DEFAULT now(),

  CONSTRAINT chk_patrocinador_valor CHECK (
    valor_mensal IS NULL OR valor_mensal >= 0
  )
);

CREATE TRIGGER trg_patrocinador_updated_at
  BEFORE UPDATE ON public.patrocinador
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 17. transparencia
-- -----------------------------------------------------------------------------
CREATE TABLE public.transparencia (
  id               uuid               PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo           text               NOT NULL,
  descricao        text,
  tipo             transparencia_tipo NOT NULL,
  arquivo_url      text               NOT NULL,
  data_referencia  date               NOT NULL,
  publicado        boolean            NOT NULL DEFAULT false,
  created_at       timestamptz        NOT NULL DEFAULT now(),
  updated_at       timestamptz        NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_transparencia_updated_at
  BEFORE UPDATE ON public.transparencia
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 18. usuario_interno
-- -----------------------------------------------------------------------------
CREATE TABLE public.usuario_interno (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid        NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  pessoa_id    uuid        NOT NULL UNIQUE REFERENCES public.pessoa(id) ON DELETE CASCADE,
  role         user_role   NOT NULL,
  ativo        boolean     NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_usuario_interno_updated_at
  BEFORE UPDATE ON public.usuario_interno
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- HELPER FUNCTIONS (RLS) — must be after usuario_interno table
-- =============================================================================

-- Returns the role of the currently authenticated user
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.usuario_interno
  WHERE auth_user_id = auth.uid()
    AND ativo = true
  LIMIT 1;
$$;

-- Returns the pessoa_id of the currently authenticated user
CREATE OR REPLACE FUNCTION public.get_user_pessoa_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT pessoa_id
  FROM public.usuario_interno
  WHERE auth_user_id = auth.uid()
    AND ativo = true
  LIMIT 1;
$$;

-- -----------------------------------------------------------------------------
-- 19. contato
-- -----------------------------------------------------------------------------
CREATE TABLE public.contato (
  id         uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
  nome       text           NOT NULL,
  email      text           NOT NULL,
  telefone   text,
  assunto    text           NOT NULL,
  mensagem   text           NOT NULL,
  status     contato_status NOT NULL DEFAULT 'novo',
  created_at timestamptz    NOT NULL DEFAULT now(),
  updated_at timestamptz    NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_contato_updated_at
  BEFORE UPDATE ON public.contato
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================================
-- INDICES
-- =============================================================================

-- pessoa
CREATE INDEX idx_pessoa_cpf   ON public.pessoa (cpf)   WHERE cpf IS NOT NULL;
CREATE INDEX idx_pessoa_email  ON public.pessoa (email) WHERE email IS NOT NULL;

-- associado
CREATE INDEX idx_associado_pessoa_id ON public.associado (pessoa_id);
CREATE INDEX idx_associado_status    ON public.associado (status);

-- professor
CREATE INDEX idx_professor_pessoa_id ON public.professor (pessoa_id);
CREATE INDEX idx_professor_status    ON public.professor (status);

-- aluno
CREATE INDEX idx_aluno_pessoa_id ON public.aluno (pessoa_id);
CREATE INDEX idx_aluno_status    ON public.aluno (status);
CREATE INDEX idx_aluno_matricula ON public.aluno (matricula);

-- turma
CREATE INDEX idx_turma_modalidade_id ON public.turma (modalidade_id);
CREATE INDEX idx_turma_professor_id  ON public.turma (professor_id);
CREATE INDEX idx_turma_status        ON public.turma (status);

-- frequencia
CREATE INDEX idx_frequencia_turma_data ON public.frequencia (turma_id, data);
CREATE INDEX idx_frequencia_aluno_id   ON public.frequencia (aluno_id);

-- inscricao
CREATE INDEX idx_inscricao_status ON public.inscricao (status);

-- evento
CREATE INDEX idx_evento_slug          ON public.evento (slug);
CREATE INDEX idx_evento_publicado_tipo ON public.evento (publicado, tipo);

-- usuario_interno
CREATE INDEX idx_usuario_interno_auth_user_id ON public.usuario_interno (auth_user_id);
CREATE INDEX idx_usuario_interno_role         ON public.usuario_interno (role);

-- =============================================================================
-- ROW LEVEL SECURITY — ENABLE
-- =============================================================================

ALTER TABLE public.pessoa               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associado            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diretor              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conselheiro_fiscal   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professor            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modalidade           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turma                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aluno                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responsavel_legal    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aluno_turma          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.frequencia           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricao            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evento               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campeonato           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campeonato_participante ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patrocinador         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transparencia        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuario_interno      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contato              ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- ROW LEVEL SECURITY — POLICIES
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Helper: is_presidente_or_vice
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_presidente_or_vice()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT get_user_role() IN ('presidente', 'vice_presidente');
$$;

-- ---------------------------------------------------------------------------
-- modalidade — anonymous read (ativa=true), authenticated full read
-- ---------------------------------------------------------------------------
CREATE POLICY "modalidade_anon_read" ON public.modalidade
  FOR SELECT
  TO anon
  USING (ativa = true);

CREATE POLICY "modalidade_auth_read" ON public.modalidade
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "modalidade_presidente_all" ON public.modalidade
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "modalidade_dte_write" ON public.modalidade
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- evento — anonymous read (publicado=true), staff write
-- ---------------------------------------------------------------------------
CREATE POLICY "evento_anon_read" ON public.evento
  FOR SELECT
  TO anon
  USING (publicado = true);

CREATE POLICY "evento_auth_read" ON public.evento
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "evento_presidente_all" ON public.evento
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "evento_admin_write" ON public.evento
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "evento_dte_write" ON public.evento
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- transparencia — anonymous read (publicado=true), staff write
-- ---------------------------------------------------------------------------
CREATE POLICY "transparencia_anon_read" ON public.transparencia
  FOR SELECT
  TO anon
  USING (publicado = true);

CREATE POLICY "transparencia_auth_read" ON public.transparencia
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "transparencia_presidente_all" ON public.transparencia
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "transparencia_financeiro_write" ON public.transparencia
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_financeiro')
  WITH CHECK (public.get_user_role() = 'diretor_financeiro');

-- ---------------------------------------------------------------------------
-- patrocinador — anonymous read (ativo AND exibir_site), staff write
-- ---------------------------------------------------------------------------
CREATE POLICY "patrocinador_anon_read" ON public.patrocinador
  FOR SELECT
  TO anon
  USING (ativo = true AND exibir_site = true);

CREATE POLICY "patrocinador_auth_read" ON public.patrocinador
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "patrocinador_presidente_all" ON public.patrocinador
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "patrocinador_admin_write" ON public.patrocinador
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "patrocinador_financeiro_write" ON public.patrocinador
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_financeiro')
  WITH CHECK (public.get_user_role() = 'diretor_financeiro');

-- ---------------------------------------------------------------------------
-- professor — anonymous read (exibir_site=true, limited columns via view)
-- Note: Full column-level restriction is done via a separate view for anon.
-- RLS guards the table; a view (created after) exposes safe columns to anon.
-- ---------------------------------------------------------------------------
CREATE POLICY "professor_anon_read" ON public.professor
  FOR SELECT
  TO anon
  USING (exibir_site = true);

CREATE POLICY "professor_auth_read" ON public.professor
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "professor_presidente_all" ON public.professor
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "professor_admin_write" ON public.professor
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "professor_dte_write" ON public.professor
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- inscricao — anonymous insert (public form), staff read/write
-- ---------------------------------------------------------------------------
CREATE POLICY "inscricao_anon_insert" ON public.inscricao
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "inscricao_auth_read" ON public.inscricao
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "inscricao_presidente_all" ON public.inscricao
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "inscricao_admin_write" ON public.inscricao
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

-- ---------------------------------------------------------------------------
-- contato — anonymous insert (public form), staff read/write
-- ---------------------------------------------------------------------------
CREATE POLICY "contato_anon_insert" ON public.contato
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "contato_auth_read" ON public.contato
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "contato_presidente_all" ON public.contato
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "contato_admin_write" ON public.contato
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

-- ---------------------------------------------------------------------------
-- pessoa — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "pessoa_auth_read" ON public.pessoa
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "pessoa_presidente_all" ON public.pessoa
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "pessoa_admin_write" ON public.pessoa
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "pessoa_dte_write" ON public.pessoa
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- associado — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "associado_auth_read" ON public.associado
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "associado_presidente_all" ON public.associado
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "associado_admin_write" ON public.associado
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

-- ---------------------------------------------------------------------------
-- diretor — authenticated read; presidente only write
-- ---------------------------------------------------------------------------
CREATE POLICY "diretor_auth_read" ON public.diretor
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "diretor_presidente_all" ON public.diretor
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

-- ---------------------------------------------------------------------------
-- conselheiro_fiscal — authenticated read; presidente only write
-- ---------------------------------------------------------------------------
CREATE POLICY "conselheiro_fiscal_auth_read" ON public.conselheiro_fiscal
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "conselheiro_fiscal_presidente_all" ON public.conselheiro_fiscal
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

-- ---------------------------------------------------------------------------
-- aluno — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "aluno_auth_read" ON public.aluno
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "aluno_presidente_all" ON public.aluno
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "aluno_admin_write" ON public.aluno
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "aluno_dte_write" ON public.aluno
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- responsavel_legal — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "responsavel_legal_auth_read" ON public.responsavel_legal
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "responsavel_legal_presidente_all" ON public.responsavel_legal
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "responsavel_legal_admin_write" ON public.responsavel_legal
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "responsavel_legal_dte_write" ON public.responsavel_legal
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- turma — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "turma_auth_read" ON public.turma
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "turma_presidente_all" ON public.turma
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "turma_admin_write" ON public.turma
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "turma_dte_write" ON public.turma
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- aluno_turma — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "aluno_turma_auth_read" ON public.aluno_turma
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "aluno_turma_presidente_all" ON public.aluno_turma
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "aluno_turma_admin_write" ON public.aluno_turma
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_administrativo')
  WITH CHECK (public.get_user_role() = 'diretor_administrativo');

CREATE POLICY "aluno_turma_dte_write" ON public.aluno_turma
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- frequencia — authenticated read; role-based write + professor self-service
-- ---------------------------------------------------------------------------
CREATE POLICY "frequencia_auth_read" ON public.frequencia
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "frequencia_presidente_all" ON public.frequencia
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "frequencia_dte_write" ON public.frequencia
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- Professor can only manage frequencia for turmas where they are the professor
CREATE POLICY "frequencia_professor_write" ON public.frequencia
  FOR ALL
  TO authenticated
  USING (
    public.get_user_role() = 'professor'
    AND EXISTS (
      SELECT 1
      FROM public.turma t
      JOIN public.professor p ON p.id = t.professor_id
      WHERE t.id = frequencia.turma_id
        AND p.pessoa_id = public.get_user_pessoa_id()
    )
  )
  WITH CHECK (
    public.get_user_role() = 'professor'
    AND EXISTS (
      SELECT 1
      FROM public.turma t
      JOIN public.professor p ON p.id = t.professor_id
      WHERE t.id = frequencia.turma_id
        AND p.pessoa_id = public.get_user_pessoa_id()
    )
  );

-- ---------------------------------------------------------------------------
-- campeonato — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "campeonato_auth_read" ON public.campeonato
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "campeonato_presidente_all" ON public.campeonato
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "campeonato_dte_write" ON public.campeonato
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- campeonato_participante — authenticated read; role-based write
-- ---------------------------------------------------------------------------
CREATE POLICY "campeonato_participante_auth_read" ON public.campeonato_participante
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "campeonato_participante_presidente_all" ON public.campeonato_participante
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

CREATE POLICY "campeonato_participante_dte_write" ON public.campeonato_participante
  FOR ALL
  TO authenticated
  USING (public.get_user_role() = 'diretor_tecnico_esportivo')
  WITH CHECK (public.get_user_role() = 'diretor_tecnico_esportivo');

-- ---------------------------------------------------------------------------
-- usuario_interno — authenticated self-read; presidente only write
-- ---------------------------------------------------------------------------
CREATE POLICY "usuario_interno_self_read" ON public.usuario_interno
  FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

CREATE POLICY "usuario_interno_presidente_all" ON public.usuario_interno
  FOR ALL
  TO authenticated
  USING (public.get_user_role() IN ('presidente', 'vice_presidente'))
  WITH CHECK (public.get_user_role() IN ('presidente', 'vice_presidente'));

-- =============================================================================
-- PUBLIC VIEW — professor_publico (safe columns for anonymous access)
-- =============================================================================
-- This view exposes only non-sensitive professor data to anonymous users.
-- It joins pessoa to get nome_completo and foto_url alongside professor fields.

CREATE VIEW public.professor_publico AS
  SELECT
    p.id,
    pe.nome_completo,
    pe.foto_url,
    p.bio,
    p.graduacao,
    p.especialidades
  FROM public.professor p
  JOIN public.pessoa pe ON pe.id = p.pessoa_id
  WHERE p.exibir_site = true
    AND p.status = 'ativo';

-- =============================================================================
-- STORAGE BUCKETS (only runs when storage extension is enabled)
-- =============================================================================

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN

    INSERT INTO storage.buckets (id, name, public) VALUES
      ('avatars',       'avatars',       true),
      ('eventos',       'eventos',       true),
      ('modalidades',   'modalidades',   true),
      ('patrocinadores','patrocinadores', true),
      ('transparencia', 'transparencia', true),
      ('documentos',    'documentos',    false)
    ON CONFLICT (id) DO NOTHING;

    -- Public read policies
    CREATE POLICY "storage_avatars_public_read" ON storage.objects
      FOR SELECT TO anon, authenticated USING (bucket_id = 'avatars');
    CREATE POLICY "storage_eventos_public_read" ON storage.objects
      FOR SELECT TO anon, authenticated USING (bucket_id = 'eventos');
    CREATE POLICY "storage_modalidades_public_read" ON storage.objects
      FOR SELECT TO anon, authenticated USING (bucket_id = 'modalidades');
    CREATE POLICY "storage_patrocinadores_public_read" ON storage.objects
      FOR SELECT TO anon, authenticated USING (bucket_id = 'patrocinadores');
    CREATE POLICY "storage_transparencia_public_read" ON storage.objects
      FOR SELECT TO anon, authenticated USING (bucket_id = 'transparencia');

    -- Private bucket: documentos — authenticated only
    CREATE POLICY "storage_documentos_auth_read" ON storage.objects
      FOR SELECT TO authenticated USING (bucket_id = 'documentos');

    -- Authenticated users can upload to any bucket
    CREATE POLICY "storage_auth_insert" ON storage.objects
      FOR INSERT TO authenticated WITH CHECK (auth.role() = 'authenticated');

    -- Only presidente/vice can delete from any bucket
    CREATE POLICY "storage_presidente_delete" ON storage.objects
      FOR DELETE TO authenticated
      USING (public.get_user_role() IN ('presidente', 'vice_presidente'));

  END IF;
END
$$;

-- =============================================================================
-- SEED INSTRUCTIONS
-- =============================================================================
--
-- HOW TO CREATE THE INITIAL PRESIDENTE USER
-- ==========================================
--
-- OPTION A — Supabase Dashboard (recommended for first setup):
--
--   1. Go to Authentication > Users in your Supabase project dashboard.
--   2. Click "Add user" and enter the email/password for the presidente.
--   3. Note the new user's UUID (shown in the users list).
--   4. Go to Table Editor > pessoa, and insert a row with the director's
--      personal data. Note the new pessoa UUID.
--   5. Go to Table Editor > usuario_interno and insert:
--        auth_user_id = <uuid from step 3>
--        pessoa_id    = <uuid from step 4>
--        role         = 'presidente'
--        ativo        = true
--
-- OPTION B — SQL seed script (after auth user is created via Dashboard or API):
--
--   Replace the placeholders below and run in the SQL editor:
--
--   DO $$
--   DECLARE
--     v_auth_user_id uuid := '<auth-user-uuid>';  -- from auth.users
--     v_pessoa_id    uuid;
--   BEGIN
--     INSERT INTO public.pessoa (nome_completo, email, telefone)
--     VALUES ('Nome Completo do Presidente', 'email@dominio.com', '(11) 99999-9999')
--     RETURNING id INTO v_pessoa_id;
--
--     INSERT INTO public.usuario_interno (auth_user_id, pessoa_id, role)
--     VALUES (v_auth_user_id, v_pessoa_id, 'presidente');
--   END;
--   $$;
--
-- NOTE: The auth user MUST be created first via Supabase Auth (not directly in
--       auth.users table) to ensure proper password hashing and session support.
--       After creating the auth user, you can link it to usuario_interno via SQL.
--
-- =============================================================================
