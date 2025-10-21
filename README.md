# NoCampus UNASP - Sistema Multi-Usuário de Eventos e Enquetes

Uma plataforma web completa para gerenciar eventos e enquetes no Centro Universitário Adventista de Engenheiro Coelho - UNASP, com dashboards específicos para diferentes tipos de usuários.

## 🚀 Início Rápido

### 📋 Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Git

### ⚡ Iniciar o Projeto (Método Automático)
```bash
# Clone o repositório
git clone https://github.com/anasantana216/TCC_NOCAMPUS.git
cd TCC_NOCAMPUS

# Execute o script automático
.\start-dev.ps1
```

### 🛑 Parar os Servidores
```bash
.\stop-dev.ps1
```

### 🔧 Instalação Manual (se necessário)

1. **Clone o repositório**
```bash
git clone https://github.com/anasantana216/TCC_NOCAMPUS.git
cd TCC_NOCAMPUS
```

2. **Instale as dependências do frontend**
```bash
npm install
```

3. **Instale as dependências do backend**
```bash
cd server
npm install
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma migrate dev
node seed-new.js
```

5. **Inicie os servidores**
```bash
# Terminal 1 - Backend (porta 3001)
cd server
node index.js

# Terminal 2 - Frontend (porta 5173)
npm run dev
```

### 🌐 Acessar o Sistema
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api

## 🎯 Funcionalidades

### 👨‍🎓 Para Estudantes
- ✅ Dashboard personalizado com calendário de eventos
- ✅ Visualizar e participar de enquetes ativas
- ✅ Estatísticas pessoais de participação
- ✅ Eventos próximos e datas importantes
- ✅ Ações rápidas para acessar funcionalidades

### 👨‍💼 Para Administradores
- ✅ Dashboard administrativo completo
- ✅ Criar e gerenciar eventos e enquetes
- ✅ Estatísticas gerais da plataforma
- ✅ Monitoramento de atividade recente
- ✅ Relatórios e configurações do sistema

### 👨‍👩‍👧‍👦 Para Responsáveis
- ✅ Portal do responsável com informações do estudante
- ✅ Acompanhamento de eventos relevantes
- ✅ Visualização de enquetes em andamento
- ✅ Central de comunicação com a universidade
- ✅ Avisos importantes e calendário acadêmico

## 🔐 Sistema de Autenticação
- ✅ Login multi-usuário (Estudante/Admin/Responsável)
- ✅ Sistema de logout funcional em todas as páginas
- ✅ Redirecionamento automático baseado no tipo de usuário
- ✅ Autenticação persistente com localStorage

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca de interface
- **Vite** - Build tool e dev server
- **React Router DOM** - Navegação SPA
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### 1. Instalar dependências do Frontend
```bash
npm install
```

### 2. Instalar dependências do Backend
```bash
cd server
npm install
```

### 3. Configurar o banco de dados
```bash
# No diretório server/
npm run db:generate
npm run db:push
```

## 🚀 Executando o Projeto

### 1. Iniciar o Backend
```bash
cd server
npm start
```
O servidor estará rodando em `http://localhost:3001`

