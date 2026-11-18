import { useEffect, useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  const [serverStatus, setServerStatus] = useState('checking...');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setServerStatus('✅ Connected'))
      .catch(() => setServerStatus('❌ Server offline'));
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    // Toast notification would go here
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-amber-900">☕ Coffee Shop</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Menu</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Cart ({cart.length})
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Account</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-amber-900 to-orange-800 rounded-lg text-white p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Coffee Shop
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Freshly brewed coffee, delicious pastries, and your favorite snacks delivered right to you.
          </p>
          
          <button className="px-8 py-3 bg-white text-amber-900 rounded-lg font-semibold hover:bg-amber-50 transition text-lg">
            Start Ordering
          </button>
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
                <li><a href="#" className="hover:text-white">Menu</a></li>
                <li><a href="#" className="hover:text-white">Orders</a></li>
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
            <p className="text-sm mt-2">Step 2 - Menu & Product Listing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
