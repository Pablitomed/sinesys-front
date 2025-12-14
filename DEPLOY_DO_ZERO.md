# 🚀 DEPLOY DO FRONTEND - PROCESSO COMPLETO DO ZERO

## ✅ PREPARAÇÃO CONCLUÍDA

Seu repositório Git está limpo e pronto para ser conectado a um novo repositório no GitHub.

---

## 📋 PROCESSO COMPLETO EM 5 PASSOS

### **PASSO 1: Excluir Repositório Antigo no GitHub (se existir)**

1. Acesse: https://github.com/
2. Faça login
3. Vá em **"Your repositories"**
4. Encontre o repositório `synesis-frontend` (ou o nome que usou)
5. Clique no repositório
6. Vá em **Settings** (última aba)
7. Role até o final da página
8. Na seção **"Danger Zone"**, clique em **"Delete this repository"**
9. Digite o nome do repositório para confirmar
10. Clique em **"I understand the consequences, delete this repository"**

---

### **PASSO 2: Criar Novo Repositório no GitHub**

1. Acesse: https://github.com/new
2. Configure:
   - **Repository name:** `synesis-frontend` (ou outro nome de sua preferência)
   - **Description:** "Synesis - Business Consulting Platform Frontend"
   - **Visibility:** ✅ **Private** (recomendado)
   - **❌ NÃO marque nenhuma opção:**
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
3. Clique em **"Create repository"**
4. **ANOTE a URL** que aparece (exemplo: `https://github.com/SEU_USUARIO/synesis-frontend.git`)

---

### **PASSO 3: Conectar e Fazer Push**

**IMPORTANTE:** Substitua `SEU_USUARIO` pelo seu usuário real do GitHub!

```bash
cd /home/ubuntu/orion_mvp_backend/nextjs_space

# Conectar ao novo repositório
git remote add origin https://github.com/SEU_USUARIO/synesis-frontend.git

# Renomear branch para main
git branch -M main

# Fazer push
git push -u origin main
```

#### **Se Pedir Autenticação:**

Você precisará de um **Personal Access Token**:

1. Crie em: https://github.com/settings/tokens/new
2. Configure:
   - **Note:** "Synesis Deploy Token"
   - **Expiration:** 90 days (ou mais)
   - **Select scopes:** ✅ Marque apenas **`repo`**
3. Clique em **"Generate token"**
4. **COPIE O TOKEN** (você não verá novamente!)

**Quando pedir credenciais:**
- **Username:** Seu usuário do GitHub
- **Password:** Cole o token gerado

---

### **PASSO 4: Deploy no Vercel**

#### **4.1 - Criar Conta/Login no Vercel**

1. Acesse: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Autorize o Vercel a acessar sua conta GitHub

#### **4.2 - Importar Projeto**

1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Clique em **"Import Git Repository"**
3. Procure por `synesis-frontend` na lista
4. Clique em **"Import"**

#### **4.3 - Configurar Projeto** ⚠️ **CRÍTICO!**

**Configure ANTES de fazer deploy:**

##### **A) Root Directory** (MUITO IMPORTANTE!):

**Se você fez push SÓ da pasta nextjs_space:**
- Deixe **vazio** ou configure como `./`

**Se você fez push do projeto INTEIRO (orion_mvp_backend):**
- Configure: `nextjs_space`

##### **B) Framework Preset:**
- Selecione: **Next.js**

##### **C) Build Settings:**
- **Build Command:** `yarn build` (já vem preenchido)
- **Output Directory:** `.next` (já vem preenchido)
- **Install Command:** `yarn install` (já vem preenchido)

##### **D) Environment Variables** ⚠️ **OBRIGATÓRIO!**

Clique em **"Add"** e adicione:

```
Name:  NEXT_PUBLIC_API_URL
Value: https://businesscopilot.abacusai.app
```

**Marque:** Production, Preview e Development

#### **4.4 - Deploy**

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos (acompanhe os logs)
3. Quando concluir, clique em **"Visit"** ou copie a URL gerada

---

### **PASSO 5: Testar o Deploy**

1. Acesse a URL gerada (ex: `synesis-frontend.vercel.app`)
2. Verifique:
   - ✅ Landing page carrega com design azul navy + dourado
   - ✅ Seção "Escolha seu Pacote" visível
   - ✅ Pacote CONSULTANT (R$ 549,00) aparece
   - ✅ Pacote PARTNER (R$ 1.890,00) aparece
   - ✅ Botão "Entrar" funciona