### 2. Iniciar o Frontend (nova aba do terminal)
```bash
# Na raiz do projeto
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou próxima porta disponível)

## 👥 Uso da Aplicação

### Acesso ao Sistema
1. Acesse a aplicação no navegador
2. Na página inicial, clique em "Entrar"
3. Selecione o tipo de usuário (Aluno/Administrador/Responsável)
4. Faça login com qualquer email/senha (sistema de demonstração)
5. Será redirecionado para o dashboard específico do tipo de usuário

### 🎯 Dashboards por Tipo de Usuário

#### 👨‍🎓 Dashboard do Estudante (`/student/dashboard`)
- Calendário com eventos do mês
- Enquetes ativas para participação
- Estatísticas pessoais
- Eventos próximos
- Ações rápidas

#### 👨‍💼 Dashboard do Administrador (`/admin/dashboard`)
- Estatísticas gerais da plataforma
- Ações administrativas (criar eventos/enquetes)
- Monitoramento de atividade recente
- Gerenciamento de conteúdo

#### 👨‍👩‍👧‍👦 Dashboard do Responsável (`/guardian/dashboard`)
- Informações do estudante
- Acompanhamento de eventos
- Central de comunicação
- Avisos importantes

## 🎨 Design e Tema Visual

### Paleta de Cores UNASP
- **Azul Marinho** (`blue-900`): Cor principal da identidade
- **Laranja** (`orange-500`): Cor de destaque e ações
- **Amarelo** (`yellow-500`): Cor de apoio e alertas
- **Branco**: Backgrounds e contraste

### Características Visuais
- ✅ Design moderno com gradientes sutis
- ✅ Bordas arredondadas e sombras elegantes
- ✅ Layout responsivo para desktop e mobile
- ✅ Componentes reutilizáveis e consistentes
- ✅ Ícones intuitivos (Lucide React)
- ✅ Tipografia clara e hierarquia visual

## 🔧 Funcionalidades Técnicas

### Autenticação
- Hook `useAuth` para gerenciamento de estado
- Componente `LogoutButton` reutilizável
- Persistência de dados com localStorage
- Redirecionamento automático baseado no tipo de usuário

### Arquitetura
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Prisma + SQLite
- **APIs**: RESTful endpoints para eventos e enquetes
- **Estado**: React Hooks + Context API

## 📁 Estrutura do Projeto

```
TCC_NOCAMPUS-1/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Layout.jsx       # Layout principal
│   │   └── LogoutButton.jsx # Botão de logout
│   ├── pages/              # Páginas da aplicação
│   │   ├── HomePage.jsx     # Página inicial
│   │   ├── LoginPage.jsx    # Página de login
│   │   ├── StudentDashboard.jsx   # Dashboard do estudante
│   │   ├── AdminDashboard.jsx     # Dashboard do admin
│   │   ├── GuardianDashboard.jsx  # Dashboard do responsável
│   │   └── ...
│   ├── services/           # Serviços da API
│   └── hooks/              # Hooks customizados
├── server/                 # Backend Node.js
│   ├── prisma/            # Schema e migrações
│   ├── index.js           # Servidor principal
│   └── seed-new.js        # Dados iniciais
├── start-dev.ps1          # Script automático (PowerShell)
├── start-dev.bat          # Script automático (Batch)
└── stop-dev.ps1           # Script para parar servidores
```

## 🚨 Solução de Problemas

### ❌ Erro: "localhost se recusou a conectar"

**Problema**: Os servidores não estão rodando.

**Solução Rápida**:
```bash
.\start-dev.ps1
```

**Solução Manual**:
1. Verificar se Node.js está instalado: `node --version`
2. Verificar se as portas estão livres:
   ```bash
   netstat -an | findstr :3001  # Backend
   netstat -an | findstr :5173  # Frontend
   ```
3. Parar processos se necessário:
   ```bash
   .\stop-dev.ps1
   ```
4. Reinstalar dependências se necessário:
   ```bash
   rm -rf node_modules server/node_modules
   npm install
   cd server && npm install
   ```

### ❌ Erro: "Cannot find module"

**Problema**: Dependências não instaladas.

**Solução**:
```bash
npm install
cd server && npm install
```

### ❌ Erro: "Database connection failed"

**Problema**: Banco de dados não inicializado.

**Solução**:
```bash
cd server
npx prisma generate
npx prisma migrate dev
node seed-new.js
```

### ❌ Erro: "Port already in use"

**Problema**: Portas 3001 ou 5173 já estão sendo usadas.

**Solução**:
```bash
.\stop-dev.ps1
.\start-dev.ps1
```

### 🔧 Comandos Úteis

```bash
# Verificar status dos servidores
netstat -an | findstr ":3001 :5173"

# Logs do backend
cd server && node index.js

# Logs do frontend
npm run dev

# Rebuild completo
npm run build

# Reset completo do projeto
.\stop-dev.ps1
rm -rf node_modules server/node_modules server/prisma/dev.db
.\start-dev.ps1
```

## 📞 Suporte

Se os problemas persistirem:
1. Verifique se o Node.js 18+ está instalado
2. Execute `.\start-dev.ps1` como administrador
3. Verifique se as portas 3001 e 5173 não estão bloqueadas pelo firewall
4. Consulte os logs nos terminais abertos pelos scripts
│   │   └── AboutPage.jsx    # Sobre a universidade
│   ├── hooks/              # Custom hooks
│   │   └── useAuth.js      # Hook de autenticação
│   └── services/           # Serviços de API
│       └── api.js          # Cliente da API
├── server/                 # Backend Node.js
│   ├── prisma/            # Configuração do banco
│   │   └── schema.prisma  # Schema do banco
│   ├── index.js           # Servidor Express
│   └── seed.js            # Dados iniciais
└── public/                # Assets estáticos
    └── unasp-logo.svg     # Logo da universidade
```

## 🌐 Deploy e Produção

### Variáveis de Ambiente
```env
# Backend
DATABASE_URL="file:./dev.db"
PORT=3001

# Frontend
VITE_API_URL="http://localhost:3001/api"
```

### Deploy Sugerido
- **Frontend**: Vercel, Netlify ou GitHub Pages
- **Backend**: Heroku, Railway ou Digital Ocean
- **Banco**: PostgreSQL (produção) ou SQLite (desenvolvimento)

## 👨‍💻 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Centro Universitário Adventista de Engenheiro Coelho - UNASP**  
Desenvolvido para gerenciar eventos e enquetes da comunidade acadêmica.
- **Criar Enquetes**: Interface para criação de novas enquetes
- **Resultados**: Visualizar resultados das enquetes com gráficos

## 🔒 Autenticação e Segurança

- JWT tokens para sessões
- Senhas criptografadas com bcrypt
- Validação de email institucional
- **STUDENT**: Acesso às funcionalidades básicas
- **ADMIN**: Acesso total incluindo criação de conteúdo

---

**NoCampus UNASP** - Conectando a comunidade acadêmica através da tecnologia 🎓
