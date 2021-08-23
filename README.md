# APITest
 
>Exercício de Api REST
 
API com algumas rotas para praticar:

/register : Recebe "email", "password" e "isAdmin" e registra um usuário no BD;

/login : Recebe "email" e "password", valida o usuário no BD e retorna um JWT;

/protected : Rota protegida pelo passport-jwt, checa o token de autenticação e retorna o email do usuário;

/deleteUser : Recebe "email", "password" e o JWT, valida o usuário no BD e checa se o campo sub do token equivale ao usuário, caso tudo esteja positivo, deleta a conta do usuário do BD (em implementação);

Feito com express e mongoDB (Atlas), pretendo implementar uma rota de recuperação de senha e uma de alteração de dados ainda.

IMPORTANTE: A assinatura e validação do JWT é feita com um par de chaves, use "node keygen.js" na pasta ./modules para gerá-las antes de iniciar a API (app.js em ./) e "npm install" na pasta raíz para montar a pasta node_modules;

o arquivo .env foi omitido devido à presença de dados de login, basta criá-lo na raíz do projeto com a variável CONNECTIONSTRING=suaStringDeConexaoAqui.