import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { useCart } from '../context/CartContext';

import { API_BASE_URL } from '../utils/apiClient';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const location = useLocation();
  const highlightSpices = location.state?.highlight || [];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`, { signal: controller.signal });
        const data = await response.json();

        if (!response.ok) {
          setError('Unable to load products right now.');
          setProducts([]);
          return;
        }

        const productList = Array.isArray(data.products) ? data.products : Array.isArray(data) ? data : [];
        if (productList.length > 0) {
          setProducts(productList);
          setError('');
        } else {
          setProducts([]);
          setError('Unable to load products right now.');
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        console.error('Failed to load products:', err);
        setError('Unable to load products right now.');
        setProducts([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`, { signal: controller.signal });
        const data = await response.json();

        if (!Array.isArray(data)) return;

        const names = data
          .map((category) => category?.name)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));

        setCategories(['All', ...names]);
      } catch (err) {
        console.warn('Failed to load product categories:', err);
      }
    };

    loadCategories();
    return () => controller.abort();
  }, []);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase();

    return products
      .filter((product) => {
        const text = `${product.title || ''} ${product.description || ''} ${product.category || ''}`.toLowerCase();
        const matchesSearch = text.includes(query);
        const matchesHighlight = highlightSpices.length === 0 || highlightSpices.includes(product.title);
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesHighlight && matchesCategory;
      })
      .sort((a, b) =>
        (a.legacyId || a._id || a.id || 0)
          .toString()
          .localeCompare((b.legacyId || b._id || b.id || 0).toString())
      );
  }, [search, selectedCategory, highlightSpices, products]);

  return (
    <main className="bg-cream pb-12 pt-24 text-gray-900 sm:pb-16 sm:pt-28">
      <section className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-white p-4 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)] sm:rounded-[32px] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Lion Spices</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">Premium spice collection</h1>
          <p className="mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">Discover the Lion Spices range of pure veg masalas and chilli powders with elegant packaging, rich aroma, and fast delivery.</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
            <Link to="/" className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">Back to Home</Link>
            <Link to="/cart" className="rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">View Cart</Link>
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[300px_1fr]">
          <FilterSidebar
            options={categories}
            selectedCategory={selectedCategory}
            onChange={handleCategoryChange}
          />

          <div className="space-y-4 sm:space-y-6">
            <SearchBar value={search} onChange={handleSearchChange} />
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-gray-100 bg-white p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] sm:rounded-[28px] sm:p-4">
              <p className="text-sm text-gray-600">Showing {filteredProducts.length} premium spices</p>
              <p className="text-sm font-semibold text-primary-red">Freshly packed • 100% authentic</p>
              {highlightSpices.length > 0 && (
                <p className="text-sm text-primary-red">Recipe spices highlighted: {highlightSpices.join(', ')}</p>
              )}
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <article key={index} className="animate-pulse rounded-[24px] border border-gray-100 bg-white p-6">
                      <div className="h-44 rounded-[18px] bg-gray-200" />
                      <div className="mt-4 h-5 w-3/4 rounded-full bg-gray-200" />
                      <div className="mt-2 h-4 w-1/2 rounded-full bg-gray-200" />
                      <div className="mt-4 h-10 rounded-full bg-gray-200" />
                    </article>
                  ))
                : filteredProducts.map((product) => (
                    <ProductCard key={product._id || product.legacyId || product.id} product={product} onAddToCart={(item, selectedVariant) => addToCart(item, selectedVariant, 1)} />
                  ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
