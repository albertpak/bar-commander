const User = require('../models/userModel')
const jwt  = require('jwt-simple')
const cfg  = require('../jwt')

module.exports = {
    token: async function(req, res) {  
        if (req.body.email && req.body.password) {
            var email = req.body.email;
            var password = req.body.password;
            var user = await User.findOne({ email });
            const isMatch = await user.comparePassword(password);
            if (user && isMatch) {
                var payload = {
                    id: user.id
                };
                var token = jwt.encode(payload, cfg.jwtSecret);
                res.json({
                    token: token
                });
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }
}