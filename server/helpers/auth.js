const passport    = require("passport");  
const passportJWT = require("passport-jwt");  
const User        = require("../models/userModel");  
const cfg         = require("../jwt");  

const ExtractJwt = passportJWT.ExtractJwt;  
const Strategy   = passportJWT.Strategy;  

const params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {  
    var strategy = new Strategy(params, async (payload, done) => {
        const user = await User.findOne({_id: payload.id});
        if (user) {
            return done(null, {
                id: user.id
            });
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};