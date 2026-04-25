# VeloxVid — Planos de Assinatura

## Estrutura geral
- **Não existe plano Free** — todos os planos são pagos
- **Todas as ferramentas incluídas em todos os planos** (sem restrição por tier)
- A diferença entre planos é apenas o ciclo de cobrança (mensal, trimestral, anual)
- Quanto maior o ciclo, maior o desconto

---

## Planos disponíveis

### Mensal
| Campo | Valor |
|-------|-------|
| Preço | R$ 299,00/mês |
| Cobrança | Mensalmente |
| Desconto | — |

### Trimestral
| Campo | Valor |
|-------|-------|
| Preço | R$ 279,00/mês |
| Cobrança | R$ 837,00 a cada 3 meses |
| Desconto | -7% em relação ao mensal |

### Anual ⭐ Melhor valor
| Campo | Valor |
|-------|-------|
| Preço | R$ 249,00/mês |
| Cobrança | R$ 2.988,00 anualmente |
| Desconto | -17% em relação ao mensal |

---

## O que está incluso em todos os planos

- Transcrição Inteligente — faster-whisper local
- Gerador de Roteiro VEO3
- Gerador de Vídeos VEO3 em massa
- Títulos, Descrição & Thumbnails via IA
- Converter .json — exportação de dados
- Modo Auto — pipeline completo
- Atualização automática do app
- Processamento 100% local (sem envio de dados)

---

## Para a landing page

Na seção de planos, mostrar os 3 cards lado a lado:
- Destacar o **Anual** com badge "Melhor valor"
- Mostrar o preço por mês em destaque grande
- Mostrar o valor total cobrado em texto menor abaixo
- Mostrar o percentual de desconto em badge verde (-7%, -17%)
- CTA único: "Assinar agora" → redireciona para o app (checkout via Stripe)
- Não há plano Free — mas o app pode ser baixado e testado sem assinatura até o login exigir plano ativo

---

## Como funcionam os links/botões de assinatura

**O checkout pode ser feito diretamente pelo site OU pelo app desktop.**

---

### Opção A — Checkout direto pelo site (recomendado para conversão)

O site chama a API do Railway para criar conta + sessão Stripe em uma única chamada.

**Endpoint:** `POST https://veloxvid-production.up.railway.app/checkout/register-and-subscribe`

**Body JSON:**
```json
{
  "name": "Nome do usuário",
  "email": "email@exemplo.com",
  "password": "senha123",
  "plano": "mensal"
}
```

**Valores aceitos para `plano`:** `"mensal"` | `"trimestral"` | `"anual"`

**Resposta de sucesso (200):**
```json
{
  "checkout_url": "https://checkout.stripe.com/pay/cs_live_..."
}
```

**O site deve:**
1. Exibir um formulário com nome, email, senha e plano selecionado
2. Fazer `POST` para o endpoint acima
3. Redirecionar o usuário para `checkout_url` (abre o Stripe Checkout)
4. Após o pagamento, o Stripe redireciona para a `success_url` configurada no backend

**Tratamento de erros:**
- `400` — email já cadastrado ou dados inválidos → mostrar mensagem de erro
- `500` — erro no servidor → "Tente novamente em instantes"

**CORS:** O backend Railway já permite requisições de `https://veloxvid.com` e `https://www.veloxvid.com`.

**Segurança:** Os `price_id` do Stripe ficam apenas no servidor (variáveis de ambiente Railway). O site só envia o nome do plano (`"mensal"` etc.), nunca um ID de preço. Não há risco de manipulação.

---

### Opção B — Checkout pelo app desktop

1. Usuário baixa o app
2. Dentro do app, acessa a aba **Planos**
3. O app chama `POST /checkout/create-session` com `{ plano: "mensal" | "trimestral" | "anual" }`
4. Abre o Stripe Checkout no navegador

---

### Links que o site precisa

| Botão | Destino |
|-------|---------|
| "Baixar app" | `https://github.com/wyllenlima/VeloxVid-releases/releases/latest` |
| Logo / Home | `https://veloxvid.com` |
| Contato | `contato@veloxvid.com` |
| API base URL | `https://veloxvid-production.up.railway.app` |
