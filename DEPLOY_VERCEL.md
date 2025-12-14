# 🚀 DEPLOY DO FRONTEND SYNESIS NO VERCEL

## Pré-requisitos
- Conta no GitHub (para conectar o repositório)
- Conta no Vercel (gratuita): https://vercel.com

## Passo a Passo

### 1. Preparar o projeto para deploy
O projeto já está pronto! Apenas certifique-se de que está tudo commitado.

### 2. Subir código para GitHub (se ainda não subiu)
```bash
cd /home/ubuntu/orion_mvp_backend/nextjs_space

# Inicializar Git (se necessário)
git init
git add .
git commit -m "Synesis MVP - Frontend completo"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/SEU_USUARIO/synesis-frontend.git
git branch -M main
git push -u origin main
```

### 3. Deploy no Vercel

**Opção A: Via Interface Web (Recomendado)**
1. Acesse: https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione seu repositório do GitHub
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (deixe vazio ou selecione nextjs_space se for o repo inteiro)
   - **Build Command:** `yarn build` (já detectado automaticamente)
   - **Output Directory:** `.next` (já detectado automaticamente)

5. **Environment Variables** (IMPORTANTE):
   ```
   NEXT_PUBLIC_API_URL=https://businesscopilot.abacusai.app
   ```

6. Clique em "Deploy"
7. Aguarde 2-3 minutos
8. Anote a URL gerada (ex: `https://synesis-frontend-abc123.vercel.app`)

**Opção B: Via CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /home/ubuntu/orion_mvp_backend/nextjs_space
vercel

# Seguir os prompts:
# - Set up and deploy? Yes
# - Which scope? (sua conta)
# - Link to existing project? No
# - Project name? synesis-frontend
# - Directory? ./
# - Override settings? No

# Adicionar variável de ambiente
vercel env add NEXT_PUBLIC_API_URL production
# Valor: https://businesscopilot.abacusai.app

# Deploy para produção
vercel --prod
```

### 4. Resultado
Você receberá uma URL como:
- **Preview:** `https://synesis-frontend-abc123.vercel.app`
- **Produção:** `https://synesis-frontend.vercel.app` (se configurou domínio customizado)

---

## Configuração de Domínio Próprio (Opcional)

### No Vercel:
1. Vá em Settings → Domains
2. Adicione seu domínio (ex: `app.synesis.com.br`)
3. Configure os DNS conforme instruções do Vercel

### Exemplos de DNS:
```
CNAME  app  cname.vercel-dns.com
```

---

## Atualizar URLs no Backend

Após obter a URL do Vercel, você precisará atualizar no backend:

1. Variável FRONTEND_URL no `.env`
2. Success URL do Stripe no código

**Ver ETAPA 3 abaixo para detalhes**

---

## Troubleshooting

### Build falha com "Module not found"
```bash
# Garantir que todas as dependências estão no package.json
cd /home/ubuntu/orion_mvp_backend/nextjs_space
yarn install
yarn build  # Testar build local
```

### Variáveis de ambiente não estão funcionando
- Certifique-se de que começam com `NEXT_PUBLIC_`
- Redeploy após adicionar: `vercel --prod`

### 404 em rotas
- Next.js usa file-based routing
- Verifique que todas as páginas estão em `/src/app/`

---

## Custos

**Vercel Free Tier (Hobby):**
- ✅ 100 GB bandwidth/mês
- ✅ Deploy ilimitados
- ✅ SSL automático
- ✅ CI/CD integrado
- ✅ Suficiente para MVP e primeiros clientes

**Quando escalar:**
- Pro ($20/mês): 1TB bandwidth, analytics, mais recursos
- Enterprise: Custom pricing

---

## Próximos Passos

Após deploy bem-sucedido:
1. ✅ Testar login no frontend deployed
2. ✅ Testar pagamento Stripe (modo teste)
3. ✅ Verificar se análise funciona end-to-end
4. ✅ Atualizar URLs no backend (ver ETAPA 3)
5. ✅ Configurar Stripe em modo produção
6. 🎉 Lançar!

