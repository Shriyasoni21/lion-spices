import { imageAssets } from '../config/imageAssets';

export const recipes = [
  {
    id: 1,
    title: 'Chicken Biryani',
    image: imageAssets.recipes.curry,
    time: '45 min',
    difficulty: 'Intermediate',
    rating: 4.9,
    description: 'A fragrant layered rice dish with premium masalas, turmeric, and chilli powder.',
    ingredients: ['Biryani Masala', 'Turmeric', 'Chilli Powder', 'Ginger Garlic Paste', 'Basmati Rice'],
    steps: [
      'Marinate chicken with yoghurt, lemon, and spices.',
      'Cook basmati rice with whole spices until 70% done.',
      'Layer rice, chicken, and caramelized onions in a heavy-bottom pan.',
      'Steam gently to lock in aroma and serve hot.'
    ],
    spiceTags: ['Biryani Masala', 'Turmeric', 'Chilli Powder']
  },
  {
    id: 2,
    title: 'Butter Chicken',
    image: imageAssets.recipes.biryani,
    time: '35 min',
    difficulty: 'Easy',
    rating: 4.8,
    description: 'Silky tomato gravy, aromatic garam masala, and red chilli for a rich restaurant-style finish.',
    ingredients: ['Garam Masala', 'Red Chilli', 'Tomato Puree', 'Cream', 'Chicken'],
    steps: [
      'Sauté onions and ginger-garlic paste till fragrant.',
      'Add tomato puree, garam masala, and red chilli.',
      'Simmer with chicken and finish with cream.',
      'Serve with naan or jeera rice.'
    ],
    spiceTags: ['Garam Masala', 'Red Chilli']
  },
  {
    id: 3,
    title: 'Paneer Tikka',
    image: imageAssets.recipes.masala,
    time: '30 min',
    difficulty: 'Easy',
    rating: 4.7,
    description: 'Char-grilled paneer coated with chaat masala and Kashmiri chilli for vibrant flavor.',
    ingredients: ['Chaat Masala', 'Kashmiri Chilli', 'Yoghurt', 'Paneer', 'Lemon'],
    steps: [
      'Mix yoghurt, spices, lemon juice, and a hint of oil.',
      'Coat paneer cubes and let them marinate.',
      'Skewer and grill until lightly charred.',
      'Serve with mint chutney and onion rings.'
    ],
    spiceTags: ['Chaat Masala', 'Kashmiri Chilli']
  },
  {
    id: 4,
    title: 'Sambar',
    image: imageAssets.recipes.dal,
    time: '40 min',
    difficulty: 'Medium',
    rating: 4.8,
    description: 'A comforting South Indian lentil stew with sambar powder and turmeric for depth.',
    ingredients: ['Sambar Powder', 'Turmeric', 'Toor Dal', 'Vegetables', 'Tamarind'],
    steps: [
      'Cook dal with turmeric and water until soft.',
      'Boil vegetables in tamarind water and sambar powder.',
      'Combine the dal and vegetable base.',
      'Finish with a tempering of mustard seeds and curry leaves.'
    ],
    spiceTags: ['Sambar Powder', 'Turmeric']
  }
];
