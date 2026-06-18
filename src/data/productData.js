import { imageAssets } from '../config/imageAssets';

export const products = [
  {
    id: 1,
    title: 'Red Chilli Powder',
    weight: '500g',
    price: 199,
    image: imageAssets.products.redChilliPowder,
    rating: 4.9,
    reviews: 320,
    description: 'Rich red chilli powder with natural color and authentic spicy flavor.',
    longDescription: 'Rich red chilli powder with natural color and authentic spicy flavor, crafted for bold heat and a vibrant finish in every dish.',
    bestSeller: true,
    category: 'Chilli Powders',
    weightOptions: ['100g', '250g', '500g', '1kg'],
    variantPrices: { '100g': 59, '250g': 129, '500g': 199, '1kg': 379 }
  },
  {
    id: 2,
    title: 'Turmeric Powder',
    weight: '500g',
    price: 179,
    image: imageAssets.products.turmericPowder,
    rating: 4.8,
    reviews: 280,
    description: 'Pure turmeric powder with natural aroma and vibrant color.',
    longDescription: 'Pure turmeric powder with natural aroma and vibrant color, made for traditional curries, dals, and everyday Indian cooking.',
    bestSeller: true,
    category: 'Pure Veg Masalas',
    weightOptions: ['100g', '250g', '500g', '1kg'],
    variantPrices: { '100g': 49, '250g': 109, '500g': 179, '1kg': 349 }
  },
  {
    id: 3,
    title: 'Coriander Powder',
    weight: '500g',
    price: 189,
    image: imageAssets.products.corianderPowder,
    rating: 4.7,
    reviews: 200,
    description: 'Freshly ground coriander powder with traditional taste and fragrance.',
    longDescription: 'Freshly ground coriander powder with traditional taste and fragrance, ideal for curries, dals, and everyday masalas.',
    bestSeller: false,
    category: 'Pure Veg Masalas',
    weightOptions: ['100g', '250g', '500g', '1kg'],
    variantPrices: { '100g': 55, '250g': 119, '500g': 189, '1kg': 359 }
  },
  {
    id: 4,
    title: 'Aachar Mirchi',
    weight: '250g',
    price: 249,
    image: imageAssets.products.aacharMirchi,
    rating: 4.9,
    reviews: 140,
    description: 'Special chilli powder blend made especially for traditional Indian pickles.',
    longDescription: 'Special chilli powder blend made especially for traditional Indian pickles, bringing authentic tang, aroma, and deep flavor to every jar.',
    bestSeller: true,
    category: 'Chilli Powders',
    weightOptions: ['100g', '250g', '500g', '1kg'],
    variantPrices: { '100g': 69, '250g': 149, '500g': 249, '1kg': 449 }
  },
  {
    id: 5,
    title: 'Rai Powder',
    weight: '400g',
    price: 199,
    image: imageAssets.products.raiPowder,
    rating: 4.8,
    reviews: 95,
    description: 'Finely ground mustard powder with strong traditional flavor.',
    longDescription: 'Finely ground mustard powder with strong traditional flavor, perfect for curries, dals, and authentic Indian recipes.',
    bestSeller: false,
    category: 'Pure Veg Masalas',
    weightOptions: ['100g', '250g', '500g', '1kg'],
    variantPrices: { '100g': 52, '250g': 115, '500g': 199, '1kg': 389 }
  },
  {
    id: 6,
    title: 'Rai Dal',
    weight: '500g',
    price: 229,
    image: imageAssets.products.raiDal,
    rating: 4.8,
    reviews: 120,
    description: 'Premium quality rai dal for authentic Indian cooking.',
    longDescription: 'Premium quality rai dal for authentic Indian cooking, delivering rich aroma and traditional taste in every bite.',
    bestSeller: false,
    category: 'Pure Veg Masalas',
    weightOptions: ['100g', '250g', '500g', '1kg'],
    variantPrices: { '100g': 58, '250g': 129, '500g': 229, '1kg': 399 }
  }
];

export const categories = [
  {
    id: 1,
    name: 'Pure Veg Masalas',
    slug: 'pure-veg-masalas',
    image: imageAssets.products.turmericPowder,
    description: 'Turmeric, coriander, rai powder, and rai dal for authentic Indian cooking.',
    count: 4
  },
  {
    id: 2,
    name: 'Chilli Powders',
    slug: 'chilli-powders',
    image: imageAssets.products.redChilliPowder,
    description: 'Vibrant chilli powders and pickle-style masalas for bold flavor.',
    count: 2
  }
];

export const features = [
  { id: 1, title: '100% Pure', description: 'Handpicked spices without any additives or fillers.' },
  { id: 2, title: 'No Artificial Colors', description: 'No artificial colors or preservatives ever used.' },
  { id: 3, title: 'Hygienically Packed', description: 'Processed and packed in certified hygienic facilities.' },
  { id: 4, title: 'Farm Fresh Ingredients', description: 'Sourced directly from trusted farmers to you.' }
];

export const sourcingSteps = [
  {
    id: 1,
    title: 'Farm Selection',
    description: 'We partner with certified farms using sustainable practices'
  },
  {
    id: 2,
    title: 'Handpicked Ingredients',
    description: 'Expert farmers select only the best quality spices'
  },
  {
    id: 3,
    title: 'Quality Testing',
    description: 'Rigorous lab tests ensure purity and safety standards'
  },
  {
    id: 4,
    title: 'Hygienic Packaging',
    description: 'Modern facilities pack spices in sealed containers'
  },
  {
    id: 5,
    title: 'Delivery to You',
    description: 'Fast, reliable shipping across India'
  }
];

export const trustBadges = [
  { id: 1, icon: '✓', text: '100% Natural', color: '#DC2626' },
  { id: 2, icon: '✓', text: 'No Preservatives', color: '#EAB308' },
  { id: 3, icon: '✓', text: 'Farm Fresh', color: '#F59E0B' },
  { id: 4, icon: '✓', text: 'PAN India Delivery', color: '#078D0F' }
];
