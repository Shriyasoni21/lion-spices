import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { products } from '../data/productData';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightSpices = location.state?.highlight || [];
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('best');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam === 'pure-veg-masalas') {
      setCategory('Pure Veg Masalas');
    } else if (categoryParam === 'chilli-powders') {
      setCategory('Chilli Powders');
    } else {
      setCategory('All');
    }

    const searchParam = searchParams.get('search') || '';
    if (search !== searchParam) {
      setSearch(searchParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (selected) => {
    setCategory(selected);
    const params = new URLSearchParams(searchParams);

    if (selected === 'Pure Veg Masalas') {
      params.set('category', 'pure-veg-masalas');
    } else if (selected === 'Chilli Powders') {
      params.set('category', 'chilli-powders');
    } else {
      params.delete('category');
    }

    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    const cleanValue = value.trim();

    if (cleanValue) {
      params.set('search', cleanValue);
    } else {
      params.delete('search');
    }

    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase();
    let list = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || product.category === category;
      const matchesHighlight = highlightSpices.length === 0 || highlightSpices.includes(product.title);
      return matchesSearch && matchesCategory && matchesHighlight;
    });

    return list.sort((a, b) => {
      if (sortBy === 'low') return (a.variantPrices?.['500g'] ?? a.price) - (b.variantPrices?.['500g'] ?? b.price);
      if (sortBy === 'high') return (b.variantPrices?.['500g'] ?? b.price) - (a.variantPrices?.['500g'] ?? a.price);
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
      return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
    });
  }, [search, category, sortBy]);

  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Lion Spices</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Premium spice collection</h1>
          <p className="mt-4 max-w-2xl text-gray-600">Discover the Lion Spices range of pure veg masalas and chilli powders with elegant packaging, rich aroma, and fast delivery.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/" className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200">Back to Home</Link>
            <Link to="/cart" className="rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">View Cart</Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
          <FilterSidebar selectedCategory={category} onCategoryChange={handleCategoryChange} sortBy={sortBy} onSortChange={setSortBy} />

          <div className="space-y-6">
            <SearchBar value={search} onChange={handleSearchChange} />
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-gray-100 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
              <p className="text-sm text-gray-600">Showing {filteredProducts.length} premium spices</p>
              <p className="text-sm font-semibold text-primary-red">Freshly packed • 100% authentic</p>
              {highlightSpices.length > 0 && (
                <p className="text-sm text-primary-red">Recipe spices highlighted: {highlightSpices.join(', ')}</p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={(item) => addToCart(item, '500g', 1)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
