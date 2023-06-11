import express from 'express';
import asyncHandler from 'express-async-handler';

// Model
import Order from '../models/orderModel.js'

// Auth middleware
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items!');
    }
    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
}));

router.get('/myorders', protect, asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200);
    res.json(orders);
}));

router.get('/allorders', protect, admin, asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200);
    res.json(orders);
}));

router.get('/:id', protect, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200);
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

router.put('/:id/pay', protect, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // Results from PayPal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder = await order.save();
        res.status(200);
        res.send(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

router.put('/:id/deliver', protect, admin, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200);
        res.send(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

export default router;