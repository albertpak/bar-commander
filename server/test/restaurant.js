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

describe('Restaurants', () => {
    before(async () => { //Before each test we empty the database
        const restaurants = await chai.request(server).get('/restaurants')
        if (!restaurants.body.data.length) {
            const fooUser = new User({
                fullname: 'owner',
                password: 'owner',
                email: 'owner@owner.com'
            });
            await fooUser.save();
            const restaurant = new Restaurant({
                name: 'foo-restaurant',
                address: {
                    city: 'foo',
                    cap: 'foo',
                    street: 'foo'
                },
                orders: [new Order({
                    tableNumber: 1
                })],
                menu: [new Product({
                    name: 'restaurant product'
                })],
                owner: fooUser._id,
                waiters: [fooUser._id]
            });

            await restaurant.save();
        }
    });

    after(async () => {
        await User.remove({})
        await Restaurant.remove({})
    })

    let restaurantId = '';

    describe('CRUD', () => {
        it('GET /restaurants should GET all the restaurants', async () => {
            const res = await chai.request(server).get('/restaurants')
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(1);
            restaurantId = res.body.data[0]._id;
        });

        it('POST /restaurants should create new restaurant', async () => {
            const fooUser = new User({
                fullname: 'owner2',
                password: 'owner2',
                email: 'owner2@owner.com'
            });
            await fooUser.save();
            const res = await chai.request(server).post('/restaurants').send({
                name: 'foo-restaurant2',
                address: {
                    city: 'foo2',
                    cap: 'foo2',
                    street: 'foo2'
                },
                orders: [new Order({
                    tableNumber: 1
                })],
                menu: [new Product({
                    name: 'restaurant product'
                })],
                owner: fooUser._id,
                waiters: [fooUser._id]
            })
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('foo-restaurant2');
        });

        it(`GET /restaurants/:id should GET the restaurant with :id as _id`, async () => {
            const res = await chai.request(server).get(`/restaurants/${restaurantId}`)
            res.should.have.status(200);
            res.body.data.should.be.a('object');
        });

        it(`PUT /restaurants/:id should PUT the restaurant with :id`, async () => {
            const res = await chai
                .request(server)
                .put(`/restaurants/${restaurantId}`)
                .send({
                    name: 'changed'
                });

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('name').eql('changed');
        });

        it(`DELETE /restaurants/:id should DELETE the restaurant with :id`, async () => {
            const res = await chai.request(server).delete(`/restaurants/${restaurantId}`);
            res.should.have.status(204);
        });
    });
    
});