-- =============================================================================
-- GŌKAI — Seed Data
-- =============================================================================
-- Run after migrations with: supabase db reset (applies migrations + seed)
-- Or manually: psql -f supabase/seed.sql
-- =============================================================================

-- Deterministic UUIDs for cross-table references
-- Modalidades:  00000000-0000-0000-0000-000000000101 .. 106
-- Pessoas:      00000000-0000-0000-0000-000000000201 .. 205
-- Professores:  00000000-0000-0000-0000-000000000301 .. 303
-- Associados:   00000000-0000-0000-0000-000000000401 .. 402
-- Diretores:    00000000-0000-0000-0000-000000000501 .. 502
-- Transparência:00000000-0000-0000-0000-000000000601 .. 604

BEGIN;

-- =============================================================================
-- 1. MODALIDADES (6)
-- =============================================================================

INSERT INTO public.modalidade (id, nome, slug, descricao, ativa, ordem) VALUES
  ('00000000-0000-0000-0000-000000000101', 'Jiu-Jitsu', 'jiu-jitsu',
   'Arte marcial focada em técnicas de solo, alavancas e finalizações. Desenvolve raciocínio tático, resiliência e autocontrole.',
   true, 1),
  ('00000000-0000-0000-0000-000000000102', 'Judô', 'judo',
   'Arte marcial olímpica baseada em projeções e imobilizações. Promove disciplina, equilíbrio e respeito mútuo.',
   true, 2),
  ('00000000-0000-0000-0000-000000000103', 'Boxe', 'boxe',
   'Esporte de combate que desenvolve condicionamento físico, reflexos, coordenação motora e determinação.',
   true, 3),
  ('00000000-0000-0000-0000-000000000104', 'Xadrez', 'xadrez',
   'Esporte da mente que desenvolve raciocínio estratégico, concentração e tomada de decisão sob pressão.',
   true, 4),
  ('00000000-0000-0000-0000-000000000105', 'Defesa Pessoal Feminina', 'defesa-pessoal-feminina',
   'Programa voltado para mulheres com técnicas práticas de autodefesa, consciência situacional e empoderamento.',
   true, 5),
  ('00000000-0000-0000-0000-000000000106', 'Projetos Ambientais', 'projetos-ambientais',
   'Atividades de educação ambiental e sustentabilidade integradas à formação dos atletas e da comunidade.',
   true, 6);

-- =============================================================================
-- 2. PESSOAS (5)
-- =============================================================================

INSERT INTO public.pessoa (id, nome_completo, email) VALUES
  ('00000000-0000-0000-0000-000000000201', 'Alex', NULL),
  ('00000000-0000-0000-0000-000000000202', 'Linus Pauling', NULL),
  ('00000000-0000-0000-0000-000000000203', 'Cássia', NULL),
  ('00000000-0000-0000-0000-000000000204', 'Thiago Mello', NULL),
  ('00000000-0000-0000-0000-000000000205', 'Renan Winter Spatin', NULL);

-- =============================================================================
-- 3. PROFESSORES (3)
-- =============================================================================

INSERT INTO public.professor (id, pessoa_id, especialidades, graduacao, bio, status, exibir_site) VALUES
  ('00000000-0000-0000-0000-000000000301',
   '00000000-0000-0000-0000-000000000201',
   ARRAY['Boxe'],
   NULL,
   'Instrutor de Boxe com experiência em formação de atletas iniciantes e avançados.',
   'ativo', true),
  ('00000000-0000-0000-0000-000000000302',
   '00000000-0000-0000-0000-000000000202',
   ARRAY['Jiu-Jitsu', 'Judô', 'Boxe', 'Xadrez'],
   NULL,
   'Professor multidisciplinar atuante em Jiu-Jitsu, Judô, Boxe e Xadrez. Formação ampla com foco no desenvolvimento integral do atleta.',
   'ativo', true),
  ('00000000-0000-0000-0000-000000000303',
   '00000000-0000-0000-0000-000000000203',
   ARRAY['Jiu-Jitsu', 'Judô', 'Boxe', 'Educação Ambiental'],
   NULL,
   'Professora com atuação em artes marciais e educação ambiental. Comprometida com a formação completa dos alunos.',
   'ativo', true);

-- =============================================================================
-- 4. ASSOCIADOS (2) — fundadores
-- =============================================================================

INSERT INTO public.associado (id, pessoa_id, numero_registro, data_admissao, status, tipo) VALUES
  ('00000000-0000-0000-0000-000000000401',
   '00000000-0000-0000-0000-000000000204',
   'GOKAI-001', '2024-01-01', 'ativo', 'fundador'),
  ('00000000-0000-0000-0000-000000000402',
   '00000000-0000-0000-0000-000000000205',
   'GOKAI-002', '2024-01-01', 'ativo', 'fundador');

-- =============================================================================
-- 5. DIRETORES (2)
-- =============================================================================

INSERT INTO public.diretor (id, associado_id, cargo, data_inicio, ativo) VALUES
  ('00000000-0000-0000-0000-000000000501',
   '00000000-0000-0000-0000-000000000401',
   'presidente', '2024-01-01', true),
  ('00000000-0000-0000-0000-000000000502',
   '00000000-0000-0000-0000-000000000402',
   'vice_presidente', '2024-01-01', true);

-- =============================================================================
-- 6. TRANSPARÊNCIA (4)
-- =============================================================================

INSERT INTO public.transparencia (id, titulo, descricao, tipo, arquivo_url, data_referencia, publicado) VALUES
  ('00000000-0000-0000-0000-000000000601',
   'Estatuto Social',
   'Estatuto Social da Associação Esportiva e Ambiental GŌKAI, registrado em cartório.',
   'estatuto',
   'https://placeholder.gokai.com.br/docs/estatuto-social.pdf',
   '2024-01-01', true),
  ('00000000-0000-0000-0000-000000000602',
   'Ata de Fundação',
   'Ata da assembleia de fundação da associação.',
   'ata',
   'https://placeholder.gokai.com.br/docs/ata-fundacao.pdf',
   '2024-01-01', true),
  ('00000000-0000-0000-0000-000000000603',
   'Regimento Interno',
   'Regimento interno que disciplina o funcionamento da associação.',
   'outro',
   'https://placeholder.gokai.com.br/docs/regimento-interno.pdf',
   '2024-01-01', true),
  ('00000000-0000-0000-0000-000000000604',
   'Memorando de Parceria',
   'Memorando de entendimento com parceiros institucionais.',
   'outro',
   'https://placeholder.gokai.com.br/docs/memorando-parceria.pdf',
   '2024-06-01', true);

-- =============================================================================
-- 7. USUARIO_INTERNO (template — requires auth.users to exist first)
-- =============================================================================
-- After creating auth users via Supabase Dashboard or CLI, uncomment and
-- replace the auth_user_id values with the real UUIDs from auth.users.
--
-- INSERT INTO public.usuario_interno (id, auth_user_id, pessoa_id, role, ativo) VALUES
--   ('00000000-0000-0000-0000-000000000701',
--    '<THIAGO_AUTH_USER_ID>',
--    '00000000-0000-0000-0000-000000000204',
--    'presidente', true),
--   ('00000000-0000-0000-0000-000000000702',
--    '<RENAN_AUTH_USER_ID>',
--    '00000000-0000-0000-0000-000000000205',
--    'vice_presidente', true);

COMMIT;
