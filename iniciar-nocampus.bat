@echo off
echo ========================================
echo        🎓 NOCAMPUS - AUTO START
echo     Instituto de Ensino Adventista
echo ========================================
echo.

echo [1/4] Verificando diretorio...
cd /d "C:\Users\ana_boer\Documents\TCC_NOCAMPUS"
if %errorlevel% neq 0 (
    echo ❌ ERRO: Diretorio nao encontrado!
    pause
    exit /b 1
)

echo ✅ Diretorio encontrado: %cd%
echo.

echo [2/4] Matando processos Node.js existentes...
taskkill /F /IM node.exe >nul 2>&1
echo ✅ Processos Node.js finalizados
echo.

echo [3/4] Aguardando limpeza...
timeout /t 3 /nobreak >nul
echo ✅ Sistema limpo
echo.

echo [4/4] Iniciando servidor de desenvolvimento...
echo.
echo 🚀 NOCAMPUS será iniciado em:
echo    ➜ Local: http://localhost:5173/
echo    ➜ Network: Disponivel na rede local
echo.
echo ⚠️  IMPORTANTE: Mantenha este terminal aberto!
echo 🔄 Para parar o servidor: Ctrl+C
echo.
echo Iniciando em 3 segundos...
timeout /t 3 /nobreak >nul

npm run dev

echo.
echo ========================================
echo Servidor foi finalizado.
echo Pressione qualquer tecla para sair...
pause >nul