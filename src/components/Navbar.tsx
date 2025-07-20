import React, { useState } from 'react';
import { Menu, X, Home, Building, Users, Phone, User, FileText, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useAuth();

  // Debug logging
  console.log('Navbar: isAdmin:', isAdmin);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Building },
    { id: 'blog', label: 'News & Insights', icon: FileText },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'portal', label: 'User Portal', icon: User }
  ];

  // Add admin item if user is admin
  if (isAdmin) {
    console.log('Navbar: Adding admin item to navigation');
    navItems.push({ id: 'admin', label: 'Admin', icon: Shield });
  } else {
    console.log('Navbar: User is not admin, not adding admin item');
  }
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <h1 className="text-2xl font-bold text-amber-700">Vidya Builders</h1>
              <p className="text-xs text-gray-600">Chennai's Premier Construction</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'text-amber-700 bg-amber-50'
                        : 'text-gray-700 hover:text-amber-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;