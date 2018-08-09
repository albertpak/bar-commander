const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = mongoose.model('Product').schema;
const OrderSchema = mongoose.model('Order').schema;

//================================
// Restaurant Schema
//================================
const RestaurantSchema = new Schema({
	name: {
		type: String,
		trime: true,
		required: true,
		unique: true,
	},
	address: {
		city: {
			type: String,
			trime: true,
			required: true
		},
		cap: {
			type: String,
			trime: true,
			required: true
		},
		street: {
			type: String,
			trime: true,
			required: true
		}
	},
	orders: [OrderSchema],
	menu: [ProductSchema],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	waiters: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);