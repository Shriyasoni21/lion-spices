import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiTrendingUp } from 'react-icons/fi';
import ImageWithFallback from '../common/ImageWithFallback';
import { recipes } from '../../data/recipeData';

const RecipeSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleViewAllRecipes = () => {
    if (location.pathname === '/') {
      const target = document.getElementById('recipes');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/#recipes');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700'
  };

  return (
    <section id="recipes" className="relative overflow-hidden bg-gradient-to-b from-cream to-white py-6 sm:py-12 lg:py-24">
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-saffron/5 blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-4 text-center sm:mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading mb-1.5 text-xs text-primary-red sm:mb-2 sm:text-sm">Culinary Inspiration</p>
          <h2 className="section-heading mb-2 sm:mb-4">
            Try These <span className="text-primary-red">Flavorful Recipes</span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl text-xs sm:text-sm">
            Explore delicious recipes that showcase the authentic flavors of Lion Spices.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {recipes.slice(0, 3).map((recipe) => (
            <motion.div
              key={recipe.id}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white p-2 transition-all duration-400 hover:-translate-y-1 hover:shadow-md sm:rounded-2xl sm:p-3 lg:rounded-[20px] lg:p-3 lg:hover:-translate-y-2 lg:hover:shadow-[0_25px_65px_-35px_rgba(15,23,42,0.18)]"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <div className="relative h-28 overflow-hidden rounded-lg bg-white p-1 sm:h-32 sm:rounded-xl sm:p-1.5 lg:h-36 lg:rounded-[16px] lg:p-2">
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  width={360}
                  height={256}
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10"></div>
                <motion.div
                  className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold sm:right-2.5 sm:top-2.5 sm:px-2.5 sm:text-xs ${
                    difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-700'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {recipe.difficulty}
                </motion.div>
              </div>

              <div className="flex flex-1 flex-col p-2 sm:p-3 lg:p-4">
                <h4 className="mb-1 text-sm font-bold text-gray-900 transition-colors group-hover:text-primary-red sm:mb-1.5 sm:text-base lg:mb-2 lg:text-lg">
                  {recipe.title}
                </h4>
                <p className="mb-2 flex-grow text-xs text-gray-600 sm:mb-2 lg:mb-3 lg:text-sm line-clamp-2">
                  {recipe.description}
                </p>
                <div className="mb-2 flex items-center gap-2 border-t border-gray-200 py-2 text-xs text-gray-600 sm:gap-3 sm:py-2.5 lg:mb-3 lg:py-3 lg:text-sm">
                  <div className="flex items-center gap-1">
                    <FiClock className="h-3 w-3 text-primary-red sm:h-4 sm:w-4" />
                    <span className="font-medium">{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiTrendingUp className="h-3 w-3 text-turmeric sm:h-4 sm:w-4" />
                    <span className="font-medium">{recipe.difficulty}</span>
                  </div>
                </div>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="btn-standard btn-standard-primary w-full min-h-10 text-xs sm:min-h-11 sm:text-sm lg:min-h-[52px]"
                >
                  Read Recipe →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 text-center sm:mt-6 lg:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            type="button"
            onClick={handleViewAllRecipes}
            className="btn-standard btn-standard-secondary text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Recipes & Tips
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RecipeSection;
