# Script de Deploy NoCampus
# Executa o commit e push para GitHub + Deploy Vercel

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    DEPLOY NOCAMPUS - GITHUB + VERCEL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERRO: Git não está instalado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Git primeiro:" -ForegroundColor Yellow
    Write-Host "https://git-scm.com/download/windows" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pressione qualquer tecla para sair..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""
Write-Host "📋 RESUMO DAS ALTERAÇÕES HOJE:" -ForegroundColor Yellow
Write-Host "• AdminDashboard completo com 8 cards estatísticos" -ForegroundColor White
Write-Host "• Sistema de notificações com z-index corrigido" -ForegroundColor White
Write-Host "• Funcionalidades de exportação e monitoramento" -ForegroundColor White
Write-Host "• Portal de acesso profissional criado" -ForegroundColor White
Write-Host "• Correções de bugs visuais em todas as páginas" -ForegroundColor White
Write-Host ""

# Verificar status do repositório
Write-Host "🔍 Verificando status do repositório..." -ForegroundColor Blue
try {
    $status = git status --porcelain
    if ($status) {
        Write-Host "📝 Arquivos modificados detectados:" -ForegroundColor Green
        git status --short
    } else {
        Write-Host "✅ Nenhuma alteração pendente" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Erro ao verificar status do Git" -ForegroundColor Red
    exit 1
}

Write-Host ""
$confirm = Read-Host "Deseja continuar com o commit e push? (S/N)"

if ($confirm -eq 'S' -or $confirm -eq 's' -or $confirm -eq 'Y' -or $confirm -eq 'y') {
    
    Write-Host ""
    Write-Host "🚀 Iniciando processo de deploy..." -ForegroundColor Magenta
    
    # Adicionar todos os arquivos
    Write-Host "📁 Adicionando arquivos..." -ForegroundColor Blue
    git add .
    
    # Fazer commit
    Write-Host "💾 Fazendo commit..." -ForegroundColor Blue
    $commitMessage = "feat: AdminDashboard completo + correções z-index + portal acesso

- Implementado AdminDashboard com 8 cards estatísticos dinâmicos
- Adicionado sistema completo de notificações interativas
- Criado funcionalidades de exportação e monitoramento
- Corrigido z-index em todas as páginas (notificações, modais)
- Adicionado portal de acesso profissional (acesso-nocampus-v2.html)
- Otimizado scripts de inicialização do servidor (porta 3000)
- Mantida identidade visual e responsividade do projeto
- Implementadas 6+ funcionalidades administrativas principais"

    git commit -m $commitMessage
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Commit realizado com sucesso!" -ForegroundColor Green
        
        # Push para GitHub
        Write-Host "🌐 Enviando para GitHub..." -ForegroundColor Blue
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Push para GitHub realizado com sucesso!" -ForegroundColor Green
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Green
            Write-Host "    ✅ DEPLOY CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Green
            Write-Host ""
            Write-Host "📱 Próximos passos:" -ForegroundColor Yellow
            Write-Host "1. O Vercel irá fazer o deploy automático" -ForegroundColor White
            Write-Host "2. Aguarde 2-3 minutos para o site atualizar" -ForegroundColor White
            Write-Host "3. Acesse seu site no Vercel para verificar" -ForegroundColor White
            Write-Host ""
            Write-Host "🔗 Links úteis:" -ForegroundColor Yellow
            Write-Host "• GitHub: https://github.com/anasantana216/TCC_NOCAMPUS" -ForegroundColor Cyan
            Write-Host "• Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor Cyan
            Write-Host ""
        } else {
            Write-Host "❌ Erro no push para GitHub!" -ForegroundColor Red
            Write-Host "Verifique sua conexão e credenciais" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ Erro no commit!" -ForegroundColor Red
    }
    
} else {
    Write-Host ""
    Write-Host "❌ Deploy cancelado pelo usuário" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Pressione qualquer tecla para fechar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")