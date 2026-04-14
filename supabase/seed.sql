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

INSERT INTO public.transparencia (id, titulo, descricao, tipo, arquivo_url, conteudo, data_referencia, publicado) VALUES
  ('00000000-0000-0000-0000-000000000601',
   'Estatuto Social',
   'Estatuto social da GŌKAI com disposições preliminares, finalidade, quadro associativo e governança.',
   'estatuto',
   null,
   $$# Estatuto Social – GŌKAI

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
- Patrimônio destinado a entidade similar$$,
   '2024-01-01', true),
  ('00000000-0000-0000-0000-000000000602',
   'Ata de Fundação',
   'Minuta inicial da ata de fundação da associação, pendente de preenchimento da data da reunião.',
   'ata',
   null,
   $$# Ata de Fundação

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

Secretário$$,
   '2025-01-01', false),
  ('00000000-0000-0000-0000-000000000603',
   'Regimento Interno',
   'Regimento interno com regras de assembleias, eleições, conduta, estrutura técnica e penalidades.',
   'outro',
   null,
   $$# Regimento Interno – GŌKAI

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
- Exclusão$$,
   '2024-01-01', true),
  ('00000000-0000-0000-0000-000000000604',
   'Memorando de Uso do Espaço',
   'Instrumento para formalização da cessão onerosa de uso do espaço utilizado pela associação.',
   'outro',
   null,
   $$# Cessão de Uso do Espaço

A GŌKAI utilizará o imóvel localizado na Rua Melo Franco, nº 68, bairro São Mateus, Juiz de Fora/MG, de propriedade de membro da Diretoria Executiva.

A utilização do espaço ocorrerá mediante contrato de sublocação ou cessão onerosa de uso, com pagamento de contribuição mensal pela associação.

O valor, forma de pagamento e condições de reajuste serão definidos em instrumento próprio, devendo observar critérios de razoabilidade e compatibilidade com o mercado.

A presente relação não configura vínculo empregatício ou distribuição de lucros, tratando-se exclusivamente de relação contratual para uso de espaço físico.$$,
   '2025-01-01', false);

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
