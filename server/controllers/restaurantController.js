var RestaurantModel = require('../models/restaurantModel.js');

/**
 * RestaurantController.js
 *
 * @description :: Server-side logic for managing Restaurants.
 */
module.exports = {

    /**
     * RestaurantController.list()
     */
    list: async (req, res) => {
        try {
            const restaurants = await RestaurantModel.find();
            
            return res.json({data: restaurants, error: 0});

        } catch (error) {
            return res.status(500).json({
                code: 2000,
                error: error.message || error
            });
        }
    },

    /**
     * RestaurantController.show()
     */
    show: async (req, res) => {
        try {
            const { id } = req.params;

            const restaurant = await RestaurantModel.findOne({_id: id});
            
            if (!restaurant) {
                throw Error('No such Restaurant');
            }

            return res.json({data: restaurant, error: 0});

        } catch (error) {
            return res.status(500).json({
                code: 2001,
                error: error.message || error
            });
        }
    },

    /**
     * RestaurantController.create()
     */
    create: async (req, res) => {
        try {
            const restaurant = new RestaurantModel({
                name : req.body.name,
                address : req.body.address,
                orders : req.body.orders,
                menu : req.body.menu,
                owner : req.body.owner,
                waiters : req.body.waiters
            });
    
            await restaurant.save();

            return res.status(201).json({data: restaurant, error: 0});

        } catch (error) {
            return res.status(500).json({
                code: 2002,
                error: error.message || error
            });
        }
    },

    /**
     * RestaurantController.update()
     */
    update: async (req, res) => {
        try {
            const { id } = req.params;

            const restaurant = await RestaurantModel.findOne({_id: id});

            if (!restaurant) {
                throw Error('No such Restaurant');
            }

            restaurant.name = req.body.name ? req.body.name : restaurant.name;
            restaurant.address = req.body.address ? req.body.address : restaurant.address;
            restaurant.orders = req.body.orders ? req.body.orders : restaurant.orders;
            restaurant.menu = req.body.menu ? req.body.menu : restaurant.menu;
            restaurant.owner = req.body.owner ? req.body.owner : restaurant.owner;
            restaurant.waiters = req.body.waiters ? req.body.waiters : restaurant.waiters;
            
            await restaurant.save();

            return res.json({data: restaurant, error: 0});
            
        } catch (error) {
            return res.status(500).json({
                code: 2003,
                error: error.message || error
            });
        }
    },

    /**
     * RestaurantController.remove()
     */
    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await RestaurantModel.findByIdAndRemove(id);
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({
                code: 2004,
                error: error.message || error
            });
        }

    }
};
