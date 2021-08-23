const User = require(`../models/user`);
const bcrypt = require(`bcrypt`);
const jwt = require(`../modules/token`);

/*
** Recebe o email e senha no corpo da requisição (POST), busca o usuário por email e depois compara 
** a senha digitada com o hash do BD, caso algum destas requisições falhe, retorna um erro, caso ambas
** passem, retorna uma mensagem de confirmação e o JWT
*/

module.exports = async (req, res) => {

    const user = await User.findOne({ email: req.body.email }).select(`+password`);

    if (!user) return res.send(`User not found`);

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.send(`Password invalid`);

    const jwtoken = jwt(user);

    return res.send(`You are now logged, here is your token: <br/><br/> ${jwtoken}`);

};