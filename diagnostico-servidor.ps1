# 🔧 SCRIPT DE DIAGNÓSTICO E CORREÇÃO - SERVIDOR NOCAMPUS
# Use este script quando o localhost não conseguir se conectar

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    DIAGNÓSTICO SERVIDOR NOCAMPUS" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔍 Verificando processos Node.js..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "✅ Encontrados $($nodeProcesses.Count) processo(s) Node.js:" -ForegroundColor Green
    $nodeProcesses | ForEach-Object { Write-Host "   - PID: $($_.Id)" -ForegroundColor White }
} else {
    Write-Host "❌ Nenhum processo Node.js encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "🌐 Verificando portas 3000 e 5173..." -ForegroundColor Yellow
$portCheck = netstat -ano | findstr ":5173 :3000"
if ($portCheck) {
    Write-Host "⚠️  Portas em uso:" -ForegroundColor Orange
    Write-Host "$portCheck" -ForegroundColor White
} else {
    Write-Host "✅ Portas 3000 e 5173 estão livres" -ForegroundColor Green
}

Write-Host ""
Write-Host "🛠️  CORREÇÕES AUTOMÁTICAS:" -ForegroundColor Magenta

# Matar processos Node problemáticos
Write-Host "1. Finalizando processos Node.js..." -ForegroundColor Blue
try {
    taskkill /F /IM node.exe 2>$null
    Write-Host "✅ Processos Node finalizados" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Alguns processos podem ter ficado ativos" -ForegroundColor Orange
}

# Aguardar um momento
Start-Sleep -Seconds 2

# Verificar dependências
Write-Host ""
Write-Host "2. Verificando dependências..." -ForegroundColor Blue
if (Test-Path "package.json") {
    Write-Host "✅ package.json encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ package.json não encontrado! Verifique se está na pasta correta" -ForegroundColor Red
    exit 1
}

# Instalar dependências se necessário
Write-Host ""
Write-Host "3. Atualizando dependências..." -ForegroundColor Blue
npm install --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependências atualizadas" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao atualizar dependências" -ForegroundColor Red
}

Write-Host ""
Write-Host "🚀 INICIANDO SERVIDOR..." -ForegroundColor Magenta
Write-Host ""

# Tentar iniciar na porta padrão
Write-Host "Tentando iniciar na porta 5173..." -ForegroundColor Blue
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"

# Aguardar um pouco para o servidor inicializar
Start-Sleep -Seconds 3

# Verificar se está funcionando
Write-Host ""
Write-Host "🔍 Testando conexão..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ SERVIDOR FUNCIONANDO!" -ForegroundColor Green
    Write-Host "🌐 Acesse: http://localhost:5173" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Servidor não está respondendo" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔄 TENTATIVAS ALTERNATIVAS:" -ForegroundColor Yellow
    Write-Host "1. Tente manualmente: npm run dev" -ForegroundColor White
    Write-Host "2. Ou tente: npx vite --port 3000" -ForegroundColor White
    Write-Host "3. Verifique se há antivírus bloqueando" -ForegroundColor White
    Write-Host "4. Reinicie o VS Code se necessário" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "         DIAGNÓSTICO CONCLUÍDO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Manter janela aberta
Read-Host "Pressione Enter para fechar..."