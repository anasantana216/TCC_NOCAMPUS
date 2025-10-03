# NoCampus UNASP - Sistema Multi-Usuário de Eventos e Enquetes

Uma plataforma web completa para gerenciar eventos e enquetes no Centro Universitário Adventista de Engenheiro Coelho - UNASP, com dashboards específicos para diferentes tipos de usuários.

## 🚀 Funcionalidades

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
