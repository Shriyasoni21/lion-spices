import React from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipeData';
import ImageWithFallback from '../components/common/ImageWithFallback';

export default function RecipesPage() {
  return (
    <main className="page-shell-compact bg-cream">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Recipes</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">Crafted spice recipes</h1>
          <p className="mt-4 max-w-2xl text-gray-600">Explore premium spice-led recipes for everyday cooking and festive celebrations.</p>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <article key={recipe.id} className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.45)]">
              <ImageWithFallback src={recipe.image} alt={recipe.title} className="h-52 w-full rounded-[24px] object-cover" loading="lazy" />
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{recipe.cookTime}</span>
                <span>{recipe.difficulty}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-gray-900">{recipe.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{recipe.description}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{recipe.servings} servings</span>
                <Link to={`/recipe/${recipe.id}`} className="rounded-full bg-primary-red px-4 py-2 text-sm font-semibold text-white">View Recipe</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
