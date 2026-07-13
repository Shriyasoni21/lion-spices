import { imageAssets } from '../config/imageAssets.js';

export const products = [
  {
    id: 1,
    title: 'Red Chilli Powder',
    weight: '500g',
    price: 160,
    image: imageAssets.products.redChilliPowder,
    rating: 4.9,
    reviews: 320,
    description: 'Rich red chilli powder with natural color and authentic spicy flavor.',
    longDescription: 'Rich red chilli powder with natural color and authentic spicy flavor, crafted for bold heat and a vibrant finish in every dish.',
    bestSeller: true,
    category: 'Chilli Powders',
    variants: [
      { weight: '100g', price: 35 },
      { weight: '500g', price: 160 },
      { weight: '1kg', price: 280 }
    ]
  },
  {
    id: 2,
    title: 'Turmeric Powder',
    weight: '500g',
    price: 135,
    image: imageAssets.products.turmericPowder,
    rating: 4.8,
    reviews: 280,
    description: 'Pure turmeric powder with natural aroma and vibrant color.',
    longDescription: 'Pure turmeric powder with natural aroma and vibrant color, made for traditional curries, dals, and everyday Indian cooking.',
    bestSeller: true,
    category: 'Pure Veg Masalas',
    variants: [
      { weight: '100g', price: 30 },
      { weight: '500g', price: 135 },
      { weight: '1kg', price: 230 }
    ]
  },
  {
    id: 3,
    title: 'Coriander Powder',
    weight: '500g',
    price: 140,
    image: imageAssets.products.corianderPowder,
    rating: 4.7,
    reviews: 200,
    description: 'Freshly ground coriander powder with traditional taste and fragrance.',
    longDescription: 'Freshly ground coriander powder with traditional taste and fragrance, ideal for curries, dals, and everyday masalas.',
    bestSeller: false,
    category: 'Pure Veg Masalas',
    variants: [
      { weight: '100g', price: 25 },
      { weight: '500g', price: 140 },
      { weight: '1kg', price: 220 }
    ]
  },
  {
    id: 4,
    title: 'Aachar Mirchi',
    weight: '500g',
    price: 350,
    image: imageAssets.products.aacharMirchi,
    rating: 4.9,
    reviews: 140,
    description: 'Special chilli powder blend made especially for traditional Indian pickles.',
    longDescription: 'Special chilli powder blend made especially for traditional Indian pickles, bringing authentic tang, aroma, and deep flavor to every jar.',
    bestSeller: true,
    category: 'Chilli Powders',
    variants: [
      { weight: '500g', price: 350 },
      { weight: '1kg', price: 650 }
    ]
  },
  {
    id: 5,
    title: 'Rai Powder',
    weight: '500g',
    price: 110,
    image: imageAssets.products.raiPowder,
    rating: 4.8,
    reviews: 95,
    description: 'Finely ground mustard powder with strong traditional flavor.',
    longDescription: 'Finely ground mustard powder with strong traditional flavor, perfect for curries, dals, and authentic Indian recipes.',
    bestSeller: false,
    category: 'Pure Veg Masalas',
    variants: [
      { weight: '500g', price: 110 },
      { weight: '1kg', price: 180 }
    ]
  },
  {
    id: 6,
    title: 'Rai Dal',
    weight: '500g',
    price: 100,
    image: imageAssets.products.raiDal,
    rating: 4.8,
    reviews: 120,
    description: 'Premium quality rai dal for authentic Indian cooking.',
    longDescription: 'Premium quality rai dal for authentic Indian cooking, delivering rich aroma and traditional taste in every bite.',
    bestSeller: false,
    category: 'Pure Veg Masalas',
    variants: [
      { weight: '500g', price: 100 },
      { weight: '1kg', price: 170 }
    ]
  }
];

export const categories = [
  {
    id: 1,
    name: 'Pure Veg Masalas',
    slug: 'pure-veg-masalas',
    image: imageAssets.products.turmericPowder,
    description: 'Turmeric, coriander, rai powder, and rai dal for authentic Indian cooking.',
  },
  {
    id: 2,
    name: 'Chilli Powders',
    slug: 'chilli-powders',
    image: imageAssets.products.redChilliPowder,
    description: 'Vibrant chilli powders and pickle-style masalas for bold flavor.',
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
