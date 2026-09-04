# HandyX — Análise de Referência (fonte de verdade)

Referência: https://handyx.framer.website/ (site Framer)
Medições obtidas via DOM / `getComputedStyle` no viewport **1440x1000** (viewport real medido: `documentElement.clientWidth = 1425`, ou seja 1440 menos a scrollbar) e **390x844**.
Todos os valores abaixo são **medidos**, não estimados.

---

## 0. Correções desta rodada (navbar + hero remedidos)

Valores abaixo **substituem** os das seções 5 e 6 onde houver conflito. Foram
remedidos elemento a elemento no DOM da referência, com as animações de entrada
já assentadas (a referência desloca a coluna da imagem em **+150px** durante a
entrada — medir cedo demais dá posições erradas para a imagem e os badges).

### Breakpoints reais (lidos das `@media` do próprio site)

| Faixa | Layout |
|---|---|
| **>= 1340px** | desktop, hero em duas colunas |
| **810–1339px** | tablet, hero **empilhado**, h1 58px |
| **<= 809px** | mobile, h1 40px, CTAs empilhados, badges ocultos |

> Consequência prática: em **1280x900 a referência já está empilhada** (o
> clientWidth cai para 1265 por causa da scrollbar). Reproduzir 1280 fielmente
> significa empilhar também — não manter duas colunas.

O h1 **não** usa `clamp()`: ele troca em degraus — 72/79.2, 58/63.8, 40/48.

### Navbar

- Links: **18px / 27px / peso 700**, cor `#000` (a seção 5 dizia 16px — errado).
  Larguras: About 50 · Services 69 · News 44 · FAQ 34 · Contact 64; gap 40.
- Header **sobrepõe** a hero: a hero começa em `y=0` do documento e o header
  (67px) flutua por cima. Não somar 67px de padding-top à hero.
- Mobile: header 64px (altura interna 44).

### Hero — desktop

- Section `1425x835`, `padding: 100px 20px`, `display:flex; align-items:center`.
- A row mede **728** de altura, maior que o content-box de **635** — ela
  transborda 46.5px de cada lado. Daí a imagem em `y=54` e a coluna de texto
  em `y=150`. A hero precisa de `overflow: clip`.
- Coluna esquerda 650 (gap 20): rating 55 · h1 238 · parágrafo 54 · CTAs 47 ·
  métricas 62 = **535**.
- Rating: pill `192x55`, `padding 5px 10px`, `gap 5`, bg `#F2F8FF`, radius 6.
  Estrelas **18px** (5+18+22.4 = 45.4 de altura interna).
- Parágrafo: caixa de 650 mas a linha 1 mede **528** → a quebra é **autoral**
  (`<br>` depois de "on"), não natural. No mobile ele vira 16/22.4.
- Métricas: número **34px / 41px / peso 700 na cor accent `#2FAAFF`** (a seção 6
  dizia ~44px preto — errado). Bloco = 41 + 3 de gap + 18 do label = 62, igual
  em todos os breakpoints. Larguras 73 / 85 / 131, gap 40.
- CTA secundário: **sem borda e sem fundo** — só ícone + texto.

### Badges flutuantes sobre a imagem

Caixa `#2FAAFF`, `border-radius: 6px`, `padding: 15px`, ícone branco.
Posição ancorada em **% da caixa da imagem** (por isso escala sozinha):

| # | desktop | tablet | rotação |
|---|---|---|---|
| 1 | 70px · 31.4% / 25.0% | 85px · 13.8% / 18.1% | -24deg |
| 2 | 50px · 86.1% / 42.6% | 102px · 56.2% / 23.2% | +32deg |
| 3 | 60px · 92.0% / 73.2% | 110px · 54.0% / 84.9% | +19deg |
| 4 | 55px · 13.0% / 59.1% | 105px · 15.7% / 86.6% | -25deg |

A rotação sai da `matrix()` do wrapper (ex.: `matrix(0.9135, -0.4067, …)` = -24deg).
No mobile a referência **esconde** os quatro.

### Tablet / mobile (empilhado)

- `padding: 117px 20px 50px`; container em coluna, `gap: 10`, `align-items:center`.
- Imagem 100% de largura no aspect **640:728**.
  - @1265: `1225 x 1393`, hero **1932** de altura.
  - @390: `350 x 398`, hero **1087** de altura, CTAs em coluna full-width (gap 10).

> Armadilha de implementação: os atributos `width`/`height` do `<img>` viram
> *presentational hints* de CSS. Sem `height: auto` explícito, o `height="728"`
> vence o `aspect-ratio` e a imagem não escala nos breakpoints empilhados.

### Assets reais em `/public/handyx/`

`hero-background.svg` (1280x668, full-bleed `object-fit: cover`) ·
`hero-worker.png` · `google-mark.svg` (40x40) · `badge-01..04.svg` ·
`icon-arrow.svg` · `icon-phone.svg`

---

## 0b. Mapa vertical da pagina (@1440, clientWidth 1425)

| Bloco | top | altura | background | padding |
|---|---|---|---|---|
| Hero | 0 | 835 | transparente | `100px 20px` |
| **About** | **835** | **588** | transparente | **`0px 20px 100px`** |
| Services | 1423 | 1037 | `#F2F8FF` | `100px 20px` |
| Quote | 2460 | 708 | transparente | `100px 20px` |
| Gallery | 3168 | 710 | `#F2F8FF` | `100px 20px` |
| Blog | 3879 | 1077 | `#FFFFFF` | `100px 20px` |
| Testimonials | 4956 | 655 | `#F2F8FF` | `100px 20px` |
| FAQ | 5611 | 800 | transparente | `100px 20px` |
| Service Areas | 6411 | 815 | `#F2F8FF` | `100px 20px` |
| Footer | 7226 | 637 | preto | `0px` |

