# Direção visual e UX — proposta para revisão

## Estrutura

Sete capítulos: apresentação → mercado brasileiro → abordagem → processo → serviços → empresa → contato. Cada seção tem fundo fotográfico e altura mínima de uma tela, podendo crescer com o conteúdo, tradução ou zoom. Rolagem nativa, sem scroll snapping ou avanço automático.

A navbar contém somente marca, idioma e contato. A marca permite voltar ao início, como convenção de navegação. O CTA de leitura e os links “A seguir” levam apenas à seção imediatamente seguinte. Contato abre um diálogo no contexto atual e devolve foco/posição ao fechar.

Detalhes legais/operacionais, comparação de coordenação, cenário ilustrativo e perfis atendidos continuam disponíveis em disclosures nativos, com rótulos explícitos. O carrossel de serviços é manual e finito, com controles desabilitados nos limites.

## Imagem e tipografia

Grafite `#252D35`, cobre `#AD6438`, marfim `#F8F3ED`, cinza `#5D6266`, bege `#CDC5BD`. Títulos grandes com escala responsiva; corpo entre 16–20 px conforme o contexto. Contraste e largura de leitura prevalecem sobre o tamanho da imagem.

As fotos fornecidas inicialmente foram retiradas da composição ativa. A seleção atual usa paisagem de São Paulo com céu livre para o hero, porto para operações internacionais, sala de reunião em madeira/grafite e colaboração horizontal. Sobreposições CSS equilibram cor e legibilidade. Nenhuma foto é apresentada como instalação, equipe ou cliente real da Nordion. Consulte [as fontes e licenças](image-credits.md).

## Mapa

Contorno real simplificado do Brasil (Natural Earth) extrudado em Three.js, câmera oblíqua estável, rotas curvas tracejadas e aviões modelados no projeto. Nuvens são sprites de textura radial procedural. As conexões são ilustrativas, não rotas comerciais reais. WebGL só é montado na proximidade da seção; `prefers-reduced-motion` e falhas de renderização preservam um mapa SVG estático.

## Fundamentação da revisão

O revisor independente confirmou os antigos saltos contraditórios, setas em cards não clicáveis, falta de conclusão do carrossel e duplicação de destinos no footer. Recomendeu a sequência de sete capítulos, contato contextual e detalhes expansíveis. A numeração de capítulo foi posteriormente removida a pedido do usuário.

