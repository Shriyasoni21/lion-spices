const assetVersion = '20260624';
const withVersion = (path) => `${path}?v=${assetVersion}`;

const lionLogo = withVersion('/images/logo/lion-logo.svg');
const redChilliPacket = withVersion('/images/products/chilli-powder.jpg');
const turmericPacket = withVersion('/images/products/turmeric-powder.jpg');
const corianderPacket = withVersion('/images/products/coriander-powder.jpg');
const aacharPacket = withVersion('/images/products/aachari-mirchi.jpg');
const raiPowderPacket = withVersion('/images/products/rai-powder.jpeg');
const raiDalPacket = withVersion('/images/products/rai-dal.jpg');
const recipePickle = withVersion('/images/recipes/aachar-special-pickle.jpg');
const recipeCurry = withVersion('/images/recipes/spicy-red-chilli-curry.jpg');
const recipeDal = withVersion('/images/recipes/traditional-turmeric-dal.jpg');
const recipeVegetable = withVersion('/images/recipes/rai-tempered-vegetable-curry.jpg');
const redChilliPowder = redChilliPacket;
const turmericPowder = turmericPacket;
const corianderPowder = corianderPacket;
const aacharMirchi = aacharPacket;
const raiPowder = raiPowderPacket;
const raiDal = raiDalPacket;

/**
 * Image Assets Configuration for Lion Spices
 * Central repository for all image paths used throughout the application
 */

export const imageAssets = {
  logo: {
    main: lionLogo,
    dark: lionLogo,
    white: lionLogo,
    favicon: lionLogo,
  },

  hero: {
    background: redChilliPowder,
    spices: turmericPowder,
    redChilli: redChilliPowder,
    turmeric: turmericPowder,
  },

  products: {
    redChilliPowder,
    turmericPowder,
    corianderPowder,
    aacharMirchi,
    raiPowder,
    raiDal,
  },

  recipes: {
    curry: recipeCurry,
    dal: recipeDal,
    masala: recipePickle,
    aachar: recipePickle,
    spicyCurry: recipeCurry,
    turmericDal: recipeDal,
    vegetableCurry: recipeVegetable,
  },

  about: {
    hero: turmericPowder,
    farm: redChilliPowder,
  },

  avatars: {
    avatar1: lionLogo,
    avatar2: turmericPowder,
    avatar3: redChilliPowder,
    avatar4: turmericPowder,
    avatar5: corianderPowder,
    avatar6: aacharMirchi,
  },
};

/**
 * Get image asset by path
 * @param {string} path - Dot notation path to image (e.g., 'logo.main', 'products.redChilliPowder')
 * @returns {string} Image URL
 */
export const getImageAsset = (path) => {
  const keys = path.split('.');
  let value = imageAssets;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value || lionLogo;
};

export default imageAssets;