Altura total do documento: **7864**.

---

## 0c. Transicao Hero -> About

Dois achados que definem a emenda:

1. **O About tem `padding-top: 0`.** Ele encosta direto no fim da hero (835).
   Nao existe respiro proprio: o espaco vem do padding-bottom da hero.
2. **A hero tem um overlay de fade branco.** `div` full-bleed absoluta,
   `bottom: 0`, `height: 150px`, `z-index: 1`,
   `background: linear-gradient(rgba(255,255,255,0) 0%, rgb(255,255,255) 50%)`.
   Cobre y **685..835** e fica 100% branca ja em ~760.

O gradiente comeca exatamente em 685 — o fim da coluna de texto da hero — entao
nao toca nada legivel. Ele dissolve **o grid do fundo e a base do trabalhador**,
que por isso nao aparecem cortados na emenda. Sem esse overlay a hero termina
com um corte seco e a transicao denuncia o clone.

Ritmo vertical resultante: base da imagem do trabalhador em **782**, fim da hero
em **835** (53px), topo da imagem do About em **854** (mais 19px, porque a coluna
esquerda tem 450 contra 488 da direita e o container centraliza).

Sem overlap, sem elemento atravessando a divisao, sem continuacao do grid: o
About nao tem background nem imagem de fundo propria.

---

## 0d. About (medido)

Container `1300x488`, `flex row`, `gap 80`, `align-items center` — 610 + 80 + 610.

**Coluna esquerda** (610, imagem 610x450, `border-radius: 12px`, `object-fit: cover`):
- Badge azul `70x70` em `left: 20 / top: 20` — `#2FAAFF`, radius 6, padding 15,
  icone branco 40x40. Mesmo padrao dos badges da hero.
- Pill branca em `right: 20 / bottom: 20` — `315x36`, `padding: 5px 15px`,
  radius 6, **sem sombra**, texto 22px/26.4px peso 700 preto.

**Coluna direita** (610x488, `flex column`, `gap 20`):

| # | Elemento | y | altura |
|---|---|---|---|
| 1 | eyebrow (pill) | 0 | 28 |
| 2 | h2 | 48 | 122 (2 linhas) |
| 3 | paragrafo | 190 | 90 (4 linhas) |
| 4 | lista | 300 | 121 |
| 5 | CTA | 441 | 47 |

- **Eyebrow e uma pill**: `89x28`, bg `#F2F8FF`, `border-radius: 20px`,
  `padding: 5px 20px`, texto 12/18 peso 700. Esse mesmo elemento se repete no
  cabecalho de todas as secoes.
- h2 51/61.2 peso 700, primeira palavra em `#2FAAFF`. **A quebra e autoral**
  (ha um `
` no h2): em 610px ela cairia sozinha, mas em 1225px do tablet o
  texto caberia numa linha e a secao encolheria 49px.
- Paragrafo **16px/22.4px peso 600 na cor `#444`** — NAO e o estilo do paragrafo
  da hero (18/27 peso 700 preto). Contagem de linhas: 4 @610 · 2 @1225 · 6 @350.
- Lista: `flex column`, `gap 20`, 3 itens de 27px. Item = `flex row`,
  `align-items center`, `gap 10`, com caixa azul `25x25` (radius 6, padding 6)
  contendo um check branco de 13x10, e texto 18/27 peso 700 preto.
  Larguras dos itens: 328 / 280 / 347.
- CTA `156x47` (`padding 12px 25px` + seta de 15) — mesmo botao primario.

### About responsivo

| | >=1340 | 810-1339 | <=809 |
|---|---|---|---|
| padding | `0 20px 100px` | `0 20px 50px` | `0 20px 50px` |
| container | row, gap 80 | **column, gap 40** | column, gap 40 |
| imagem | 610x450 | 1225x**450** | 350x**260** |
| h2 | 51/61.2 | 41/49.2 | 30/36 |
| pill (texto) | 22/26.4 | 18/21.6 | 14/16.8 |
| pill (posicao) | right/bottom 20 | right/bottom 20 | right 15 / **bottom 63** |
| badge azul | 70x70 em 20/20 | igual | igual |
| lista | 18/27, itens 27 | igual | **igual** (nao reduz) |

> A altura da imagem e **fixa** (450 / 450 / 260), nao `aspect-ratio`. No tablet
> ela fica 1225x450 e o `object-fit: cover` recorta as laterais.

Assim como o h1, o **h2 troca em degraus** (51 / 41 / 30), sem `clamp()`.

### Correcoes que isso forcou na hero

Duas medicoes anteriores do mobile estavam erradas e quebravam o ritmo vertical:

- O paragrafo da hero **nao muda de escala**: e 18px/27px peso 700 preto em
  todos os breakpoints (4 linhas = 108px em 350). Estava como 16/22.4.
- A **quebra autoral do paragrafo vale em todos os breakpoints** — a referencia
  quebra depois de "on" tambem no tablet e no mobile. Estava escondida abaixo
  de 1024.
