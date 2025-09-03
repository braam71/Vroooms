import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">
            Discover beautiful digital artworks and start your collection
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Browse Gallery</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-2 mb-8">
        <ShoppingCart className="h-6 w-6 text-yellow-400" />
        <h1 className="text-2xl font-bold text-white">
          Your Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
        </h1>
      </div>

      <div className="space-y-6">
        {items.map(item => (
          <div
            key={item.product.id}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-32 h-32 bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.product.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {item.product.description.substring(0, 100)}...
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-white font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-yellow-400 font-bold text-lg">
                      ${item.product.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between text-xl font-bold text-white mb-6">
          <span>Total</span>
          <span className="text-yellow-400">${getTotalPrice()}</span>
        </div>
        
        <div className="space-y-3">
          <Link
            to="/checkout"
            className="w-full block text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-4 rounded-lg font-semibold transition-colors"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/"
            className="w-full block text-center bg-gray-700/50 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors border border-gray-600/50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}