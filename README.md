# NoCampus - Sistema de Gestão de Eventos UNASP

## 📖 Visão Geral

O **NoCampus** é um sistema de gestão de eventos educacionais desenvolvido para o Centro Universitário Adventista de São Paulo (UNASP). O projeto tem como objetivo principal facilitar a criação de agendas para eventos escolares através de enquetes, melhorando a comunicação e organização de datas e horários.

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Autenticação**: NextAuth.js
- **Banco de Dados**: Prisma ORM
- **Qualidade de Código**: ESLint, Prettier, Husky
- **Versionamento**: Git & GitHub

## 👥 Equipe

- **Clara Gabrielly**
- **Ana Julia Boer**

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
├── components/             # Componentes React
│   ├── ui/                # Componentes de interface básicos
│   ├── forms/             # Formulários
│   └── layout/            # Componentes de layout
├── lib/                   # Utilitários e configurações
├── types/                 # Definições TypeScript
├── hooks/                 # Custom React hooks
├── services/              # Serviços de API
└── utils/                 # Funções utilitárias
```

## 🎯 Funcionalidades

### Para Alunos e Responsáveis:
- **Login Seguro**: Autenticação com email institucional (@eaportal.unasp.br)
- **Página Inicial**: Visualização de eventos e enquetes recentes
- **Próximos Eventos**: Busca e participação em enquetes por categoria

### Para Administradores:
- **Dashboard Administrativo**: Gestão completa de eventos
- **Criação de Enquetes**: Ferramenta completa para criar e editar enquetes
- **Análise de Respostas**: Visualização estatística das respostas
- **Agenda Completa**: Calendário administrativo com todos os eventos

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/anasantana216/TCC_NOCAMPUS.git
cd tcc-nocampus
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Execute o projeto:
```bash
npm run dev
```

5. Acesse: [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run format       # Formata código com Prettier
npm run type-check   # Verifica tipos TypeScript
```

## 🔒 Autenticação

O sistema utiliza autenticação baseada em email institucional:
- **Alunos**: `usuario@eaportal.unasp.br`
- **Administradores**: `usuario@adm.unasp.br`

## 🎨 Design System

O projeto segue o design definido no Figma, implementando:
- Paleta de cores institucional
- Componentes reutilizáveis
- Layout responsivo
- Acessibilidade

## 📊 Fases de Desenvolvimento

### ✅ Fase 1: Configuração e Setup
- [x] Configuração do ambiente Next.js + TypeScript
- [x] Setup do Tailwind CSS
- [x] Configuração de ferramentas de qualidade

### 🚧 Fase 2: Frontend Core
- [ ] Página de Login
- [ ] Dashboard do Aluno
- [ ] Dashboard do Administrador
- [ ] Sistema de enquetes

### 📋 Fase 3: Backend e Integração
- [ ] API de autenticação
- [ ] API de enquetes
- [ ] API de eventos
- [ ] Integração frontend/backend

### ✨ Fase 4: Qualidade e Deploy
- [ ] Testes automatizados
- [ ] CI/CD Pipeline
- [ ] Deploy em produção

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Repositório**: [https://github.com/anasantana216/TCC_NOCAMPUS](https://github.com/anasantana216/TCC_NOCAMPUS)
- **Figma**: [Design System](https://www.figma.com/design/lD8sRPxRjCZsTPeuCRUDIv/App-para-Enquetes-Unasp)

---

**NoCampus** - Transformando a gestão educacional do UNASP 🎓