- A regua de metricas **nao muda no mobile**: mesmo gap 40, labels em uma linha,
  bloco de 62px. Ela mede 392 numa coluna de 350 e **transborda** — o
  `overflow: clip` da hero contem isso sem gerar scroll horizontal.

Com as tres, a hero mobile passa de 1106 para **1129** (referencia: 1128).

---

## 0e. Services (medido)

Section top **1423** · altura **1037** · bg `#F2F8FF` · `padding: 100px 20px`.
Container `1300x837` · `flex column` · `gap 60`.
Conferencia: 100 + 160 + 60 + 617 + 100 = 1037.

**Cabecalho** `1300x160` · `flex row` · `gap 10` · `align-items center`:
- Esquerda `770` (`flex: 1 0 0`, column, gap 10): eyebrow pill 28 + h2 122.
  h2 51/61.2 com **quebra autoral**.
- Direita `520` (`flex: 0 0 auto`, column, gap 20): paragrafo 45 (2 linhas,
  16/22.4 peso 600 `#444`) + CTA 156x47. Bloco de 112 centrado nos 160.

**Grid** `1300x617` · `display: grid` · `grid-template-columns: 420px 420px 420px`
· `gap 20` (3x2).

**Card** `420x298` · bg `#FFFFFF` · radius 6 · `padding: 40` · `flex column`
· `gap 80` · **sem sombra e sem borda**:
- Icone: caixa `50x50`, bg `#F2F8FF`, radius 6, com SVG de `30x30` (traco `#2FAAFF`).
- Texto `340x88` (`column`, `gap 10`): titulo 28/33.6 peso 700 preto +
  descricao 16/22.4 peso 600 **preta** (a do cabecalho e que e `#444`).

> Nao fixar `height: 298px` no card: deixar a altura vir do conteudo
> (40+50+80+88+40 = 298) faz o sub-pixel bater com a referencia e permite que
> tablet (~269) e mobile (286) encolham sozinhos.

### Services responsivo

| | >=1340 | 810-1339 | <=809 |
|---|---|---|---|
| padding secao | 100 | **50** | 50 |
| gap do container | 60 | **40** | 40 |
| cabecalho | row, gap 10 | **column, gap 10** | column, gap 10 |
| grid | 3 col | **2 col** (602.5px) | **1 col** |
| titulo do card | 28/33.6 | **22/26.4** | **18/21.6** |

O titulo do card tambem troca em degraus, sem `clamp()`.
Descricao dimensionada para 2 linhas @340 · 1 linha @522 · 2 linhas @270.

---

## 0f. Quote (medido)

Section top **2460** · altura **708** · fundo branco · `padding: 100px 20px`.
Container `1300x508` · `flex row` · `gap 40` · `align-items center`.

**Coluna esquerda** `630`: imagem `630x506` radius 12, com duas pills brancas
ancoradas em `right: 20 / bottom: 20` numa coluna `gap 16` alinhada a esquerda
(a pill menor nao encosta na direita). Pill: `padding 5px 15px`, radius 6,
texto **22/26.4 peso 700 preto**, sem sombra.

**Coluna direita** — o cartao do formulario `630x508`:
`padding: 40` · bg **`rgba(187, 221, 255, 0.2)`** (o `--accent-tint`) · radius 6
· `flex column` · `gap 20`. Conferencia: 66 + 58 + 58 + 118 + 48 + 4x20 = 428
= 508 - 80.

| Bloco | altura |
|---|---|
| header (titulo 28/33.6 + gap 10 + descricao 16/22.4 `#444`) | 66 |
| linha de 2 campos | 58 |
| linha de 2 campos | 58 |
| textarea (label 18 + caixa 100) | 118 |
| botao | 48 |

**Campo** `265x58` = label `12/18` peso 700 `#444` + **caixa branca** `265x40`
(radius 6, `padding 12`) com o input transparente de `14px/16.8px` dentro.
O input em si nao tem borda nem fundo — tudo vive na caixa.

> Armadilha: `flex: 1 1 0` nas duas colunas da **590/670**, nao 630/630.
> `flex-basis: 0` resolve no *content box*, entao os 80px de padding do
> formulario entram por fora. Usar `flex-basis` em comprimento
> (`calc((100% - 40px) / 2)`), que respeita `box-sizing: border-box`.
> O `<select>` tambem precisa de `min-width: 0` na linha, senao a largura
> intrinseca da maior `<option>` empurra a coluna.

### Quote responsivo

| | >=1340 | 810-1339 | <=809 |
|---|---|---|---|
| padding secao | 100 | **50** | 50 |
| container | row, gap 40 | **column, gap 40** | column, gap 40 |
| imagem | 630x506 | 1225x**506** | 350x**292** |
| card do form | 630, padding 40 | 1225, padding 40 | 350x518, **padding 40** |
| campos por linha | 2 | 2 | **2** (125px cada) |
| pill | 22/26.4 | 22/26.4 | **14/16.8** |

> A referencia NAO empilha os campos no mobile — mantem 2 por linha com 125px
> cada. Reproduzido por fidelidade, mas e apertado para digitar: vale revisar
> quando o template virar site de cliente.

---

## 0g. Secoes 5 a 10 (medidas)

**Gallery** (3168 / 710 · `#F2F8FF` · `100px 20px` · column gap 50):
cabecalho 1300x160 `space-between` + `align-items: flex-end` (o Services
centraliza a coluna direita; aqui e a Gallery, o Blog e o Service Areas ela
encosta embaixo). Coluna direita 520 com **gap 10**. Faixa **full-bleed**
1385x300 `overflow: clip`, `gap 20`, imagens com altura fixa 300 e largura pelo
aspect (450/250/450/200/533), **sem border-radius**. Nao anima.
A altura de 300 vale em TODOS os breakpoints.

