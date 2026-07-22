import React from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../../data/recipeData';
import ImageWithFallback from '../common/ImageWithFallback';

const previewRecipes = recipes.slice(0, 3);

export default function RecipePreviewSection() {
  return (
    <section className="bg-[#fff7ef] py-16 sm:py-20">
      <div className="container-custom">
        <div className="max-w-2xl text-center">
          <p className="chip text-primary-red">Recipes</p>
          <h2 className="mt-3 section-heading">Inspired dishes for premium spice lovers.</h2>
          <p className="mt-3 section-copy text-gray-600">
            Discover elegant recipes that highlight Lion Spices in every bite.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {previewRecipes.map((recipe) => (
            <article key={recipe.id} className="rounded-[28px] border border-gray-200 bg-white p-4 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-30px_rgba(15,23,42,0.18)]">
              <div className="overflow-hidden rounded-[24px] bg-gray-100">
                <ImageWithFallback src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover" />
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{recipe.cookTime}</span>
                  <span>{recipe.difficulty}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{recipe.title}</h3>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:border-primary-red hover:text-primary-red"
                >
                  View Recipe
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
