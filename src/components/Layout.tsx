import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Palette, Mail, Home } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <Palette className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              <span className="text-2xl font-bold text-white tracking-wider">
                Vrooom's
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-yellow-400/20 text-yellow-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Gallery</span>
              </Link>
              <Link
                to="/commission"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/commission') 
                    ? 'bg-yellow-400/20 text-yellow-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>Commissions</span>
              </Link>
            </nav>

            <Link
              to="/cart"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                isActive('/cart')
                  ? 'bg-yellow-400/20 text-yellow-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-center space-x-6 pb-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-yellow-400/20 text-yellow-400' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Gallery</span>
            </Link>
            <Link
              to="/commission"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/commission') 
                  ? 'bg-yellow-400/20 text-yellow-400' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Commissions</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Palette className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold text-white">Vrooom's</span>
            </div>
            <p className="text-gray-400 max-w-md mx-auto">
              Unique digital art creations and custom commissions. 
              Every piece tells a story, every creation is a journey.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              © 2025 Vrooom's Art Studio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}