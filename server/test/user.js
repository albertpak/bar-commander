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

        if(!users.body.data.length) {
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

    describe('GET routes', () => {

        let userId = '';

        it('GET /users should GET all the users', async () => {
            const res = await chai.request(server).get('/users')
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(1);
            userId = res.body.data[0]._id;
        });

        it(`GET /users/:id should GET the user with :id as _id`, async () => {    
            const res = await chai.request(server).get(`/users/${userId}`)
            res.should.have.status(200);
            res.body.data.should.be.a('object');
        });
    });

});