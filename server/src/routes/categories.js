import express from 'express';
import { db } from '../config/db.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await db.getTable('categories');
    const sorted = categories.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    return res.json({ categories: sorted });
  } catch (err) {
    console.error('Error fetching categories:', err);
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/categories (Admin only)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, slug, sort_order, is_active } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ error: 'Category name and slug are required' });
    }

    const newCategory = await db.insert('categories', {
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      sort_order: Number(sort_order) || 0,
      is_active: is_active !== undefined ? is_active : true
    });

    return res.status(201).json({
      message: 'Category created successfully',
      category: newCategory
    });
  } catch (err) {
    console.error('Error creating category:', err);
    return res.status(500).json({ error: 'Failed to create category' });
  }
});

export default router;
