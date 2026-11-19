import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [serverStatus, setServerStatus] = useState('checking...');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setServerStatus('✅ Connected'))
      .catch(() => setServerStatus('❌ Server offline'));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-amber-900 to-orange-800 rounded-lg text-white p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Coffee Shop
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Freshly brewed coffee, delicious pastries, and your favorite snacks delivered right to you.
          </p>
          
          <Link
            to="/menu"
            className="inline-block px-8 py-3 bg-white text-amber-900 rounded-lg font-semibold hover:bg-amber-50 transition text-lg"
          >
            Start Ordering
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <ProductList onAddToCart={handleAddToCart} />

      {/* Server Status */}
      <div className="text-center py-4 text-sm text-gray-500">
        API Status: <span className="font-semibold">{serverStatus}</span>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p className="text-gray-400">Serving the best coffee in town since 2020.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="text-gray-400 space-y-2">
                <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
                <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hours</h4>
              <p className="text-gray-400">Mon-Sun: 7AM - 9PM</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Coffee Shop. All rights reserved.</p>
            <p className="text-sm mt-2">Step 3 - Shopping Cart & Checkout</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
