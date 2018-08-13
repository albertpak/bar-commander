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
    list: function (req, res) {
        RestaurantModel.find(function (err, restaurants) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Restaurant.',
                    error: err
                });
            }
            return res.json({data: restaurants, error: 0});
        });
    },

    /**
     * RestaurantController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        RestaurantModel.findOne({_id: id}, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Restaurant.',
                    error: err
                });
            }
            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such Restaurant'
                });
            }
            return res.json({data: restaurant, error: 0});
        });
    },

    /**
     * RestaurantController.create()
     */
    create: function (req, res) {
        var Restaurant = new RestaurantModel({
			name : req.body.name,
			address : req.body.address,
			orders : req.body.orders,
			menu : req.body.menu,
			owner : req.body.owner,
			waiters : req.body.waiters

        });

        Restaurant.save(function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Restaurant',
                    error: err
                });
            }
            return res.status(201).json({data: restaurant, error: 0});
        });
    },

    /**
     * RestaurantController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        RestaurantModel.findOne({_id: id}, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Restaurant',
                    error: err
                });
            }
            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such Restaurant'
                });
            }

            restaurant.name = req.body.name ? req.body.name : restaurant.name;
			restaurant.address = req.body.address ? req.body.address : restaurant.address;
			restaurant.orders = req.body.orders ? req.body.orders : restaurant.orders;
			restaurant.menu = req.body.menu ? req.body.menu : restaurant.menu;
			restaurant.owner = req.body.owner ? req.body.owner : restaurant.owner;
			restaurant.waiters = req.body.waiters ? req.body.waiters : restaurant.waiters;
			
            restaurant.save(function (err, restaurant) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Restaurant.',
                        error: err
                    });
                }

                return res.json({data: restaurant, error: 0});
            });
        });
    },

    /**
     * RestaurantController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        RestaurantModel.findByIdAndRemove(id, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Restaurant.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