**Blog** (3879 / 1077 · branco · column gap 60):
corpo 1300x657 `row gap 20 align-center` = destaque 650 + lista 630.
Destaque: imagem 650x400 + data 16/22.4 accent + h4 34/40.8 + paragrafo + link.
Lista: 3 itens de **205.6** (imagem 200 com `radius: 6px 0 0 6px`, texto com
padding 24 e gap 8, data 12/18 accent, **titulo 22/26.4** — NAO o token de card
de servico, que e 28 e deixava a secao 43px fora).
A altura da secao vem da LISTA, entao o destaque pode variar.

**Testimonials** (4956 / 655 · `#F2F8FF` · column gap 60):
carrossel 1300x234 `overflow: clip`, cards **420x234** (`padding 20`, radius 6,
gap 20, sem sombra) = [5 estrelas 110x17 + citacao 380x81 @18/27] +
[avatar 50 redondo + gap 10 + nome 22/26.4 + funcao 12/18 `#444`].

**FAQ** (5611 / 800 · branco): inner 1300x600 `row gap 80 align-flex-start`.
Aside 520 em `space-between`: bloco do titulo + card `#F2F8FF` (radius 6,
`padding 32`, gap 16 = h4 41 + paragrafo 45 + CTA 47 = 229).
Accordion 700 `column gap 16`; item bg **`#F4F4F4`** radius 6
`padding: 26px 28px` gap 12 — **aberto 137, fechado 77**.
Pergunta 19/24.7 peso 700; resposta **16/24** (nao 22.4) peso 600 `#444`.

**Service Areas** (6411 / 815 · `#F2F8FF`): inner 1300x615 `row gap 80
align-flex-end`. Esquerda 520 (eyebrow + h2 com a cidade em accent + CTA),
direita 700 `column gap 40` = paragrafo + grade de cidades (2 col x 3 linhas,
mesmo check azul 25x25 do About) + imagem **700x368** radius 6.

**Footer** (7226 / 637 · **`#000`** · `padding: 100px 20px 0`):
bloco superior 1300x470 + barra inferior 1300x67 (= 20 + 27 + 20).
h3 42/50.4 branco · rotulos 12/18 · valores 18/27 · links 18/27 com gap 40 ·
copyright 16/22.4 peso 600.

### Degraus de tipografia (a referencia nunca usa `clamp()`)

| token | >=1340 | 810-1339 | <=809 |
|---|---|---|---|
| h1 | 72/79.2 | 58/63.8 | 40/48 |
| h2 | 51/61.2 | 41/49.2 | 30/36 |
| h3 | 42/50.4 | 36/43.2 | 30/36 |
| h4 | 34/40.8 | **27/32.4** | 22/26.4 |
| titulo de card | 28/33.6 | 22/26.4 | 18/21.6 |

---

## 0h. Progresso do clone

| Secao | referencia | implementacao |
|---|---|---|
| Hero | 0 / 835 | 0 / 835 |
| About | 835 / 588 | 835 / 588 |
| Services | 1423 / 1037 | 1423 / 1037 |
| Quote | 2460 / 708 | 2460 / 708 |
| Gallery | 3168 / 710 | 3168 / 710 |
| Blog | 3879 / 1077 | 3879 / 1077 |
| Testimonials | 4956 / 655 | 4956 / 654 |
| FAQ | 5611 / 800 | 5610 / 800 |
| Service Areas | 6411 / 815 | 6410 / 806 |
| Footer | 7226 / 637 | 7216 / 637 |
| **documento** | **7864** | **7853** |

Diferenca acumulada de 11px na pagina inteira (0.14%). As duas fontes: 1px de
sub-pixel no cabecalho dos Testimonials e 9px no Service Areas (a copia propria
quebra diferente da referencia dentro da coluna de 700px).

---

## 1. Grid global e container

| Token | Valor medido |
|---|---|
| Container (max-width) | **1300px** (aparece 22x no DOM) |
| Padding lateral da `section` | **20px** (desktop **e** mobile) |
| Offset do container em 1425px | x = 63px  →  (1425 − 1300) / 2 = 62.5 ✔ |
| Padding vertical de seção (desktop) | **100px top / 100px bottom** |
| Padding vertical de seção (mobile 390) | **50px top / 50px bottom** |
| Hero padding (desktop) | `100px 20px` |
| Hero padding (mobile) | `117px 20px` (compensa a navbar fixa) |
| Altura total do documento @1440 | 7864px |
| Altura total do documento @390 | 11730px |

> Observação importante: a referência **não** aumenta o padding lateral em telas grandes. É sempre 20px; quem controla a largura é o `max-width: 1300px`. Manter 20px como base e usar 24px em faixas intermediárias apenas para o texto não colar na borda entre 1320–1360px.

---

## 2. Cores

| Papel | Valor | Uso |
|---|---|---|
| Background | `#FFFFFF` | body, seções principais |
| Surface soft | `#F2F8FF` | Services, Testimonials, Service Areas (seções alternadas) |
| Surface muted | `#F4F4F4` | item do accordion FAQ |
| Foreground | `#000000` | headings, eyebrows |
| Muted | `#444444` | parágrafos de corpo, labels de métrica |
| Accent | `#2FAAFF` | CTAs, destaque na headline, datas do blog, ícones |
| Footer bg | `#000000` | `footer` |
| Footer text | `#FFFFFF` | textos do footer |
| Tint decorativo | `rgba(187, 221, 255, 0.2)` | formas suaves de fundo do hero |

