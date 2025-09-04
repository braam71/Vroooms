import React, { useState } from 'react';
import { ArrowLeft, Mail, User, MapPin, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderDetails = items.map(item => ({
      name: item.product.name,
      price: (item.product.price_cents / 100).toFixed(2),
      quantity: 1,
    }));

    try {
      const response = await fetch('https://n8n-nw6tmx3tbij1.pempek.sumopod.my.id/webhook/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert('Order submitted successfully!');
        clearCart();
        navigate('/');
      } else {
        alert('There was an issue with your order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an issue connecting to the payment service. Please try again later.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/cart"
        className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Cart</span>
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span>Contact Information</span>
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <User className="h-5 w-5 text-yellow-400" />
                <span>Billing Information</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Lock className="h-5 w-5" />
              <span>Complete Purchase - ${getTotalPrice().toFixed(2)}</span>
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 h-fit">
          <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="text-white font-medium">{item.product.name}</div>
                <div className="text-yellow-400 font-medium">
                  ${(item.product.price_cents / 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700/50 mt-6 pt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-white">Total</span>
              <span className="text-yellow-400">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Lock className="h-4 w-4 text-green-400" />
              <span>Secure checkout with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}