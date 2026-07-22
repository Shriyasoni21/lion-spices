import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMail, FiMenu, FiMapPin, FiPhone, FiSearch, FiShoppingCart, FiX } from 'react-icons/fi';

export default function Navbar({ cartCount, onCartClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavbarSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
    setIsSearchOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'My Orders', href: '/my-orders' },
    { label: 'Cart', href: '/cart' },
  ];

  const isActiveLink = (href) => href === location.pathname;

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3" style={{ textDecoration: 'none' }}>
          <img src="/images/logo.jpg" alt="Lion Spices" className="h-6 w-auto sm:h-8 lg:h-10" />
          <span className="hidden whitespace-nowrap text-sm font-bold uppercase leading-none tracking-[0.12em] text-gray-900 sm:inline-block sm:text-base lg:text-lg">
            LION SPICES
          </span>
        </Link>

        <nav className="hidden flex-1 justify-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm ${active ? 'font-semibold text-primary-red' : 'font-medium text-gray-700'} transition hover:text-primary-red`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="btn-icon navbar-icon flex items-center justify-center rounded-full"
            aria-label="Open search"
          >
            <FiSearch className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            type="button"
            onClick={onCartClick}
            className="relative btn-icon navbar-icon flex items-center justify-center rounded-full"
            aria-label="Open cart"
          >
            <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-red px-[0.35rem] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="navbar-icon btn-icon flex items-center justify-center rounded-full p-1 text-gray-700 lg:hidden"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX className="h-4 w-4 sm:h-5 sm:w-5" /> : <FiMenu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
          <form onSubmit={handleNavbarSearch} className="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
            <FiSearch className="h-4 w-4 text-gray-400" />
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spices..."
              className="w-full border-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </form>
        </div>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="border-t border-gray-200 bg-white px-3 py-2 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.12)] lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="space-y-1">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-primary-red"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 pt-1">
                <Link to="/privacy" className="text-xs text-gray-600 hover:text-primary-red" onClick={() => setIsMobileMenuOpen(false)}>Privacy</Link>
                <Link to="/terms" className="text-xs text-gray-600 hover:text-primary-red" onClick={() => setIsMobileMenuOpen(false)}>Terms</Link>
              </div>

              <div className="pt-2 text-center text-xs text-gray-500">© Lion Spices {new Date().getFullYear()}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
