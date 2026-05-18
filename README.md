# API de Autenticação

Esta é uma API RESTful de autenticação construída com Node.js, Express e SQLite

## Tecnologias Utilizadas
- Node.js & Express
- SQLite (better-sqlite3)
- Bcrypt 
- JSON Web Token

## Como rodar o projeto
1. Instale as dependências: `npm install`
2. Crie um arquivo `.env` na raiz do projeto e defina sua chave: `JWT_SECRET=chave`
3. Inicie o servidor: `npm run dev`

## Endpoints

### 1. Criar Usuário
- Rota: POST /registro
- Body:

```json
  {
    "nome": "Seu Nome",
    "email": "usuario@email.com",
    "senha": "123"
  }

```

### 2. Fazer login 

  - Rota: POST /login
  - Body:

```
{
  "email": "usuario@email.com",
  "senha": "123"
}
```
Retorno: Devolve um Token JWT em caso de sucesso.

### 3. Acessar Perfil (Rota Protegida)

Rota: GET /perfil
```
Headers: Authorization: Bearer <token>

```

Retorno: Devolve os dados do usuário logado se o token for válido.