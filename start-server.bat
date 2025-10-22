@echo off
echo ========================================
echo      INICIANDO SERVIDOR NOCAMPUS
echo ========================================
echo.
echo Aguarde alguns segundos para o servidor carregar...
echo.
echo Tentando iniciar na porta 3000...
npx vite --port 3000
echo.
echo Se houver erro, tente:
echo - Fechar outros servidores Node.js
echo - Executar: npm install
echo - Reiniciar o terminal
echo.
echo Pressione qualquer tecla para fechar...
pause > nul