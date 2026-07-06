import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from './ImageWithFallback';

export default function Navbar({ cartCount, onCartClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const handleNavbarSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    const params = new URLSearchParams();
    if (query) {
      params.set('search', query);
    }

    navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
    setIsSearchOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Recipes', href: '/#recipes' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Cart', href: '/cart' },
  ];

  const isActiveLink = (href) => {
    if (href === location.pathname) return true;
    if (href.startsWith('/#') && location.pathname === '/' && location.hash === href.slice(1)) {
      return true;
    }
    return false;
  };

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${isScrolled ? 'bg-white shadow-[0_20px_50px_-25px_rgba(15,23,42,0.18)] border-b border-gray-200' : 'bg-white/95 backdrop-blur-sm border-b border-transparent'}`}
      initial={{ y: -40 }}
      animate={{ y: 0 }}
    >
      <div className="mx-auto flex h-[70px] w-full max-w-7xl items-center justify-between gap-3 px-3 sm:gap-5 sm:px-4 sm:py-0 lg:px-10">
        <Link to="/" className="flex items-center gap-3 shrink-0 transition-all duration-300 hover:-translate-y-px" style={{ textDecoration: 'none' }}>
          <ImageWithFallback
            src={imageAssets.logo.main}
            alt="Lion Spices logo"
            className="h-[50px] sm:h-[55px] md:h-[72px] lg:h-[78px] w-auto object-contain"
            style={{ imageRendering: 'auto' }}
            loading="eager"
          />
          <span className="text-[0.85rem] sm:text-sm font-extrabold uppercase tracking-[0.35em] text-gray-900 leading-none">Lion Spices</span>
        </Link>

        <nav className="hidden flex-1 justify-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative text-sm ${active ? 'font-semibold text-primary-red' : 'font-medium text-gray-700'} transition-all duration-300 hover:text-primary-red hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-primary-red transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <motion.button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="btn-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open search"
          >
            <FiSearch className="h-5 w-5" />
          </motion.button>

          {isSearchOpen && (
            <motion.form
              onSubmit={handleNavbarSearch}
              className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 md:flex"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiSearch className="h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spices, blends, or flavors..."
                className="w-56 border-0 bg-transparent px-1 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
            </motion.form>
          )}

          <motion.button
            type="button"
            onClick={onCartClick}
            className="relative btn-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open cart"
          >
            <FiShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <motion.span
                className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-red px-[0.35rem] text-[10px] font-bold text-white shadow-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          <button
            className="rounded-full p-2 text-gray-700 transition-colors hover:text-primary-red lg:hidden"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <motion.div
          className="absolute inset-x-0 top-full z-[55] border-b border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <form onSubmit={handleNavbarSearch} className="flex w-full items-center gap-2 rounded-3xl border border-gray-200 bg-white px-3 py-2">
            <FiSearch className="h-5 w-5 text-gray-400" />
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spices, blends, or flavors..."
              className="w-full border-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </form>
        </motion.div>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full z-[55] overflow-hidden border-t border-gray-100 bg-white shadow-[0_20px_40px_-25px_rgba(15,23,42,0.2)] md:hidden"
          >
            <div className="space-y-2 px-4 pb-6 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-primary-red/10 hover:text-primary-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
