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

    describe('CRUD', () => {

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

        it('POST /ingredients should create new ingredient', async () => {
            const res = await chai.request(server).post('/ingredients').send({
                name: 'salt'
            })
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('salt');
        });

        it(`PUT /ingredients/:id should PUT the ingredient with :id`, async () => {
            const res = await chai
                .request(server)
                .put(`/ingredients/${ingredientId}`)
                .send({
                    name: 'changed'
                });

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('changed');
        });

        it(`DELETE /ingredients/:id should DELETE the ingredient with :id`, async () => {
            const res = await chai.request(server).delete(`/ingredients/${ingredientId}`);
            res.should.have.status(204);
        });
    });

});