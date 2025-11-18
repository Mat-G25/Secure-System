#  Secure-System: Sistema de Autenticação Full Stack com RBAC

## I. Visão Geral e Propósito

Este projeto representa uma implementação **Full Stack** de um sistema de acesso e autorização, concebido para demonstrar proficiência na arquitetura de aplicações de nível industrial. O enfoque principal reside na correta aplicação da **Autenticação (JWT)** e do **Controle de Acesso Baseado em Papéis (RBAC)**, aspectos cruciais na segurança de sistemas distribuídos.

O objetivo é fornecer um sistema onde o acesso a *endpoints* sensíveis seja rigorosamente validado, assegurando que apenas usuários com o perfil de autorização (`admin`) adequado possam consumir recursos críticos.

***

## II. Arquitetura e Stack Tecnológica

O projeto adota uma arquitetura desacoplada, com separação clara entre *front-end* (apresentação) e *back-end* (lógica de negócios e persistência).

### A. Back-end (Node.js/Express)
O servidor foi construído priorizando a segurança e performance:

| Componente | Tecnologia | Função e Aplicação |
| :--- | :--- | :--- |
| **Ambiente** | Node.js / Express | Servidor de aplicação e API RESTful. |
| **Segurança JWT** | `jsonwebtoken` | Geração, assinatura e verificação de tokens de sessão. |
| **Criptografia** | `Bcrypt` | Utilizado para *hashing* irreversível das credenciais de usuário. |
| **Persistência** | PostgreSQL (Supabase) | Armazenamento transacional dos dados, incluindo a coluna `role` (cargo). |
| **Hardening** | `Helmet`, `express-rate-limit` | Implementação de cabeçalhos de segurança HTTP e limitação de requisições (Brute Force). |

### B. Front-end (React)
A interface foi desenvolvida para ser rápida e responsiva, focada na visualização clara do status de segurança:

| Componente | Tecnologia | Função e Aplicação |
| :--- | :--- | :--- |
| **Framework** | React / Vite | Construção da Single Page Application (SPA). |
| **Estilização** | Tailwind CSS | Framework utilitário para design e responsividade de nível profissional. |
| **Comunicação** | Axios | Cliente HTTP para integração eficiente e assíncrona com a API. |

***

## III. Implementação de Segurança e RBAC

A robustez do sistema é definida pela coesão entre os seguintes elementos:

### 1. Autenticação (JWT)
O processo de login valida o *hash* da senha e, em caso de sucesso, emite um token JWT que carrega o ID e o `role` (cargo) do usuário no *payload*. Este token é o único credencial utilizado para todas as requisições subsequentes, garantindo que o servidor permaneça *stateless*.

### 2. Autorização (Middleware RBAC)
Um *middleware* dedicado é inserido nas rotas críticas (e.g., `/auth/admin`). Este *middleware* decodifica e verifica a validade do JWT. Em seguida, ele avalia se o campo `role` contido no token corresponde à lista de papéis permitidos para aquela rota. Tentativas de acesso não autorizado resultam em uma resposta **HTTP 403 Forbidden**, demonstrando o isolamento eficaz do recurso.

### 3. Hashing de Credenciais (Bcrypt)
Todas as senhas são submetidas ao algoritmo Bcrypt com um fator de custo elevado antes da persistência no banco de dados, protegendo a integridade das credenciais contra vazamentos.

***

## IV. Roteiro de Execução (Setup Local)

Para clonar e executar o projeto, siga os passos abaixo:

### 1. Pré-requisitos
* Node.js (LTS recomendado)
* Gerenciador de pacotes npm
* Instância de PostgreSQL (utilizando Supabase, Neon ou localmente).

### 2. Clonagem e Instalação

# Clonar o repositório
git clone [https://github.com/Mat-G25/Secure-System.git](https://github.com/Mat-G25/Secure-System.git)
cd Secure-System

# Instalar dependências do Back-end (Raiz)
npm install

# Instalar dependências do Front-end
cd frontend
npm install
cd ..

### 3. Configuração do .env

Na raiz do projeto (Secure-System/), crie o arquivo .env e preencha com as credenciais obtidas na sua instância de PostgreSQL/Supabase:Snippet de código# Configurações do Banco de Dados
DATABASE_URL="postgresql://[USUARIO]:[SENHA]@[HOST]:[PORT]/[DATABASE]"

# Chave Secreta para Assinar Tokens JWT (Obrigatório)
JWT_SECRET=UMA_CHAVE_COMPLEXA_AQUI
PORT=3000

### 4. Inicialização

Mantenha dois terminais ativos simultaneamente:AplicaçãoTerminalComandoURL de AcessoBack-endTerminal 1 (Raiz)npm run devhttp://localhost:3000Front-endTerminal 2 (/frontend)npm run devhttp://localhost:51735. Demonstração e TestesAcesse a URL do Front-end (localhost:5173). Utilize a rota /register para criar um novo usuário (cargo padrão: user). Faça login. Clique em "Tentar acessar Área Admin": O sistema exibirá o alerta Vermelho (403 Forbidden), confirmando o sucesso do Middleware RBAC. Promova o usuário no SQL Editor do Supabase (UPDATE users SET role = 'admin' ...) e faça login novamente para confirmar o acesso autorizado (alerta Verde).

### 5. Demonstração e Testes

Acesse a URL do Front-end (localhost:5173). Utilize a rota /register para criar um novo usuário (cargo padrão: user). Faça login. Clique em "Tentar acessar Área Admin": O sistema exibirá o alerta Vermelho (403 Forbidden), confirmando o sucesso do Middleware RBAC. Promova o usuário no SQL Editor do Supabase (UPDATE users SET role = 'admin' ...) e faça login novamente para confirmar o acesso autorizado (alerta Verde).
