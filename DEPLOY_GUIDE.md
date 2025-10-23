# 🚀 DEPLOY NOCAMPUS - GUIA COMPLETO

## ✅ **STATUS ATUAL**
- ✅ **Frontend:** Configurado para Vercel (React + Vite)
- ✅ **Backend:** Configurado para Render (Node.js + Prisma)
- ✅ **Banco de Dados:** PostgreSQL no Render
- ✅ **Git:** Atualizado no GitHub
- ✅ **Build:** Testado e funcionando

---

## 🌐 **FRONTEND - VERCEL**

### **📋 Configuração Automática:**
O projeto está configurado com `vercel.json` para deploy automático:

```json
{
  "buildCommand": "npm run build",
  "framework": "vite", 
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "https://nocampus-api.onrender.com/api"
  }
}
```

### **🚀 Deploy Steps:**
1. **Acesse:** https://vercel.com/dashboard
2. **Import Project:** Conecte com GitHub (`anasantana216/TCC_NOCAMPUS`)
3. **Configure:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     ```
     VITE_API_URL=https://nocampus-api.onrender.com/api
     ```
4. **Deploy:** Vercel fará deploy automático a cada push

### **🌍 URL Esperada:**
- **Produção:** https://tcc-nocampus.vercel.app
- **Branches:** https://tcc-nocampus-git-[branch].vercel.app

---

## 🖥️ **BACKEND - RENDER**

### **📋 Configuração Automática:**
O projeto está configurado com `render.yaml`:

```yaml
services:
  - type: web
    name: nocampus-api
    env: node
    buildCommand: cd server && npm install && npx prisma generate
    startCommand: cd server && npm start
```

### **🚀 Deploy Steps:**
1. **Acesse:** https://dashboard.render.com
2. **New Web Service:** Conecte com GitHub
3. **Configure:**
   - Name: `nocampus-api`
   - Environment: `Node`
   - Build Command: `cd server && npm install && npx prisma generate`
   - Start Command: `cd server && npm start`
   - Environment Variables:
     ```
     DATABASE_URL=[PostgreSQL Connection String]
     JWT_SECRET=[Auto-generated]
     NODE_ENV=production
     PORT=8080
     ```

### **🗄️ Banco de Dados:**
1. **Create PostgreSQL Database** no Render
2. **Copy Connection String**
3. **Add to Environment Variables**

### **🌍 URL Esperada:**
- **API:** https://nocampus-api.onrender.com
- **Health:** https://nocampus-api.onrender.com/api/health

---

## ⚙️ **ENVIRONMENT VARIABLES**

### **Frontend (Vercel):**
```bash
VITE_API_URL=https://nocampus-api.onrender.com/api
```

### **Backend (Render):**
```bash
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
PORT=8080
```

---

## 🔄 **DEPLOY AUTOMÁTICO**

### **🤖 CI/CD Configurado:**
- **Push para main** → Deploy automático no Vercel e Render
- **Pull Requests** → Deploy de preview no Vercel
- **Builds** → Testados automaticamente

### **📊 Status Monitoring:**
- **Vercel:** https://vercel.com/dashboard/deployments
- **Render:** https://dashboard.render.com/services

---

## 🧪 **TESTES DE PRODUÇÃO**

### **✅ Checklist Pós-Deploy:**

#### **Frontend:**
- [ ] Site carrega corretamente
- [ ] Navegação entre páginas funciona
- [ ] Theme toggle funciona
- [ ] Responsive design ok

#### **Backend:**
- [ ] API responde em `/api/health`
- [ ] Autenticação funciona
- [ ] CRUD operations funcionam
- [ ] Database migrations aplicadas

#### **Integração:**
- [ ] Frontend conecta com backend
- [ ] Login/logout funciona
- [ ] Dashboards carregam dados
- [ ] Sem erros CORS

---

## 📱 **URLs FINAIS**

### **🌐 Produção:**
- **Frontend:** https://tcc-nocampus.vercel.app
- **API:** https://nocampus-api.onrender.com/api
- **GitHub:** https://github.com/anasantana216/TCC_NOCAMPUS

### **🔧 Admin Panels:**
- **Vercel:** https://vercel.com/dashboard
- **Render:** https://dashboard.render.com
- **GitHub:** https://github.com/anasantana216/TCC_NOCAMPUS/settings

---

## 🆘 **TROUBLESHOOTING DEPLOY**

### **❌ Problemas Comuns:**

#### **Build Failures:**
```bash
# Testar localmente
npm run build

# Verificar logs no Vercel/Render
```

#### **Environment Variables:**
```bash
# Verificar se todas estão definidas
# Frontend: VITE_API_URL
# Backend: DATABASE_URL, JWT_SECRET
```

#### **CORS Issues:**
```javascript
// server/index.js deve ter:
app.use(cors({
  origin: ['https://tcc-nocampus.vercel.app', 'http://localhost:5173']
}));
```

#### **Database Connection:**
```bash
# Testar conexão Prisma
npx prisma studio
npx prisma migrate deploy
```

---

## 🎯 **COMANDOS ÚTEIS**

### **Local Development:**
```bash
# Frontend
npm run dev

# Backend
cd server && npm run dev

# Build teste
npm run build
```

### **Deploy Manual:**
```bash
# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push origin main

# Vercel CLI (opcional)
npx vercel --prod

# Render CLI (opcional)
render deploy
```

---

## 📋 **CHECKLIST FINAL**

### **✅ Pré-Deploy:**
- [x] Código commitado no GitHub
- [x] Build local funcionando
- [x] Environment variables configuradas
- [x] CORS configurado
- [x] Database migrations prontas

### **✅ Deploy Process:**
- [ ] Frontend deployado no Vercel
- [ ] Backend deployado no Render  
- [ ] Database configurado
- [ ] Environment variables aplicadas
- [ ] DNS/Domain configurado (opcional)

### **✅ Pós-Deploy:**
- [ ] Site funcionando em produção
- [ ] API respondendo corretamente
- [ ] Testes de usuário realizados
- [ ] Performance verificada
- [ ] Monitoramento ativo

---

**🎉 NOCAMPUS PRONTO PARA PRODUÇÃO!**

**🚀 Deploy automático configurado - Faça push e relaxe!**