require('../models/userModel');
const Ingredient = require('../models/ingredientModel');
require('../models/productModel');
require('../models/orderModel');
require('../models/restaurantModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.should();
chai.use(chaiHttp);

describe('Ingredients', () => {
    before(async () => { //Before each test we empty the database

        const ingredients = await chai.request(server).get('/ingredients')

        if(!ingredients.body.data.length) {
            const ingredient = new Ingredient({
                name: 'fooingredient'
            });
    
            await ingredient.save();
        }
    });

    after(async () => {
        await Ingredient.remove({})
    })

    describe('GET routes', () => {

        let ingredientId = '';

        it('GET /ingredients should GET all the ingredients', async () => {
            const res = await chai.request(server).get('/ingredients')
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(1);
            ingredientId = res.body.data[0]._id;
        });

        it(`GET /ingredients/:id should GET the ingredient with :id as _id`, async () => {    
            const res = await chai.request(server).get(`/ingredients/${ingredientId}`)
            res.should.have.status(200);
            res.body.data.should.be.a('object');
        });
    });

});