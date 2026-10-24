import express from 'express';
import { db } from '../config/db.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// POST /api/cakes/inquiries (Public custom cake form)
router.post('/inquiries', async (req, res) => {
  try {
    const { name, phone, event_date, occasion, flavour, design, budget } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required' });
    }

    const newInquiry = await db.insert('cake_inquiries', {
      name: name.trim(),
      phone: phone.trim(),
      event_date: event_date || '',
      occasion: occasion || 'Birthday',
      flavour: flavour || 'Chocolate',
      design: design || '',
      budget: budget || '',
      status: 'new',
      notes: ''
    });

    // Generate prefilled WhatsApp deep link
    const waText = encodeURIComponent(
      `🎂 *Custom Cake Enquiry (Bake 'n' More)*\n` +
      `👤 *Name:* ${newInquiry.name}\n` +
      `📞 *Phone:* ${newInquiry.phone}\n` +
      `📅 *Date:* ${newInquiry.event_date || 'Flexible'}\n` +
      `🎉 *Occasion:* ${newInquiry.occasion}\n` +
      `🍰 *Flavour:* ${newInquiry.flavour}\n` +
      `💡 *Design Idea:* ${newInquiry.design || 'Standard Bakery Theme'}\n` +
      `💰 *Budget Range:* ${newInquiry.budget || 'Standard Pricing'}\n` +
      `🆔 *Ref ID:* #CAKE-${newInquiry.id}`
    );

    const whatsappUrl = `https://wa.me/917571983301?text=${waText}`;

    return res.status(201).json({
      message: 'Cake inquiry submitted successfully',
      inquiry: newInquiry,
      whatsappUrl
    });
  } catch (err) {
    console.error('Error submitting cake inquiry:', err);
    return res.status(500).json({ error: 'Failed to submit cake inquiry' });
  }
});

// GET /api/cakes/inquiries (Admin only)
router.get('/inquiries', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    let inquiries = await db.getTable('cake_inquiries');

    if (status) {
      inquiries = inquiries.filter(i => i.status === status);
    }

    // Sort descending by created_at or id
    inquiries.sort((a, b) => (b.id || 0) - (a.id || 0));

    return res.json({
      count: inquiries.length,
      inquiries
    });
  } catch (err) {
    console.error('Error fetching cake inquiries:', err);
    return res.status(500).json({ error: 'Failed to fetch cake inquiries' });
  }
});

// PATCH /api/cakes/inquiries/:id (Admin only)
router.patch('/inquiries/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const existing = await db.findById('cake_inquiries', req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const updated = await db.update('cake_inquiries', req.params.id, updates);
    return res.json({
      message: 'Inquiry updated successfully',
      inquiry: updated
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

export default router;
