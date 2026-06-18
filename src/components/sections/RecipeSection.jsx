import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiTrendingUp } from 'react-icons/fi';
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
    <section id="recipes" className="section-padding-lg bg-gradient-to-b from-cream to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-saffron/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading text-primary-red mb-3">Culinary Inspiration</p>
          <h2 className="section-heading mb-6">
            Try These <span className="text-primary-red">Flavorful Recipes</span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl">
            Explore delicious recipes that showcase the authentic flavors of Lion Spices.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {recipes.map((recipe, idx) => (
            <motion.div
              key={recipe.id}
              className="group card-equal overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_65px_-35px_rgba(15,23,42,0.18)]"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-56 overflow-hidden bg-white p-4 sm:h-64">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                <motion.div
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${
                    difficultyColors[recipe.difficulty] || 'bg-gray-100 text-gray-700'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {recipe.difficulty}
                </motion.div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-red transition-colors">
                  {recipe.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {recipe.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 border-t border-gray-200 py-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FiClock className="w-5 h-5 text-primary-red" />
                    <span className="font-medium">{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="w-5 h-5 text-turmeric" />
                    <span className="font-medium">{recipe.difficulty}</span>
                  </div>
                </div>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="btn-standard btn-standard-primary w-full text-center"
                >
                  Read Recipe
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
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
