# 🚀 NoCampus - Script de Desenvolvimento
# Este script inicia automaticamente os servidores frontend e backend

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   🚀 INICIANDO NOCAMPUS - DESENVOLVIMENTO" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Função para verificar se uma porta está em uso
function Test-Port {
    param([int]$Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $connection -ne $null
}

# Verificar e liberar portas se necessário
Write-Host "📊 Verificando portas..." -ForegroundColor Blue

if (Test-Port 3001) {
    Write-Host "⚠️  Porta 3001 já está em uso - parando processo..." -ForegroundColor Yellow
    Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -like "*3001*"} | Stop-Process -Force
}

if (Test-Port 5173) {
    Write-Host "⚠️  Porta 5173 já está em uso - parando processo..." -ForegroundColor Yellow
    Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {$_.MainWindowTitle -like "*5173*"} | Stop-Process -Force
}

# Verificar dependências
Write-Host ""
Write-Host "🔧 Verificando dependências..." -ForegroundColor Blue

if (!(Test-Path "node_modules")) {
    Write-Host "Instalando dependências do frontend..." -ForegroundColor Yellow
    npm install
}

if (!(Test-Path "server\node_modules")) {
    Write-Host "Instalando dependências do backend..." -ForegroundColor Yellow
    Set-Location server
    npm install
    Set-Location ..
}

# Verificar banco de dados
Write-Host ""
Write-Host "🗄️  Verificando banco de dados..." -ForegroundColor Blue
Set-Location server

if (!(Test-Path "prisma\dev.db")) {
    Write-Host "Criando banco de dados..." -ForegroundColor Yellow
    npx prisma generate
    npx prisma migrate dev --name init
    node seed-new.js
} else {
    Write-Host "Banco de dados encontrado ✅" -ForegroundColor Green
    npx prisma generate | Out-Null
}

Set-Location ..

# Iniciar servidores
Write-Host ""
Write-Host "🚀 Iniciando servidores..." -ForegroundColor Green
Write-Host "📡 Backend será iniciado na porta 3001" -ForegroundColor Cyan
Write-Host "🌐 Frontend será iniciado na porta 5173" -ForegroundColor Cyan
Write-Host ""

# Iniciar backend em nova janela
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; Write-Host '🔌 Backend NoCampus - Porta 3001' -ForegroundColor Green; node index.js"

# Aguardar um pouco para o backend iniciar
Start-Sleep -Seconds 3

# Iniciar frontend em nova janela
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🌐 Frontend NoCampus - Porta 5173' -ForegroundColor Blue; npm run dev"

# Aguardar um pouco para o frontend iniciar
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "✅ Servidores iniciados!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔌 Backend API: http://localhost:3001/api" -ForegroundColor Cyan
Write-Host ""

# Abrir navegador
Write-Host "🌐 Abrindo navegador..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "🎯 Para parar os servidores:" -ForegroundColor Yellow
Write-Host "   - Feche as janelas do PowerShell que abriram" -ForegroundColor White
Write-Host "   - Ou use Ctrl+C em cada uma delas" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Enter para finalizar este script..." -ForegroundColor Gray
Read-Host