Censo de background no DOM: `#FFFFFF` (40), `#2FAAFF` (26), `#F2F8FF` (23), `#F4F4F4` (6), `#000000` (3).
Censo de cor de texto: `#000` (124), `#2FAAFF` (35), `#FFF` (32), `#444` (28).

---

## 3. Tipografia

**Fonte única do site: `Urbanist`** (Google Fonts). A `Syne` que aparece no DOM pertence exclusivamente ao badge "Made in Framer" e **não** faz parte do design — não usar.

### Escala desktop (medida)

| Papel | size / line-height | ratio | weight | cor |
|---|---|---|---|---|
| h1 (hero) | **72px / 79.2px** | 1.10 | 700 | `#000` |
| h2 (seção) | **51px / 61.2px** | 1.20 | 700 | `#000` |
| h3 (footer) | **42px / 50.4px** | 1.20 | 700 | `#FFF` |
| h4 (blog destaque / "Still have questions?") | **34px / 41px** | 1.20 | 700 | `#000` |
| Título de card de serviço | **28px / 33.6px** | 1.20 | 700 | `#000` |
| "Join our community" | **22px / 26.4px** | 1.20 | 700 | `#FFF` |
| Pergunta do FAQ | **19px / 24.7px** | 1.30 | 700 | `#000` |
| Body large (parágrafos) | **18px / 27px** | 1.50 | 700 | `#444` |
| Body small (descrição de card) | **16px / 22.4px** | 1.40 | 600 | `#000` |
| Eyebrow / label / data | **12px / 18px** | 1.50 | 700 | `#000` ou `#2FAAFF` |
| Números de métrica do hero | ~44px (bloco de 62px de altura) | — | 700 | `#000` |
| Números de Service Areas | **51px / 61.2px** | 1.20 | 700 | `#2FAAFF` |

`letter-spacing: normal` em todos os títulos — a referência **não** usa tracking negativo.

### Escala mobile (390px, medida)

| Papel | size / line-height |
|---|---|
| h1 | **40px / 48px** (1.2) — 3 linhas em 350px de largura |
| h2 | **30px / 36px** (1.2) |

Interpolação para tablet/laptop com `clamp()` ancorado nesses dois pontos medidos.

---

## 4. Raios, bordas, sombras

| Token | Valor |
|---|---|
| `--radius-sm` | **6px** — botões, cards de serviço, cards de depoimento, item de FAQ, imagem de Service Areas |
| `--radius-md` | **10px** |
| `--radius-lg` | **12px** — imagens grandes (About, Quote) |
| Imagem do blog (lista) | `6px 0 0 6px` (arredondada só à esquerda) |
| Bordas | **nenhuma** nos cards; o contraste vem do fundo (`#FFF` sobre `#F2F8FF`) |
| Sombras | **`box-shadow: none` em todos os cards** — design 100% flat |

> Regra crítica de fidelidade: **não adicionar sombras nem bordas em cards.** A separação é feita por cor de fundo.

---

## 5. Header / Navbar

- Altura total: **67px** (desktop) / 64px (mobile), `padding: 10px 20px`, fundo `#FFFFFF`.
- Container interno: 1300px, `flex; justify-content: space-between; align-items: center`, altura 47px.
- Logo: 140x29 à esquerda (x=63).
- Bloco direito: `flex; gap: 40px` → [lista de links] + [CTA].
- Lista de links: **5 itens**, `flex; gap: 40px; justify-content: flex-end`, altura 27px, largura total 584px.
  - About · Services · News · FAQ · Contact
- CTA "Get a free quote": **193x47**, bg `#2FAAFF`, `border-radius: 6px`, `padding: 12px 25px`, texto branco + ícone de seta.
- Navbar é **fixa/sticky** (no mobile o `nav` aparece em y=−150 ao rolar, e o hero tem `padding-top: 117px` para compensar).
- Mobile: os 5 links colapsam em menu hambúrguer (não cabem em 350px).

---

## 6. Hero

Seção: `1425 x 835`, `padding: 100px 20px`.
Container: `1300 x 728`, `flex row; gap: 10px; align-items: center`.

- **Coluna esquerda: 650px** — `flex column; gap: 20px`, 5 filhos, altura 535 (y 150 → 685).
- **Coluna direita: 640px** — imagem 640x728, `object-fit: cover`.
- **Background do hero**: imagem full-bleed 1425x835 atrás de tudo (formas geométricas azul-claro muito suaves).

### Coluna esquerda (posições absolutas medidas)

| Elemento | y | dimensões |
|---|---|---|
| Rating (ícone + estrelas + texto) | 150 | linha horizontal |
| h1 | **225** | 650 x 238 → **3 linhas** de 79.2px |
| Parágrafo | **484** | 528 de largura → **2 linhas**, 18px/27px, `#444` |
| Linha de CTAs | **556** | 650 x 47, `flex row; gap: 10px` |
| Métricas | **623** | 392 x 62, `flex row; gap: 40px`, 3 itens |

