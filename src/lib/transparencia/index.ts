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
    descricao: "Estatuto Social completo da GŌKAI com 44 artigos distribuídos em 16 capítulos — denominação, fundadores, finalidades, uso dos espaços físicos, fundo, administração (Assembleia, Diretoria, Equipe Técnica), projetos parceiros, quadro social, direitos e deveres, exclusão, regime eleitoral, prestação de contas, reforma e dissolução.",
    tipo: "estatuto",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2026-04-01",
    publicado: true,
    conteudo: `# ESTATUTO SOCIAL
## GŌKAI – CLUBE DE ARTES MARCIAIS

---

## Capítulo I – Da Denominação, Natureza e Sede

**Art. 1º** – A associação civil sem fins lucrativos denominada **GŌKAI – CLUBE DE ARTES MARCIAIS**, doravante "Gōkai", é constituída como pessoa jurídica de direito privado, com autonomia administrativa e financeira, com sede na **Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora – MG, CEP 36.045-060**, com duração por prazo indeterminado, regendo-se pelo presente Estatuto, pelo Regimento Interno e pela legislação aplicável.

**Art. 2º** – Os sócios e dirigentes da Gōkai não respondem solidária nem subsidiariamente pelas obrigações da entidade.

---

## Capítulo II – Dos Fundadores

**Art. 3º** – São fundadores da Gōkai:

- **Thiago Santos Mello**, brasileiro, Engenheiro de Software, inscrito no CPF sob nº 110.135.077-62, portador do RG nº 21.303.168-5 DETRAN/RJ, residente à Rua Dr. Romualdo, 140, Apt. 402, São Mateus, Juiz de Fora/MG, CEP 36.025-005;

- **Renan Winter Spatin**, brasileiro, solteiro, Engenheiro de Software, inscrito no CPF sob nº 087.356.956-33, portador do RG nº 15.995.902 MG, residente à Rua Comendador Pantaleoni Arcuri, 160, Ap. 806, Torre 2, Teixeiras, Juiz de Fora/MG, CEP 36.033-090;

- **Allan de Carvalho Moreira**, brasileiro, casado, Consultor Comercial, inscrito no CPF sob nº 266.113.548-09, portador do RG nº 14.896.928, residente à Av. Presidente Itamar Franco, 2400, Apt. 103, São Mateus, Juiz de Fora/MG, CEP 36.025-290;

- **Jafar Mohammed Untar**, brasileiro, solteiro, Analista de TI, inscrito no CPF sob nº 125.128.136-22, portador do RG nº MG-17.853.895, residente à Rua Morais e Castro, 841, Apt. 906, Passos, Juiz de Fora/MG, CEP 36.025-160;

- **Linus Pauling Ferreira Pereira**, brasileiro, divorciado, Professor, inscrito no CPF sob nº 035.023.986-07, portador do RG nº M-6.989.326, residente à Rua Guaçuí, 10, Apt. 301, Bairro São Mateus, Juiz de Fora/MG, CEP 36.025-190;

- **Cássia dos Santos Soranço**, brasileira, solteira, autônoma, inscrita no CPF sob nº 069.617.396-09, portadora do RG nº MG-11.972.675, residente à Rua Antônio Dias, 183, Apt. 305, Bairro Poço Rico, Juiz de Fora/MG;

- **Alex Sobreira**, [NACIONALIDADE], [ESTADO CIVIL], [PROFISSÃO], inscrito no CPF sob nº [CPF], portador do RG nº [RG], residente à [ENDEREÇO], Juiz de Fora/MG, CEP [CEP].

---

## Capítulo III – Das Finalidades

**Art. 4º** – A Gōkai tem por finalidade promover, divulgar e desenvolver a prática e a cultura das artes marciais e esportes de combate, bem como ações socioeducativas, culturais, esportivas e ambientais correlatas, priorizando a inclusão social de jovens em situação de vulnerabilidade e utilizando o esporte como ferramenta de transformação social, cidadania e desenvolvimento humano. Para atingir seus objetivos, poderá:

I – organizar cursos, workshops, seminários e competições;

II – manter parcerias com projetos esportivos, clubes e instituições de ensino;

III – captar recursos mediante contribuições dos associados, patrocínios, doações, convênios e eventos;

IV – firmar convênios ou contratos e articular-se com órgãos ou entidades públicas ou privadas;

V – defender a ética, a transparência e o respeito às diferenças, vedada qualquer manifestação de caráter político-partidário.

**Parágrafo único** – É proibida a distribuição de resultados, excedentes ou patrimônio, sob qualquer forma ou pretexto, aos associados ou dirigentes.

---

## Capítulo IV – Do Uso dos Espaços Físicos

**Art. 5º – Polo São Mateus (Sede)**

O imóvel situado na Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora/MG, CEP 36.045-060, é locado por **Thiago Santos Mello**, Presidente da Associação, na qualidade de locatário, o qual subloca o referido espaço à Gōkai mediante Contrato de Sublocação celebrado em separado entre as partes.

**Art. 6º – Polo Linhares**

O imóvel utilizado pela Gōkai no Polo Linhares, denominado **[NOME DA ACADEMIA]**, situado na **Rua Roberto Hargreaves, 64**, Bairro Linhares, Juiz de Fora/MG, CEP \\_\\_\\_\\_\\_\\_\\_\\_\\_, é de propriedade de **Alex Sobreira**, membro fundador e professor da Associação, o qual o loca diretamente à Gōkai mediante Contrato de Locação celebrado em separado entre as partes.

**Art. 7º** – Os Contratos de Sublocação e Locação serão celebrados em separado para cada polo, não gerando confusão patrimonial entre os imóveis e o patrimônio social da Gōkai.

**§1º** – Eventuais benfeitorias não indenizáveis não integrarão a massa patrimonial em caso de dissolução da Associação.

**§2º** – Os membros que figurem simultaneamente como sublocador ou locador e como integrantes da Associação declaram ciência do conflito de interesses, abstendo-se de votar nas deliberações que envolvam os respectivos contratos.

---

## Capítulo V – Do Fundo da Associação

**Art. 8º** – O fundo da Gōkai será composto de:

a) Contribuições de ingresso e mensalidades dos associados;

b) Doações, auxílios, patrocínios e subvenções de entidades públicas ou privadas, nacionais ou estrangeiras;

c) Dotações ou subvenções da União, Estados e Municípios;

d) Produtos de aplicações, rendas de eventos e outras operações lícitas;

e) Contrapartidas pela cessão de uso dos espaços físicos a projetos parceiros;

f) Editais públicos e convênios institucionais.

**Parágrafo único** – As rendas da Associação somente poderão ser aplicadas na manutenção de seus objetivos, sendo vedada qualquer distribuição a associados ou dirigentes.

---

## Capítulo VI – Da Administração

**Art. 9º** – A Gōkai possui os seguintes órgãos deliberativos e administrativos:

I – Assembleia Geral;

II – Diretoria Executiva;

III – Equipe Técnica.

### Seção I – Da Assembleia Geral

**Art. 10** – A Assembleia Geral é o órgão soberano da Associação, constituída por todos os associados fundadores e efetivos em pleno gozo de seus direitos. São atribuições privativas da Assembleia Geral:

I – eleger e destituir os membros da Diretoria Executiva;

II – elaborar e aprovar o Regimento Interno;

III – deliberar sobre orçamento anual, planejamento de atividades e relatório da Diretoria;

IV – examinar e aprovar balanços e contas do exercício;

V – deliberar sobre aquisição, alienação ou oneração de bens;

VI – decidir sobre a reforma do presente Estatuto;

VII – autorizar celebração de convênios e acordos com entidades públicas ou privadas;

VIII – decidir sobre a dissolução da Associação e o destino do patrimônio.

**Parágrafo único** – Para destituir administradores ou alterar o Estatuto, é exigida Assembleia especialmente convocada para esse fim.

**Art. 11** – A Assembleia Geral reunir-se-á ordinariamente uma vez por ano, na primeira quinzena de janeiro, e extraordinariamente quando convocada pelo Presidente, pela Diretoria ou por no mínimo 1/3 (um terço) dos associados.

**Art. 12** – A convocação será feita mediante edital afixado na sede e comunicação eletrônica aos associados, com antecedência mínima de **10 (dez) dias**, com pauta dos assuntos a tratar.

**§1º** – As reuniões ordinárias instalar-se-ão em primeira convocação com a presença mínima de 2/3 (dois terços) dos associados; em segunda convocação, decorridos 30 (trinta) minutos, com qualquer número de presentes.

**§2º** – As reuniões extraordinárias instalar-se-ão em primeira convocação com 2/3 (dois terços) dos associados; em segunda convocação, com maioria absoluta dos associados.

**§3º** – É facultada a participação remota por meios eletrônicos, desde que garantida a autenticidade da identificação.

**Art. 13** – As decisões serão tomadas pela maioria simples dos votos dos presentes, salvo hipóteses em que este Estatuto exigir quórum especial:

I – destituição de administradores ou alteração do Estatuto: voto favorável de **2/3 (dois terços)** dos presentes;

II – dissolução da Associação: voto favorável de **3/4 (três quartos)** dos presentes.

### Seção II – Da Diretoria Executiva

**Art. 14** – A Diretoria Executiva é responsável pela administração da Associação, eleita pela Assembleia Geral para mandato de **3 (três) anos**, permitida uma reeleição. É composta por:

I – Presidente;

II – Vice-Presidente;

III – Diretor Administrativo;

IV – Diretor Financeiro;

V – Diretor Técnico/Esportivo.

**§1º** – Poderão ser criados outros cargos por deliberação da Assembleia Geral.

**§2º** – O exercício de qualquer cargo na Diretoria é **gratuito**, vedada a remuneração sob qualquer forma, gratificação, bonificação ou vantagem.

**§3º** – Os professores e instrutores não integram a Diretoria Executiva, salvo nomeação formal por deliberação da Assembleia Geral ou da Diretoria.

**Art. 15** – Compete ao **Presidente**:

I – representar a Associação, ativa e passivamente, judicial e extrajudicialmente;

II – cumprir e fazer cumprir o Estatuto, o Regimento Interno e as deliberações da Assembleia e da Diretoria;

III – convocar e presidir as reuniões da Diretoria;

IV – autorizar pagamentos e assinar, juntamente com o Diretor Financeiro, cheques e documentos de responsabilidade financeira;

V – exercer o voto de qualidade nas deliberações da Diretoria em caso de empate.

**Art. 16** – Compete ao **Vice-Presidente**:

I – auxiliar o Presidente e substituí-lo em seus impedimentos e ausências;

II – coordenar projetos e representar a Associação por delegação;

III – garantir o cumprimento do Estatuto e do Regimento Interno.

**Art. 17** – Compete ao **Diretor Administrativo**:

I – coordenar os serviços de secretaria, redigir e protocolar atas, convocações e correspondências;

II – organizar os controles, arquivos e registros de associados;

III – supervisionar o funcionamento administrativo da sede;

IV – gerir a comunicação institucional interna e externa.

**Art. 18** – Compete ao **Diretor Financeiro**:

I – arrecadar e contabilizar as contribuições, rendas e donativos, mantendo em dia a escrituração;

II – controlar e efetuar os pagamentos de todas as obrigações da Associação;

III – assinar, em conjunto com o Presidente, cheques e documentos financeiros;

IV – apresentar balancetes semestrais e balanço anual à Diretoria e à Assembleia Geral;

V – publicar anualmente a demonstração das receitas e despesas;

VI – manter todo o numerário em estabelecimento de crédito;

VII – conservar sob sua guarda todos os documentos relativos à tesouraria.

**Art. 19** – Compete ao **Diretor Técnico/Esportivo**:

I – planejar e coordenar as atividades esportivas e projetos de artes marciais;

II – propor cursos, competições e intercâmbios;

III – supervisionar a atuação de professores e instrutores, garantindo qualidade técnica e segurança;

IV – acompanhar inscrições em campeonatos e filiações federativas.

**Art. 20** – A Diretoria reunir-se-á mensalmente e extraordinariamente quando convocada pelo Presidente. As decisões serão tomadas pela maioria simples dos presentes.

**Art. 21** – Ocorrendo vacância em qualquer cargo da Diretoria, o Presidente poderá designar substituto até a próxima Assembleia Geral.

### Seção III – Da Equipe Técnica

**Art. 22** – A Equipe Técnica é formada pelos professores e instrutores responsáveis pela condução das atividades esportivas, culturais e ambientais da Gōkai, subordinados ao Diretor Técnico/Esportivo.

**Art. 23** – A remuneração de professores e instrutores será objeto de contrato específico de prestação de serviços, aprovado pela Diretoria, regido pela legislação trabalhista e fiscal aplicável.

**Parágrafo único** – Os funcionários admitidos para prestarem serviços à Associação serão regidos pela Consolidação das Leis Trabalhistas.

---

## Capítulo VII – Dos Projetos Parceiros

**Art. 24** – A Gōkai reconhece como projetos parceiros as seguintes equipes e iniciativas:

**Equipes esportivas:**

I – **Gamonal Fighters** – Jiu-Jitsu – [@gamonalfighters](https://instagram.com/gamonalfighters);

II – **Guerreiro Samurai Judô** – Judô – [@guerreirosamuraijudo](https://instagram.com/guerreirosamuraijudo);

III – **Samurai Boxe** – Boxe – [@samuraiboxejf](https://instagram.com/samuraiboxejf);

IV – **Academia do Boxe** – Boxe – [@academia.do.boxejf](https://instagram.com/academia.do.boxejf).

**Iniciativas ambientais:**

V – **Samurai Adventure** – Rapel e atividades de aventura em conexão com a natureza – [@samuraiadventurejf](https://instagram.com/samuraiadventurejf).

**Art. 25** – Os projetos parceiros **não integram juridicamente a Associação**, mantendo identidade, gestão e responsabilidades próprias. Operam dentro dos espaços da Gōkai mediante autorização formal e contrapartida financeira.

**Parágrafo único** – A Gōkai atua como entidade gestora do espaço, enquanto os projetos parceiros conduzem suas atividades de forma autônoma, sob responsabilidade própria.

---

## Capítulo VIII – Do Quadro Social

**Art. 26** – A Associação é constituída por número ilimitado de associados, distribuídos nas seguintes categorias:

I – **Fundadores:** aqueles que subscrevem a ata de constituição;

II – **Efetivos:** pessoas que aderirem após a fundação e forem admitidas pela Diretoria;

III – **Colaboradores:** pessoas físicas ou jurídicas que contribuam material ou tecnicamente, sem direito a voto;

IV – **Atletas/Alunos:** participantes das atividades esportivas promovidas pela Associação.

**Art. 27** – A admissão de novos associados ocorrerá mediante preenchimento de ficha cadastral, aceitação do Estatuto e do Regimento Interno e aprovação pela Diretoria Executiva no prazo de **15 (quinze) dias**. Em caso de recusa, a justificativa será apresentada e arquivada.

---

## Capítulo IX – Dos Direitos dos Associados

**Art. 28** – São direitos dos associados quites com suas obrigações:

I – participar de todas as atividades promovidas pela Associação;

II – votar e ser votado nas Assembleias Gerais (fundadores e efetivos);

III – candidatar-se a cargos da Diretoria, desde que em pleno gozo de seus direitos;

IV – utilizar a estrutura disponível conforme regras internas;

V – receber informações sobre as atividades e finanças da Associação;

VI – examinar na sede os documentos de contabilidade e atas nos 15 dias que precedem qualquer Assembleia;

VII – apresentar propostas, estudos ou pareceres à Diretoria;

VIII – requerer a convocação de Assembleia Geral nos termos deste Estatuto;

IX – recorrer à Assembleia Geral das sanções aplicadas pela Diretoria.

**Parágrafo único** – Nenhum associado poderá ser impedido de exercer direito ou função que lhe tenha sido legitimamente conferido, exceto nos casos previstos em lei ou neste Estatuto.

---

## Capítulo X – Dos Deveres dos Associados

**Art. 29** – São deveres dos associados:

I – cumprir e fazer cumprir o Estatuto, o Regimento Interno e as deliberações da Assembleia e da Diretoria;

II – participar das atividades da Associação;

III – zelar pelo patrimônio e pela imagem da Gōkai;

IV – manter conduta ética, disciplinada e alinhada aos valores da Associação;

V – efetuar pagamentos de contribuições, quando houver;

VI – comunicar à Diretoria, no prazo de 20 dias, qualquer alteração de dados cadastrais.

---

## Capítulo XI – Da Exclusão e Desligamento dos Associados

**Art. 30** – O associado poderá ser **suspenso** nos direitos em caso de:

I – descumprimento de regras internas ou conduta inadequada;

II – inadimplência por mais de **3 (três) meses** durante o período de um ano civil — após aviso escrito, os direitos serão suspensos até a regularização.

**Art. 31** – O associado poderá ser **excluído**, após contraditório e ampla defesa, em caso de:

I – falta grave devidamente apurada;

II – reincidência disciplinar após suspensão;

III – prática de atos lesivos aos interesses ou direitos dos demais associados ou da Associação;

IV – inadimplência não regularizada após notificação, nos termos do Regimento Interno.

**Parágrafo único** – A readmissão obedecerá às mesmas normas da admissão, após liquidação de débitos e parecer favorável da Diretoria.

**Art. 32** – O **desligamento voluntário** ocorrerá mediante comunicação escrita à Diretoria, estando o associado quite com suas obrigações.

---

## Capítulo XII – Do Regime Eleitoral

**Art. 33** – O processo eleitoral será conduzido por uma **Comissão Eleitoral**, composta por um representante de cada chapa candidata e presidida pelo Presidente da Mesa da Assembleia Geral.

**Art. 34** – Compete à Comissão Eleitoral:

I – verificar as condições de elegibilidade dos candidatos;

II – receber reclamações relativas às chapas candidatas no prazo de 8 dias após sua posse;

III – deliberar sobre reclamações no prazo de 48 horas;

IV – fiscalizar o processo eleitoral;

V – fazer a contagem dos votos e divulgar os resultados.

**Art. 35** – A apresentação de candidaturas far-se-á mediante entrega à Comissão Eleitoral com antecedência mínima de **15 (quinze) dias** da data do ato eleitoral, acompanhada de termo de aceitação e programa de ação.

**Art. 36** – A votação será **secreta** e a apuração, **imediata**. Cada associado somente poderá integrar uma chapa candidata.

---

## Capítulo XIII – Da Prestação de Contas

**Art. 37** – A prestação de contas obedecerá aos princípios da transparência e moralidade. O Diretor Financeiro elaborará as contas e balanços anuais e os encaminhará à Diretoria até o mês de **fevereiro** de cada ano. A Assembleia Geral apreciará e aprovará as contas em reunião ordinária anual, com disponibilização dos demonstrativos aos associados com antecedência mínima de 10 dias.

**Art. 38** – O exercício financeiro da Associação coincidirá com o ano civil.

**Art. 39** – O orçamento da Associação será uno, anual e compreenderá todas as receitas e despesas.

---

## Capítulo XIV – Da Reforma do Estatuto

**Art. 40** – Este Estatuto poderá ser reformado por Assembleia Geral especialmente convocada para esse fim, exigindo-se o voto favorável de **2/3 (dois terços)** dos associados presentes.

---

## Capítulo XV – Da Dissolução

**Art. 41** – A Associação só poderá ser dissolvida em Assembleia Geral especialmente convocada, com voto favorável de **3/4 (três quartos)** dos associados presentes. Em caso de dissolução, o patrimônio remanescente, após satisfeitas as obrigações, será destinado a outra entidade de finalidade semelhante, escolhida pela Assembleia e registrada nos termos da lei.

---

## Capítulo XVI – Disposições Gerais

**Art. 42** – Os casos omissos serão resolvidos pela Diretoria e referendados pela próxima Assembleia Geral.

**Art. 43** – Este Estatuto entra em vigor na data de sua aprovação pelos fundadores, devendo ser registrado no Cartório de Registro Civil de Pessoas Jurídicas competente na Comarca de Juiz de Fora/MG.

**Art. 44** – Fica eleito o foro da **Comarca de Juiz de Fora/MG** para dirimir quaisquer questões oriundas deste Estatuto.

---

Juiz de Fora/MG, \\_\\_\\_ de \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_ de 2026.

**Fundadores:**

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Thiago Santos Mello — Presidente
Brasileiro, Engenheiro de Software
RG: 21.303.168-5 DETRAN/RJ | CPF: 110.135.077-62
Rua Dr. Romualdo, 140, Apt. 402, São Mateus, JF/MG — CEP 36.025-005

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Renan Winter Spatin — Vice-Presidente
Brasileiro, Solteiro, Engenheiro de Software
RG: 15.995.902 MG | CPF: 087.356.956-33
Rua Comendador Pantaleoni Arcuri, 160, Ap. 806, Torre 2, Teixeiras, JF/MG — CEP 36.033-090

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Allan de Carvalho Moreira — Diretor Administrativo
Brasileiro, Casado, Consultor Comercial
RG: 14.896.928 | CPF: 266.113.548-09
Av. Presidente Itamar Franco, 2400, Apt. 103, São Mateus, JF/MG — CEP 36.025-290

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Jafar Mohammed Untar — Diretor Técnico/Esportivo
Brasileiro, Solteiro, Analista de TI
RG: MG-17.853.895 | CPF: 125.128.136-22
Rua Morais e Castro, 841, Apt. 906, Passos, JF/MG — CEP 36.025-160

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Flávio Daniel Tuyarot Barci — Diretor Financeiro
Brasileiro, Solteiro, Engenheiro de Software
RG: \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_ | CPF: 125.124.716-40
Praça Jarbas de Lery Santos, 37, Apt. 302, São Mateus, JF/MG — CEP 36.016-290

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Linus Pauling Ferreira Pereira — Fundador
Brasileiro, Divorciado, Professor
RG: M-6.989.326 | CPF: 035.023.986-07
Rua Guaçuí, 10, Apt. 301, São Mateus, JF/MG — CEP 36.025-190

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Cássia dos Santos Soranço — Fundadora
Brasileira, Solteira, Autônoma
RG: MG-11.972.675 | CPF: 069.617.396-09
Rua Antônio Dias, 183, Apt. 305, Poço Rico, JF/MG

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Alex Sobreira — Fundador
[NACIONALIDADE], [ESTADO CIVIL], [PROFISSÃO]
RG: \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_ | CPF: \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
Endereço: \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

---

**Advogado responsável:**

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

[NOME COMPLETO]
OAB/MG nº \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_`,
  },
  {
    id: "00000000-0000-0000-0000-000000000602",
    titulo: "Ata de Fundação",
    descricao: "Ata da Assembleia Geral de Fundação da GŌKAI com aprovação do Estatuto Social e eleição da primeira Diretoria Executiva. Inclui pendências pré-registro em cartório.",
    tipo: "ata",
    secao: "fundacionais",
    arquivo_url: null,
    data_referencia: "2026-04-01",
    publicado: true,
    conteudo: `# ATA DA ASSEMBLEIA GERAL DE FUNDAÇÃO
## GŌKAI – CLUBE DE ARTES MARCIAIS

Aos \\_\\_\\_\\_\\_\\_ dias do mês de \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_ do ano de dois mil e vinte e seis (2026), às \\_\\_\\_\\_\\_\\_ horas, reuniram-se em primeira convocação, na Rua Melo Franco, 68, Bairro São Mateus, Juiz de Fora/MG, os senhores abaixo qualificados, com o objetivo de fundar uma associação civil sem fins lucrativos dedicada à promoção das artes marciais e ações socioeducativas, a ser denominada **GŌKAI – CLUBE DE ARTES MARCIAIS**.

Assumiu a presidência da sessão o Sr. **Thiago Santos Mello**, que convidou o Sr. **Renan Winter Spatin** para secretariar os trabalhos.

O presidente expôs e distribuiu a proposta de Estatuto Social, que foi lida, discutida e aprovada por **unanimidade** pelos presentes.

Em seguida, procedeu-se à eleição da primeira Diretoria Executiva, ficando assim constituída:

| Cargo | Nome |
|-------|------|
| Presidente | Thiago Santos Mello |
| Vice-Presidente | Renan Winter Spatin |
| Diretor Administrativo | Allan de Carvalho Moreira |
| Diretor Financeiro | Flávio Daniel Tuyarot Barci |
| Diretor Técnico/Esportivo | Jafar Mohammed Untar |

Os eleitos declararam aceitar os respectivos cargos e comprometeram-se a cumprir e fazer cumprir o Estatuto Social e o Regimento Interno da Associação.

Nada mais havendo a tratar, o presidente encerrou a assembleia, determinando que se lavrasse a presente ata, que, lida e achada conforme, é assinada por todos os fundadores presentes.

Juiz de Fora/MG, \\_\\_\\_ de \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_ de 2026.

**Secretário da sessão:**

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Renan Winter Spatin | CPF: 087.356.956-33

**Presidente da sessão:**

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Thiago Santos Mello | CPF: 110.135.077-62

**Demais fundadores presentes:**

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Jafar Mohammed Untar | CPF: 125.128.136-22

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Allan de Carvalho Moreira | CPF: 266.113.548-09

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Flávio Daniel Tuyarot Barci | CPF: 125.124.716-40

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Linus Pauling Ferreira Pereira | CPF: 035.023.986-07

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Cássia dos Santos Soranço | CPF: 069.617.396-09

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

Alex Sobreira | CPF: \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

---

> **Pendências antes de levar ao cartório:**
>
> - [ ] RG do Flávio Daniel Tuyarot Barci
> - [ ] CEP do endereço da Cássia dos Santos Soranço (Rua Antônio Dias, 183/305, Poço Rico)
> - [ ] Qualificação completa de Alex Sobreira (RG, CPF, estado civil, profissão, endereço)
> - [ ] Nome oficial da academia no Polo Linhares (endereço já definido: Rua Roberto Hargreaves, 64)
> - [ ] Data da assembleia de fundação
> - [ ] Assinatura e OAB do advogado responsável
> - [ ] Autorização de sublocação do proprietário do imóvel (São Mateus)`,
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

**DIRETOR FINANCEIRO** — Flávio Daniel Tuyarot Barci
Brasileiro, Solteiro, Engenheiro de Software
CPF: 125.124.716-40

**DIRETOR TÉCNICO/ESPORTIVO** — Jafar Mohammed Untar
Brasileiro, Solteiro, Analista de TI
RG: MG-17.853.895 | CPF: 125.128.136-22`,
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
- Diretor Financeiro: Flávio Daniel Tuyarot Barci
- Diretor Técnico/Esportivo: Jafar Mohammed Untar

## Equipe Técnica

- Alex Sobreira — Boxe, Kickboxing
- Linus Pauling Ferreira Pereira — Jiu-Jitsu, Judô, Boxe, Xadrez, Educação Ambiental
- Cássia dos Santos Soranço — Jiu-Jitsu, Judô, Boxe, Feminino, Infantil

## Projetos Parceiros

**Equipes esportivas:**

- Gamonal Fighters — Jiu-Jitsu — [@gamonalfighters](https://instagram.com/gamonalfighters)
- Guerreiro Samurai Judô — Judô — [@guerreirosamuraijudo](https://instagram.com/guerreirosamuraijudo)
- Samurai Boxe — Boxe — [@samuraiboxejf](https://instagram.com/samuraiboxejf)
- Academia do Boxe — Boxe — [@academia.do.boxejf](https://instagram.com/academia.do.boxejf)

**Iniciativas ambientais:**

- Samurai Adventure — Rapel / Meio Ambiente — [@samuraiadventurejf](https://instagram.com/samuraiadventurejf)

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

### Diretor Financeiro — Flávio Daniel Tuyarot Barci
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
    descricao: "Memorando de Entendimento e Cessão de Uso entre a GŌKAI e projetos parceiros (Gamonal Fighters, Guerreiro Samurai Judô, Samurai Boxe, Academia do Boxe e Samurai Adventure).",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2025-01-01",
    publicado: true,
    conteudo: `# MEMORANDO DE ENTENDIMENTO E CESSÃO DE USO

## Partes

**CEDENTE:** GŌKAI – Clube de Artes Marciais, representada por seu Presidente Thiago Santos Mello.

**CESSIONÁRIOS:**
**Equipes esportivas:**

- Gamonal Fighters (Jiu-Jitsu) — [@gamonalfighters](https://instagram.com/gamonalfighters)
- Guerreiro Samurai Judô (Judô) — [@guerreirosamuraijudo](https://instagram.com/guerreirosamuraijudo) — representado por Linus Pauling Ferreira Pereira
- Samurai Boxe (Boxe) — [@samuraiboxejf](https://instagram.com/samuraiboxejf)
- Academia do Boxe (Boxe) — [@academia.do.boxejf](https://instagram.com/academia.do.boxejf)

**Iniciativas ambientais:**

- Samurai Adventure (Rapel / Meio Ambiente) — [@samuraiadventurejf](https://instagram.com/samuraiadventurejf)

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
  {
    id: "00000000-0000-0000-0000-000000000610",
    titulo: "Modelo — Contrato de Locação de Imóvel",
    descricao: "Contrato-modelo para locação direta de imóvel pela Associação. Preencher os placeholders entre colchetes e revisar com advogado habilitado antes da assinatura.",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2026-04-01",
    publicado: true,
    conteudo: `# Modelo — Contrato de Locação de Imóvel

> **Modelo-template.** Todos os campos entre colchetes (\`[PLACEHOLDER]\`) devem ser preenchidos antes da assinatura. Revisar com advogado habilitado antes de assinar.

**LOCADOR:** [NOME COMPLETO DO LOCADOR], [NACIONALIDADE], [ESTADO CIVIL], [PROFISSÃO], portador da cédula de identidade R.G. nº [RG DO LOCADOR] e CPF nº [CPF DO LOCADOR], residente e domiciliado à [ENDEREÇO COMPLETO DO LOCADOR], Juiz de Fora/MG, CEP [CEP DO LOCADOR].

**LOCATÁRIO:** GŌKAI – Clube de Artes Marciais, associação civil sem fins lucrativos, inscrita no CNPJ sob nº [CNPJ DA GŌKAI], com sede na [ENDEREÇO DA SEDE DA GŌKAI], neste ato representada pelo [CARGO DO REPRESENTANTE] **[NOME DO REPRESENTANTE]**, portador do R.G. nº [RG DO REPRESENTANTE] e CPF nº [CPF DO REPRESENTANTE].

---

## Cláusula Primeira – Do Objeto da Locação

**1.1** O objeto deste contrato é o imóvel denominado **[NOME DO IMÓVEL/ACADEMIA]**, situado na [ENDEREÇO COMPLETO DO IMÓVEL], [BAIRRO], Juiz de Fora/MG, CEP [CEP DO IMÓVEL], de propriedade do LOCADOR, no exato estado do termo de vistoria e fotos em anexo.

---

## Cláusula Segunda – Da Destinação do Imóvel

**2.1** O imóvel destina-se única e exclusivamente à realização de atividades esportivas, sociais e educacionais vinculadas aos objetivos institucionais da GŌKAI, sendo vedada qualquer destinação diversa sem autorização prévia e por escrito do LOCADOR.

---

## Cláusula Terceira – Do Prazo de Vigência

**3.1** O prazo da locação é de **12 (doze) meses**, iniciando-se em [DATA DE INÍCIO] com término em [DATA DE TÉRMINO], independentemente de aviso, notificação ou interpelação judicial ou extrajudicial.

**3.2** Findo o prazo ajustado, se o LOCATÁRIO continuar na posse do imóvel por mais de trinta dias sem oposição do LOCADOR, presumir-se-á prorrogada a locação por prazo indeterminado, mantidas as demais cláusulas.

---

## Cláusula Quarta – Da Forma de Pagamento

**4.1** O aluguel mensal deverá ser pago até o dia **10 (dez)** do mês subsequente ao vencido, por meio de [FORMA DE PAGAMENTO], no valor de **R$ [VALOR] ([VALOR POR EXTENSO])**, reajustados anualmente pelo índice **IGPM/FGV**. Sendo extinto tal índice, será utilizado, sucessivamente, o IPC/FIPE ou IGP-DI.

**4.2 – Regime de solidariedade institucional**

Reconhecendo a natureza sem fins lucrativos e a fase inicial de estruturação do LOCATÁRIO, as partes acordam que o pagamento mensal está sujeito às seguintes condições especiais, sem que isso caracterize inadimplência ou mora:

**I – Mês sem arrecadação suficiente:** o espaço será cedido sem custo naquele mês, sendo o valor compensado conforme regra bimestral.

**II – Pagamento parcial:** aceito, com saldo registrado em planilha de controle assinada por ambas as partes.

**III – Regra bimestral:** a soma dos valores pagos em cada período de **2 (dois) meses consecutivos** deverá atingir o mínimo de **R$ [VALOR MENSAL] ([VALOR POR EXTENSO])**, equivalente a 1 (uma) mensalidade completa:

| Mês 1 | Mês 2 | Total | Situação |
|-------|-------|-------|----------|
| R$ 0,00 | R$ [VALOR] | R$ [VALOR] | ✅ Regular |
| R$ [VALOR] | R$ 0,00 | R$ [VALOR] | ✅ Regular |
| R$ [METADE] | R$ [METADE] | R$ [VALOR] | ✅ Regular |
| R$ [PARCIAL] | R$ [PARCIAL] | R$ [ABAIXO] | ⚠️ Irregular |

**IV – Apuração:** nos meses pares do calendário, a partir do início do contrato.

---

## Cláusula Quinta – Da Multa e Juros de Mora

**5.1** Em caso de mora fora das condições previstas na Cláusula Quarta, o valor será corrigido pelo IGP-M até o efetivo pagamento e acrescido da multa moratória de **10% (dez por cento)** e dos juros de **1% (um por cento) ao mês**, ensejando sua cobrança por advogado. Honorários: 10% se amigável, 20% se judicial.

**5.2** Caso o LOCATÁRIO não regularize o pagamento no prazo de 15 dias após vencimento do bimestre irregular, o LOCADOR terá o direito de rescindir o contrato nos termos do Art. 9º, inc. III da Lei nº 8.245/91.

---

## Cláusula Sexta – Da Conservação, Reformas e Benfeitorias

**6.1** Ao LOCATÁRIO recai a responsabilidade por zelar pela conservação, limpeza e segurança do imóvel.

**6.2** As benfeitorias necessárias introduzidas pelo LOCATÁRIO, ainda que não autorizadas, bem como as úteis, desde que autorizadas, serão indenizáveis e permitem o exercício do direito de retenção. As voluptuárias não serão indenizáveis.

**6.3** O LOCATÁRIO está obrigado a devolver o imóvel em perfeitas condições de limpeza, conservação e pintura, conforme termo de vistoria em anexo.

**6.4** O LOCATÁRIO não poderá realizar obras estruturais sem prévia autorização por escrito do LOCADOR. Havendo autorização, as obras serão incorporadas ao imóvel sem indenização.

**6.5** O LOCADOR responde pelos vícios ou defeitos anteriores à locação.

**Parágrafo único:** O LOCATÁRIO declara receber o imóvel em perfeito estado de conservação, conforme termo de vistoria em anexo.

---

## Cláusula Sétima – Das Taxas e Tributos

**7.1** As despesas de consumo de água, energia elétrica e internet serão de responsabilidade do LOCATÁRIO, pagas diretamente às concessionárias. Taxas e tributos sobre o imóvel (IPTU) são de responsabilidade do LOCADOR, salvo acordo diverso em anexo.

---

## Cláusula Oitava – Dos Sinistros

**8.1** Em caso de sinistro total, o contrato estará rescindido independentemente de aviso.

**8.2** Em caso de incêndio parcial que obrigue obras, o contrato terá vigência suspensa, sendo retomado após a reconstrução, prorrogado pelo período das obras.

---

## Cláusula Nona – Da Sublocação

**9.1** É **vedado** ao LOCATÁRIO sublocar, transferir ou ceder o imóvel sem consentimento prévio e por escrito do LOCADOR.

---

## Cláusula Décima – Da Desapropriação

**10.1** Em caso de desapropriação total ou parcial do imóvel, ficará rescindido de pleno direito o presente contrato, sendo passíveis de indenização as perdas e danos efetivamente demonstradas.

---

## Cláusula Décima Primeira – Dos Casos de Falecimento

**11.1** Falecendo o LOCADOR, ficam seus sucessores sub-rogados dos direitos deste contrato.

**11.2** Em caso de dissolução do LOCATÁRIO, seus representantes legais decidirão, dentro de 30 dias, sobre a continuidade ou rescisão da locação.

---

## Cláusula Décima Segunda – Da Garantia

**12.1** O presente contrato não exige garantia, tendo em vista a natureza institucional do LOCATÁRIO e a relação de confiança entre as partes.

---

## Cláusula Décima Terceira – Da Alienação do Imóvel

**13.1** Em caso de alienação, o LOCATÁRIO terá direito de preferência. Se não utilizar essa prerrogativa formalmente, o LOCADOR poderá dispor livremente do imóvel, respeitados os prazos da Lei do Inquilinato.

---

## Cláusula Décima Quarta – Das Vistorias

**14.1** É facultado ao LOCADOR, mediante aviso prévio de 48 horas, vistoriar o imóvel para verificação do cumprimento das obrigações contratuais.

---

## Cláusula Décima Quinta – Das Infrações ao Contrato

**15.1** A não observância de qualquer cláusula sujeita o infrator à multa de **3 (três) vezes** o valor do aluguel, tomando-se por base o último aluguel vencido.

---

## Cláusula Décima Sexta – Do Conflito de Interesses

**16.1** Caso o LOCADOR seja também membro da GŌKAI, as partes declaram ciência do conflito de interesses e estabelecem as seguintes salvaguardas:

a) O valor da locação foi deliberado e aprovado pela Diretoria Executiva em reunião registrada em ata, com abstenção de voto do LOCADOR;

b) Este contrato estará disponível no portal de transparência da Associação (gokai.ong/transparencia).

---

## Cláusula Décima Sétima – Da Rescisão do Contrato

**17.1** A rescisão antecipada implica multa proporcional: valor mensal ÷ 12 × meses restantes.

**17.2** Após o prazo de vigência, rescisão mediante aviso prévio de **30 dias**.

**17.3** Rescisão imediata em caso de: uso ilícito, danos graves não reparados em 15 dias, ou inadimplência conforme Cláusula Quinta.

---

## Cláusula Décima Oitava – Da Observância à LGPD

**18.1** O LOCATÁRIO declara expresso consentimento que o LOCADOR irá coletar e tratar os dados necessários ao cumprimento deste contrato, nos termos do Art. 7º, incs. II e V da Lei nº 13.709/2018 (LGPD).

---

## Cláusula Décima Nona – Dos Termos Gerais

**19.1** As partes contratantes obrigam-se por si, herdeiros e/ou sucessores.

**19.2** Qualquer alteração somente terá validade mediante aditamento escrito assinado pelas partes.

---

## Cláusula Vigésima – Do Foro

**20.1** As partes elegem o foro da **Comarca de Juiz de Fora/MG** para dirimir qualquer litígio decorrente do presente contrato.

---

E, por assim estarem justos e contratados, mandaram extrair o presente instrumento em **2 (duas) vias** de igual teor.

[CIDADE], [DATA].

**LOCADOR:**
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
[NOME DO LOCADOR] | CPF: [CPF DO LOCADOR]

**LOCATÁRIO – GŌKAI:**
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
[NOME DO REPRESENTANTE] — [CARGO] | CPF: [CPF DO REPRESENTANTE]

**TESTEMUNHA 1:** \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

**TESTEMUNHA 2:** \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

**ANEXOS:**

- Termo de vistoria do imóvel
- Planilha de controle bimestral (Anexo I)

### Anexo I – Planilha de Controle Bimestral

| Bimestre | Mês 1 (R$) | Mês 2 (R$) | Total (R$) | Meta mínima (R$) | Situação |
|----------|-----------|-----------|-----------|-----------------|----------|
| Bim. 1 | | | | [VALOR] | |
| Bim. 2 | | | | [VALOR] | |
| Bim. 3 | | | | [VALOR] | |
| Bim. 4 | | | | [VALOR] | |
| Bim. 5 | | | | [VALOR] | |
| Bim. 6 | | | | [VALOR] | |

---

*Modelo para uso exclusivo da GŌKAI — abril/2026. Revisar com advogado habilitado antes da assinatura.*`,
  },
  {
    id: "00000000-0000-0000-0000-000000000611",
    titulo: "Modelo — Contrato de Sublocação de Imóvel",
    descricao: "Contrato-modelo para sublocação de imóvel à Associação por membro da Diretoria — inclui salvaguardas de conflito de interesses e regime solidário de pagamento. Revisar com advogado antes de assinar.",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2026-04-01",
    publicado: true,
    conteudo: `# Modelo — Contrato de Sublocação de Imóvel

> **Modelo-template.** Todos os campos entre colchetes (\`[PLACEHOLDER]\`) devem ser preenchidos antes da assinatura. Revisar com advogado habilitado antes de assinar.

**SUBLOCADOR:** [NOME COMPLETO DO SUBLOCADOR], [NACIONALIDADE], [ESTADO CIVIL], [PROFISSÃO], portador da cédula de identidade R.G. nº [RG DO SUBLOCADOR] e CPF nº [CPF DO SUBLOCADOR], residente e domiciliado à [ENDEREÇO COMPLETO DO SUBLOCADOR].

**SUBLOCATÁRIO:** GŌKAI – Clube de Artes Marciais, associação civil sem fins lucrativos, inscrita no CNPJ sob nº [CNPJ DA GŌKAI], com sede na [ENDEREÇO DA SEDE DA GŌKAI], neste ato representada pelo [CARGO DO REPRESENTANTE] **[NOME DO REPRESENTANTE]**, portador do R.G. nº [RG DO REPRESENTANTE] e CPF nº [CPF DO REPRESENTANTE].

> ⚠️ Quando o SUBLOCADOR for também Presidente da GŌKAI, a Associação deve ser representada pelo Vice-Presidente para evitar conflito de interesses na assinatura.

---

## Cláusula Primeira – Do Objeto da Sublocação

**1.1** O objeto deste contrato é o imóvel situado na **[ENDEREÇO COMPLETO DO IMÓVEL]**, no exato estado do termo de vistoria e fotos em anexo, objeto do contrato de locação original conforme cópia em Anexo II.

**1.2** O SUBLOCATÁRIO declara que o locador originário do referido imóvel autorizou expressamente a realização do presente contrato, conforme cópia da autorização em Anexo II.

---

## Cláusula Segunda – Do Prazo de Vigência

**2.1** O prazo da sublocação é de **12 (doze) meses**, iniciando-se em [DATA DE INÍCIO] com término em [DATA DE TÉRMINO], independentemente de aviso, notificação ou interpelação judicial ou extrajudicial.

**2.2** Findo o prazo, se o SUBLOCATÁRIO continuar na posse por mais de trinta dias sem oposição do SUBLOCADOR, presumir-se-á prorrogada a sublocação por prazo indeterminado.

---

## Cláusula Terceira – Da Forma de Pagamento

**3.1** O aluguel mensal deverá ser pago até o dia **10 (dez)** do mês subsequente ao vencido, por meio de [FORMA DE PAGAMENTO], no valor de **R$ [VALOR] ([VALOR POR EXTENSO])**, reajustados anualmente pelo **IGPM/FGV**. Sendo extinto tal índice, será utilizado o IPC/FIPE ou IGP-DI.

**3.2 – Regime de solidariedade institucional**

**I – Mês sem arrecadação suficiente:** o espaço será cedido sem custo, sendo o valor compensado conforme regra bimestral.

**II – Pagamento parcial:** aceito, com saldo registrado em planilha de controle.

**III – Regra bimestral:** a soma de cada **2 (dois) meses consecutivos** deve atingir o mínimo de **R$ [VALOR] ([VALOR POR EXTENSO])**:

| Mês 1 | Mês 2 | Total | Situação |
|-------|-------|-------|----------|
| R$ 0,00 | R$ [VALOR] | R$ [VALOR] | ✅ Regular |
| R$ [VALOR] | R$ 0,00 | R$ [VALOR] | ✅ Regular |
| R$ [METADE] | R$ [METADE] | R$ [VALOR] | ✅ Regular |
| R$ [PARCIAL] | R$ [PARCIAL] | R$ [ABAIXO] | ⚠️ Irregular |

**IV – Apuração:** nos meses pares do calendário, a partir do início do contrato.

---

## Cláusula Quarta – Das Taxas e Tributos

**4.1** As despesas de consumo de água, energia elétrica e internet serão de responsabilidade do SUBLOCATÁRIO, pagas diretamente às concessionárias.

---

## Cláusula Quinta – Da Multa e Juros de Mora

**5.1** Em caso de mora fora das condições da Cláusula Terceira, o valor será corrigido pelo IGP-M, acrescido da multa de **10% (dez por cento)** e juros de **1% (um por cento) ao mês**. Honorários: 10% se amigável, 20% se judicial.

---

## Cláusula Sexta – Da Conservação, Reformas e Benfeitorias

**6.1** Ao SUBLOCATÁRIO recai a responsabilidade por zelar pela conservação, limpeza e segurança do imóvel.

**6.2** O SUBLOCATÁRIO está obrigado a devolver o imóvel em perfeitas condições, conforme termo de vistoria em anexo.

**6.3** Não poderá realizar obras estruturais sem autorização por escrito do SUBLOCADOR. Havendo autorização, as obras serão incorporadas ao imóvel sem indenização.

**6.4** Cabe ao SUBLOCATÁRIO verificar a voltagem e capacidade elétrica do imóvel, sendo de sua responsabilidade os danos causados por inadequação.

**Parágrafo único:** O SUBLOCATÁRIO declara receber o imóvel em perfeito estado, conforme termo de vistoria em anexo.

---

## Cláusula Sétima – Da Destinação do Imóvel

**7.1** O imóvel destina-se única e exclusivamente à realização de atividades esportivas, sociais e educacionais da GŌKAI, sendo vedada qualquer destinação diversa.

---

## Cláusula Oitava – Dos Sinistros

**8.1** Em caso de sinistro total, o contrato estará rescindido independentemente de aviso.

**8.2** Em caso de incêndio parcial que obrigue obras, o contrato terá vigência suspensa, sendo retomado após a reconstrução, prorrogado pelo período das obras.

---

## Cláusula Nona – Da Nova Sublocação

**9.1** É **vedado** ao SUBLOCATÁRIO sublocar, transferir ou ceder o imóvel sem consentimento prévio e por escrito do SUBLOCADOR.

---

## Cláusula Décima – Da Desapropriação

**10.1** Em caso de desapropriação total ou parcial, o contrato ficará rescindido de pleno direito.

---

## Cláusula Décima Primeira – Da Garantia

**11.1** O presente contrato não exige fiadores ou garantias adicionais, tendo em vista a relação institucional entre as partes e o regime de pagamento solidário previsto na Cláusula Terceira.

---

## Cláusula Décima Segunda – Da Alienação do Imóvel

**12.1** Em caso de alienação do imóvel pelo locador original, o SUBLOCADOR notificará o SUBLOCATÁRIO com antecedência mínima de **60 dias**.

---

## Cláusula Décima Terceira – Das Vistorias

**13.1** É facultado ao SUBLOCADOR, mediante aviso prévio de 48 horas, vistoriar o imóvel para verificação do cumprimento das obrigações contratuais.

---

## Cláusula Décima Quarta – Das Infrações ao Contrato

**14.1** A não observância de qualquer cláusula sujeita o infrator à multa de **3 (três) vezes** o valor do aluguel, com base no último aluguel vencido.

---

## Cláusula Décima Quinta – Da Sucessão

**15.1** As partes contratantes obrigam-se por si, herdeiros e/ou sucessores.

---

## Cláusula Décima Sexta – Da Rescisão do Contrato

**16.1** Rescisão antecipada: multa proporcional (valor mensal ÷ 12 × meses restantes).

**16.2** Após o prazo de vigência: rescisão mediante aviso prévio de **30 dias**.

**16.3** Rescisão imediata pelo SUBLOCADOR em caso de: uso ilícito, danos graves não reparados em 15 dias, ou **3 (três) bimestres consecutivos** sem qualquer pagamento. Saldo devedor quitado em até 60 dias sem juros.

---

## Cláusula Décima Sétima – Do Conflito de Interesses

**17.1** Caso o SUBLOCADOR seja também membro da GŌKAI, as partes declaram ciência do conflito e estabelecem:

a) Valor aprovado pela Diretoria em ata, com abstenção de voto do SUBLOCADOR;

b) Contrato disponível em gokai.ong/transparencia.

---

## Cláusula Décima Oitava – Da Observância à LGPD

**18.1** As partes declaram que os dados pessoais serão tratados nos termos da Lei nº 13.709/2018 (LGPD), exclusivamente para as finalidades contratuais.

---

## Cláusula Décima Nona – Dos Termos Gerais

**19.1** O SUBLOCATÁRIO obriga-se a respeitar os direitos de vizinhança e quaisquer regulamentos aplicáveis ao imóvel.

**19.2** Qualquer alteração somente terá validade mediante aditamento escrito assinado pelas partes.

---

## Cláusula Vigésima – Do Foro

**20.1** As partes elegem o foro da **Comarca de Juiz de Fora/MG** para dirimir qualquer litígio.

---

[CIDADE], [DATA].

**SUBLOCADOR:**
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
[NOME DO SUBLOCADOR] | CPF: [CPF DO SUBLOCADOR]

**SUBLOCATÁRIO – GŌKAI:**
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
[NOME DO REPRESENTANTE] — [CARGO] | CPF: [CPF DO REPRESENTANTE]

**ANUENTE (Locador original):**
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
[NOME DO LOCADOR ORIGINAL] | CPF/CNPJ: [CPF/CNPJ]

**TESTEMUNHA 1:** \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

**TESTEMUNHA 2:** \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

**ANEXOS:**

- Termo de vistoria do imóvel
- Autorização de sublocação do locador original (Anexo II)
- Planilha de controle bimestral (Anexo I)

### Anexo I – Planilha de Controle Bimestral

| Bimestre | Mês 1 (R$) | Mês 2 (R$) | Total (R$) | Meta mínima (R$) | Situação |
|----------|-----------|-----------|-----------|-----------------|----------|
| Bim. 1 | | | | [VALOR] | |
| Bim. 2 | | | | [VALOR] | |
| Bim. 3 | | | | [VALOR] | |
| Bim. 4 | | | | [VALOR] | |
| Bim. 5 | | | | [VALOR] | |
| Bim. 6 | | | | [VALOR] | |

---

*Modelo para uso exclusivo da GŌKAI — abril/2026. Revisar com advogado habilitado antes da assinatura.*`,
  },
  {
    id: "00000000-0000-0000-0000-000000000612",
    titulo: "Modelo — Contrato de Patrocínio",
    descricao: "Contrato-modelo de patrocínio financeiro à Associação, com faixas (Apoiador, Bronze, Prata, Ouro, Diamante) e contrapartidas de divulgação. Revisar com advogado antes de assinar.",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2026-04-01",
    publicado: true,
    conteudo: `# Modelo — Contrato de Patrocínio

> **Modelo-template.** Todos os campos entre colchetes (\`[PLACEHOLDER]\`) devem ser preenchidos antes da assinatura. Revisar com advogado habilitado antes de assinar.

**PATROCINADO:** GŌKAI – Clube de Artes Marciais, associação civil sem fins lucrativos, CNPJ nº [CNPJ DA GŌKAI], com sede na [ENDEREÇO DA SEDE], representada pelo Presidente **[NOME DO PRESIDENTE]**, CPF [CPF DO PRESIDENTE], doravante denominado **PATROCINADO**.

**PATROCINADOR:** [RAZÃO SOCIAL OU NOME COMPLETO], [PJ: CNPJ nº \\_\\_\\_\\_\\_\\_\\_ / PF: CPF nº \\_\\_\\_\\_\\_\\_\\_], com sede/residência em [ENDEREÇO COMPLETO], representado por [NOME DO REPRESENTANTE], [CARGO], doravante denominado **PATROCINADOR**.

---

## Cláusula Primeira – Do Objeto

**1.1** O presente contrato tem por objeto o apoio financeiro ou material do PATROCINADOR às atividades esportivas, sociais e educacionais do PATROCINADO, em contrapartida às ações de divulgação descritas neste instrumento.

---

## Cláusula Segunda – Da Modalidade e Valor do Patrocínio

**2.1** O PATROCINADOR enquadra-se na seguinte faixa:

| Faixa | Valor mensal | Impacto direto |
|-------|:-----------:|----------------|
| Apoiador | R$ 500,00 | Kit de 1 atleta de judô ou jiu-jitsu |
| Bronze | R$ 1.000,00 | Kit de 3 atletas ou 2 atletas em campeonato |
| Prata | R$ 2.000,00 | Custeio de 1 aluguel mensal |
| Ouro | R$ 4.000,00 | Custeio integral dos 2 aluguéis mensais |
| Diamante | R$ [VALOR] | [A DEFINIR ENTRE AS PARTES] |

Faixa contratada: **[FAIXA]** — **R$ [VALOR] ([VALOR POR EXTENSO])** mensais.

---

## Cláusula Terceira – Das Contrapartidas ao Patrocinador

**Para todas as faixas:**

a) Nome/logomarca no site gokai.ong;

b) Menção nas redes sociais ao menos 1× por mês;

c) Inclusão na lista de apoiadores da página de transparência.

**A partir da faixa Bronze:**

d) Logomarca em uniformes e materiais de competição;

e) Relatório semestral de impacto com fotos e resultados esportivos.

**A partir da faixa Prata:**

f) Nomeação de polo ou turma em homenagem ao PATROCINADOR, se desejado;

g) Prioridade em banners e materiais visuais nos eventos.

**Faixa Ouro e Diamante:**

h) Espaço publicitário na sede durante treinos e eventos;

i) Convite para eventos e formaturas;

j) Reconhecimento como patrocinador master em todas as comunicações oficiais.

---

## Cláusula Quarta – Da Forma de Pagamento

**4.1** O valor de **R$ [VALOR]** mensais deverá ser pago até o dia [DIA] de cada mês, por meio de [FORMA DE PAGAMENTO]:

- Chave PIX / Conta: [DADOS BANCÁRIOS]
- Favorecido: GŌKAI – Clube de Artes Marciais | CNPJ: [CNPJ]

**4.2** O PATROCINADO emitirá recibo para cada pagamento recebido.

**4.3** Para patrocínio pontual de evento, o valor integral deverá ser depositado com antecedência mínima de **15 dias** da data do evento.

---

## Cláusula Quinta – Do Uso da Marca do Patrocinador

**5.1** O PATROCINADO fica autorizado a usar nome e logomarca do PATROCINADOR exclusivamente para as finalidades previstas neste contrato.

**5.2** O PATROCINADOR fornecerá os arquivos de logomarca em alta resolução no prazo de **5 dias úteis** após a assinatura.

**5.3** Qualquer uso além do previsto dependerá de autorização prévia por escrito.

---

## Cláusula Sexta – Das Vedações

**6.1** É vedado ao PATROCINADO associar a marca do PATROCINADOR a conteúdo político-partidário, discriminatório ou contrário aos valores da GŌKAI.

**6.2** É vedado ao PATROCINADOR interferir nas atividades técnicas, pedagógicas ou administrativas da Associação.

**6.3** Nenhuma das partes poderá usar a imagem da outra para fins comerciais além do previsto.

---

## Cláusula Sétima – Da Prestação de Contas

**7.1** O PATROCINADO compromete-se a:

a) Emitir recibo para cada valor recebido;

b) Disponibilizar relatório de impacto semestral (faixas Bronze ou superior);

c) Manter as contas da Associação disponíveis publicamente conforme Estatuto Social.

---

## Cláusula Oitava – Das Infrações ao Contrato

**8.1** A não observância de qualquer cláusula sujeita o infrator à multa de **2 (duas) vezes** o valor da mensalidade de patrocínio.

---

## Cláusula Nona – Da Rescisão

**9.1** Rescisão por qualquer das partes mediante notificação escrita com **30 dias** de antecedência, sem penalidades, desde que quitadas as obrigações do mês vigente.

**9.2** Rescisão imediata em caso de: uso indevido de marca, inadimplência por mais de **60 dias**, ou conduta que prejudique a imagem da outra parte.

---

## Cláusula Décima – Da Natureza do Contrato

**10.1** Este contrato não gera vínculo empregatício, societário ou de qualquer outra natureza além do patrocínio aqui descrito.

**10.2** O PATROCINADOR não assume responsabilidade por dívidas ou obrigações do PATROCINADO.

---

## Cláusula Décima Primeira – Da Observância à LGPD

**11.1** Os dados pessoais trocados para execução deste contrato serão tratados nos termos da Lei nº 13.709/2018 (LGPD), utilizados exclusivamente para as finalidades contratuais.

---

## Cláusula Décima Segunda – Da Sucessão

**12.1** As partes contratantes obrigam-se por si, herdeiros e/ou sucessores.

---

## Cláusula Décima Terceira – Do Foro

**13.1** As partes elegem o foro da **Comarca de Juiz de Fora/MG** para dirimir qualquer litígio.

---

[CIDADE], [DATA].

**PATROCINADO – GŌKAI:**
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
[NOME DO PRESIDENTE] — Presidente | CPF: [CPF DO PRESIDENTE]

**PATROCINADOR:**
\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_
[NOME DO REPRESENTANTE] | CPF/CNPJ: [CPF/CNPJ]

**TESTEMUNHA 1:** \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

**TESTEMUNHA 2:** \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

---

### Anexo I – Plano de Mídia e Contrapartidas

| Ação | Canal | Frequência | Responsável |
|------|-------|:----------:|-------------|
| Menção nas redes sociais | Instagram/WhatsApp | Mensal | Dir. Adm. |
| Logo no site | gokai.ong | Permanente | Dir. Adm. |
| Logo em uniformes | Treinos e campeonatos | Contínuo | Dir. Técnico |
| Relatório de impacto | E-mail | Semestral | Presidente |

---

*Modelo para uso exclusivo da GŌKAI — abril/2026. Revisar com advogado habilitado antes da assinatura.*`,
  },
  {
    id: "00000000-0000-0000-0000-000000000613",
    titulo: "Modelo — Pedido de Patrocínio",
    descricao: "Carta-modelo para solicitação de patrocínio a empresas e pessoas físicas. Serve como base para prospecção ativa de apoiadores. Preencher nome da empresa, contatos e anexos antes do envio.",
    tipo: "outro",
    secao: "estrutura",
    arquivo_url: null,
    data_referencia: "2026-04-01",
    publicado: true,
    conteudo: `# Modelo — Pedido de Patrocínio

> **Modelo-template.** Todos os campos entre colchetes (\`[PLACEHOLDER]\`) devem ser preenchidos antes do envio. Personalizar a justificativa de alinhamento com os valores do destinatário.

À [NOME DA EMPRESA / PESSOA]

**Referente a:** Patrocínio à GŌKAI – Clube de Artes Marciais

---

Pelo presente, vimos solicitar vossa contribuição para as atividades esportivas e sociais desenvolvidas pela **GŌKAI – Clube de Artes Marciais**, associação civil sem fins lucrativos sediada no Bairro São Mateus, Juiz de Fora/MG, fundada em 2026 com o propósito de promover artes marciais e transformação social por meio do esporte.

A GŌKAI atua nas modalidades de **Jiu-Jitsu, Judô, Boxe e Xadrez**, além de projetos de Defesa Pessoal Feminina e Educação Ambiental, atendendo crianças, jovens e adultos de todas as faixas etárias, com prioridade a jovens em situação de vulnerabilidade social nos bairros São Mateus e Linhares.

Considerando o alinhamento entre os valores da [NOME DA EMPRESA] e o trabalho que desenvolvemos — [MENCIONAR VALORES OU PROJETOS DA EMPRESA QUE SE CONECTAM COM A GŌKAI] —, julgamos que seria de vosso interesse se fazer presente como parceiro e fomentador deste projeto.

**Como patrocinador, [NOME DA EMPRESA] terá:**

- Visibilidade junto a [NÚMERO ESTIMADO] atletas e famílias atendidas pela Associação
- Exposição da marca em uniformes, eventos e campeonatos regionais
- Presença no site institucional gokai.ong e nas redes sociais da GŌKAI
- Associação à imagem de responsabilidade social, esporte e formação humana
- Relatório semestral de impacto com resultados esportivos e sociais

**Nossas cotas de patrocínio:**

| Faixa | Valor mensal | Impacto direto |
|-------|:-----------:|----------------|
| Apoiador | R$ 500,00 | Kit de 1 atleta |
| Bronze | R$ 1.000,00 | 2 atletas em campeonato |
| Prata | R$ 2.000,00 | 1 aluguel mensal |
| Ouro | R$ 4.000,00 | Custeio dos 2 aluguéis |
| Diamante | A combinar | Parceria estratégica |

As cotas e contrapartidas podem ser adaptadas conforme acordo entre as partes.

Em anexo a este convite, apresentamos [DOCUMENTOS ANEXOS: estatuto, relatório de atividades, projeto, etc.].

Para resposta ou mais informações, solicitamos contato pelo e-mail **[E-MAIL DA GŌKAI]** ou pelo telefone **[TELEFONE]**.

Certos de que poderemos contar com vosso importante apoio, colocamo-nos à disposição.

Juiz de Fora/MG, [DATA].

Atenciosamente,

\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_

[NOME DO PRESIDENTE]
Presidente — GŌKAI – Clube de Artes Marciais
CNPJ: [CNPJ] | gokai.ong

---

*Modelo para uso exclusivo da GŌKAI — abril/2026.*`,
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
