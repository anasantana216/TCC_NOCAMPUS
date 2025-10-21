@echo off
echo.
echo ==========================================
echo    🚀 INICIANDO NOCAMPUS - DESENVOLVIMENTO
echo ==========================================
echo.

echo 📊 Verificando se as portas estão livres...
netstat -an | findstr :3001 >nul
if %errorlevel% equ 0 (
    echo ⚠️  Porta 3001 já está em uso - parando processo...
    for /f "tokens=5" %%i in ('netstat -ano ^| findstr :3001') do taskkill /F /PID %%i >nul 2>&1
)

netstat -an | findstr :5173 >nul
if %errorlevel% equ 0 (
    echo ⚠️  Porta 5173 já está em uso - parando processo...
    for /f "tokens=5" %%i in ('netstat -ano ^| findstr :5173') do taskkill /F /PID %%i >nul 2>&1
)

echo.
echo 🔧 Instalando dependências se necessário...
if not exist "node_modules" (
    echo Instalando dependências do frontend...
    npm install
)

if not exist "server\node_modules" (
    echo Instalando dependências do backend...
    cd server
    npm install
    cd ..
)

echo.
echo 🗄️  Verificando banco de dados...
cd server
if not exist "prisma\dev.db" (
    echo Criando banco de dados...
    npx prisma generate
    npx prisma migrate dev --name init
    node seed-new.js
) else (
    echo Banco de dados encontrado, verificando schema...
    npx prisma generate >nul 2>&1
)
cd ..

echo.
echo 🚀 Iniciando servidores...
echo 📡 Backend será iniciado na porta 3001
echo 🌐 Frontend será iniciado na porta 5173
echo.

start "NoCampus Backend" cmd /k "cd server && node index.js"
timeout /t 3 >nul
start "NoCampus Frontend" cmd /k "npm run dev"

echo.
echo ✅ Servidores iniciados!
echo 📱 Frontend: http://localhost:5173
echo 🔌 Backend: http://localhost:3001/api
echo.
echo Pressione qualquer tecla para abrir o navegador...
pause >nul

start http://localhost:5173

echo.
echo 🎯 Para parar os servidores, feche as janelas do terminal
echo    ou use Ctrl+C em cada uma delas
echo.
pause