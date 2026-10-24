import express from 'express';
import { db } from '../config/db.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET /api/menu
router.get('/', async (req, res) => {
  try {
    const { category, featured, available } = req.query;
    let items = await db.getTable('menu_items');
    const categories = await db.getTable('categories');

    // Attach category object to each item
    const categoryMap = new Map(categories.map(c => [c.id, c]));
    items = items.map(item => ({
      ...item,
      category: categoryMap.get(item.category_id) || null
    }));

    if (category) {
      const cat = categories.find(c => c.slug === category);
      if (cat) {
        items = items.filter(item => item.category_id === cat.id);
      }
    }

    if (featured === 'true') {
      items = items.filter(item => item.is_featured);
    }

    if (available === 'true') {
      items = items.filter(item => item.is_available);
    }

    return res.json({
      count: items.length,
      items
    });
  } catch (err) {
    console.error('Error fetching menu items:', err);
    return res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// GET /api/menu/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await db.findById('menu_items', req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    const categories = await db.getTable('categories');
    const category = categories.find(c => c.id === item.category_id) || null;
    return res.json({ item: { ...item, category } });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// POST /api/menu (Admin only)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { category_id, name, description, price, image_url, is_available, is_featured, is_veg } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Item name is required' });
    }

    const newItem = await db.insert('menu_items', {
      category_id: Number(category_id) || null,
      name: name.trim(),
      description: description || '',
      price: price || 'Price on request',
      image_url: image_url || '',
      is_available: is_available !== undefined ? is_available : true,
      is_featured: Boolean(is_featured),
      is_veg: is_veg !== undefined ? is_veg : true,
      updated_at: new Date().toISOString()
    });

    return res.status(201).json({
      message: 'Menu item created successfully',
      item: newItem
    });
  } catch (err) {
    console.error('Error creating menu item:', err);
    return res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// PUT /api/menu/:id (Admin only)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { category_id, name, description, price, image_url, is_available, is_featured, is_veg } = req.body;
    const existing = await db.findById('menu_items', req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    const updates = {};
    if (category_id !== undefined) updates.category_id = Number(category_id);
    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (image_url !== undefined) updates.image_url = image_url;
    if (is_available !== undefined) updates.is_available = is_available;
    if (is_featured !== undefined) updates.is_featured = is_featured;
    if (is_veg !== undefined) updates.is_veg = is_veg;

    const updated = await db.update('menu_items', req.params.id, updates);
    return res.json({
      message: 'Menu item updated successfully',
      item: updated
    });
  } catch (err) {
    console.error('Error updating menu item:', err);
    return res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// DELETE /api/menu/:id (Admin only)
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const existing = await db.findById('menu_items', req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await db.delete('menu_items', req.params.id);
    return res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

export default router;
