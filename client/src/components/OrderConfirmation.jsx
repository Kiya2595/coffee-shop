import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { order, customer } = location.state || {};

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-gray-600 mb-8">Order information not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600">Thank you for your order</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Order Number</h3>
            <p className="text-2xl font-bold text-gray-900">#{orderId}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Order Status</h3>
            <p className="text-2xl font-bold text-amber-700">Pending</p>
          </div>
        </div>

        <div className="mb-8 pb-8 border-b">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery To</h3>
          <p className="text-gray-600">
            {customer?.firstName} {customer?.lastName}<br />
            {customer?.email}<br />
            {customer?.phone}<br />
            {customer?.address && <>{customer.address}<br /></>}
          </p>
        </div>

        <div className="mb-8 pb-8 border-b">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-3">
            {order.items?.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">
              ${order.total_price ? (order.total_price / 1.1).toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold">
              ${order.total_price ? (order.total_price * 0.1 / 1.1).toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-amber-900">
              ${order.total_price?.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <p className="text-blue-900">
          <strong>Next Steps:</strong> Your order is being prepared. We'll notify you when it's ready for pickup or delivery.
        </p>
      </div>

      <div className="text-center space-y-4">
        <button
          onClick={() => navigate('/')}
          className="block w-full px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-medium"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/orders')}
          className="block w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}
