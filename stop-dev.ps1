# 🛑 NoCampus - Script para Parar Servidores

Write-Host ""
Write-Host "🛑 PARANDO SERVIDORES NOCAMPUS..." -ForegroundColor Red
Write-Host ""

# Parar processos nas portas específicas
Write-Host "📊 Verificando processos nas portas 3001 e 5173..." -ForegroundColor Yellow

# Parar processos na porta 3001 (Backend)
$backend = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue
if ($backend) {
    $processId = $backend.OwningProcess
    Write-Host "🔌 Parando backend (PID: $processId)..." -ForegroundColor Yellow
    Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Backend parado!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Backend não estava rodando" -ForegroundColor Gray
}

# Parar processos na porta 5173 (Frontend)
$frontend = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($frontend) {
    $processId = $frontend.OwningProcess
    Write-Host "🌐 Parando frontend (PID: $processId)..." -ForegroundColor Yellow
    Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Frontend parado!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Frontend não estava rodando" -ForegroundColor Gray
}

# Parar todos os processos node relacionados ao projeto
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {
    $_.MainModule.FileName -like "*TCC_NOCAMPUS*" -or 
    $_.CommandLine -like "*vite*" -or 
    $_.CommandLine -like "*nocampus*"
}

if ($nodeProcesses) {
    Write-Host "🧹 Limpando processos Node.js relacionados..." -ForegroundColor Yellow
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Processos limpos!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎯 Todos os servidores foram parados!" -ForegroundColor Green
Write-Host "💡 Para reiniciar, execute: .\start-dev.ps1" -ForegroundColor Cyan
Write-Host ""

Read-Host "Pressione Enter para fechar"