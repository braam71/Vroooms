import React, { useState } from 'react';
import { Send, Palette, Clock, DollarSign, Mail, User } from 'lucide-react';

export function Commission() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    description: '',
    budget: '',
    timeline: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the commission request to Supabase
    console.log('Commission request:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center bg-gray-800/50 rounded-2xl p-12 border border-gray-700/50">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Commission Request Sent!
          </h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Thank you for your commission request. I'll review your project details and 
            get back to you within 24-48 hours with a detailed proposal and timeline.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Send Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Custom
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400">
            Commissions
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Bring your vision to life with custom digital art, posters, and illustrations. 
          Each piece is crafted specifically for you with attention to every detail.
        </p>
      </div>

      {/* Commission Types */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 text-center">
          <Palette className="h-8 w-8 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Digital Art</h3>
          <p className="text-gray-400 text-sm">
            Custom digital paintings and artwork tailored to your style preferences
          </p>
        </div>
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 text-center">
          <Mail className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Posters</h3>
          <p className="text-gray-400 text-sm">
            Eye-catching poster designs for events, promotions, or personal use
          </p>
        </div>
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 text-center">
          <User className="h-8 w-8 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Illustrations</h3>
          <p className="text-gray-400 text-sm">
            Detailed illustrations for books, websites, or commercial projects
          </p>
        </div>
      </div>

      {/* Commission Form */}
      <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Start Your Commission
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              />
            </div>
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
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Commission Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
            >
              <option value="">Select commission type</option>
              <option value="digital-art">Digital Art</option>
              <option value="poster">Poster Design</option>
              <option value="illustration">Illustration</option>
              <option value="custom">Custom Project</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Describe your vision in detail. Include style preferences, color schemes, themes, dimensions, and any specific requirements..."
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-yellow-400" />
                <span>Budget Range</span>
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              >
                <option value="">Select budget range</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-250">$100 - $250</option>
                <option value="250-500">$250 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000+">$1,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span>Timeline</span>
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50"
              >
                <option value="">Select timeline</option>
                <option value="1-week">Rush (1 week)</option>
                <option value="2-weeks">Standard (2 weeks)</option>
                <option value="1-month">Extended (1 month)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-yellow-400 hover:from-purple-700 hover:to-yellow-500 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Send Commission Request</span>
          </button>
        </form>

        <div className="mt-8 p-6 bg-gray-700/30 rounded-lg border border-gray-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">Commission Process</h3>
          <div className="space-y-3 text-gray-300 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <span>Submit your request with detailed description</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <span>Receive a detailed proposal and timeline within 48 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <span>50% deposit to begin work, 50% upon completion</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs font-bold">4</div>
              <span>Receive your custom artwork in high resolution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}