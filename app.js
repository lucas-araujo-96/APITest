const express = require(`express`);
const passport = require(`passport`);
const jwtStrategy = require(`./config/passport`);
const databaseConfig = require(`./config/database`);

/*
** Primeiro, instancia-se o servidor e define-se algumas opções a serem utilizadas,
** dentre elas o passport, que deverá usar a estratégia definida (JWT)
*/

const app = express();
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
** Logo após, uma função async autoexecutada para somente iniciar o servidor após a conexão com o database
** ser estabelecida
*/

(async function startServer() {

    try {

        await databaseConfig();

        require(`./routes/routes`)(app);

        app.listen(8000, () => {
            console.log(`Server running`);
        });

    } catch(err) {

        console.log(`Server has failed to start: ${err}`);

    };

})();