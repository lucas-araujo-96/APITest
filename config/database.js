require(`dotenv`).config();
const mongoose = require(`mongoose`);

/*
** Retorna uma Promise de conexão, a qual é feita por uma string de conexão armazenada na variável de
** ambiente CONNECTIONSTRING, ver módulo `dotenv`.
*/

module.exports = () => {
    return new Promise( async (resolve, reject) => {

        console.log(`Trying to connect...`);

        try {

            await mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
            console.log(`Database connected`);
            resolve();

        } catch(err) {

            console.log(`Database connection error`);
            reject(err);

        };

    });
};