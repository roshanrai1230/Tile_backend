const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
router.post('/', async (req, res) => {
    try {
        const { customer, items, totalAmount, paymentMethod } = req.body;

        const newOrder = new Order({
            customer,
            items,
            totalAmount,
            paymentMethod
        });

        const savedOrder = await newOrder.save();
        console.log(`✅ New Order Created: ${savedOrder._id}`);
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("❌ Error creating order:", err.message);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// @route   GET /api/orders
// @desc    Get all orders (for Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("❌ Error fetching orders:", err.message);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// @route   PATCH /api/orders/:id
// @desc    Update order status
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        console.error("❌ Error updating order:", err.message);
        res.status(500).json({ error: "Failed to update order" });
    }
});

module.exports = router;
