const Strategy = require(`passport-jwt`).Strategy;
const ExtractJWT = require(`passport-jwt`).ExtractJwt;
const path = require(`path`);
const fs = require(`fs`);
const User = require(`../models/user`);

/*
** Configuração do passport, middleware de autenticação que fará validação do JWT e protegerá a rota interna,
** utilizando uma chave privada que deve estar na pasta API/modules
*/

const options = { //opções básica do token

    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),

    secretOrKey: fs.readFileSync(path.join(__dirname, `..`, `modules`, `public.key`), `utf8`),

};

const verifyCallback = async (tokenPayload, done) => { //callback que retorna positivo ou negativo para a validação

    User.findOne({ _id: tokenPayload.sub }).then((user) => {

        if(user) return done(null, user);
        else return done(null, false);

    });

};

const jwtStrategy = new Strategy(options, verifyCallback); //definição da estratégia

module.exports = jwtStrategy;