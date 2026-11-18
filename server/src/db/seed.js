import pool from './connection.js';

const sampleProducts = [
  // Coffee
  { name: 'Espresso', description: 'Strong and bold single shot espresso', price: 2.50, category: 'coffee' },
  { name: 'Americano', description: 'Espresso with hot water', price: 3.00, category: 'coffee' },
  { name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 3.50, category: 'coffee' },
  { name: 'Latte', description: 'Smooth espresso with velvety steamed milk', price: 3.75, category: 'coffee' },
  { name: 'Macchiato', description: 'Espresso marked with a small amount of milk', price: 3.25, category: 'coffee' },
  { name: 'Mocha', description: 'Espresso with steamed milk and chocolate', price: 4.00, category: 'coffee' },
  { name: 'Flat White', description: 'Espresso with velvety microfoam milk', price: 4.00, category: 'coffee' },
  
  // Pastries
  { name: 'Croissant', description: 'Buttery and flaky French pastry', price: 2.75, category: 'pastry' },
  { name: 'Chocolate Croissant', description: 'Croissant with dark chocolate filling', price: 3.25, category: 'pastry' },
  { name: 'Almond Croissant', description: 'Croissant with almond cream and sliced almonds', price: 3.50, category: 'pastry' },
  { name: 'Donut', description: 'Glazed donut with sugar coating', price: 2.00, category: 'pastry' },
  { name: 'Blueberry Muffin', description: 'Fresh blueberry muffin, moist and fluffy', price: 2.50, category: 'pastry' },
  { name: 'Banana Bread', description: 'Warm banana bread with walnuts', price: 2.75, category: 'pastry' },
  
  // Snacks
  { name: 'Chocolate Chip Cookie', description: 'Classic cookie with chocolate chips', price: 1.50, category: 'snack' },
  { name: 'Oatmeal Raisin Cookie', description: 'Hearty oatmeal cookie with raisins', price: 1.50, category: 'snack' },
  { name: 'Granola Bar', description: 'Crunchy granola with honey and nuts', price: 2.00, category: 'snack' },
  { name: 'Almonds', description: 'Roasted salted almonds', price: 3.00, category: 'snack' },
  { name: 'Trail Mix', description: 'Mixed nuts, dried fruit, and chocolate', price: 2.50, category: 'snack' },
  
  // Beverages
  { name: 'Iced Coffee', description: 'Cold brew coffee over ice', price: 3.50, category: 'beverage' },
  { name: 'Iced Latte', description: 'Chilled espresso with milk', price: 3.75, category: 'beverage' },
  { name: 'Iced Tea', description: 'Refreshing cold tea', price: 2.50, category: 'beverage' },
  { name: 'Hot Chocolate', description: 'Creamy hot chocolate', price: 3.00, category: 'beverage' },
  { name: 'Smoothie', description: 'Strawberry banana smoothie', price: 4.50, category: 'beverage' },
];

async function seed() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting seed process...');
    
    // Clear existing products and inventory
    await client.query('DELETE FROM inventory;');
    await client.query('DELETE FROM products;');
    
    // Insert products
    for (const product of sampleProducts) {
      const result = await client.query(
        'INSERT INTO products (name, description, price, category, is_available) VALUES ($1, $2, $3, $4, true) RETURNING id;',
        [product.name, product.description, product.price, product.category]
      );
      
      const productId = result.rows[0].id;
      
      // Add inventory for each product
      await client.query(
        'INSERT INTO inventory (product_id, quantity_in_stock, low_stock_threshold) VALUES ($1, $2, $3);',
        [productId, 50, 5] // Start with 50 items in stock
      );
    }
    
    console.log(`✅ Successfully seeded ${sampleProducts.length} products!`);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
