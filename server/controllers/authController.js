const User = require('../models/userModel')
const jwt  = require('jwt-simple')
const cfg  = require('../jwt')

/**
 * Checks a given email:password pair, if valid then generates a token.
 * @param {*} req Incoming request
 * @param {*} res Outcoming response
 */
const token = async (req, res) => {  
    try {
        if (req.body && req.body.email && req.body.password) {
            const { email }    = req.body;
            const { password } = req.body;

            const user    = await User.findOne({ email });
            const isMatch = await user.comparePassword(password);

            if (user && isMatch) {
                const payload = {
                    id: user.id
                };
                const token = jwt.encode(payload, cfg.jwtSecret);
                return res.json({ token });
            } else {
                return res.sendStatus(401);
            }
        } else {
            return res.sendStatus(401);
        }
    } catch(error) {
        return res.sendStatus(500);
    }
};

module.exports = {
    token
}