const mongoose = require(`mongoose`);

/*
** Cria e exporta um modelo de usuário
*/

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    admin: { type: Boolean, required: true },
});

const User = mongoose.model(`user`, userSchema);

module.exports = User;
