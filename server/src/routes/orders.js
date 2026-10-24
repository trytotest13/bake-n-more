import express from 'express';
import { db } from '../config/db.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders (Create order)
router.post('/', async (req, res) => {
  try {
    const { customer_name, phone, address, items, notes } = req.body;
    if (!customer_name || !phone) {
      return res.status(400).json({ error: 'Customer name and phone number are required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one order item is required' });
    }

    let totalAmount = 0;
    const orderItemsToInsert = items.map(item => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      totalAmount += price * quantity;
      return {
        menu_item_id: item.menu_item_id || null,
        item_name: item.item_name || 'Bakery Item',
        quantity,
        price
      };
    });

    const newOrder = await db.insert('orders', {
      customer_name: customer_name.trim(),
      phone: phone.trim(),
      address: address ? address.trim() : '',
      total_amount: totalAmount,
      status: 'pending',
      payment_status: 'pending',
      notes: notes || ''
    });

    for (const oi of orderItemsToInsert) {
      await db.insert('order_items', {
        order_id: newOrder.id,
        ...oi
      });
    }

    return res.status(201).json({
      message: 'Order created successfully',
      order: {
        ...newOrder,
        items: orderItemsToInsert
      }
    });
  } catch (err) {
    console.error('Error placing order:', err);
    return res.status(500).json({ error: 'Failed to place order' });
  }
});

// GET /api/orders (Admin only)
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    let orders = await db.getTable('orders');
    if (status) {
      orders = orders.filter(o => o.status === status);
    }
    orders.sort((a, b) => (b.id || 0) - (a.id || 0));

    return res.json({
      count: orders.length,
      orders
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await db.findById('orders', req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const allItems = await db.getTable('order_items');
    const items = allItems.filter(i => i.order_id === Number(req.params.id));
    return res.json({ order: { ...order, items } });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

// PATCH /api/orders/:id/status (Admin only)
router.patch('/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status, payment_status } = req.body;
    const existing = await db.findById('orders', req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (payment_status !== undefined) updates.payment_status = payment_status;

    const updated = await db.update('orders', req.params.id, updates);
    return res.json({
      message: 'Order status updated',
      order: updated
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update order status' });
  }
});

export default router;
