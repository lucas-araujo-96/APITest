const jwt = require(`jsonwebtoken`);
const fs = require(`fs`);
const path = require(`path`);

/*
** Recebe o objeto do usuário como argumento e gera um token encriptado com o id dele no payload,
** o arquivo PRIV_KEY.pem com a chave deve estar nesta pasta.
*/


module.exports = (user) => {

    const priv_key = fs.readFileSync(path.join(__dirname, `private.key`), `utf8`);

    const token = jwt.sign({ sub: user._id }, priv_key, { expiresIn: `1d`, algorithm: `RS256` });

    return token;

};