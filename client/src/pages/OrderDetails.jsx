import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/api';

const statusSteps = [
  { status: 'pending', label: 'Order Placed', icon: '📋' },
  { status: 'confirmed', label: 'Confirmed', icon: '✓' },
  { status: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { status: 'ready', label: 'Ready', icon: '📦' },
  { status: 'completed', label: 'Completed', icon: '✅' },
];

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await orderService.getById(orderId);
      setOrder(response.data);
      setError('');
    } catch (err) {
      console.error('Error loading order:', err);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(step => step.status === status);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 mb-4">
          {error || 'Order not found'}
        </div>
        <Link to="/orders" className="text-amber-700 hover:text-amber-800 font-medium">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/orders" className="text-amber-700 hover:text-amber-800 font-medium mb-6 inline-block">
        ← Back to Orders
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order #{order.id}</h1>

      {/* Order Status Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
        <div className="flex justify-between items-start">
          {statusSteps.map((step, index) => (
            <div key={step.status} className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
                  index <= currentStatusIndex
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.icon}
              </div>
              <p className={`text-sm font-medium text-center ${
                index <= currentStatusIndex ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.label}
              </p>
              {index < statusSteps.length - 1 && (
                <div
                  className={`w-0.5 h-12 my-2 ${
                    index < currentStatusIndex ? 'bg-amber-700' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600 text-sm">Order Date</p>
              <p className="text-gray-900">{formatDate(order.created_at)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <p className="text-gray-900 font-semibold capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Number of Items</p>
              <p className="text-gray-900">{order.items?.length || 0} items</p>
            </div>
          </div>
        </div>

        {order.first_name && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-gray-900">{order.first_name} {order.last_name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-900">{order.email}</p>
              </div>
              {order.phone && (
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="text-gray-900">{order.phone}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-3">
          {order.items && order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">
              ${(order.total_price / 1.1).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold">
              ${((order.total_price / 1.1) * 0.1).toFixed(2)}
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-amber-900">
              ${order.total_price.toFixed(2)}
            </span>
          </div>
        </div>

        {order.notes && (
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-6">
            <p className="text-blue-900">
              <strong>Special Instructions:</strong> {order.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
