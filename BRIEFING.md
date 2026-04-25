# VeloxVid — Design Brief · Landing Page

---

## 1. Produto

**VeloxVid** é um app desktop Windows para criadores de conteúdo que usam IA.
Diferencial absoluto: **processamento 100% local** — nenhum áudio ou vídeo é enviado para a nuvem.
Monetizado por assinatura mensal (plano Free + Pro).

**URL de download:** `https://github.com/wyllenlima/VeloxVid-releases/releases/latest`
**Versão atual:** `1.0.29`
**Plataforma:** Windows 10/11 · 64-bit exclusivamente

---

## 2. Público-alvo

| Perfil | Detalhe |
|--------|---------|
| YouTubers brasileiros | Escalam produção com IA, precisam de velocidade |
| Podcasters | Querem transcrição rápida e precisa sem pagar por minuto |
| Criadores de conteúdo | Usam ferramentas como VEO3, precisam de automação |
| Nível técnico | Médio — instalam software, não são devs |

**Dor principal:** ferramentas de IA na nuvem cobram por uso, são lentas e expõem conteúdo sigiloso.
**Desejo:** produzir mais, gastar menos, manter privacidade.

---

## 3. Direção estética — OBRIGATÓRIO SEGUIR

### Estilo geral
> **"Precision Dark"** — a estética de uma ferramenta profissional de alto desempenho.
> Pense em telemetria de Fórmula 1 misturada com a sofisticação de linear.app.
> Cada pixel tem propósito. Zero decoração gratuita.

### O que torna INESQUECÍVEL
O visitante deve sentir que está olhando para **uma ferramenta séria, rápida e confiável** —
não mais um app genérico de IA. A sensação é de **controle e velocidade**.

### Referências visuais (inspiração, não cópia)
- **linear.app** — dark minimalista, animações sutis, tipografia forte
- **vercel.com** — hierarquia tipográfica perfeita, espaço negativo generoso
- **raycast.com** — produto desktop, landing que vende experiência
- **screen.studio** — mockup de app como elemento central do hero

---

## 4. Identidade visual

### Paleta de cores
```
Fundo principal:   #0e1117   → quase preto, não puro preto
Fundo card:        #14171f   → levemente mais claro
Fundo card hover:  #1a1d27
Borda sutil:       rgba(255,255,255,0.07)
Borda média:       rgba(255,255,255,0.12)
Texto primário:    #ffffff
Texto secundário:  rgba(255,255,255,0.50)
Texto terciário:   rgba(255,255,255,0.28)
Azul elétrico:     #4A9EFF   → COR PRINCIPAL, use com parcimônia
Azul dim:          rgba(74,158,255,0.15)
Azul glow:         rgba(74,158,255,0.35)
Verde sucesso:     #4CAF50
Vermelho erro:     #FF5A5A
```

### Tipografia
| Função | Fonte | Peso | Observação |
|--------|-------|------|-----------|
| Títulos / Display | **Bricolage Grotesque** | 700–800 | `letter-spacing: -0.03em` · editorial, forte |
| Corpo / UI | **DM Sans** | 300–500 | `font-weight: 300` para parágrafos longos |
| Código / Badges / Mono | **JetBrains Mono** | 400–500 | timestamps, labels técnicas, versão |

> **Nunca usar:** Inter, Roboto, Arial, system-ui como fonte de títulos.

### Tom de voz
- Direto: "Crie mais." não "Aumente sua produtividade com soluções inovadoras"
- Confiante: afirmações, não perguntas
- Técnico quando necessário, humano no resto
- Português BR coloquial mas profissional

---

## 5. Animações e microinterações

- **Grain overlay sutil** (opacity 0.025) sobre o fundo — profundidade sem peso
- **Fade-up com IntersectionObserver** em todas as seções ao entrar na viewport
- **Hover em cards:** `translateY(-3px)` + border azul + glow `box-shadow`
- **Waveform animado** no hero — barras com `scaleY` alternado, delays escalonados
- **Pulse verde** no badge de status (indica "ativo/rodando")
- **Nav glassmorphism** ao scrollar: `backdrop-filter: blur(20px)`
- **FAQ accordion** com `max-height` transition suave
- **Botões CTA:** `translateY(-2px)` + `box-shadow` azul no hover
- Sem animações excessivas — cada movimento tem significado

---

## 6. Estrutura da página (9 seções)

