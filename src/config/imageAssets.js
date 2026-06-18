import lionLogo from '../../images/logo.jpg';
import redChilliPacket from '../../images/chilli powder.jpg';
import turmericPacket from '../../images/turmeric powder.jpg';
import corianderPacket from '../../images/coriander powder.jpg';
import aacharPacket from '../../images/aachari mirchi.jpg';
import raiPowderPacket from '../../images/rai powder.jpeg';
import raiDalPacket from '../../images/rai dal.jpg';
import recipePickle from '../../images/aachar special.jpg';
import recipeCurry from '../../images/spciy red chilli curry.jpg';
import recipeDal from '../../images/traditional turmeric dal.jpg';
import recipeVegetable from '../../images/rai tempered.jpg';
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
