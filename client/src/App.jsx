import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Home from './pages/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import ProductList from './components/ProductList';

function Navigation() {
  const { getCartItemCount } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-amber-900">☕ Coffee Shop</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/menu" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Menu
            </Link>
            <Link to="/cart" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Cart ({getCartItemCount()})
            </Link>
            <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Account
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<ProductList onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