### [1] NAV
- Logo: `Velox` branco + `Vid` azul (#4A9EFF)
- Links: Ferramentas · Como funciona · Planos · FAQ
- CTA: "Baixar grátis" (botão azul sólido)
- Fixo no topo, glassmorphism ao scroll

### [2] HERO
- **Headline:** "Crie mais. Envie zero para a nuvem."
- **Sub:** VeloxVid processa seus áudios e vídeos com IA diretamente no seu computador.
- **CTA primário:** "↓ Baixar Grátis"
- **CTA secundário:** "Ver planos →"
- **Badge animado:** `● WINDOWS · IA LOCAL · SEM ENVIO DE DADOS`
- **Visual direito:** mockup de janela do app estilo macOS/Windows com waveform animado e transcrição em tempo real
- **Nota:** `Windows 10/11 · 64-bit · v1.0.29`
- Radial gradient azul sutil atrás do mockup

### [3] TRUST BAR
- Barra fina entre hero e features
- 4 itens: `⚡ Processamento 100% local` · `∞ Sem limite de arquivos` · `🔄 Atualização automática` · `🎬 MP3 · WAV · MP4 · M4A`
- Separadores verticais sutis

### [4] FERRAMENTAS (Features)
- Label: `// ferramentas`
- Título: "Tudo que você precisa, em um só lugar"
- Grid 3 colunas com 5 cards (o 4º ocupa 2 colunas)
- Cada card: ícone emoji + título bold + descrição 2 linhas + tags monospace

| # | Nome | Ícone | Tags |
|---|------|-------|------|
| 1 | Transcrição Inteligente | 🎙 | faster-whisper · 100% offline · timestamps |
| 2 | Gerador de Roteiro VEO3 | ✍️ | Google VEO3 · prompts otimizados |
| 3 | Gerador de Vídeos VEO3 | 🎥 | batch processing · API VEO3 |
| 4 | Títulos, Descrição & Thumbnails | 📝 | LLM local · SEO YouTube · thumbnails · metadados |
| 5 | Conversor .JSON | ⚙️ | JSON · utilitário |

### [5] COMO FUNCIONA (Steps)
- Label: `// como funciona`
- Título: "Três passos. Conteúdo pronto."
- 3 steps com número circulado em azul
- Linha horizontal conectando os números
- 1. Instale o VeloxVid → 2. Importe áudio ou vídeo → 3. Deixe a IA trabalhar

### [6] PRIVACIDADE (IA Local)
- Card largo, fundo ligeiramente diferente
- Lado esquerdo: título + lista de 4 checks verdes
- Lado direito: comparativo visual VeloxVid (LOCAL, dots verdes) vs Ferramentas na nuvem (CLOUD, dots apagados)
- Mensagem central: **"Seus dados ficam no seu computador."**

### [7] PLANOS (Pricing)
- Label: `// planos`
- Título: "Comece de graça. Escale quando quiser."
- 2 cards lado a lado, max-width 760px centralizado
- **Free:** Grátis · Transcrição + Conversor JSON
- **Pro:** R$ — /mês · Badge "Mais popular" · Todas as ferramentas + Suporte prioritário
- CTA Free: "Baixar grátis" (outline) · CTA Pro: "Assinar agora" (azul sólido)

### [8] FAQ (Acordeão)
- 7 perguntas, abertura suave
1. O VeloxVid funciona sem internet?
2. Quais formatos de arquivo são suportados?
3. Precisa de GPU potente para rodar?
4. Como funciona a atualização automática?
5. Meus arquivos são enviados para algum servidor?
6. Em quais sistemas operacionais roda?
7. Posso cancelar a assinatura a qualquer momento?

### [9] CTA FINAL
- Fundo card com radial gradient azul central
- Título: "Comece agora. É grátis."
- CTA: "↓ Baixar VeloxVid Grátis" + "Ver plano Pro →"
- Nota: `Windows 10/11 · 64-bit · v1.0.29 · Atualização automática incluída`

### [10] FOOTER
- Logo + links (Termos · Privacidade · Contato · GitHub)
- `© 2026 VeloxVid · contato@veloxvid.com`
- Fonte mono pequena

---

## 7. Diferenciais para o copywriting

| Diferencial | Copy sugerido |
|-------------|---------------|
| IA local | "Seus áudios nunca saem do seu HD" |
| Sem limite | "Processa quantos arquivos quiser, sem contador" |
| Velocidade | "faster-whisper otimizado para CPU — rápido mesmo sem GPU" |
| Tudo em um | "Do áudio bruto ao título do YouTube em minutos" |
| Auto-update | "Sempre na versão mais recente, sem esforço" |

---

## 8. Assets disponíveis

- [x] Paleta de cores definida
- [x] Fontes definidas (Bricolage Grotesque + DM Sans + JetBrains Mono)
- [x] Copy das seções definido
- [x] Link de download: `https://github.com/wyllenlima/VeloxVid-releases/releases/latest`
- [x] Versão: `1.0.29`
- [ ] Logo SVG (usar texto estilizado por enquanto: `Velox` + `Vid` em azul)
- [ ] Screenshot real do app (usar mockup coded)
- [ ] Preço do plano Pro (usar `—` por enquanto)

---

## 9. Restrições técnicas

- HTML + CSS + JS vanilla (sem framework de build)
- Deploy via Cloudflare Workers (arquivo único `index.html`)
- Fontes via Google Fonts
- Sem dependências externas além das fontes
- Responsivo: mobile (360px+) · tablet (768px+) · desktop (1100px max-width)
- `<meta name="theme-color" content="#0e1117">` obrigatório
- Acessibilidade: contraste mínimo WCAG AA nos textos principais
