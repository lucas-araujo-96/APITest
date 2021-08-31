const User = require(`../models/user`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

module.exports = async (req, res) => {

    //variáveis pegas da requisição e do BD
    const { email, password, newEmail, newPassword } = req.body;
    const currentUser = await User.findOne({ email }).select(`+password`);

    if(!currentUser) return res.send(`No such user found`); //validação do email digitado
    if(!await bcrypt.compare(password, currentUser.password)) return res.send(`Password does not match`); //validação da senha digitada
    if(await User.findOne({ email: newEmail })) return res.send(`E-mail already in use`); //checagem se o novo email não está em uso

    //Validação do token de autorização, cada usuário pode alterar somente os próprios dados
    const token = req.headers.authorization.split(` `);
    const payload = jwt.decode(token[1]);
    if(payload.sub.toString() != currentUser._id.toString()) return res.send(`You are not allowed to change this user's data`);
    
    //passadas as validações, inicia-se a atualização do currentUser e salva-se-o
    if(newEmail) currentUser.email = newEmail;
    if(newPassword) currentUser.password = await bcrypt.hash(newPassword, 10);

    await currentUser.save();

    return res.send(`User Updated`);
    
};