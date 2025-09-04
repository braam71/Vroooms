import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Mail } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    // const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Digital Art
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
            Collection
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Explore unique digital artwork and illustrations. Each piece is crafted with passion 
          and available as high-quality digital downloads.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search artworks, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="digital-art">Digital Art</option>
            <option value="illustration">Illustrations</option>
            <option value="poster">Posters</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-lg mb-4">
            No artworks found matching your criteria
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Commission CTA */}
      <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-yellow-400/20 rounded-2xl p-8 border border-purple-500/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Looking for something custom?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I create custom digital art, posters, and illustrations tailored to your vision. 
            Let's bring your ideas to life together.
          </p>
          <Link
            to="/commission"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-yellow-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-yellow-500 transition-all duration-300"
          >
            <Mail className="h-5 w-5" />
            <span>Start Commission</span>
          </Link>
        </div>
      </div>
    </div>
  );
}