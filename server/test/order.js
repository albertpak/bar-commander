const User = require('../models/userModel');
const Order = require('../models/orderModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
chai.should();
chai.use(chaiHttp);

describe('Orders', () => {
  beforeEach(async () => {
    const orders = await chai.request(server).get('/orders');

    if (!orders.body.data.length) {
      const order = new Order({
        tableNumber: 101,
        date: Date.now(),
        listProduct: [],
        totalPrice: 10,
        paid: false,
        complete: false,
        waiter: new User()
      });

      await order.save();
    }
  });

  after(async () => {
    await Order.remove({});
  });

  describe('CRUD', () => {
    let orderId = '';

    it('GET /orders should GET all the orders', async () => {
      const res = await chai.request(server).get('/orders');
      res.should.have.status(200);
      res.body.data.should.be.a('array');
      res.body.data.length.should.be.eql(1);
      orderId = res.body.data[0]._id;
    });

    it(`GET /orders/:id should GET the order with :id as _id`, async () => {
      const res = await chai.request(server).get(`/orders/${orderId}`);
      res.should.have.status(200);
      res.body.should.be.a('object');
    });

    it(`PUT /orders/:id shoudl PUT the order with :id`, async () => {
      const res = await chai
        .request(server)
        .put(`/orders/${orderId}`)
        .send({
          totalPrice: 100
        });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('totalPrice').eql(100);
    });

    it(`DELETE /orders/:id shoudl DELETE the order with :id`, async () => {
      const res = await chai.request(server).delete(`/orders/${orderId}`);
      res.should.have.status(204);
    });
  });
});
