# 🚀 DEPLOY DO FRONTEND - PASSO A PASSO

## ✅ PREPARAÇÃO CONCLUÍDA!

✓ Build testado e funcionando
✓ Git inicializado
✓ Commit inicial criado
✓ Backend URL configurada

---

## 📋 OPÇÕES DE DEPLOY

### **OPÇÃO 1: GitHub + Vercel (RECOMENDADO - Mais Fácil)** 🌟

Esta é a opção mais simples e oferece CI/CD automático.

#### Passo 1: Criar repositório no GitHub

1. Acesse: **https://github.com/new**
2. Configure:
   - **Repository name:** `synesis-frontend`
   - **Description:** "Synesis MVP - Plataforma de Consultoria com IA"
   - **Visibility:** Private (recomendado)
   - **NÃO marque:** Initialize with README, .gitignore ou license
3. Clique em **"Create repository"**
4. **DEIXE A PÁGINA ABERTA** - você vai precisar da URL

#### Passo 2: Conectar e fazer push

Copie e cole estes comandos no terminal (substitua SEU_USUARIO pelo seu usuário do GitHub):

```bash
cd /home/ubuntu/orion_mvp_backend/nextjs_space

# Conectar ao repositório remoto
git remote add origin https://github.com/SEU_USUARIO/synesis-frontend.git

# Fazer push
git branch -M main
git push -u origin main
```

**Se pedir autenticação:**
- Username: seu usuário do GitHub
- Password: use um **Personal Access Token** (não a senha)
  - Criar token: https://github.com/settings/tokens/new
  - Selecione: `repo` (full control)
  - Copie o token e use como senha

#### Passo 3: Deploy no Vercel

1. Acesse: **https://vercel.com/signup** (ou /login se já tem conta)
2. **"Continue with GitHub"** (conectar com GitHub)
3. Após conectar, clique em **"Add New..."** → **"Project"**
4. Encontre e selecione: **`synesis-frontend`**
5. Clique em **"Import"**

6. **Configure o projeto:**

```
Framework Preset: Next.js (detectado automaticamente)
Root Directory: ./
Build Command: yarn build (detectado automaticamente)
Output Directory: .next (detectado automaticamente)
Install Command: yarn install (detectado automaticamente)
```

7. **IMPORTANTE - Environment Variables:**

Clique em "Environment Variables" e adicione:

```
Name: NEXT_PUBLIC_API_URL
Value: https://businesscopilot.abacusai.app
Environment: Production, Preview, Development (marcar todas)
```

8. Clique em **"Deploy"**

9. **Aguarde 2-3 minutos** ⏱️

10. ✅ **PRONTO!** Você receberá:
    - URL de produção (ex: `https://synesis-frontend.vercel.app`)
    - URL de preview (ex: `https://synesis-frontend-git-main-seuprojeto.vercel.app`)

---

### **OPÇÃO 2: Vercel CLI (Alternativa - Via Terminal)** 💻

Se preferir fazer tudo via linha de comando:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login
# Siga as instruções no navegador

# Deploy
cd /home/ubuntu/orion_mvp_backend/nextjs_space
vercel

# Responder aos prompts:
# ? Set up and deploy? → Yes
# ? Which scope? → Selecione sua conta
# ? Link to existing project? → No
# ? What's your project's name? → synesis-frontend
# ? In which directory is your code located? → ./

# Adicionar variável de ambiente
vercel env add NEXT_PUBLIC_API_URL
# Quando perguntar: https://businesscopilot.abacusai.app
# Environment: Production

# Deploy para produção
vercel --prod
```

---

## 🔗 APÓS O DEPLOY

### Você receberá uma URL como:
```
https://synesis-frontend-xyz.vercel.app
```

**ANOTE ESTA URL!** Você vai precisar dela para o próximo passo.

### Próximo Passo: Conectar Frontend ↔ Backend

Após obter a URL do Vercel, execute:

```bash
cd /home/ubuntu/orion_mvp_backend/nodejs_space

# Adicionar URL do frontend
echo "FRONTEND_URL=https://synesis-frontend-xyz.vercel.app" >> .env

# Verificar
cat .env | grep FRONTEND_URL
```

Depois, na interface do Abacus AI:
1. Salvar novo checkpoint
2. Clicar em "Deploy"

---

## ✅ CHECKLIST DE VALIDAÇÃO

Após o deploy, teste:

- [ ] Frontend carrega sem erros
- [ ] Página inicial mostra os 2 pacotes (CONSULTANT e PARTNER)
- [ ] Botão "Entrar" funciona
- [ ] Login/Registro funcionam
- [ ] Redirecionamento pós-login funciona
- [ ] Integração com backend funciona (sem erros no console)

---

## 🆓 CUSTOS

**Vercel Hobby (Gratuito):**
- ✅ Domínio .vercel.app incluído
- ✅ SSL automático (HTTPS)
- ✅ 100 GB bandwidth/mês
- ✅ Deploys ilimitados
- ✅ CI/CD automático
- ✅ Suficiente para MVP e primeiras vendas

**Quando precisar de mais:**
- Pro: $20/mês (1TB bandwidth, analytics, logs)

---

## 🎯 DOMÍNIO PERSONALIZADO (OPCIONAL)

Depois do deploy inicial funcionando, você pode adicionar seu próprio domínio:

1. Comprar domínio (ex: `app.synesis.com.br`)
2. No Vercel: Settings → Domains → Add
3. Configurar DNS conforme instruções
4. Aguardar propagação (1-2 horas)

---

## 🐛 TROUBLESHOOTING

### Build falha com "Module not found"
```bash
cd /home/ubuntu/orion_mvp_backend/nextjs_space
rm -rf node_modules .next
yarn install
yarn build  # Testar localmente
```

### Erro "Failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### Vercel não encontra o repositório
- Vá em: https://vercel.com/account/login-connections
- Re-conecte sua conta GitHub
- Dê permissão ao repositório específico

### Frontend carrega mas API não funciona
- Verificar se variável NEXT_PUBLIC_API_URL está configurada
- Verificar no console do navegador (F12) se há erros de CORS
- Confirmar que backend está acessível: https://businesscopilot.abacusai.app/health

---

## 📞 SUPORTE

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Docs:** https://docs.github.com

---

## 🎉 CONCLUSÃO

Após seguir este guia:

✅ Frontend estará no ar em URL pública
✅ SSL/HTTPS automático
✅ CI/CD configurado (próximos commits fazem deploy automático)
✅ Pronto para conectar com backend
✅ Pronto para testar fluxo completo
✅ Pronto para receber primeiros clientes!

**Tempo estimado:** 15-20 minutos

🚀 **Boa sorte com o deploy!**
