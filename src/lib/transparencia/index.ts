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
    descricao: "Estatuto Social completo da GŌKAI com 25 artigos distribuídos em 8 títulos — disposições preliminares, quadro social, organização administrativa, patrimônio, prestação de contas, reforma e dissolução.",
    tipo: "estatuto",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2024-01-01",
    publicado: true,
    conteudo: `# ESTATUTO SOCIAL
## GŌKAI – CLUBE DE ARTES MARCIAIS

---

## Título I – Disposições Preliminares

**Art. 1** – A associação civil sem fins lucrativos denominada **GŌKAI – CLUBE DE ARTES MARCIAIS**, doravante "Gōkai", é fundada aos __ (______) dias do mês de _______ de 2026, com sede na **Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora – MG, CEP 36.045-060**, com duração por prazo indeterminado, regendo-se pelo presente Estatuto, pelo Regimento Interno e pela legislação aplicável.

**Art. 2** – A Gōkai tem por finalidade promover, divulgar e desenvolver a prática e a cultura das artes marciais e esportes de combate, bem como ações socioeducativas, culturais, esportivas e ambientais correlatas, priorizando a inclusão social de jovens em situação de vulnerabilidade e utilizando o esporte como ferramenta de transformação social, cidadania e desenvolvimento humano. Para atingir seus objetivos, poderá:

a) organizar cursos, workshops, seminários e competições;
b) manter parcerias com projetos esportivos, clubes e instituições de ensino;
c) captar recursos mediante contribuições dos associados, patrocínios, doações, convênios e eventos;
d) defender a ética, a transparência e o respeito às diferenças, vedada qualquer manifestação de caráter político-partidário.

**Parágrafo único** – É proibida a distribuição de resultados, excedentes ou patrimônio, sob qualquer forma ou pretexto, aos associados ou dirigentes.

**Art. 2-A – Da Sede e Uso dos Espaços Físicos**

**§1º – Polo São Mateus (Sede)**
O imóvel situado na Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora/MG, CEP 36.045-060, é locado por **Thiago Santos Mello**, Presidente da Associação, na qualidade de locatário, o qual subloca o referido espaço à Gōkai mediante Contrato de Sublocação celebrado em separado entre as partes.

**§2º – Polo Linhares**
O imóvel utilizado pela Gōkai no Polo Linhares, denominado **[nome da academia]**, situado em [endereço completo], Linhares, Juiz de Fora/MG, CEP _________, é de propriedade de **Alex Sobreira**, membro fundador e professor da Associação, o qual o loca diretamente à Gōkai mediante Contrato de Locação celebrado em separado entre as partes.

**§3º** – Os Contratos de Sublocação serão celebrados em separado para cada polo, com prazo, valor e condições definidos entre cada sublocador e a Associação, não gerando confusão patrimonial entre os imóveis e o patrimônio social da Gōkai. Eventuais benfeitorias não indenizáveis não integrarão a massa patrimonial em caso de dissolução da Associação.

**§4º** – Ambos os sublocadores declaram ciência do conflito de interesses decorrente de sua condição simultânea de membros da Associação e sublocadores, abstendo-se de votar nas deliberações que envolvam os respectivos contratos de sublocação.

---

## Título II – Do Quadro Social

**Art. 3** – A associação será constituída por número ilimitado de associados, distribuídos nas seguintes categorias:

- **I – Fundadores:** aqueles que subscrevem a ata de constituição.
- **II – Efetivos:** pessoas que aderirem após a fundação e forem admitidas pela Diretoria.
- **III – Colaboradores:** pessoas físicas ou jurídicas que contribuam material ou tecnicamente, sem direito a voto.
- **IV – Atletas/Alunos:** participantes das atividades esportivas promovidas pela Associação.

**Art. 4** – A admissão de novos associados efetivos ocorrerá mediante aprovação da Diretoria Executiva, após preenchimento de ficha cadastral e assinatura do termo de adesão. Em caso de recusa, a justificativa será apresentada e arquivada.

**Art. 5** – São direitos dos associados quites com suas obrigações:

a) frequentar a sede e participar das atividades e eventos;
b) votar e ser votado nas assembleias gerais (exclusivamente fundadores e efetivos);
c) apresentar propostas e representações por escrito à Diretoria;
d) receber informações sobre as atividades e finanças da Associação.

**Art. 6** – São deveres dos associados:

a) cooperar para a realização dos objetivos sociais;
b) cumprir o Estatuto, o Regimento Interno e as deliberações da Assembleia e da Diretoria;
c) manter em dia as contribuições financeiras, quando houver;
d) zelar pelo bom nome e pelo patrimônio da Associação e manter conduta ética e disciplinada.

**Art. 7** – O associado que desejar se desligar deverá comunicar por escrito à Diretoria, estando quite com suas obrigações. O associado poderá ser excluído pela Diretoria, mediante justa causa, nos casos de infração às normas ou inadimplência, assegurado o direito de defesa e recurso à Assembleia Geral.

**Parágrafo único** – A readmissão obedecerá às mesmas normas da admissão.

---

## Título III – Da Organização Administrativa

### Capítulo I – Assembleia Geral

**Art. 8** – A Assembleia Geral é o órgão soberano da associação, constituída pelos associados fundadores e efetivos em pleno gozo de seus direitos. Compete-lhe deliberar sobre todas as matérias de interesse da Associação e, privativamente, eleger e destituir administradores, aprovar contas e alterar o Estatuto.

**Art. 9** – A Assembleia Geral reunir-se-á ordinariamente uma vez por ano e extraordinariamente quando convocada pelo Presidente, pela Diretoria ou por, no mínimo, 1/5 (um quinto) dos associados.

**§ 1º** – As convocações serão feitas por meio de edital afixado na sede e comunicação eletrônica aos associados, com antecedência mínima de 10 (dez) dias.

**§ 2º** – A Assembleia instalar-se-á, em primeira convocação, com a presença da maioria absoluta dos associados; em segunda convocação, decorridos 30 (trinta) minutos, com qualquer número de presentes.

**§ 3º** – As decisões serão tomadas pela maioria simples dos votos dos presentes, salvo hipóteses em que este Estatuto exigir quórum especial.

**§ 4º** – É facultada a participação remota por meios eletrônicos, desde que garantida a autenticidade da identificação.

**Art. 10** – Para destituir administradores ou alterar o Estatuto será necessária Assembleia especialmente convocada para esse fim, exigindo-se o voto favorável de pelo menos 2/3 (dois terços) dos presentes.

### Capítulo II – Diretoria Executiva

**Art. 11** – A administração da Associação caberá à Diretoria Executiva, eleita pela Assembleia Geral para mandato de 3 (três) anos, permitida uma reeleição. A Diretoria será composta pelos seguintes cargos:

- I – Presidente
- II – Vice-Presidente
- III – Diretor Administrativo
- IV – Diretor Financeiro
- V – Diretor Técnico/Esportivo

**§ 1º** – Poderão ser criados outros cargos por deliberação da Assembleia Geral, conforme as necessidades da Associação.

**§ 2º** – O exercício de qualquer cargo na Diretoria é gratuito, vedada a remuneração sob qualquer forma.

**§ 3º** – Os professores e instrutores não integram a Diretoria Executiva, salvo nomeação formal por deliberação da Assembleia Geral ou da Diretoria.

**Art. 12** – Compete ao Presidente:

a) representar a Associação, ativa e passivamente, judicial e extrajudicialmente;
b) superintender e fiscalizar as atividades, cumprindo e fazendo cumprir o Estatuto, o Regimento Interno e as deliberações da Assembleia e da Diretoria;
c) autorizar pagamentos e assinar, juntamente com o Diretor Financeiro, cheques e documentos de responsabilidade financeira;
d) exercer o voto de qualidade nas deliberações da Diretoria em caso de empate.

**Art. 13** – Compete ao Vice-Presidente:

a) auxiliar o Presidente e substituí-lo em seus impedimentos e ausências;
b) coordenar projetos e representar a Associação por delegação;
c) garantir o cumprimento do Estatuto e do Regimento Interno.

**Art. 14** – Compete ao Diretor Administrativo:

a) coordenar os serviços de secretaria, redigir e protocolar atas, convocações e correspondências;
b) manter os registros de associados e a guarda dos documentos institucionais;
c) supervisionar o funcionamento administrativo da sede.

**Art. 15** – Compete ao Diretor Financeiro:

a) superintender os serviços da tesouraria e manter sob sua guarda os bens e valores sociais;
b) assinar, com o Presidente, cheques e documentos financeiros;
c) promover a arrecadação das receitas e a escrituração das receitas e despesas;
d) elaborar balancetes mensais e balanço anual, submetendo-os à apreciação da Diretoria e da Assembleia Geral.

**Art. 16** – Compete ao Diretor Técnico/Esportivo:

a) planejar e coordenar as atividades esportivas e projetos de artes marciais;
b) propor cursos, competições e intercâmbios;
c) supervisionar a atuação de professores e instrutores, garantindo qualidade técnica e segurança.

**Art. 17** – A Diretoria reunir-se-á mensalmente e extraordinariamente quando convocada pelo Presidente. As decisões serão tomadas pela maioria simples dos presentes.

---

## Título IV – Do Patrimônio e Recursos

**Art. 18** – O patrimônio da Gōkai será constituído por bens móveis, imóveis, valores, direitos e receitas que venha a adquirir.

**Art. 19** – Constituem receitas da Associação: contribuições de ingresso e mensalidades dos associados, doações, patrocínios, convênios, contrapartidas pela cessão de uso de espaços, rendas de eventos e outros ingressos lícitos.

**Art. 20** – Em caso de dissolução, o patrimônio remanescente, após satisfeitas as obrigações, será destinado a outra entidade de finalidade semelhante, escolhida pela Assembleia Geral e registrada nos termos da lei.

---

## Título V – Da Prestação de Contas

**Art. 21** – A prestação de contas obedecerá aos princípios da transparência e moralidade. O Diretor Financeiro elaborará as contas e balanços anuais e os encaminhará à Diretoria até o mês de fevereiro de cada ano. A Assembleia Geral apreciará e aprovará as contas em reunião ordinária anual, devendo os demonstrativos ser disponibilizados aos associados com antecedência mínima de 10 (dez) dias.

---

## Título VI – Da Reforma do Estatuto

**Art. 22** – Este Estatuto poderá ser reformado por Assembleia Geral especialmente convocada para esse fim, exigindo-se o voto favorável de 2/3 (dois terços) dos associados presentes.

---

## Título VII – Da Dissolução

**Art. 23** – A Associação só poderá ser dissolvida em Assembleia Geral especialmente convocada, com voto favorável de 3/4 (três quartos) dos associados presentes. Em caso de dissolução, o destino do patrimônio observará o disposto no Art. 20.

---

## Título VIII – Disposições Gerais

**Art. 24** – Os casos omissos neste Estatuto serão resolvidos pela Diretoria e referendados pela próxima Assembleia Geral.

**Art. 25** – Este Estatuto entra em vigor na data de sua aprovação pelos fundadores, devendo ser registrado no Cartório de Registro Civil de Pessoas Jurídicas competente na Comarca de Juiz de Fora/MG.

---

Juiz de Fora/MG, ___ de ____________ de 2026.

**Fundadores:**

Thiago Santos Mello — Presidente
Renan Winter Spatin — Vice-Presidente
Jafar Mohammed Untar — Diretor Técnico/Esportivo
Allan de Carvalho Moreira — Diretor Administrativo
Linus Pauling Ferreira Pereira — Fundador
Cássia dos Santos Soranço — Fundadora
Alex Sobreira — Fundador`,
  },
  {
    id: "00000000-0000-0000-0000-000000000602",
    titulo: "Ata de Fundação",
    descricao: "Ata da Assembleia Geral de Fundação com eleição da primeira Diretoria Executiva.",
    tipo: "ata",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# ATA DA ASSEMBLEIA GERAL DE FUNDAÇÃO
## GŌKAI – CLUBE DE ARTES MARCIAIS

Aos ______ dias do mês de __________ do ano de dois mil e vinte e seis (2026), às ______ horas, reuniram-se em primeira convocação, na Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora/MG, os senhores abaixo qualificados, com o objetivo de fundar uma associação civil sem fins lucrativos dedicada à promoção das artes marciais e ações socioeducativas, a ser denominada **GŌKAI – CLUBE DE ARTES MARCIAIS**.

Assumiu a presidência da sessão o Sr. **Thiago Santos Mello**, que convidou o Sr. **Renan Winter Spatin** para secretariar os trabalhos.

O presidente expôs e distribuiu a proposta de Estatuto Social, que foi lida, discutida e aprovada por **unanimidade** pelos presentes.

Em seguida, procedeu-se à eleição da primeira Diretoria Executiva, ficando assim constituída:

- Presidente: Thiago Santos Mello
- Vice-Presidente: Renan Winter Spatin
- Diretor Administrativo: Allan de Carvalho Moreira
- Diretor Financeiro: A definir
- Diretor Técnico/Esportivo: Jafar Mohammed Untar

Os eleitos declararam aceitar os respectivos cargos e comprometeram-se a cumprir e fazer cumprir o Estatuto Social e o Regimento Interno da Associação.

Nada mais havendo a tratar, o presidente encerrou a assembleia, determinando que se lavrasse a presente ata, que, lida e achada conforme, é assinada por todos os fundadores presentes.

Juiz de Fora/MG, ___ de ____________ de 2026.

**Secretário da sessão:** Renan Winter Spatin

**Presidente da sessão:** Thiago Santos Mello

**Demais fundadores presentes:**
- Jafar Mohammed Untar
- Allan de Carvalho Moreira
- Linus Pauling Ferreira Pereira
- Cássia dos Santos Soranço
- Alex Sobreira`,
  },
  {
    id: "00000000-0000-0000-0000-000000000605",
    titulo: "Termo de Posse da Diretoria",
    descricao: "Termo de Posse e Compromisso da primeira Diretoria Executiva com qualificação completa dos eleitos.",
    tipo: "ata",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# TERMO DE POSSE E COMPROMISSO — DIRETORIA EXECUTIVA

Aos ______ dias do mês de __________ de 2026, na sede da **GŌKAI – CLUBE DE ARTES MARCIAIS**, situada na Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora/MG, reunida a Assembleia Geral de Fundação, os abaixo qualificados tomaram posse nos respectivos cargos da primeira Diretoria Executiva, comprometendo-se a cumprir e fazer cumprir o Estatuto Social, o Regimento Interno e as deliberações da Assembleia Geral.

---

**PRESIDENTE** — Thiago Santos Mello
Brasileiro, Engenheiro de Software

**VICE-PRESIDENTE** — Renan Winter Spatin
Brasileiro, Líder Técnico

**DIRETOR ADMINISTRATIVO** — Allan de Carvalho Moreira
Brasileiro, Consultor Comercial

**DIRETOR FINANCEIRO** — A definir

**DIRETOR TÉCNICO/ESPORTIVO** — Jafar Mohammed Untar
Brasileiro, Analista de TI`,
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
    conteudo: `# Regimento Interno — GŌKAI

## OBJETIVO

Estabelecer regras de funcionamento das atividades da associação.

## REGRAS GERAIS

- respeito entre membros
- disciplina durante treinos
- cumprimento de horários
- uso adequado do espaço

## CONDUTA

É esperado que todos os membros:

- mantenham postura ética
- respeitem professores e colegas
- preservem o ambiente

## SANÇÕES

Em caso de descumprimento:

- advertência
- suspensão
- desligamento`,
  },
  {
    id: "00000000-0000-0000-0000-000000000606",
    titulo: "Organograma",
    descricao: "Estrutura hierárquica completa da associação — Assembleia Geral, Diretoria Executiva, Equipe Técnica e Projetos Parceiros.",
    tipo: "outro",
    secao: "governanca",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# ORGANOGRAMA INSTITUCIONAL

## Diretoria Executiva

- Presidente: Thiago Santos Mello
- Vice-Presidente: Renan Winter Spatin
- Diretor Administrativo: Allan de Carvalho Moreira
- Diretor Financeiro: A definir
- Diretor Técnico/Esportivo: Jafar Mohammed Untar

## Equipe Técnica

- Alex Sobreira — Boxe, Kickboxing
- Linus Pauling Ferreira Pereira — Jiu-Jitsu, Judô, Boxe, Xadrez, Educação Ambiental
- Cássia dos Santos Soranço — Jiu-Jitsu, Judô, Boxe, Feminino, Infantil

## Projetos Parceiros

- Gamonal Fighters — Jiu-Jitsu
- Academia do Boxe — Boxe
- Guerreiro Samurai — Judô

> Os professores não integram a Diretoria Executiva. Os projetos parceiros não integram juridicamente a Associação.

## Responsabilidades por Cargo

### Presidente — Thiago Santos Mello
- Representar a Associação judicial e extrajudicialmente
- Tomar decisões estratégicas e operacionais
- Firmar contratos, convênios e parcerias
- Assinar documentos financeiros junto ao Diretor Financeiro
- Presidir assembleias e reuniões de diretoria

### Vice-Presidente — Renan Winter Spatin
- Substituir o Presidente em ausências e impedimentos
- Apoiar a gestão administrativa e decisória
- Coordenar projetos e representar a Associação por delegação

### Diretor Administrativo — Allan de Carvalho Moreira
- Redigir e protocolar atas, convocações e correspondências
- Manter registros atualizados de associados e documentos
- Gerir comunicação institucional interna e externa

### Diretor Financeiro — A definir
- Controlar receitas e despesas da Associação
- Elaborar balancetes mensais e balanço anual
- Apresentar prestação de contas à Diretoria e à Assembleia Geral

### Diretor Técnico/Esportivo — Jafar Mohammed Untar
- Coordenar todas as modalidades esportivas
- Definir padrões técnicos e pedagógicos
- Acompanhar inscrições em campeonatos e filiações federativas`,
  },

  // ── Associação ────────────────────────────────────────────────
  {
    id: "00000000-0000-0000-0000-000000000607",
    titulo: "Ficha de Associação",
    descricao: "Formulário de cadastro para novos membros com dados pessoais, modalidade, categoria, declarações LGPD e autorização de imagem.",
    tipo: "outro",
    secao: "associacao",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# FICHA DE ASSOCIAÇÃO

**GŌKAI – CLUBE DE ARTES MARCIAIS**
Rua Melo Franco, 68 — São Mateus — Juiz de Fora/MG

---

## Dados Pessoais

- Nome completo
- Data de nascimento
- Nacionalidade e estado civil
- Profissão/Ocupação
- RG e CPF

## Endereço e Contato

- Endereço completo com CEP
- Telefone/WhatsApp
- E-mail

## Modalidade e Categoria

Modalidades disponíveis: Jiu-Jitsu, Judô, Boxe, Xadrez, Defesa Pessoal Feminina, Educação Ambiental

Categorias: Efetivo, Atleta/Aluno, Colaborador

## Responsável Legal (menores de 18 anos)

- Nome completo do responsável
- CPF e telefone
- Relação com o menor

## Declarações

- **Ciência de riscos esportivos** — O associado declara estar ciente dos riscos inerentes a esportes de combate.
- **Consentimento LGPD (Lei 13.709/2018)** — Autorização para coleta e uso de dados pessoais exclusivamente para fins de gestão associativa.
- **Autorização de uso de imagem** — Opção de autorizar ou não o uso de imagem para fins institucionais.

O associado declara ter lido e aceito integralmente o Estatuto Social e o Regimento Interno da GŌKAI.`,
  },
  {
    id: "00000000-0000-0000-0000-000000000608",
    titulo: "Termo de Adesão",
    descricao: "Declaração formal de adesão com aceite do Estatuto, Regimento Interno, contribuições e tratamento de dados (LGPD).",
    tipo: "outro",
    secao: "associacao",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# TERMO DE ADESÃO DE ASSOCIADO

**GŌKAI – CLUBE DE ARTES MARCIAIS**

---

O aderente declara que:

**1.** Conhece e aceita integralmente o **Estatuto Social** e o **Regimento Interno** da GŌKAI, comprometendo-se a cumprir todas as suas disposições.

**2.** Está ciente de que a contribuição associativa, quando aplicável, será definida pela Diretoria Executiva e aprovada pela Assembleia Geral.

**3.** Autoriza a GŌKAI a coletar e tratar seus dados pessoais para fins exclusivamente associativos, nos termos da Lei nº 13.709/2018 (LGPD).

**4.** Está ciente de que o desligamento poderá ocorrer por solicitação própria ou por decisão fundamentada da Diretoria nos termos do Estatuto.

**5.** Declara que as informações prestadas na ficha de cadastro são verdadeiras.

Categorias de adesão: Associado Efetivo, Associado Atleta/Aluno, Associado Colaborador`,
  },

  // ── Estrutura e Parcerias ─────────────────────────────────────
  {
    id: "00000000-0000-0000-0000-000000000609",
    titulo: "Memorando de Parceria",
    descricao: "Memorando de Entendimento e Cessão de Uso entre a GŌKAI e projetos parceiros (Gamonal Fighters, Academia do Boxe, Guerreiro Samurai).",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# MEMORANDO DE ENTENDIMENTO E CESSÃO DE USO

## Partes

**CEDENTE:** GŌKAI – Clube de Artes Marciais, representada por seu Presidente Thiago Santos Mello.

**CESSIONÁRIOS:**
- Gamonal Fighters (Jiu-Jitsu)
- Academia do Boxe (Boxe)
- Guerreiro Samurai (Judô) — representado por Linus Pauling Ferreira Pereira

---

## Cláusula 1ª – Do Objeto

A GŌKAI cede o uso compartilhado de seu espaço físico na Rua Melo Franco, 68, São Mateus, Juiz de Fora/MG, aos projetos parceiros para realização de atividades esportivas de artes marciais.

## Cláusula 2ª – Da Natureza da Parceria

Os projetos parceiros **não integram juridicamente a GŌKAI**, mantendo identidade, gestão e responsabilidades próprias. Este instrumento não gera sociedade, vínculo empregatício ou qualquer relação jurídica diversa da cessão de uso.

## Cláusula 3ª – Das Obrigações da GŌKAI

- Disponibilizar o espaço nos horários definidos
- Manter as condições básicas de uso
- Comunicar alterações com antecedência mínima de 30 dias

## Cláusula 4ª – Das Obrigações dos Parceiros

- Respeitar o Estatuto Social e o Regimento Interno
- Efetuar a contrapartida mensal
- Zelar pelo espaço e equipamentos
- Fornecer instrutores qualificados

## Cláusula 5ª – Do Prazo e Rescisão

Vigência de 12 meses, renovável automaticamente. Rescisão mediante notificação com 30 dias de antecedência.`,
  },
  {
    id: "00000000-0000-0000-0000-000000000604",
    titulo: "Uso da Sede",
    descricao: "Sublocação do imóvel na Rua Melo Franco, 68, São Mateus, Juiz de Fora/MG, de propriedade do Presidente, para uso da associação.",
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
