import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { products } from '../data/productData';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const location = useLocation();
  const highlightSpices = location.state?.highlight || [];
  const [search, setSearch] = useState('');

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase();
    let list = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesHighlight = highlightSpices.length === 0 || highlightSpices.includes(product.title);
      return matchesSearch && matchesHighlight;
    });

    return list.sort((a, b) => a.id - b.id);
  }, [search, highlightSpices]);

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
        </div>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[300px_1fr]">
          <FilterSidebar selectedCategory="All" />

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
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={(item, selectedVariant) => addToCart(item, selectedVariant, 1)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
