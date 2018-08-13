var ProductModel = require('../models/productModel.js');

/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
module.exports = {

    /**
     * ProductController.list()
     */
    list: function (req, res) {
        ProductModel.find(function (err, products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            return res.json({data: products, error: 0});
        });
    },

    /**
     * ProductController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        ProductModel.findOne({_id: id}, function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }
            if (!product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }
            return res.json({data: product, error: 0});
        });
    },

    /**
     * ProductController.create()
     */
    create: function (req, res) {
        var Product = new ProductModel({
			name : req.body.name,
			price : req.body.price,
			ingredients : req.body.ingredients,
			category : req.body.category

        });

        Product.save(function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Product',
                    error: err
                });
            }
            return res.status(201).json({data: product, error: 0});
        });
    },

    /**
     * ProductController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        ProductModel.findOne({_id: id}, function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product',
                    error: err
                });
            }
            if (!product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            product.name = req.body.name ? req.body.name : product.name;
			product.price = req.body.price ? req.body.price : product.price;
			product.ingredients = req.body.ingredients ? req.body.ingredients : product.ingredients;
			product.category = req.body.category ? req.body.category : product.category;
			
            product.save(function (err, product) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Product.',
                        error: err
                    });
                }

                return res.json({data: product, error: 0});
            });
        });
    },

    /**
     * ProductController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        ProductModel.findByIdAndRemove(id, function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the product.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
