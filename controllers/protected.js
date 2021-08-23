const jwt = require(`jsonwebtoken`);
const User = require(`../models/user`);

module.exports = async (req, res) => {

    const token = req.headers.authorization.split(` `);

    const payload = jwt.decode(token[1]);

    User.findOne({ _id: payload.sub}).then((user) => {
        return res.send(`You succesfully reached this route, your email is ${user.email}`);
    });
    
};