const User = require(`../models/user`);
const bcrypt = require(`bcrypt`);

module.exports = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(`+password`);

    if (!user) return res.send(`User not found`);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.send(`Password invalid`);

    await User.findOneAndDelete({ email });

    res.send(`User deleted`);

}