3. Abra o Console do navegador (F12 → Console)
   - ✅ Sem erros vermelhos
4. Teste o fluxo:
   - Clique em "Entrar"
   - Faça login com: `teste@synesis.com` / `Teste123!`
   - Verifique se redireciona para o dashboard

---

## 🔧 TROUBLESHOOTING

### **Erro 404 Após Deploy**

**Causa:** Root Directory configurado errado

**Solução:**
1. No Vercel, vá em **Settings** → **General**
2. Procure por **"Root Directory"**
3. Configure corretamente (veja Passo 4.3.A)
4. Clique em **"Save"**
5. Vá em **Deployments** → Último deploy → **"Redeploy"**

### **Erro de API / Variável de Ambiente**

**Causa:** `NEXT_PUBLIC_API_URL` não configurada

**Solução:**
1. No Vercel, vá em **Settings** → **Environment Variables**
2. Verifique se `NEXT_PUBLIC_API_URL` existe
3. Se não existir, adicione (veja Passo 4.3.D)
4. Vá em **Deployments** → Último deploy → **"Redeploy"**

### **Build Falhou**

**Solução:**
1. Veja os logs de build no Vercel
2. Procure por erros vermelhos
3. Verifique se:
   - Framework = Next.js
   - Node version ≥ 18
   - Build command = `yarn build`

### **Erro "Cannot find module"**

**Solução:**
1. Verifique se Install Command = `yarn install`
2. Faça redeploy

---

## ✅ CHECKLIST FINAL

Antes de considerar o deploy concluído:

- [ ] Repositório antigo excluído no GitHub
- [ ] Novo repositório criado no GitHub
- [ ] Push realizado com sucesso
- [ ] Projeto importado no Vercel
- [ ] Root Directory configurado corretamente
- [ ] Environment Variable `NEXT_PUBLIC_API_URL` adicionada
- [ ] Deploy concluído sem erros
- [ ] Landing page acessível e funcionando
- [ ] Login funciona
- [ ] Console sem erros

---

## 🎯 PRÓXIMOS PASSOS APÓS DEPLOY

Quando o frontend estiver funcionando:

1. **Me informe a URL do Vercel** (ex: `synesis-frontend.vercel.app`)
2. Vou adicionar `FRONTEND_URL` no backend
3. Fazer redeploy do backend no Abacus AI
4. Testar fluxo completo (Login → Pagamento → Análise → PDF)
5. 🎉 **LANÇAR!**

---

## 📞 PRECISA DE AJUDA?

Me envie:

1. Screenshot do erro (se houver)
2. URL do projeto no Vercel
3. Logs de build (se build falhou)
4. Console do navegador (F12 → Console)
5. Confirme qual passo está travado

---

## 🎓 DICAS IMPORTANTES

### **Para Push:**
- Se aparecer erro de autenticação, use Personal Access Token (não a senha)
- Token precisa ter permissão **`repo`**
- Token é usado no lugar da senha

### **Para Vercel:**
- **Root Directory** é a configuração mais importante
- Se errar, basta corrigir em Settings e fazer redeploy
- Environment Variables devem estar em **todos** os ambientes (Prod, Preview, Dev)
- Vercel faz deploy automático a cada push no GitHub

### **Para Debug:**
- Console do navegador (F12) mostra erros do frontend
- Vercel Logs (Functions tab) mostra erros do backend/build
- Network tab (F12) mostra requisições falhando

---

## 🔗 LINKS ÚTEIS

- **GitHub - Novo Repositório:** https://github.com/new
- **GitHub - Tokens:** https://github.com/settings/tokens/new
- **Vercel - Signup:** https://vercel.com/signup
- **Vercel - Dashboard:** https://vercel.com/dashboard
- **Backend API:** https://businesscopilot.abacusai.app
- **Backend Docs:** https://businesscopilot.abacusai.app/api-docs

---

## 🚀 COMANDOS RÁPIDOS

### Para fazer push:
```bash
cd /home/ubuntu/orion_mvp_backend/nextjs_space
git remote add origin https://github.com/SEU_USUARIO/synesis-frontend.git
git branch -M main
git push -u origin main
```

### Para verificar status:
```bash
cd /home/ubuntu/orion_mvp_backend/nextjs_space
git status
git remote -v
git log --oneline -5
```

---

**Boa sorte com o deploy! 🚀**

Me avise quando cada etapa estiver concluída para eu te ajudar com os próximos passos!
