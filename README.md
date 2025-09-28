Sistema de Gerenciamento de Usuários
Este é um sistema fullstack para cadastro e listagem de usuários, desenvolvido como desafio técnico com .NET Core 8 no backend e Angular 19 no frontend.

📋 Funcionalidades
✅ Cadastro de usuários (nome, e-mail e senha obrigatórios)

✅ Listagem dos usuários cadastrados

✅ Autenticação JWT

✅ Proteção de rotas com Guards

✅ Interceptor para envio automático do token

✅ Validações no frontend e backend

✅ Arquitetura limpa com CQRS

🏗️ Arquitetura
Backend (.NET Core 8)
API RESTful com endpoints para users e auth

Entity Framework Core com MySQL

Arquitetura Limpa com separação de concerns

CQRS com MediatR

JWT Authentication

Hash de senhas com PBKDF2

Frontend (Angular 19)
Modularização por funcionalidade (UsersModule)

Reactive Forms e Template-driven Forms

Interceptor para envio automático do token

Guards para proteção de rotas

Componentes reutilizáveis

🚀 Como Executar
Pré-requisitos
.NET 8 SDK

Node.js 18+

MySQL 8.0+

Angular CLI 19+

Backend
Configurar banco de dados:

sql
CREATE DATABASE livraria;
Configurar connection string no appsettings.json:

json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=livraria;Uid=root;Pwd=sua_senha;"
  },
  "Jwt": {
    "Secret": "SUA_CHAVE_SECRETA_MUITO_SEGURA_AQUI_MINIMO_32_CHARACTERS",
    "Issuer": "livraria-api",
    "Audience": "livraria-app"
  }
}
Executar a aplicação:

bash
cd backend/src/Livraria.Api
dotnet restore
dotnet run
A API estará disponível em:

https://localhost:7136

http://localhost:5005

Swagger UI: https://localhost:7136/swagger

Frontend
Instalar dependências:

bash
cd frontend
npm install
Configurar environment em src/environments/environment.ts:

typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7136'
};
Executar a aplicação:

bash
ng serve
O frontend estará disponível em: http://localhost:4200

🐳 Docker (Opcional)
Executar com Docker Compose
bash
docker-compose up -d
Dockerfile do Frontend
dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
📁 Estrutura do Projeto

LivrariaTest/
├── backend/
│   ├── src/
│   │   ├── Livraria.Api/          # API Layer
│   │   ├── Livraria.Application/  # Application Layer (CQRS)
│   │   ├── Livraria.Domain/       # Domain Layer
│   │   └── Livraria.Infrastructure/ # Infrastructure Layer
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── users/             # Users Module
│   │   │   ├── services/          # Auth e Users Services
│   │   │   ├── guards/            # Auth Guard
│   │   │   └── interceptors/      # Auth Interceptor
│   │   └── environments/
│   └── angular.json
└── README.md

🔧 Endpoints da API
Autenticação
POST /auth/login - Autentica usuário e retorna JWT

Usuários
POST /users - Cadastra novo usuário

GET /users - Lista todos os usuários (requer autenticação)

🧪 Testes
Executar testes do Frontend
bash
cd frontend
ng test
Executar testes do Backend
bash
cd backend
dotnet test
🔒 Segurança
JWT Authentication com tempo de expiração

Hash de senhas com salt usando PBKDF2

CORS configurado para o frontend

Validações tanto no client quanto no server

Guards protegendo rotas no frontend

📦 Tecnologias Utilizadas
Backend
.NET Core 8

Entity Framework Core

MySQL

JWT Bearer Authentication

MediatR (CQRS)

Swagger/OpenAPI

Frontend
Angular 19

Angular Material

RxJS

TypeScript

SCSS

👤 Fluxo de Uso
Acesse http://localhost:4200

Faça login com usuário existente

Visualize a lista de usuários

Cadastre novos usuários através do botão "Cadastrar Novo Usuário"

📝 Notas de Desenvolvimento
O projeto segue os princípios de Clean Architecture

CQRS implementado com MediatR

Modularização Angular por funcionalidade

Interceptores para concerns transversais

Guards para controle de acesso

🎯 Critérios Atendidos
Backend
API .NET Core com endpoints POST /users e GET /users

Entity Framework Core com MySQL

Arquitetura Limpa com CQRS

Autenticação JWT

Validações e tratamento de erros

Frontend
Telas de cadastro e listagem de usuários

Modularização por funcionalidade (UsersModule)

Interceptor para envio do token

Guard para proteção de rotas

Teste automatizado (UserListComponent)

Deploy
Dockerfile funcional

README com instruções completas

Desenvolvido como desafio técnico - Renan Oliveira Alves
