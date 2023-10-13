const express = require('express');
const router = express.Router();
const {
    createOrder,
    listAllOrders,
    getOrderByID,
    updateOrder
} = require('../controllers/order.controller');

router.post('/', createOrder);
router.get('/', listAllOrders);
router.get('/:id', getOrderByID);
// router.put('/:id',updateOrder);

module.exports = router;


 