-- =============================================================================
-- GŌKAI — Migration: Transparência com conteúdo Markdown + versionamento
-- Migration: 00002_transparencia_conteudo_versao.sql
-- =============================================================================

-- 1. Adicionar coluna conteudo (nullable, backward-compatible)
ALTER TABLE public.transparencia ADD COLUMN conteudo text;

-- 2. Permitir documentos só-markdown (arquivo_url agora é opcional)
ALTER TABLE public.transparencia ALTER COLUMN arquivo_url DROP NOT NULL;

-- 3. Tabela de versões
CREATE TABLE public.transparencia_versao (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  transparencia_id  uuid        NOT NULL REFERENCES public.transparencia(id) ON DELETE CASCADE,
  versao            int         NOT NULL,
  conteudo          text        NOT NULL,
  editado_por       uuid        REFERENCES public.usuario_interno(id) ON DELETE SET NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (transparencia_id, versao)
);

-- Index for fast lookups by transparencia_id
CREATE INDEX idx_transparencia_versao_doc ON public.transparencia_versao(transparencia_id);

-- =============================================================================
-- RLS for transparencia_versao
-- =============================================================================

ALTER TABLE public.transparencia_versao ENABLE ROW LEVEL SECURITY;

-- Anon: lê versões de documentos publicados
CREATE POLICY "anon_read_versao_publicada" ON public.transparencia_versao
  FOR SELECT TO anon
  USING (
    EXISTS (
      SELECT 1 FROM public.transparencia t
      WHERE t.id = transparencia_id AND t.publicado = true
    )
  );

-- Authenticated: lê todas as versões
CREATE POLICY "auth_read_all_versao" ON public.transparencia_versao
  FOR SELECT TO authenticated
  USING (true);

-- Authenticated com role adequado: insere versões
CREATE POLICY "auth_insert_versao" ON public.transparencia_versao
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.usuario_interno ui
      WHERE ui.auth_user_id = auth.uid()
        AND ui.ativo = true
        AND ui.role IN ('presidente', 'vice_presidente', 'diretor_financeiro', 'diretor_administrativo')
    )
  );
