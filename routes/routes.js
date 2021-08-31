const router = require(`express`).Router();
const register = require(`../controllers/register`);
const login = require(`../controllers/login`);
const deleteUser = require(`../controllers/delete`);
const protected = require(`../controllers/protected`);
const update = require(`../controllers/update`);
const passport = require(`passport`);
const jwt = require(`jsonwebtoken`);

/*
** Rotas de registro e login são liberadas, a de registro exige os dados de cadastro e os insere no mongoDB
** utilizando o modelo importado acima e a de login valida os dados recebidos e retorna um JWT de autenticação.
** A rota "protected" é protegida pela middleware do passport e exige um JWT válido, caso contrário retorna um
** status 401
*/

router.post(`/register`, register);

router.post(`/login`, login);

router.delete(`/deleteUser`, passport.authenticate(`jwt`, {session: false}), deleteUser);

router.get(`/protected`, passport.authenticate('jwt', {session: false}), protected);

router.put(`/update`, passport.authenticate('jwt', {session: false}), update);

/*
** Exporta uma função que recebe a instância de servidor como argumento e o configura para usar o roteador
*/

module.exports = (app) => {

    return app.use(router);

};