import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = 'SELECT * FROM products WHERE is_available = true';
    const params = [];
    
    if (category) {
      query += ' AND category = $1';
      params.push(category);
    }
    
    query += ' ORDER BY name ASC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1 AND is_available = true ORDER BY name ASC',
      [category]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products by category:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get available categories
router.get('/meta/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM products WHERE is_available = true ORDER BY category ASC'
    );
    
    res.json(result.rows.map(row => row.category));
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;
