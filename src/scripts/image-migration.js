/**
 * Image Migration Script
 * Use this to update productData.js imports to use imageAssets configuration
 */

// This is a reference script showing how to update product images

// OLD WAY (using direct paths):
// image: '/src/assets/images/red-chilli.svg'

// NEW WAY (using centralized imageAssets):
// import { imageAssets } from '../config/imageAssets';
// image: imageAssets.products.redChilliPowder

/**
 * Migration Instructions:
 * 
 * 1. In productData.js, add import at top:
 *    import { imageAssets } from '../config/imageAssets';
 * 
 * 2. Update each product's image field:
 *    OLD: image: '/src/assets/images/red-chilli.svg'
 *    NEW: image: imageAssets.products.redChilliPowder
 * 
 * 3. Update each category's image field:
 *    OLD: image: '/images/category-whole-spices.jpg'
 *    NEW: image: imageAssets.products.raiDal (or appropriate product)
 * 
 * 4. Similarly update testimonial avatars:
 *    OLD: avatar: '/src/assets/avatars/customer1.jpg'
 *    NEW: avatar: imageAssets.avatars.avatar1
 * 
 * 5. Update recipe images:
 *    OLD: image: '/src/assets/recipes/biryani.jpg'
 *    NEW: image: imageAssets.recipes.biryani
 * 
 * 6. Test the application:
 *    npm run dev
 *    Verify all images load correctly
 */

// PRODUCT IMAGE MAPPING
const productImageMapping = {
  'Red Chilli Powder': 'imageAssets.products.redChilliPowder',
  'Turmeric Powder': 'imageAssets.products.turmericPowder',
  'Coriander Powder': 'imageAssets.products.corianderPowder',
  'Aachar Mirchi': 'imageAssets.products.aacharMirchi',
  'Rai Powder': 'imageAssets.products.raiPowder',
  'Rai Dal': 'imageAssets.products.raiDal',
};

// CATEGORY IMAGE MAPPING
const categoryImageMapping = {
  'Whole Spices': 'imageAssets.products.raiDal',
  'Blended Masalas': 'imageAssets.products.aacharMirchi',
  'Chilli Powders': 'imageAssets.products.redChilliPowder',
  'Pickles': 'imageAssets.products.aacharMirchi',
  'Combo Packs': 'imageAssets.products.turmericPowder',
  'Gift Boxes': 'imageAssets.products.redChilliPowder',
};

// AVATAR IMAGE MAPPING
const avatarImageMapping = {
  1: 'imageAssets.avatars.avatar1',
  2: 'imageAssets.avatars.avatar2',
  3: 'imageAssets.avatars.avatar3',
  4: 'imageAssets.avatars.avatar4',
  5: 'imageAssets.avatars.avatar5',
  6: 'imageAssets.avatars.avatar6',
};

// RECIPE IMAGE MAPPING
const recipeImageMapping = {
  'Hyderabadi Biryani': 'imageAssets.recipes.biryani',
  'Butter Chicken Curry': 'imageAssets.recipes.curry',
  'Dal Makhani': 'imageAssets.recipes.dal',
  'Garam Masala Rice': 'imageAssets.recipes.masala',
};

export {
  productImageMapping,
  categoryImageMapping,
  avatarImageMapping,
  recipeImageMapping
};
