import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Download, Palette, Tag, Monitor } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
        <Link to="/" className="text-yellow-400 hover:text-yellow-300 transition-colors">
          Return to gallery
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Gallery</span>
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50">
            <img
              src={product.image_url || ''}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-yellow-400">
                ${product.price_cents / 100}
              </span>
              {/* <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                {product.category.replace('-', ' ')}
              </span> */}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Monitor className="h-5 w-5 text-yellow-400" />
              <span>Technical Details</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="text-sm text-gray-400 mb-1">Dimensions</div>
                <div className="text-white font-medium">{product.resolution || 'N/A'}</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="text-sm text-gray-400 mb-1">Format</div>
                <div className="text-white font-medium">{product.format || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Tag className="h-5 w-5 text-yellow-400" />
              <span>Tags</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* {product.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-lg text-sm border border-gray-600/50"
                >
                  {tag}
                </span>
              ))} */}
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="space-y-4 pt-6 border-t border-gray-700/50">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold transition-all duration-300 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:transform hover:scale-[1.02]'
              }`}
              disabled={addedToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{addedToCart ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Download className="h-4 w-4" />
              <span>Instant digital download after purchase</span>
            </div>
          </div>

          {/* What You Get */}
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Palette className="h-5 w-5 text-yellow-400" />
              <span>What You'll Receive</span>
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>High-resolution digital files ({product.format || 'N/A'})</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>Print-ready quality at {product.resolution || 'N/A'}</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>Personal and commercial use license</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <span>Lifetime download access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}