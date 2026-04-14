ALTER TABLE public.transparencia
  ALTER COLUMN arquivo_url DROP NOT NULL,
  ADD COLUMN conteudo text;
