const userModel    = require('../models/userModel.js');
const checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: async (req, res) => {
        try {
            const users = await userModel.find();

            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(users, null, 4)) :
                   res.json({data:users, error: 0});

        } catch (error) {

            return res.status(500).json({
                code: 1000,
                error: error.message || error
            });

        }
    },

    /**
     * userController.show()
     */
    show: async (req, res) => {
        try {
            const { id } = req.params;

            if(!id || !checkForHexRegExp.test(id)) {
                throw Error(`${id} is not a valid MongoDB ID`)
            }

            const user = await userModel.findOne({_id: id});

            if (!user) {
                throw Error('No such user');
            }

            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(user, null, 4)) :
                   res.json({data:user, error: 0});

        } catch (error) {

            return res.status(500).json({
                code: 1001,
                error: error.message || error
            });

        }
    },

    /**
     * userController.create()
     */
    create: async (req, res) => {
        try {
            
            const user = new userModel({
                email    : req.body.email,
                fullname : req.body.fullname,
                password : req.body.password,
                restaurants: req.body.restaurants
            });

            await user.save();

            return res.status(201).json({data:user, error: 0});

        } catch (error) {

            return res.status(500).json({
                code: 1002,
                error: error.message || error
            });

        }
    },

    /**
     * userController.update()
     */
    update: async (req, res) => {
        try {
            const { id } = req.params;

            if(!id || !checkForHexRegExp.test(id)) {
                throw Error(`${id} is not a valid MongoDB ID`)
            }
            
            const user = await userModel.findOne({_id: id}); 

            if (!user) {
                throw Error('No such user');
            }

            user.phone = req.body.phone ? req.body.phone : user.phone;
            user.email  = req.body.email  ? req.body.email  : user.email;
            user.fullname  = req.body.fullname  ? req.body.fullname  : user.fullname;
            
            const updatedUser = await user.save();

            return res.json({data:updatedUser, error: 0});

        } catch (error) {

            return res.status(500).json({
                code: 1003,
                error: error.message || error
            });

        }
    },

    /**
     * userController.remove()
     */
    remove: async (req, res) => {
        try {
            const id = req.params.id;
            await userModel.findByIdAndRemove(id);

            return res.status(204).json();

        } catch(error) {

            return res.status(500).json({
                code: 1004,
                error: error.message || error
            });

        }
    }
};
