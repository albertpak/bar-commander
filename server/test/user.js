const User = require('../models/userModel');
require('../models/ingredientModel');
require('../models/productModel');
require('../models/orderModel');
require('../models/restaurantModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.should();
chai.use(chaiHttp);

describe('Users', () => {
    before(async () => { //Before each test we empty the database

        const users = await chai.request(server).get('/users')

        if (!users.body.data.length) {
            const user = new User({
                email: 'testinguser',
                fullname: 'testinguser',
                password: 'testinguser'
            });

            await user.save();
        }
    });

    after(async () => {
        await User.remove({})
    })

    let userId = '';
    let token = '';

    describe('Auth routes', () => {
        it('POST /token should retrieve a token', async () => {
            const res = await chai.request(server).post('/auth/token').send({
                email: 'testinguser',
                password: 'testinguser'
            })
            res.body.token.should.be.a('string');
            res.body.token.length.should.be.eql(125)
            token = res.body.token;
        });

        it('POST /token using wrong password should not retrieve a token', async () => {
            const res = await chai.request(server).post('/auth/token').send({
                email: 'testinguser',
                password: 'wrongpassword'
            })
            res.should.have.status(401);
        });
    })

    describe('CRUD', () => {
        it('GET /users should GET all the users', async () => {
            const res = await chai.request(server).get('/users')
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(1);
            userId = res.body.data[0]._id;
        });

        it('POST /users should create new user', async () => {
            const res = await chai.request(server).post('/users').send({
                email: 'testinguser2',
                fullname: 'testinguser2',
                password: 'testinguser2'
            })
            .set('Authorization', `Bearer ${token}`)
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.data.should.have.property('fullname').eql('testinguser2');
        });

        it(`GET /users/:id should GET the user with :id as _id`, async () => {
            const res = await chai.request(server).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`)
            res.should.have.status(200);
            res.body.data.should.be.a('object');
        });

        it(`PUT /users/:id should PUT the user with :id`, async () => {
            const res = await chai
                .request(server)
                .put(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    fullname: 'changed'
                });

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.should.have.property('fullname').eql('changed');
        });

        it(`DELETE /users/:id should DELETE the user with :id`, async () => {
            const res = await chai.request(server).delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
            res.should.have.status(204);
        });
    });

});