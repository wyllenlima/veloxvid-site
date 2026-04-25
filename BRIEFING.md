# VeloxVid — Briefing Landing Page

## Contexto do projeto
App desktop **Windows** para criadores de conteúdo que usam IA no dia a dia.
O diferencial principal: **processamento de IA 100% local** — sem mandar áudio/vídeo para nuvem.
Monetizado por assinatura mensal.

---

## Identidade visual (obrigatório seguir)
| Item | Valor |
|------|-------|
| Nome | VeloxVid |
| Domínio | veloxvid.com |
| Tema | Dark (fundo escuro, quase preto) |
| Cor primária | `#4A9EFF` (azul elétrico) |
| Estilo | Minimalista, moderno, sem poluição visual |
| Fonte sugerida | Inter ou Geist (sem serifa, tech) |
| Tom de voz | Direto, confiante, focado em produtividade |

**Paleta base:**
```
Fundo principal:  #0e1117  (quase preto)
Fundo card:       #14171f
Borda sutil:      rgba(255,255,255,0.07)
Texto primário:   #ffffff
Texto secundário: rgba(255,255,255,0.5)
Destaque/CTA:     #4A9EFF
Sucesso:          #4CAF50
Erro:             #FF5A5A
```

---

## Público-alvo
- YouTubers e criadores de vídeo brasileiros
- Podcasters
- Criadores que usam IA para escalar produção de conteúdo
- Nível técnico: médio — sabem instalar software, mas não são devs

---

## Ferramentas do app (MVP v1.0)
Cada ferramenta vira um card/seção na landing:

1. **Transcrição Inteligente**
   - Converte áudio/vídeo em texto com IA local (faster-whisper)
   - Suporta MP3, WAV, MP4, M4A e mais
   - Divide em cenas com timestamps
   - 100% offline após instalação

2. **Gerador de Roteiro VEO3**
   - Gera prompts de vídeo a partir da transcrição
   - Formato otimizado para o Google VEO3

3. **Gerador de Vídeos VEO3**
   - Envia prompts em massa para a API VEO3
   - Automação do processo de geração

4. **Títulos, Descrição & Thumbnails**
   - Geração via LLM a partir do conteúdo transcrito
   - SEO otimizado para YouTube

5. **Conversor .JSON**
   - Utilitário para conversão de formatos

---

## Diferenciais para destacar na página
- **IA local** — seus áudios nunca saem do seu computador
- **Sem limite de uso** — processa quantos arquivos quiser
- **Rápido** — faster-whisper otimizado para CPU
- **Tudo em um lugar** — do áudio ao título do vídeo
- **Atualização automática** — sempre a versão mais recente

---

## Estrutura sugerida da landing page

### 1. Hero Section
- Headline impactante focada no benefício principal
- Sub-headline explicando o que é o produto
- CTA principal: **"Baixar Grátis"** (download do instalador)
- CTA secundário: **"Ver planos"**
- Visual: mockup/screenshot do app (dark UI com o azul #4A9EFF)
- Badge: "Windows · IA Local · Sem envio de dados"

### 2. Social proof / Trust bar
- "X criadores já usam", logos/ícones de formatos suportados
- Pequena barra com: "Processamento local · Sem assinatura pra começar · Atualização automática"

### 3. Ferramentas (Features)
- Grid de cards, um por ferramenta
- Ícone + título + descrição curta de 1-2 linhas
- Fundo escuro, borda sutil, hover com glow azul

### 4. Como funciona (Steps)
- 3 passos simples:
  1. Instale o VeloxVid (Windows)
  2. Importe seu áudio ou vídeo
  3. Deixe a IA fazer o trabalho

### 5. Destaque — IA Local
- Seção separada enfatizando privacidade
- "Seus dados ficam no seu computador"
- Comparativo visual: VeloxVid (local) vs ferramentas na nuvem

### 6. Planos / Preços
- Plano Free (funcionalidades básicas ou trial)
- Plano Pro (assinatura mensal — valor a definir)
- Cards simples, destaque no Pro com badge "Mais popular"
- Botão CTA: "Assinar agora" / "Começar grátis"

### 7. FAQ
- 5-7 perguntas frequentes em acordeão
- Exemplos: "Funciona sem internet?", "Quais formatos aceita?", "Como atualiza?"

### 8. CTA Final
- "Comece agora, é grátis"
- Botão de download grande
- Nota: "Disponível para Windows 10/11 · 64-bit"

### 9. Footer
- Links: Termos de uso, Privacidade, Contato
- Email de suporte
- Copyright VeloxVid 2026

---

## Stack sugerida para o site
**Opção A — Simples e rápido (recomendado):**
- Astro + TailwindCSS
- Deploy: Vercel ou Netlify
- Zero JavaScript no cliente, carregamento instantâneo

**Opção B — Mais interatividade:**
- Next.js 14 + TailwindCSS
- Deploy: Vercel

**Pasta local:** `C:\Automacao\veloxvid-site\`
**Repo GitHub:** criar `wyllenlima/veloxvid-site`

---

## Assets necessários (a providenciar)
- [ ] Logo VeloxVid (SVG ou PNG fundo transparente)
- [ ] Screenshot/mockup do app (print da tela principal)
- [ ] Ícone do app (`.ico` já existe em `installer/assets/icon.ico`)
- [ ] Preço da assinatura mensal (definir)
- [ ] Link de download do instalador (GitHub Releases: `wyllenlima/VeloxVid-releases`)

---

## Referências visuais de estilo
Sites com estilo próximo ao desejado:
- linear.app (dark, minimalista, animações sutis)
- vercel.com (tipografia forte, dark theme)
- raycast.com (produto desktop, landing bem feita)

---

## Observações importantes
- O app já tem auto-updater via GitHub Releases (`wyllenlima/VeloxVid-releases`)
- O botão de download deve apontar para o último release do GitHub
- A versão atual é `1.0.29` (verificar antes de publicar)
- Autenticação/licença via Supabase — não expor detalhes técnicos na landing
- O app roda **apenas no Windows** (64-bit) — deixar claro na página