- [NN/g — In-page links](https://www.nngroup.com/articles/in-page-links-content-navigation/): links internos podem ser úteis, mas exigem indicação clara e organização do conteúdo; a estrutura deve preceder o padrão de navegação.
- [GOV.UK — Navigate a service](https://design-system.service.gov.uk/patterns/navigate-a-service/): navegação não precisa reproduzir um mapa completo do conteúdo.
- [IBM — Design principles](https://www.ibm.com/design/language/philosophy/principles/): referência de coerência visual e clareza, não uma alegação de que marcas usam exatamente este fluxo.

A escolha de sete capítulos é uma decisão editorial para este projeto, não uma regra universal. Não foram feitos testes com usuários reais; a validação cobre revisão especializada do código e funcionamento automatizado no navegador.

## Refinamento gráfico e interações

Referências consultadas: [Linear](https://linear.app/) e [Stripe](https://stripe.com/). A inspiração aplicada é a combinação de hierarquia tipográfica forte com demonstrações visuais do serviço e componentes pequenos; não foram copiados layouts, marcas ou assets dessas empresas.

- **Abertura:** três retratos decorativos em círculos flutuantes, halos e conexões, sem snippets ou seleção. Hover pausa a flutuação e inclina o retrato; movimento reduzido desativa animações. Os retratos não entram na navegação por teclado.
- **Abordagem:** percurso com contorno tracejado, nós com profundidade e respostas visuais leves.
- **Processo:** quatro abas numeradas, painel com explicação e resultado esperado por etapa. Navegação por clique, toque, setas, Home e End; nenhum avanço automático.
- **Serviços:** formas circulares discretas e resposta visual nos ícones/cards, mantendo o carrossel finito.
- **Empresa:** valores selecionáveis revelam como cada princípio orienta o trabalho.
- **Contato:** traços concêntricos e botão de conversão com acabamento distinto.

Linhas, marcadores e arcos são decorativos, não focáveis e não interferem nos controles. Todos os novos textos têm versões PT-BR, EN e ES. A cena 3D não foi alterada nesta etapa.

### Animações da abertura

- A marca da navbar revela Nordion ao carregar e recolhe o nome até restar o símbolo N; não reinicia ao mudar de idioma.
- O título mantém a introdução fixa e alterna cinco complementos traduzidos com digitação, pausa de leitura e deleção. O espaço reservado evita deslocamentos do conteúdo.
- A digitação usa 110 ms por caractere, com 5,5 segundos de leitura antes da deleção, sem botão de pausa. Leitores de tela recebem uma frase estável; a preferência por movimento reduzido mantém texto e símbolo estáticos.

## Continuação sobre os ajustes do usuário — 2026-09-05

Preservados os fundos em cobre, a navbar que se recolhe ao sair do topo, o carrossel de valores, a seção própria para equipe e a cidade oblíqua em SVG. O fluxo atual tem oito seções, com Equipe entre Sobre e Contato. As referências anteriores a sete seções descrevem a versão anterior.

Os novos títulos e controles usam os locales PT-BR, EN e ES. Os indicadores do carrossel são botões de seleção em grupo; as mudanças automáticas não são anunciadas a cada rotação. Os placeholders da equipe usam iniciais e não fazem requisições a fotos inexistentes. O botão flutuante de WhatsApp fica no canto inferior direito, respeita as áreas seguras do dispositivo e só aparece com um número internacional configurado.

## Revisão de equipe e cidade — 2026-09-05

A equipe retoma três retratos ilustrativos em círculos, sem seleção nem snippets. A flutuação é de oito pixels em dez segundos, com fases diferentes; hover pausa apenas o retrato sob o cursor e permite inclinação discreta. As fotos não representam integrantes reais.

A cidade foi substituída por uma maquete original em React Three Fiber: câmera ortográfica fixa, oito edifícios, quadras, ruas, praça e árvores. Quatro veículos percorrem um circuito contínuo no mesmo sistema de coordenadas dos prédios. Não há flutuação de edifícios nem deslocamento automático da câmera. A cena carrega perto da área visível; movimento reduzido e falha de WebGL usam uma ilustração SVG estática do mesmo distrito. Trata-se de uma composição ilustrativa, não de uma simulação de tráfego real.

## Equipe selecionável e abertura do mapa

A revisão atual da equipe contém sete cards animados à esquerda e um painel de detalhe à direita (empilhados no mobile). Clique, Enter ou Espaço selecionam o profissional. `src/data/team.ts` mantém nome, cargo, apresentação, `thumb` e `profile` separados; as duas imagens devem ser fotos reais do mesmo profissional. Enquanto não forem fornecidas, são exibidas silhuetas e textos provisórios, sem atribuir fotos de banco a funcionários reais.

O mapa deixa de apresentar uma projeção SVG diferente enquanto carrega o WebGL. A câmera recebe seu alvo antes da apresentação, e a cena aparece após dois frames de inicialização. SVG permanece disponível para movimento reduzido ou falha de renderização.

## Constelação, abertura e FAQ

Os sete cards agora ocupam posições radiais em torno do símbolo fornecido pelo usuário (`public/brand/nordion-symbol.png`), mantendo o painel de detalhes à direita. O arquivo original foi copiado sem edição; o enquadramento é feito por CSS.

A abertura alterna `global-port`, `boardroom` e `collaboration` a cada sete segundos, com transição de opacidade, seleção manual e pausa independente da digitação. Movimento reduzido mantém a imagem estática. Estas fotos são exclusivas da abertura; os valores usam composições gráficas, evitando repetição de fotografias entre seções.

Os quatro conteúdos expansíveis (desafios, coordenação, cenário e perfis atendidos) foram movidos integralmente para FAQ, última seção antes do footer. O fluxo possui nove seções; Contato aponta para FAQ. As respostas abrem no fluxo da página, sem sobrepor o restante do conteúdo.

A cidade pré-carrega seu módulo após a montagem inicial e mantém o canvas preparado fora da tela. `frameloop="demand"` limita a renderização fora da área visível; os veículos retomam a animação quando a seção se aproxima. A alternativa SVG continua disponível para movimento reduzido ou falhas de WebGL.

## Living brand universe and photographic balance

The hero slideshow is replaced by a lightweight oblique constellation. Five small flags (Brazil, USA, Spain, France and Japan) complete elliptical orbits in 46 seconds; smaller celestial bodies use 62-second periods. The supplied N-and-arrow symbol floats by nine pixels and reacts to pointer movement with bounded translation (12/10 px) and rotation (12/10 degrees). Keyboard arrows adjust rotation; Escape resets it. Automatic motion stops outside the viewport, in hidden tabs and for reduced-motion preferences.

Section three now fills its reserved media area with seven unique photos of business, architecture and Brazilian locations. CSS treatments vary slightly across photos; hover restores clarity. Journey icons reveal translated tooltips on hover, keyboard focus and tap, dismissible with Escape. The sixth section restores five real local image elements instead of empty graphic backgrounds. FAQ heading, questions and expanded answers share the same width and left edge.

A equipe foi dimensionada para exatamente 100svh. O tamanho da constelação acompanha o espaço disponível; no tablet/mobile o detalhe usa foto e texto lado a lado abaixo dos sete cards. Alturas verificadas: desktop 1440×900, tablet 768×1024, mobile 390×844.
