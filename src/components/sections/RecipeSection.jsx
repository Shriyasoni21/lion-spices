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
    <section id="recipes" className="relative overflow-hidden bg-gradient-to-b from-cream to-white py-10 sm:py-16 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-saffron/5 blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-8 text-center sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading mb-2 text-primary-red sm:mb-3">Culinary Inspiration</p>
          <h2 className="section-heading mb-4 sm:mb-6">
            Try These <span className="text-primary-red">Flavorful Recipes</span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl">
            Explore delicious recipes that showcase the authentic flavors of Lion Spices.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {recipes.slice(0, 3).map((recipe) => (
            <motion.div
              key={recipe.id}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-white p-2 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_65px_-35px_rgba(15,23,42,0.18)] sm:p-3"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-32 overflow-hidden rounded-[16px] bg-white p-1 sm:h-36 sm:p-2">
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  width={360}
                  height={256}
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10"></div>
                <motion.div
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold sm:px-3 sm:text-xs ${
                    difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-700'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {recipe.difficulty}
                </motion.div>
              </div>

              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <h4 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-red sm:mb-3 sm:text-xl">
                  {recipe.title}
                </h4>
                <p className="mb-3 flex-grow text-sm text-gray-600 sm:mb-4">
                  {recipe.description}
                </p>
                <div className="mb-3 flex flex-wrap items-center gap-3 border-t border-gray-200 py-3 text-sm text-gray-600 sm:mb-4 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <FiClock className="h-4 w-4 text-primary-red sm:h-5 sm:w-5" />
                    <span className="font-medium">{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="h-4 w-4 text-turmeric sm:h-5 sm:w-5" />
                    <span className="font-medium">{recipe.difficulty}</span>
                  </div>
                </div>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="btn-standard btn-standard-primary w-full min-h-[44px] text-center sm:min-h-[52px]"
                >
                  Read Recipe →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 text-center sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            type="button"
            onClick={handleViewAllRecipes}
            className="btn-standard btn-standard-secondary"
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
