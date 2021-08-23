const bcrypt = require(`bcrypt`);
const User = require(`../models/user`);

/*
** Recebe os dados (email, senha e se é admin) no corpo da requisição (POST), encripta a senha com bcrypt
** e tenta inserir no BD, retorna uma mensagem confirmando ou não a criação de usuário e loga o erro,
** caso exista
*/

module.exports = async (req, res) => {

    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const admin = req.body.isAdmin;

    const emailExists = await User.findOne({email: email});
    if (emailExists) return res.send(`Email already in use`);

    try {

        await User.create({
            email: email,
            password: password,
            admin: admin,
        });

        return res.send(`User created`);

    } catch(err) {

        console.log(err);
        
        return res.send(`User NOT created`);

    }; 
    
};