var ingredientModel = require('../models/ingredientModel.js');

/**
 * ingredientController.js
 *
 * @description :: Server-side logic for managing ingredients.
 */
module.exports = {

    /**
     * ingredientController.list()
     */
    list: function (req, res) {
        ingredientModel.find(function (err, ingredients) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ingredient.',
                    error: err
                });
            }
            return res.json(ingredients);
        });
    },

    /**
     * ingredientController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ingredientModel.findOne({_id: id}, function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ingredient.',
                    error: err
                });
            }
            if (!ingredient) {
                return res.status(404).json({
                    message: 'No such ingredient'
                });
            }
            return res.json(ingredient);
        });
    },

    /**
     * ingredientController.create()
     */
    create: function (req, res) {
        var ingredient = new ingredientModel({
			name : req.body.name

        });

        ingredient.save(function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating ingredient',
                    error: err
                });
            }
            return res.status(201).json(ingredient);
        });
    },

    /**
     * ingredientController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ingredientModel.findOne({_id: id}, function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ingredient',
                    error: err
                });
            }
            if (!ingredient) {
                return res.status(404).json({
                    message: 'No such ingredient'
                });
            }

            ingredient.name = req.body.name ? req.body.name : ingredient.name;
			
            ingredient.save(function (err, ingredient) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating ingredient.',
                        error: err
                    });
                }

                return res.json(ingredient);
            });
        });
    },

    /**
     * ingredientController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ingredientModel.findByIdAndRemove(id, function (err, ingredient) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the ingredient.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