- CTA primário: `193 x 47`, `#2FAAFF`, radius 6px, `padding: 12px 25px`, texto branco + seta.
- CTA secundário: `213 x 47`, fundo transparente, radius 6px, `padding: 12px 25px`, ícone de telefone + número.
- Métricas: número grande (bloco de 62px, ~44px, peso 700) + label 12px/18px `#444`. **Sem divisores verticais.**
- **Contadores animados**: o DOM expõe colunas de dígitos `0 1 2 3 4 5 6 7 8 9` por casa decimal → é um **odômetro rolante** (cada dígito desliza verticalmente), não um count-up numérico simples. Reproduzir com `translateY` por coluna de dígito.

### Hero mobile (390)

- Seção 390 x 1087, `padding: 117px 20px 50px`.
- Conteúdo primeiro; **imagem abaixo**, 350 x 398 (y=789).
- h1 40px/48px em 350px de largura (3 linhas).

---

## 7. About

Seção: y=835, `1425 x 588`, `padding: 0 20px 100px` (**sem padding-top** — encosta no hero).
Container: `1300 x 488`, `flex row; gap: 80px; align-items: center`.

- **Esquerda: imagem** `610 x 450`, `border-radius: 12px`, y=854.
- Badge sobreposto "100% Satisfaction Guarantee" ancorado à imagem (canto inferior direito), pill branca.
- **Direita: 610px**, `flex column; gap: 20px`, 5 filhos:
  1. Eyebrow "About Us" (12px/18px, 700)
  2. h2 `610 x 122` → **2 linhas** de 61.2px
  3. Parágrafo 18px/27px `#444`
  4. Lista de 3 benefícios com ícone de check azul
  5. CTA "Learn More"

Mobile: uma coluna, imagem 350x260 no topo.

---

## 8. Services

Seção: y=1423, `1425 x 1037`, bg **`#F2F8FF`**, `padding: 100px 20px`.
Container: `1300 x 837`, `flex column; gap: 60px`.

**Cabeçalho** (`1300 x 160`, `flex row; gap: 10px`):
- Esquerda 770px: eyebrow + h2 (`511 x 122`, 2 linhas), `gap: 10px`.
- Direita 520px (y=1547): parágrafo + CTA "Learn More", `flex column; gap: 20px`.

**Grid** (y=1743, `1300 x 617`):
- `display: grid; grid-template-columns: 420px 420px 420px; gap: 20px` → **3 colunas x 2 linhas**.
- Card: `420 x 298`, bg `#FFFFFF`, `border-radius: 6px`, `padding: 40px`, **sem sombra, sem borda**.
- Interno: `flex column; gap: 80px` → [ícone] … [bloco de texto].
  - Bloco de texto: `340 x 88`, `flex column; gap: 10px` → título 28px/33.6px + descrição 16px/22.4px.
- Ícone azul no topo, ocupando a folga de 80px.

Serviços: General Repairs · Painting Services · Plumbing Services · Drywall Repairs · Commercial Services · Outdoor Repair.

---

## 9. Quote / Lead form (`#get-quote`)

Seção: y=2460, `1425 x 708`, fundo branco, `padding: 100px 20px`.
Container: `1300 x 508`, `flex row; gap: 40px; align-items: center`.

- **Esquerda: imagem** `630 x 506`, `border-radius: 12px` (y=2711), com **dois badges** sobrepostos: "15+ / Years Serving" e "2,400+ / Jobs Completed".
- **Direita: formulário** `630 x 508`, `flex column; gap: 20px`, 16 filhos.
  - Título "Get Your Free Quote" + descrição.
  - Campos em **duas colunas** (medido): Full Name (x=935, w=241) | Phone Number (x=1220, w=241); Email Address | Service Needed (`select`, w=253, h=40).
  - Textarea: largura cheia **550**, altura **100**, `padding: 12px`.
  - Inputs: Urbanist **14px**, fundo transparente, sem borda própria — a borda vem do wrapper. Altura de linha do input 16px.
  - CTA "Request a Quote".

Mobile: campos 100% de largura, empilhados.

---

## 10. Gallery

Bloco: y=3168, `1425 x 710`, `flex column; gap: 50px`. Fundo branco.

**Cabeçalho** (y=3268, 1300x160): esquerda 364px (eyebrow "Gallery" + h2 de 2 linhas), direita 520px (parágrafo + CTA "Learn More") — mesmo padrão de Services.

**Faixa de imagens** (y=3479): `flex row; gap: 20px`, **full-bleed** (começa em x=0 e extrapola a viewport, indo até x≈1963).
- Altura fixa **300px**, larguras **variáveis**: 450, 250, 450, 200, 533…
- `border-radius: 0`, `object-fit: cover`.
- É um **marquee horizontal contínuo** (comportamento idêntico em mobile: x de 0 a 1410+).

---

## 11. Blog

Bloco: y=3979, `1300 x 877`, `flex column; gap: 60px`.

**Cabeçalho**: esquerda 585px (eyebrow "Blog" + h2 2 linhas), direita 520px (parágrafo + CTA "View All Blogs").

**Layout dos posts** (y=4199, `1300 x 657`, `flex row; gap: 20px`) — **não é um grid de 3 colunas**:
- **Esquerda: post em destaque**, 650px — imagem 650x400 no topo, depois bloco de texto (y=4599, `650 x 251`, `flex column; gap: 20px`), com padding interno de 20px: data 12px azul + h4 **34px/41px** + resumo.
- **Direita: lista de 3 posts**, `630 x 657`, `flex column; gap: 20px`.
  - Cada item: **206px de altura**, imagem 200x206 à esquerda com `border-radius: 6px 0 0 6px`, texto à direita (430px, `flex column; gap: 8px`): data azul + título + resumo + "Read More".

