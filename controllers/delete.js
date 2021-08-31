const User = require(`../models/user`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

module.exports = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(`+password`);

    if (!user) return res.send(`User not found`);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.send(`Password invalid`);

    const token = req.headers.authorization.split(` `);
    const payload = jwt.decode(token[1]);
    if(payload.sub.toString() != user._id.toString()) return res.send(`You cannot delete this user`);

    await User.findOneAndDelete({ email });

    res.send(`User deleted`);

}