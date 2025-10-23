# 🚨 GUIA DE SOLUÇÃO - PROBLEMAS DE CONEXÃO LOCALHOST

## ❌ **PROBLEMA:** "localhost se recusou a se conectar"

### 🔍 **CAUSAS MAIS COMUNS:**

#### 1. **Servidor não está rodando**
- ✅ **Solução:** Execute `npm run dev` no terminal
- 🔧 **Script:** Use `diagnostico-servidor.ps1`

#### 2. **Conflito de processos Node.js**
- ❗ **Causa:** Múltiplas instâncias do servidor
- ✅ **Solução:** `taskkill /F /IM node.exe` + reiniciar servidor

#### 3. **Conflito de porta**
- ❗ **Causa:** Porta 5173 ocupada por outro processo
- ✅ **Solução:** `npx vite --port 3000` (porta alternativa)

#### 4. **Cache do navegador**
- ❗ **Causa:** Cache antigo interferindo
- ✅ **Solução:** Ctrl+F5 ou Ctrl+Shift+R

#### 5. **Firewall/Antivírus**
- ❗ **Causa:** Bloqueio de conexões locais
- ✅ **Solução:** Adicionar exceção para Node.js

#### 6. **Dependências corrompidas**
- ❗ **Causa:** node_modules com problemas
- ✅ **Solução:** `rm -rf node_modules` + `npm install`

---

## 🛠️ **SOLUÇÕES RÁPIDAS:**

### 🚀 **Método 1: Reiniciar Servidor (Mais Comum)**
```powershell
# 1. Matar processos Node
taskkill /F /IM node.exe

# 2. Aguardar 2 segundos
Start-Sleep 2

# 3. Reiniciar servidor
npm run dev
```

### 🔄 **Método 2: Porta Alternativa**
```powershell
# Se porta 5173 estiver problemática
npx vite --port 3000
# Acesse: http://localhost:3000
```

### 🧹 **Método 3: Limpeza Completa**
```powershell
# 1. Matar processos
taskkill /F /IM node.exe

# 2. Limpar dependências (se necessário)
Remove-Item node_modules -Recurse -Force
npm install

# 3. Reiniciar
npm run dev
```

---

## 🔍 **DIAGNÓSTICO AVANÇADO:**

### **Verificar processos:**
```powershell
Get-Process -Name "node" | Select-Object Id, ProcessName
```

### **Verificar portas ocupadas:**
```powershell
netstat -ano | findstr ":5173"
netstat -ano | findstr ":3000"
```

### **Testar conectividade:**
```powershell
curl http://localhost:5173
# ou
Invoke-WebRequest http://localhost:5173
```

---

## 🎯 **PREVENÇÃO:**

### **✅ Boas Práticas:**
1. **Sempre feche o servidor** com Ctrl+C antes de fechar o terminal
2. **Use um único terminal** para o servidor
3. **Não execute múltiplos `npm run dev`** simultaneamente
4. **Reinicie o VS Code** periodicamente para limpar processos

### **⚠️ Evite:**
- Fechar terminal sem parar servidor (Ctrl+C)
- Executar servidor em múltiplos terminais
- Trocar de porta constantemente
- Ignorar mensagens de erro do Vite

---

## 🆘 **SE NADA FUNCIONAR:**

### **Reset Completo:**
```powershell
# 1. Feche VS Code completamente
# 2. Execute no PowerShell como Admin:
taskkill /F /IM node.exe
taskkill /F /IM Code.exe

# 3. Aguarde 30 segundos
Start-Sleep 30

# 4. Reabra VS Code e tente novamente
cd "C:\Users\ana_boer\Documents\TCC_NOCAMPUS"
npm run dev
```

### **Verificação do Sistema:**
- ✅ Windows Defender não está bloqueando
- ✅ Porta não está sendo usada por outro app
- ✅ Node.js está instalado corretamente: `node --version`
- ✅ NPM está funcionando: `npm --version`

---

## 📞 **SCRIPTS DE AJUDA:**

1. **`diagnostico-servidor.ps1`** - Diagnóstico automático
2. **`start-server.bat`** - Inicialização simples
3. **`access-nocampus.html`** - Portal de acesso com verificações

**💡 Dica:** Execute `diagnostico-servidor.ps1` sempre que tiver problemas!