---

## 12. Testimonials

Seção: y=4956, `1425 x 655`, bg **`#F2F8FF`**, `padding: 100px 20px`.
Container: `1300 x 455`, `flex column; gap: 60px`.

**Cabeçalho**: esquerda 770px (eyebrow + h2 2 linhas), direita 520px (parágrafo + CTA "Get a Free Quote").

**Carrossel** (y=5277, `flex row; gap: 20px`, itens `li`):
- Card: `420 x 234`, bg `#FFFFFF`, `border-radius: 6px`, `padding: 20px`, **sem sombra**.
- Interno: `flex column; gap: 20px` → [bloco de texto `380 x 118`: estrelas + citação] … [autor: avatar + nome + papel].
- Cards em x = 62, 502, 942, **1382, 1822, 2262** → ultrapassam a viewport ⇒ **marquee horizontal contínuo**, mesma mecânica da Gallery. 6 depoimentos.

---

## 13. FAQ (`#faq-section`)

Seção: y=5611, `1425 x 800`, fundo branco, `padding: 100px 20px`.
Container: `1300 x 600`, `flex row; gap: 80px`.

- **Esquerda: 520px** — eyebrow "FAQ" + h2 (`520 x 122`, 2 linhas) e, mais abaixo (y=6083), bloco `520 x 229`, `flex column; gap: 16px`: h4 "Still have questions?" (34px) + parágrafo + CTA "Contact Us".
- **Direita: 700px** — accordion, `flex column; gap: 16px`, **6 itens**.
  - Item: bg **`#F4F4F4`**, `border-radius: 6px`, `padding: 26px 28px`, **sem borda**.
  - Cabeçalho: `flex row; gap: 20px; justify-content: space-between`, altura 25px → pergunta (19px/24.7px, 700) + símbolo `+`.
  - Item aberto: altura **137px** (`flex column; gap: 12px` → cabeçalho + resposta). Fechados: passo de ~92px entre cabeçalhos (y 5890, 5982, 6075, 6168, 6260).
  - **O primeiro item já vem aberto.** Apenas um aberto por vez.
  - `+` rotaciona 45° ao abrir; a resposta anima height/opacity.

> Não são divisores horizontais — cada pergunta é um **bloco cinza `#F4F4F4` com radius 6px**.

---

## 14. Service Areas (`#faq-section-1`)

Seção: y=6411, `1425 x 815`, bg **`#F2F8FF`**, `padding: 100px 20px`.
Container: `1300 x 615`, `flex row; gap: 80px; align-items: flex-end`.

- **Esquerda: 520px** (y=6511, altura 237, `flex column; gap: 20px`, 3 filhos): eyebrow "Service Areas" + h2 (2 linhas, com o nome da cidade em **azul `#2FAAFF` a 51px**) + CTA "Get a Free Quote".
- **Direita: 700px** (`flex column; gap: 40px`, 3 filhos):
  1. Parágrafo.
  2. **Grid de cidades** (y=6605, `700 x 113`): `grid-template-columns: 342px 342px; gap: 16px` → **2 colunas x 3 linhas**, 6 cidades, cada uma com um pequeno ícone.
  3. Imagem `700 x 368`, `border-radius: 6px` (y=6758).

---

## 15. Footer

`footer`: y=7226, `1425 x 637`, bg **`#000000`**, `padding: 100px 20px 0`.

- Container 1300px, `flex column; gap: 10px`, `padding-bottom: 100px`.
- **Bloco 1** (y=7326, `1300 x 225`, `padding-bottom: 50px`): headline "We're here ready to help you" (42px/50.4px, branco) + logotipo grande **700 x 175** (marca em escala grande, tratada como elemento gráfico).
- **Bloco 2** (y=7561, `1300 x 135`, `flex row`):
  - Esquerda 645px, `flex column; gap: 40px`: título + linha de contatos (y=7652, `flex row; gap: 40px`, 3 colunas): **Phone number / Email Address / Location**, cada uma com label 12px/18px branco + valor.
  - Direita 645px, `flex column; gap: 10px; align-items: flex-end`: "Join our community" (22px/26.4px) + ícones sociais.
- **Bloco 3** (y=7797, `1300 x 67`): navegação de rodapé `flex row; gap: 40px` (About · Services · News · Contact) + copyright.

---

## 16. Animações

- Nenhuma `animation` CSS declarada nos elementos → tudo é **JS/scroll-driven** (Framer Motion no original).
- Padrões observados:
  - **Fade + slide-up** na entrada de cada bloco ao rolar, com **stagger** entre filhos.
  - **Odômetro de dígitos** nas métricas do hero (colunas 0–9 deslizando).
  - **Marquee contínuo** em Gallery e Testimonials.
  - **Accordion**: rotação do `+` (45°) + height/opacity da resposta.
  - **Hover**: transições curtas e sutis em CTAs e links (sem bounce, sem escala agressiva).
- Curva adotada: `cubic-bezier(0.22, 1, 0.36, 1)`, duração 0.4–0.8s.
- Respeitar `prefers-reduced-motion`.

---

## 17. Breakpoints

Pontos medidos: **1440** e **390**. Comportamento derivado:

