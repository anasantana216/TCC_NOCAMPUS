# Dockerfile para o backend
FROM node:18-slim

WORKDIR /app

# Copiar arquivos do projeto
COPY server/package*.json ./
COPY server/prisma ./prisma/
COPY server/src ./src/
COPY server/tsconfig.json ./

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Expor porta
EXPOSE 3001

# Comando para iniciar
CMD ["npm", "start"]
