export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center text-5xl">
        {product.category === 'coffee' && '☕'}
        {product.category === 'pastry' && '🥐'}
        {product.category === 'snack' && '🍪'}
        {product.category === 'beverage' && '🥤'}
        {!['coffee', 'pastry', 'snack', 'beverage'].includes(product.category) && '🍳'}
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h4>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-amber-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition font-medium"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