| Faixa | Comportamento |
|---|---|
| ≥ 1340px | container 1300px fixo, padding lateral 20px |
| 1024–1339px | container fluido, padding lateral 24–32px |
| 768–1023px (tablet) | seções de 2 colunas colapsam; Services vira 2 colunas; blog vira 1 coluna |
| < 768px (mobile) | 1 coluna geral, padding lateral 20px, seção `padding: 50px 20px`, h1 40px, h2 30px, menu hambúrguer, Services 1 coluna, form 100%, marquees mantidos |

---

## 18. Regras de fidelidade (checklist)

1. Container **1300px**, padding lateral **20px**. Nunca estreitar.
2. Seções **100px** vertical no desktop, **50px** no mobile. About **sem** padding-top.
3. h1 **72/79.2** em 3 linhas dentro de 650px. h2 **51/61.2** em 2 linhas.
4. Cards **flat**: sem sombra, sem borda. Só bg + radius 6px.
5. Alternância de fundo: branco (hero) → branco (about) → `#F2F8FF` (services) → branco (quote) → branco (gallery) → branco (blog) → `#F2F8FF` (testimonials) → branco (faq) → `#F2F8FF` (areas) → **preto** (footer).
6. Gallery e Testimonials são **marquees full-bleed**, não grids.
7. Blog é **1 destaque + 3 itens de lista**, não um grid de 3 cards.
8. FAQ são **blocos `#F4F4F4` com radius 6px e gap 16px**, não divisores.
9. Fonte única **Urbanist**, `letter-spacing: normal`.
10. Accent **#2FAAFF** apenas em: CTA primário, parte da headline, ícones, datas, números de Service Areas.

---

## 19. Validação — medido lado a lado @1440 (viewport real 1425)

Ambos medidos com o mesmo script de `getBoundingClientRect`.

| Elemento | Referência | Implementação | Δ |
|---|---|---|---|
| Container (x / largura) | 63 / 1300 | 63 / 1300 | **0** |
| Altura da navbar | 67 | 67 | **0** |
| Altura da seção hero | 835 | 835 | **0** |
| Caixa do h1 | 650 x 238 (3 linhas) | 650 x 238 | **0** |
| Imagem do hero | 640 x 728 @ x=723 | 640 x 728 @ x=723 | **0** |
| Imagem do About | 610 x 450 @ x=63 | 610 x 450 @ x=63 | **0** |
| Imagem do Quote | 630 x 506 | 630 x 506 | **0** |
| Grid de Services | 1300 x 617 | 1300 x 629 | +12 |
| Card de serviço | 420 x 298 | 420 x 304 | +6 |
| Item de galeria | 450 x 300 | 450 x 300 | **0** |
| Card de depoimento | 420 x 234 | 420 x 234 | **0** |
| Item de FAQ (aberto) | 700 x 137 | 700 x 135 | −2 |
| Imagem de Service Areas | 700 x 368 | 700 x 368 | **0** |
| Altura do documento | 7864 | 7800 | −64 (0,8%) |

Início das seções (deriva acumulada máxima de 68px em 7800px, < 1%):

| Seção | Ref | Impl |
|---|---|---|
| About | 835 | 835 |
| Services | 1423 | 1385 |
| Quote | 2460 | 2424 |
| Testimonials | 4956 | 4899 |
| FAQ | 5611 | 5543 |
| Service Areas | 6411 | 6352 |
| Footer | 7226 | 7158 |

### Mobile @390

| Elemento | Referência | Implementação | Δ |
|---|---|---|---|
| h1 | 40px / 48px | 40px / 48px | **0** |
| Caixa do h1 | 350 x 144 (3 linhas) | 350 x 144 | **0** |
| h2 | 30px / 36px | 30px / 36px | **0** |
| Imagem do hero | 350 x 398 | 350 x 398 | **0** |
| Imagem do About | 350 x 260 | 350 x 260 | **0** |
| Padding de seção | 50px | 50px | **0** |

### Correções aplicadas durante a validação

1. **Container**: o padding de 20px estava *dentro* do `max-width: 1300px`, o que empurrava todo o conteúdo para x=83 e estreitava cada coluna em 40px. Passou a `max-width: calc(1300px + 2 * 20px)`, devolvendo 1300px de conteúdo em x=63.
2. **Marquee com `100vw`**: `100vw` inclui a barra de rolagem e gerava 8px de scroll horizontal. Trocado por `width: 100%` (o marquee já é filho direto da seção full-width).
3. **`aspect-ratio` anulado pelos atributos do `<img>`**: `width`/`height` no HTML viram *presentational hints* de CSS; definindo apenas `width` em CSS, o `height` do atributo continuava valendo e a razão de aspecto era ignorada (imagem do hero saía 350x728 em vez de 350x398). Adicionado `height: auto` em todas as imagens que dependem de `aspect-ratio`.
4. **Gap do carrossel de depoimentos**: o marquee é irmão do container, então o `gap: 60px` do flex não o alcançava. Substituído por `margin-top`.
5. **`line-height` do h1 no mobile**: a referência abre de 1.1 (desktop) para 1.2 em 390px. Adicionado media query.
6. **Bloco de métrica do hero**: `line-height` do número reduzido para 1.05 para reproduzir os 62px de altura total medidos.

### Checagens funcionais

- Sem scroll horizontal em 1440 / 1280 / 1024 / 768 / 430 / 390.
- Accordion: primeiro item aberto por padrão, apenas um aberto por vez, `aria-expanded` correto.
- `next build` e `tsc --noEmit` sem erros.
