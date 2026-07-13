import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { recipes } from '../data/recipeData';
import ImageWithFallback from '../components/common/ImageWithFallback';
import { API_BASE_URL } from '../utils/apiClient';

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const recipe = recipes.find((item) => item.id === Number(id));
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!recipe) return;

    const controller = new AbortController();
    fetch(`${API_BASE_URL}/api/products`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.products)) return;
        const related = data.products.filter((product) => recipe.spiceTags.some((tag) => tag === product.title));
        setRelatedProducts(related);
      })
      .catch((err) => {
        console.warn('Failed to load related products for recipe:', err);
      });

    return () => controller.abort();
  }, [recipe]);

  if (!recipe) return <main className="pt-28 pb-16 text-center text-gray-600">Recipe not found.</main>;

  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <article className="rounded-[32px] bg-white p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <ImageWithFallback src={recipe.image} alt={recipe.title} className="h-[420px] w-full rounded-[28px] object-cover" loading="eager" />
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700">
            <span className="rounded-full bg-amber-50 px-3 py-1">Time: {recipe.cookTime}</span>
            <span className="rounded-full bg-green-50 px-3 py-1">Difficulty: {recipe.difficulty}</span>
            <span className="rounded-full bg-red-50 px-3 py-1">Servings: {recipe.servings}</span>
          </div>
        </article>
        <article className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm uppercase tracking-[0.28em] text-primary-red">Recipe</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">{recipe.title}</h1>
          <p className="mt-4 text-gray-600">{recipe.description}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-700">
            <span className="rounded-full bg-amber-50 px-3 py-1">Cooking Time: {recipe.cookTime}</span>
            <span className="rounded-full bg-green-50 px-3 py-1">Difficulty: {recipe.difficulty}</span>
            <span className="rounded-full bg-red-50 px-3 py-1">Servings: {recipe.servings}</span>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">{recipe.ingredients.map((item) => <li key={item}>• {item}</li>)}</ul>
            <p className="mt-4 text-sm text-gray-600">Lion Spices used: {recipe.spiceTags.join(', ')}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Preparation Method</h2>
            <ol className="mt-3 space-y-3 text-sm text-gray-700">{recipe.steps.map((step, index) => <li key={step} className="rounded-2xl bg-gray-50 p-3">{index + 1}. {step}</li>)}</ol>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Chef Tips</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">{recipe.tips.map((tip) => <li key={tip}>• {tip}</li>)}</ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" state={{ highlight: recipe.spiceTags }} className="rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">Buy These Spices</Link>
            <Link to="/" className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100">Back to Home</Link>
          </div>
        </article>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <article key={item._id || item.id} className="rounded-[28px] bg-white p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
              <ImageWithFallback src={item.image} alt={item.title} className="h-44 w-full rounded-[22px] object-contain" loading="lazy" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              <Link to={`/product/${item._id || item.id}`} className="mt-4 inline-flex rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-white">View Product</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
