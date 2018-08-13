const User       = require('../models/userModel');
const Ingredient = require('../models/ingredientModel');
const Product    = require('../models/productModel');
const Order      = require('../models/orderModel');
const Restaurant = require('../models/restaurantModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.should();
chai.use(chaiHttp);

describe('Products', () => {
    before(async () => { //Before each test we empty the database
        const products = await chai.request(server).get('/products')
        if (!products.body.data.length) {
            const product = new Product({
                name: 'fooproduct',
                price: 10,
                ingredients: [new Ingredient({name: 'fooingredient'})]
            });

            await product.save();
        }
    });

    after(async () => {
        await Product.remove({})
    })

    let productId = '';

    describe('CRUD', () => {
        it('GET /products should GET all the products', async () => {
            const res = await chai.request(server).get('/products')
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(1);
            productId = res.body.data[0]._id;
        });

        it('POST /products should create new product', async () => {
            const res = await chai.request(server).post('/products').send({
                name: 'fooproduct2',
                price: 10,
                ingredients: [new Ingredient({name: 'fooingredient2'})]
            })
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('fooproduct2');
        });

        it(`GET /products/:id should GET the product with :id as _id`, async () => {
            const res = await chai.request(server).get(`/products/${productId}`)
            res.should.have.status(200);
            res.body.data.should.be.a('object');
        });

        it(`PUT /products/:id should PUT the product with :id`, async () => {
            const res = await chai
                .request(server)
                .put(`/products/${productId}`)
                .send({
                    name: 'changed'
                });

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('changed');
        });

        it(`DELETE /products/:id should DELETE the product with :id`, async () => {
            const res = await chai.request(server).delete(`/products/${productId}`);
            res.should.have.status(204);
        });
    });
    
});