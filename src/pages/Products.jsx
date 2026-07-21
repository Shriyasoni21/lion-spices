import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../utils/apiClient';
import { products as fallbackProducts, categories as fallbackCategories } from '../data/productData';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const location = useLocation();
  const highlightSpices = location.state?.highlight || [];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All', ...fallbackCategories.map((category) => category.name)]);
  const [products] = useState(fallbackProducts);
  const [loading] = useState(false);
  const [error] = useState('');

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
        console.warn('Failed to load product categories, using local categories:', err);
        setCategories(['All', ...fallbackCategories.map((category) => category.name)]);
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
      )
      .slice(0, 6);
  }, [search, selectedCategory, highlightSpices, products]);

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-5">
        <div className="mt-1 space-y-2 sm:space-y-3">
          <div className="rounded-[16px] border border-gray-200 bg-white px-3 py-3 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)] sm:px-4 sm:py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-red sm:text-xs">
              Showing {filteredProducts.length} Product{filteredProducts.length === 1 ? '' : 's'}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">Freshly packed • 100% authentic</p>
            {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
          </div>

          <FilterSidebar options={categories} selectedCategory={selectedCategory} onChange={handleCategoryChange} />

          <div className="space-y-2 sm:space-y-3">
            <SearchBar value={search} onChange={handleSearchChange} />

            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <article key={index} className="animate-pulse rounded-[18px] border border-gray-200 bg-white p-4">
                      <div className="h-40 rounded-[14px] bg-gray-200" />
                      <div className="mt-3 h-5 w-3/4 rounded-full bg-gray-200" />
                      <div className="mt-2 h-4 w-1/2 rounded-full bg-gray-200" />
                      <div className="mt-3 h-10 rounded-full bg-gray-200" />
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
