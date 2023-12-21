![](https://imgur.com/quEYXza.png)

# Sistema para Frente de Caixa (PDV)

# Descrição

O PDV é um sistema de Frente de Caixa que permite aos usuários o fechamento de vendas em um negócio. Inicialmente, o sistema inclui funcionalidades de cadastro de usuário, login,  detalhamento de perfil do usuário, edição de perfil do usuário e listagem de categorias.


# Tecnologias utilizadas

- **Node.js:** Plataforma de execução de JavaScript no lado do servidor.
- **Express.js:** Framework web para Node.js.
- **PostgreSQL:** Banco de dados relacional para armazenamento de dados.
- **bcrypt:** Biblioteca para hash de senhas.
- **jwt:** Biblioteca para autenticação baseada em tokens JWT.
- **joi:** Biblioteca para validação de dados.
- **Knex:** Biblioteca query-builder para Node.js e interação com banco de dados relacionais.
- **dotenv:** Biblioteca para carregar variáveis de ambiente no projeto.
- **date-fns:** Biblioteca que fornece funções para manipulação, formatação e cálculos de datas.

## Estrutura de Pastas
- **bancodedados:** Para arquivos relacionados à criação das estruturas do banco de dados.
- **controladores:** Para os controladores que lidam com a lógica de negócios da aplicação.
- **intermediarios:** Para autentificação e validar corpo de requisições.
- **validacoes:** Para filtros e middlewares, como a verificação de token de usuário.
- **utils:** Para utilitários, como configurações de conexão com o banco de dados e chaves JWT.

## Funcionalidades

### Categorias
- **Listar categorias**: Lista todas as categorias previamente cadastradas no banco de dados.

### Usuários
- **Cadastrar usuário**: Permite que o usuário se cadastre no sistema, fornecendo nome, email e senha.
- **Efetuar login de usuário**: Permite que o usuário faça login no sistema, autenticando-se com email e senha. Um token JWT é gerado após um login bem-sucedido.
- **Detalhar perfil do usuário logado**: Permite que o usuário obtenha detalhes de seu perfil, como nome e email.
- **Editar perfil de usuário logado**: Permite que o usuário altere dados do seu perfil.

## Executando o Sistema
1. Clone este repositório.
2. Certifique-se de ter o Node.js e o PostgreSQL instalados em seu sistema.
3. Crie um banco de dados PostgreSQL chamado `pdv` e configure as credenciais do arquivo `conexao.js` que está dentro da pasta `bancodedados` que está dentro da pasta `src`.
4. Na raiz do projeto, execute `npm install` para instalar as dependências que estão listadas em `Tecnologias utilizadas` deste README.
5. Inicie o servidor.
6. O sistema estará disponível em `http://localhost:3000`.

Certifique-se de que você possui todas as dependências instaladas (incluindo às necessàrias para seu controle local) e o banco de dados configurado antes de iniciar o sistema.

## Considerações
Agora você tem um sistema de Frente de Caixa em execução!<div>
É importante se atentar de que o sistema está em fase inicial e conta com poucas funcionalidades. Você pode inicialmente, usar as rotas para controle de usuários.