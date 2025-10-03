# NoCampus UNASP - Plataforma de Eventos e Enquetes

Uma plataforma web moderna para gerenciar eventos e enquetes no Centro Universitário Adventista de Engenheiro Coelho - UNASP.

## 🚀 Funcionalidades

### Para Estudantes
- ✅ Visualizar eventos do campus
- ✅ Participar de enquetes
- ✅ Dashboard personalizado
- ✅ Perfil de usuário

### Para Administradores
- ✅ Criar e gerenciar enquetes
- ✅ Visualizar resultados em tempo real
- ✅ Dashboard administrativo
- ✅ Estatísticas da plataforma

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
npm run dev
```
O servidor estará rodando em `http://localhost:3001`

### 2. Iniciar o Frontend (nova aba do terminal)
```bash
# Na raiz do projeto
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

## 👥 Uso da Aplicação

### Primeiro Acesso
1. Acesse `http://localhost:5173`
2. Clique em "Login" no canto superior direito
3. Clique em "Não tem uma conta? Criar conta"
4. Use um email válido:
   - Para estudante: `seu.nome@eaportal.unasp.org`
   - Para admin: `seu.nome@adm.unasp.br`

### Como Administrador
- **Dashboard Admin**: Painel de controle com estatísticas gerais
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
