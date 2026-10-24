import express from 'express';
import { db } from '../config/db.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact (Public contact submission)
router.post('/', async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    const newMsg = await db.insert('contact_messages', {
      name: name.trim(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
      status: 'unread'
    });

    return res.status(201).json({
      message: 'Message sent successfully. Our team will contact you soon.',
      contactMessage: newMsg
    });
  } catch (err) {
    console.error('Error submitting contact message:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /api/contact (Admin only)
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    let messages = await db.getTable('contact_messages');
    messages.sort((a, b) => (b.id || 0) - (a.id || 0));
    return res.json({
      count: messages.length,
      messages
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
});

// PATCH /api/contact/:id (Admin only)
router.patch('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const existing = await db.findById('contact_messages', req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const updated = await db.update('contact_messages', req.params.id, { status });
    return res.json({
      message: 'Message status updated',
      contactMessage: updated
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update message status' });
  }
});

export default router;
