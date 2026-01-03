const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new OrderService;


router.get('/', 
  async (req, res,  next) => {
    try {
      const orders = await service.find()
      res.json(orders)
    } catch(error) {
      next(error)
    }  
  }
);
  
router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    }catch (error) {
      next(error)
    }
  }
);

router.post('/specific',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const order = await service.findSpecific(data);
      res.json(order);
    }catch (error) {
      next(error)
    }
  }
);
  
router.post('/',
  passport.authenticate('jwt', {session: false}),
  //validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const data = {
        'userId': user.sub
      }
      const newOrder = await service.create(data);
      res.status(201).json(newOrder);
    } catch(error) {
      next(error)
    }
  } 
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newItem = await service.addItem(data);
      res.status(201).json(newItem);
    } catch(error) {
      next(error)
    }
  }
);

module.exports = router;