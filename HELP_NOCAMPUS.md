# 🚨 NOCAMPUS - SOLUÇÃO RÁPIDA DE PROBLEMAS

## ⚡ **ACESSO RÁPIDO**

### 🔥 **MÉTODO MAIS RÁPIDO:**
1. **Duplo-clique** em `iniciar-nocampus.bat`
2. **Aguarde** o servidor iniciar
3. **Abra** `access-nocampus.html` no navegador

### 🌐 **ACESSO DIRETO:**
- **Principal:** http://localhost:5173
- **Alternativo:** http://localhost:3000

---

## 🛠️ **PROBLEMAS COMUNS E SOLUÇÕES**

### ❌ **"localhost se recusou a se conectar"**

#### 🚀 **Solução Rápida (90% dos casos):**
```batch
# Execute no PowerShell ou CMD:
taskkill /F /IM node.exe
cd "C:\Users\ana_boer\Documents\TCC_NOCAMPUS"
npm run dev
```

#### 📋 **Passo a passo:**
1. **Abra PowerShell** como Administrador
2. **Execute:** `taskkill /F /IM node.exe`
3. **Navegue:** `cd "C:\Users\ana_boer\Documents\TCC_NOCAMPUS"`
4. **Inicie:** `npm run dev`
5. **Aguarde:** Mensagem "Local: http://localhost:5173/"
6. **Acesse:** http://localhost:5173

---

### 🔄 **Conflito de Porta**

Se a porta 5173 estiver ocupada:
```bash
npx vite --port 3000
```
Depois acesse: http://localhost:3000

---

### 🧹 **Limpeza Completa**

Se nada funcionar:
```bash
# 1. Parar todos os processos
taskkill /F /IM node.exe
taskkill /F /IM Code.exe

# 2. Aguardar
timeout /t 5

# 3. Reinstalar dependências (se necessário)
cd "C:\Users\ana_boer\Documents\TCC_NOCAMPUS"
rmdir /s /q node_modules
npm install

# 4. Reiniciar
npm run dev
```

---

## 📁 **ARQUIVOS DE AJUDA**

| Arquivo | Descrição |
|---------|-----------|
| `iniciar-nocampus.bat` | 🚀 Inicia servidor automaticamente |
| `access-nocampus.html` | 🌐 Portal de acesso com verificações |
| `diagnostico-servidor.ps1` | 🔧 Diagnóstico completo automático |
| `SOLUCOES_LOCALHOST.md` | 📋 Guia detalhado de soluções |

---

## ⚡ **COMANDOS ESSENCIAIS**

### **Iniciar Servidor:**
```bash
npm run dev
```

### **Parar Servidor:**
- **Terminal:** `Ctrl + C`
- **Forçar:** `taskkill /F /IM node.exe`

### **Verificar Processos:**
```bash
Get-Process -Name "node"
```

### **Verificar Portas:**
```bash
netstat -ano | findstr ":5173"
```

---

## 🎯 **PREVENÇÃO**

### ✅ **Faça Sempre:**
- Use `Ctrl+C` para parar o servidor
- Feche VS Code adequadamente
- Mantenha apenas um terminal ativo

### ❌ **Evite:**
- Fechar terminal sem parar servidor
- Múltiplos `npm run dev` simultâneos
- Trocar de porta constantemente

---

## 🆘 **HELP DESK RÁPIDO**

### **🔴 EMERGÊNCIA - NADA FUNCIONA:**
1. **Execute:** `iniciar-nocampus.bat`
2. **Se falhar:** Execute `diagnostico-servidor.ps1`
3. **Última opção:** Reinicie o computador

### **📞 SUPORTE:**
- **Logs:** Verifique mensagens no terminal
- **Documentação:** `SOLUCOES_LOCALHOST.md`
- **Portal:** `access-nocampus.html`

---

## 🏆 **DICAS DE PRODUTIVIDADE**

### **🔥 Setup Ideal:**
1. **Sempre use** `iniciar-nocampus.bat` para começar
2. **Mantenha** `access-nocampus.html` como favorito
3. **Execute** `diagnostico-servidor.ps1` mensalmente
4. **Documente** novos problemas encontrados

### **📱 Acesso Mobile:**
- Servidor disponível na rede local
- Use IP da máquina: `http://192.168.X.X:5173`
- Verifique firewall do Windows

---

**💡 Lembre-se: 95% dos problemas são resolvidos reiniciando o servidor!**