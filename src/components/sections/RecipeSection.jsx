import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiTrendingUp } from 'react-icons/fi';
import ImageWithFallback from '../common/ImageWithFallback';
import { recipes } from '../../data/recipeData';

const RecipeSection = ({ compact = false }) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700'
  };

  return (
    <section className="bg-[#fffaf5] py-8 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Featured Recipes</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Simple recipes, rich spice flavor</h2>
          </div>
          <Link to="/recipes" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary-red hover:text-primary-red">View All Recipes</Link>
        </div>

        <div className={compact ? 'flex gap-4 overflow-x-auto pb-3 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible' : 'grid gap-4 sm:grid-cols-3'}>
          {recipes.slice(0, 3).map((recipe, index) => (
            <motion.article
              key={recipe.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group min-w-[84%] max-w-[84%] snap-start overflow-hidden rounded-[24px] border border-gray-100 bg-white p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_-24px_rgba(0,0,0,0.28)] sm:min-w-0 sm:max-w-none sm:p-4"
            >
              <div className="relative h-32 overflow-hidden rounded-[18px] bg-white p-2 sm:h-36">
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  width={360}
                  height={256}
                />
                <div className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold ${difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-700'}`}>
                  {recipe.difficulty}
                </div>
              </div>

              <div className="mt-3 flex flex-col">
                <h3 className="text-base font-semibold text-gray-900">{recipe.title}</h3>
                <p className="mt-2 flex-grow text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1"><FiClock className="h-4 w-4 text-primary-red" />{recipe.cookTime}</span>
                  <span className="inline-flex items-center gap-1"><FiTrendingUp className="h-4 w-4 text-amber-600" />{recipe.difficulty}</span>
                </div>
                <Link to={`/recipe/${recipe.id}`} className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Read recipe</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipeSection;
