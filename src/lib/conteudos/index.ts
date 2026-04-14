/**
 * GŌKAI Content Hub — local content source.
 *
 * Articles are stored here as structured data until a CMS is introduced.
 * To publish a new article: add an entry to the `articles` array below.
 *
 * Future migration path:
 *   - Export this interface as a shared type and pull from Supabase/Sanity/Contentful
 *   - `getArticle` and `getAllArticles` can be swapped to async DB fetches with no
 *     changes required to the page components.
 */

// ─── Types ─────────────────────────────────────────────────────────────────────

export type ArticleCategoria =
  | "modalidades"
  | "iniciantes"
  | "filosofia"
  | "eventos"
  | "comunidade"

export const categoriaLabels: Record<ArticleCategoria, string> = {
  modalidades: "Modalidades",
  iniciantes: "Para Iniciantes",
  filosofia: "Filosofia e Disciplina",
  eventos: "Eventos",
  comunidade: "Comunidade",
}

/** Badge color classes (ring + text) for each category. */
export const categoriaBadgeClass: Record<ArticleCategoria, string> = {
  modalidades: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  iniciantes: "bg-green-500/10 text-green-400 border-green-500/20",
  filosofia: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  eventos: "bg-red-600/10 text-red-400 border-red-600/20",
  comunidade: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export interface Article {
  /** URL-safe unique identifier — matches the [slug] segment. */
  slug: string
  titulo: string
  /** One or two sentences for card excerpts and meta description. */
  resumo: string
  /**
   * Article body text.
   * Each paragraph is separated by a blank line (\n\n).
   * Inline formatting: **bold**, _italic_ (rendered by the detail page).
   */
  conteudo: string
  categoria: ArticleCategoria
  /** ISO 8601 date string: "YYYY-MM-DD" */
  publicado_em: string
  /** ISO 8601 date string: "YYYY-MM-DD" */
  atualizado_em: string
  /** Optional author name. Falls back to "Equipe GŌKAI". */
  autor?: string
  /** Optional hero image URL (Supabase storage or external CDN). */
  imagem_url?: string
  /** Keyword tags used for related-article matching. */
  tags: string[]
  /** Estimated reading time in minutes. */
  leitura_min: number
}

// ─── Seeded articles ────────────────────────────────────────────────────────────
//
// Six foundational articles covering the content clusters identified in the
// SEO Organic Traffic Report. Each targets a distinct search intent:
//
//   1. Modality selection intent
//   2. Parent research intent (children + martial arts)
//   3. Conversion intent (first class / what to expect)
//   4. Philosophy / discipline — trust and aspiration
//   5. Event awareness — freshness signal
//   6. Adult beginner intent
//
// ───────────────────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    slug: "como-escolher-a-modalidade-ideal",
    titulo: "Como escolher a modalidade ideal para começar nas artes marciais",
    resumo:
      "Jiu-jitsu, karatê, judô ou muay thai? Entenda quais fatores considerar antes de fazer sua escolha e como cada modalidade se encaixa em objetivos diferentes.",
    categoria: "modalidades",
    publicado_em: "2026-03-10",
    atualizado_em: "2026-03-10",
    autor: "Equipe GŌKAI",
    tags: ["modalidades", "iniciantes", "escolha", "jiu-jitsu", "karatê", "judô"],
    leitura_min: 6,
    conteudo: `Entrar em uma academia de artes marciais pela primeira vez pode ser ao mesmo tempo empolgante e confuso. São tantas modalidades, tantos professores e tantas promessas que a dúvida sobre por onde começar é absolutamente normal. A boa notícia é que não existe resposta errada — existe a resposta certa para o seu momento.

**O que você quer conquistar?**

Antes de qualquer outra consideração, vale parar e refletir sobre o seu objetivo principal. Você quer aprender a se defender em situações reais? Competir em campeonatos? Melhorar o condicionamento físico? Encontrar uma prática que também trabalhe o equilíbrio mental e emocional? Ou simplesmente encontrar uma atividade que você faça com regularidade e prazer?

Cada resposta aponta para caminhos diferentes. O jiu-jitsu brasileiro, por exemplo, é uma excelente escolha para quem busca aplicabilidade prática em autodefesa e não se importa de passar os primeiros meses no chão, trabalhando posições e finalizações. O judô entrega uma base sólida em projeções e quedas, com uma tradição olímpica que facilita encontrar competições em todos os níveis. O karatê é uma porta de entrada clássica, com uma pedagogia estruturada que funciona muito bem para crianças e adultos que buscam disciplina progressiva. O muay thai e o kickboxing oferecem um treino cardiovascular intenso com foco em golpes em pé.

**Considere sua condição física atual**

Nenhuma modalidade exige um condicionamento prévio para começar — esse é um mito que afasta muita gente. Dito isso, algumas são naturalmente mais intensas do que outras nas primeiras semanas. Antes de escolher, pense no seu histórico de lesões, na sua mobilidade articular e no quanto de impacto físico você está disposto a absorver logo de início.

O jiu-jitsu envolve bastante trabalho no chão, alavancas e pressão articular — exige atenção ao pescoço e aos joelhos. O judô tem quedas repetidas que pedem coluna e quadril em boas condições. O muay thai usa muito os membros inferiores e pode ser pesado para quem tem problemas nos joelhos ou tornozelos. O karatê é geralmente mais gradual no impacto e pode ser uma boa opção para quem está retornando ao esporte após uma longa pausa.

**Seu estilo de aprendizado importa**

Algumas pessoas aprendem melhor com repetição técnica metódica, construindo uma base sólida antes de sparring. Outras precisam de dinâmica, de experimentação rápida, de sentir na prática o que estão aprendendo. Observe a aula antes de se matricular. Como o professor conduz? O ritmo parece compatível com a forma como você aprende?

**Converse com quem já treina**

Não existe substituição para a experiência de quem está na quadra. Em qualquer academia séria, os alunos mais experientes são a melhor fonte de informação honesta sobre como é o dia a dia do treino, quais são as dificuldades reais do início e como foi a curva de aprendizado deles. Pergunte, observe, converse.

**Experimente antes de decidir**

A maioria das academias oferece uma aula experimental ou uma semana de trial. Use esse tempo de forma intencional: observe a dinâmica entre alunos, a postura do professor nas correções, se há respeito mútuo, se os alunos mais novos são bem recebidos. Esses sinais dizem mais sobre onde você vai evoluir do que qualquer modalidade específica.

No GŌKAI, trabalhamos com múltiplas modalidades e nossa equipe pode ajudá-lo a encontrar o melhor caminho de acordo com seus objetivos. Se você ainda tem dúvidas, entre em contato ou visite uma de nossas turmas de observação.`,
  },

  {
    slug: "artes-marciais-para-criancas-beneficios",
    titulo: "Artes marciais para crianças: benefícios além do esporte",
    resumo:
      "Disciplina, foco, respeito pelo próximo e autoconfiança. Entenda por que as artes marciais são uma das atividades extracurriculares mais completas para o desenvolvimento infantil.",
    categoria: "comunidade",
    publicado_em: "2026-03-18",
    atualizado_em: "2026-03-18",
    autor: "Equipe GŌKAI",
    tags: ["crianças", "infantil", "desenvolvimento", "disciplina", "educação", "família"],
    leitura_min: 5,
    conteudo: `Quando os pais pensam em atividades extracurriculares para os filhos, as artes marciais raramente são a primeira escolha. A imagem de ringues e combates ainda afasta muitas famílias. Mas quem conhece o ambiente de uma boa academia sabe que a realidade é bem diferente — e muito mais rica.

**Disciplina que nasce de dentro**

Uma das primeiras coisas que uma criança aprende nas artes marciais é que existe um protocolo para tudo: entrar no tatame, cumprimentar o professor, ocupar o lugar na fila. Esses rituais parecem simples, mas são a fundação de algo muito maior: o hábito de respeitar regras sem que alguém precise ficar reforçando o tempo todo.

Com o tempo, essa disciplina migra para outros contextos. Pais frequentemente relatam mudanças no comportamento doméstico e escolar — não porque a criança foi punida ou pressionada, mas porque passou a internalizar o valor da organização e do esforço.

**Foco e autorregulação emocional**

A geração atual de crianças cresce em um ambiente de estímulos constantes e atenção fragmentada. As artes marciais exigem o oposto: presença total. Dentro do tatame, não há espaço para distração — o exercício pede atenção ao professor, ao colega e ao próprio corpo.

Treinar regularmente desenvolve a capacidade de focar em uma tarefa por períodos mais longos, de lidar com frustrações sem explosões, e de compreender que o progresso vem de repetição e paciência. Essas são habilidades que beneficiam diretamente o desempenho escolar.

**Autoconfiança sem arrogância**

Existe uma diferença importante entre a autoconfiança saudável e a arrogância. As artes marciais constroem a primeira ao colocar a criança em desafios progressivos e bem calibrados — ela avança quando está pronta, sem comparação com os colegas. O sistema de graduações oferece marcos concretos de progresso que a criança pode celebrar.

Ao mesmo tempo, o código de conduta das artes marciais é explícito sobre respeito: respeito pelo professor, pelos colegas, pelos adversários. A criança aprende que confiança não significa superioridade — significa preparo e responsabilidade.

**Aptidão física e coordenação**

Além de todos os benefícios comportamentais, as artes marciais oferecem um treino motor completo. Coordenação motora fina e grossa, lateralidade, equilíbrio, propriocepção e consciência corporal são trabalhados de forma lúdica, especialmente nas turmas de faixa etária menor. Para crianças com dificuldades de coordenação ou que não se identificam com esportes coletivos, pode ser exatamente a porta que faltava.

**Inclusão e pertencimento**

Uma boa academia é um espaço de acolhimento. Crianças que se sentem rejeitadas em ambientes esportivos mais competitivos encontram nas artes marciais um ritmo próprio — cada um treina no seu nível, sem a pressão de ser o mais rápido ou o mais forte da turma.

No GŌKAI, as turmas infantis são conduzidas por professores treinados para o desenvolvimento infanto-juvenil, com metodologia adaptada a cada faixa etária. Se quiser conhecer mais, visite nossa página de modalidades ou entre em contato para agendar uma aula de observação.`,
  },

  {
    slug: "o-que-esperar-da-primeira-aula",
    titulo: "O que esperar da primeira aula no GŌKAI",
    resumo:
      "Nervosismo é normal, mas saber o que vai acontecer antes de entrar no tatame ajuda muito. Um guia prático para quem vai começar.",
    categoria: "iniciantes",
    publicado_em: "2026-03-25",
    atualizado_em: "2026-03-25",
    autor: "Equipe GŌKAI",
    tags: ["primeira aula", "iniciantes", "matricula", "tatame", "começo"],
    leitura_min: 4,
    conteudo: `A primeira aula em uma academia nova carrega uma mistura de empolgação e nervosismo que quase todo praticante conhece. Você não sabe exatamente o que vai acontecer, não conhece ninguém e ainda está aprendendo as regras do espaço. Isso é completamente normal — e passa rápido.

**Chegue um pouco antes do horário**

Não há nada pior do que chegar atrasado na primeira aula. Além do constrangimento de entrar com o treino em andamento, você perde a apresentação inicial com o professor e a oportunidade de se acomodar com calma. Chegue com pelo menos dez minutos de antecedência, apresente-se ao responsável pela recepção e diga que é sua primeira aula.

**O que usar**

Para a primeira aula, uma roupa de ginástica confortável já está ótimo. Bermuda, camiseta e meias. Você não precisa de kimono ou luvas para começar — isso pode ser adquirido depois de decidir continuar. Muitas academias têm uniformes disponíveis para empréstimo nos primeiros dias.

**O ritual de entrada no tatame**

Na maioria das academias de artes marciais, há um protocolo de entrada na área de treino. Geralmente envolve uma reverência à entrada do tatame como sinal de respeito pelo espaço. Preste atenção no que os outros alunos fazem e siga o exemplo — não há problema nenhum em imitar nos primeiros dias.

**Como a aula vai funcionar**

Uma aula típica tem três momentos: aquecimento, parte técnica e prática dirigida (ou sparring leve, dependendo da modalidade e do nível da turma). No aquecimento, o professor vai conduzir exercícios de mobilidade, deslocamento e condicionamento geral. Na parte técnica, ele vai apresentar um movimento ou posição para que você pratique com um parceiro. Para iniciantes, o sparring costuma ser introduzido de forma muito gradual.

**Não tente aprender tudo na primeira aula**

Esse é o erro mais comum dos iniciantes. A ansiedade de absorver tudo logo de início produz o efeito oposto: você se sobrecarrega e acaba fixando menos. A primeira aula é sobre chegada, não sobre domínio. Preste atenção nos detalhes do aquecimento, observe os colegas, sinta o ambiente. O aprendizado técnico começa de verdade na segunda e terceira aula.

**Seja honesto sobre seus limites**

Se você tem alguma limitação física — lesão prévia, cirurgia recente, condição específica — fale com o professor antes de começar. Isso não é fraqueza, é inteligência. Um bom professor vai adaptar o treino para você ter a melhor experiência possível desde o primeiro dia.

No GŌKAI, a primeira aula é sempre acompanhada de uma conversa com um de nossos professores para entender seu histórico, seus objetivos e o que você espera da prática. Estamos aqui para tornar esse começo o mais seguro e estimulante possível.`,
  },

  {
    slug: "disciplina-e-respeito-fora-do-tatame",
    titulo: "Disciplina e respeito: como o treino transforma a vida fora do tatame",
    resumo:
      "Os valores centrais das artes marciais não ficam na academia. Entenda como a prática regular impacta relações, trabalho e desenvolvimento pessoal.",
    categoria: "filosofia",
    publicado_em: "2026-04-01",
    atualizado_em: "2026-04-01",
    autor: "Equipe GŌKAI",
    tags: ["disciplina", "respeito", "desenvolvimento", "filosofia", "valores", "caráter"],
    leitura_min: 5,
    conteudo: `Existe um ponto na trajetória de qualquer praticante de artes marciais em que algo muda. Não é a faixa que avança, nem o golpe que finalmente acerta. É o momento em que você percebe que o que aprende no tatame mudou como você responde ao trânsito, como fala com seu filho, como lida com o fracasso no trabalho.

**A disciplina como prática, não como regra**

Disciplina é uma das palavras mais usadas no universo das artes marciais — e talvez uma das mais mal compreendidas fora dele. No contexto do treino, disciplina não é obediência cega nem rigidez. É a capacidade de fazer o que precisa ser feito mesmo quando você não está com vontade. De aparecer no treino quando está cansado. De repetir o mesmo movimento pela vigésima vez sem reclamar.

Quando essa capacidade é desenvolvida com consistência ao longo de meses e anos, ela não fica confinada à academia. Ela vira uma forma de se relacionar com qualquer desafio que demande esforço repetido: um projeto longo no trabalho, uma rotina de estudos, o cuidado com a saúde.

**Respeito que vai além da reverência**

O ritual de reverência no início e no fim de cada aula parece protocolo, mas esconde algo mais profundo. Ele é um lembrete constante de que nenhum progresso acontece sozinho. Você avança porque alguém esteve disposto a ser seu parceiro de treino, a apanhar com você, a ensinar o que sabe sem guardar segredo.

Esse reconhecimento do outro — que no tatame é seu parceiro e não seu inimigo — treina um tipo de generosidade que faz diferença em todos os ambientes. Pessoas que praticam artes marciais há alguns anos tendem a ter menos dificuldade em receber crítica, em admitir quando erram, em celebrar o crescimento alheio sem sentir ameaça.

**Regulação emocional sob pressão**

Um dos aspectos menos falados e mais importantes do treino é o que acontece quando você está no sparring e o seu parceiro aplica mais pressão do que você consegue administrar. Você sente o desconforto, talvez o pânico, a vontade de desistir. E aprende, aula após aula, a respirar nesse lugar difícil.

Essa habilidade de manter a calma sob pressão é diretamente transferível para situações de estresse fora do tatame: uma reunião difícil, um conflito familiar, um prazo impossível. Não é que você se torne insensível — é que você aprende a agir a partir de um estado mais controlado, mesmo quando as emoções estão presentes.

**O longo jogo**

Talvez o maior presente que as artes marciais oferecem seja uma perspectiva de longo prazo. Em uma cultura que valoriza resultados imediatos, o tatame ensina que as melhores conquistas levam tempo — meses, anos, décadas. E que cada detalhe, cada repetição, cada aula conta.

Quem absorve isso não fica apenas um atleta melhor. Fica uma pessoa mais capaz de investir no que realmente importa, sem precisar de resultados rápidos para continuar.`,
  },

  {
    slug: "como-funcionam-os-campeonatos",
    titulo: "Como funcionam os eventos e campeonatos de artes marciais",
    resumo:
      "Da inscrição ao pódio: um guia sobre o formato dos campeonatos, categorias, regras e o que esperar como participante ou espectador.",
    categoria: "eventos",
    publicado_em: "2026-04-05",
    atualizado_em: "2026-04-05",
    autor: "Equipe GŌKAI",
    tags: ["campeonato", "competição", "eventos", "regulamento", "categorias"],
    leitura_min: 5,
    conteudo: `Se você nunca esteve em um campeonato de artes marciais — nem como competidor, nem como espectador — provavelmente tem uma imagem construída por filmes e transmissões de MMA. A realidade dos eventos amadores e associativos é diferente: mais acessível, mais pedagógica e, para muitos, muito mais empolgante.

**Tipos de eventos que o GŌKAI realiza**

A associação organiza e participa de diferentes formatos ao longo do ano. Os **treinos especiais** reúnem alunos de diferentes polos para uma sessão conjunta com foco técnico. Os **seminários** trazem professores convidados para conteúdo específico — uma posição nova, uma estratégia de competição, um sistema de defesa. Os **campeonatos internos** são voltados para os próprios alunos e têm caráter principalmente pedagógico. Já os **campeonatos externos** são competições com outras academias e federações, onde o regulamento é mais formal.

**Categorias e divisões**

Em qualquer campeonato sério, os atletas são divididos por faixa etária, peso e graduação. Isso garante que a competição aconteça entre pessoas com perfis físicos e de experiência compatíveis. Para iniciantes, a categoria de faixa branca (ou equivalente em outras modalidades) é o ponto de entrada natural.

Antes de se inscrever em um campeonato, verifique cuidadosamente em qual categoria você se enquadra. Muitas federações têm regras específicas sobre a tolerância de peso — pesar acima da categoria no dia da competição pode resultar em desclassificação.

**O dia da competição**

Chegar cedo é essencial. O cronograma dos campeonatos raramente é exato, e algumas lutas acontecem antes do horário previsto. Leve água, alimentos leves, o uniforme completo e qualquer equipamento obrigatório indicado no regulamento.

Aqueça bem antes de entrar na área de competição. Muitos atletas subestimam o aquecimento por causa do nervosismo ou da agitação do ambiente, e entram frios em suas primeiras lutas.

**A função pedagógica da competição**

Competir não é obrigatório em nenhuma boa academia — mas é altamente recomendado, mesmo para quem não tem ambições de alto nível. A competição coloca você em contato com seu jogo real: o que você aprendeu que de fato funciona sob pressão, e o que ainda é frágil. Essa informação é impossível de obter apenas nos treinos.

Além disso, a experiência de competir — independente do resultado — desenvolve a capacidade de lidar com pressão, de regular o nervosismo pré-luta e de processar derrota ou vitória com maturidade. São aprendizados que ficam para a vida.

**Como acompanhar os eventos do GŌKAI**

Todos os nossos eventos são publicados com antecedência na página de eventos do site. Para campeonatos externos, o regulamento da federação organizadora é sempre disponibilizado com link direto. Se você quiser participar como competidor ou voluntário em um dos nossos eventos, entre em contato com a equipe do GŌKAI.`,
  },

  {
    slug: "artes-marciais-para-adultos-iniciantes",
    titulo: "Nunca é tarde: artes marciais para adultos que estão começando agora",
    resumo:
      "Com 30, 40 ou 50 anos, começar nas artes marciais é completamente viável. Entenda como a prática se adapta ao corpo adulto e o que esperar da evolução.",
    categoria: "iniciantes",
    publicado_em: "2026-04-08",
    atualizado_em: "2026-04-08",
    autor: "Equipe GŌKAI",
    tags: ["adultos", "iniciantes", "30 anos", "40 anos", "recomeço", "condicionamento"],
    leitura_min: 5,
    conteudo: `Um dos mitos mais persistentes em torno das artes marciais é a ideia de que existe uma janela de idade para começar — e que quem chegou depois dela está tarde demais. Esse mito afasta adultos que poderiam se beneficiar enormemente da prática, e precisa ser desmontado com clareza.

**O corpo adulto aprende de forma diferente — não pior**

É verdade que crianças absorvem movimentos novos com uma velocidade que impressiona. O cérebro em desenvolvimento tem uma plasticidade que não se repete na vida adulta com a mesma intensidade. Mas isso não significa que adultos não aprendem — significa que aprendem de forma diferente.

Adultos chegam ao tatame com capacidade analítica, experiência motora acumulada em outros esportes e uma compreensão do próprio corpo que leva anos para se desenvolver. Eles entendem instruções mais abstratas, conseguem contextualizar técnicas e costumam ter mais paciência com o processo. Em muitas academias, os alunos adultos iniciantes progridem tecnicamente de forma mais sólida e consistente do que os jovens — justamente porque não pulam etapas.

**Ritmo e intensidade adaptados**

Uma boa academia não vai colocar um iniciante de 45 anos no mesmo treino que um competidor de 22 anos que treina há oito. O bom senso do professor é fundamental aqui, e é algo que você deve avaliar antes de se matricular. Observe se o treino tem espaço para diferentes níveis de intensidade. Se a academia tem somente um ritmo — e esse ritmo é máximo — provavelmente não é o lugar certo para um retorno ao esporte.

O trabalho técnico pode e deve ser intenso em precisão, mas a intensidade física deve crescer de forma progressiva e responsável. Para adultos acima de 35 anos, a recuperação leva mais tempo, e o treino precisa respeitar isso.

**Lesões: prevenção é parte do treinamento**

Um dos maiores medos de quem começa mais velho é se machucar. É um medo legítimo, mas que pode ser gerenciado com bom senso. Aquecimento cuidadoso, atenção à técnica antes de aumentar a carga, comunicação honesta com o parceiro de treino e respeito aos sinais do próprio corpo são as principais ferramentas.

Muitas lesões em adultos iniciantes acontecem não por causa da modalidade, mas por excesso de entusiasmo nas primeiras semanas — o treino fica tão prazeroso que a pessoa exagera na frequência ou na intensidade antes do corpo estar adaptado.

**O que você pode esperar da evolução**

Nos primeiros três meses, a evolução é principalmente de adaptação: o corpo aprendendo os movimentos básicos, a mente se familiarizando com as regras e o ambiente. Entre seis meses e um ano, você começa a notar que certas coisas ficaram automáticas — e esse momento é muito satisfatório.

Em dois anos de treino regular, a maioria dos adultos iniciantes chega a um nível técnico que surpreende quem os conhecia antes. Não porque viraram campeões, mas porque desenvolveram um conjunto de habilidades físicas, mentais e comportamentais que são claramente visíveis no cotidiano.

No GŌKAI, temos turmas organizadas por nível — não por idade. Isso garante que você treine com pessoas no mesmo patamar técnico, independente de quantos anos você tem. Se quiser conhecer a nossa proposta, agende uma visita ou entre em contato com a equipe.`,
  },
]

// ─── Accessors ─────────────────────────────────────────────────────────────────

/** Returns a single article by slug, or undefined if not found. */
export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

/** Returns all articles sorted newest-first. */
export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publicado_em).getTime() - new Date(a.publicado_em).getTime()
  )
}

/** Returns all unique slugs — used by generateStaticParams. */
export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug)
}

/**
 * Returns up to `limit` articles related to `current`.
 * Scoring: same category > shared tags > recency.
 */
export function getRelatedArticles(current: Article, limit = 3): Article[] {
  return [...articles]
    .filter((a) => a.slug !== current.slug)
    .sort((a, b) => {
      const scoreA =
        (a.categoria === current.categoria ? 4 : 0) +
        a.tags.filter((t) => current.tags.includes(t)).length
      const scoreB =
        (b.categoria === current.categoria ? 4 : 0) +
        b.tags.filter((t) => current.tags.includes(t)).length
      if (scoreB !== scoreA) return scoreB - scoreA
      // Tiebreak: recency
      return (
        new Date(b.publicado_em).getTime() - new Date(a.publicado_em).getTime()
      )
    })
    .slice(0, limit)
}
