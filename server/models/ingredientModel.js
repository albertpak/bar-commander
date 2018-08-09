const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//================================
// Ingredient Schema
//================================
const IngredientSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('Ingredient', IngredientSchema);