import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { total_price, items, customer_info, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    await client.query('BEGIN');

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (total_price, status, notes)
       VALUES ($1, $2, $3)
       RETURNING id, total_price, status, created_at;`,
      [total_price, 'pending', notes || null]
    );

    const order = orderResult.rows[0];

    // Add order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
         VALUES ($1, $2, $3, $4);`,
        [order.id, item.product_id, item.quantity, item.price_at_purchase]
      );
    }

    // Get order with items for response
    const fullOrderResult = await client.query(
      `SELECT 
        o.id, o.total_price, o.status, o.created_at,
        json_agg(json_build_object(
          'id', p.id,
          'name', p.name,
          'quantity', oi.quantity,
          'price', oi.price_at_purchase
        )) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = $1
       GROUP BY o.id, o.total_price, o.status, o.created_at;`,
      [order.id]
    );

    await client.query('COMMIT');

    res.status(201).json(fullOrderResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    client.release();
  }
});

// Get all orders (for testing)
router.get('/', async (req, res) => {
  try {
    const result = await client.query(
      `SELECT o.id, o.total_price, o.status, o.created_at, o.updated_at,
              COUNT(oi.id) as item_count
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id
       ORDER BY o.created_at DESC;`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        o.id, o.total_price, o.status, o.notes, o.created_at, o.updated_at,
        json_agg(json_build_object(
          'id', p.id,
          'name', p.name,
          'quantity', oi.quantity,
          'price', oi.price_at_purchase
        )) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = $1
       GROUP BY o.id, o.total_price, o.status, o.notes, o.created_at, o.updated_at;`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      `UPDATE orders 
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, status, updated_at;`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

export default router;
