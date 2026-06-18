import { imageAssets } from '../config/imageAssets';

export const recipes = [
  {
    id: 1,
    title: 'Aachar Special Pickle',
    image: imageAssets.recipes.aachar,
    cookTime: '30 minutes',
    difficulty: 'Medium',
    servings: 6,
    description: 'Traditional homemade pickle prepared with the perfect balance of Aachar Mirchi and authentic spices.',
    ingredients: [
      '500 g raw mango pieces',
      '3 tbsp Aachar Mirchi',
      '2 tbsp Rai Powder',
      '1 tbsp Rai Dal',
      '2 tbsp mustard oil',
      '1 tsp salt',
      '1 tsp turmeric powder',
      '1 tbsp lemon juice'
    ],
    steps: [
      'Wash and dry the mango pieces thoroughly so the pickle stays crisp and aromatic.',
      'Mix the mango pieces with salt, lemon juice, and a little mustard oil until evenly coated.',
      'Roast the Rai Dal briefly in a dry pan for a deeper aroma, then cool it before grinding lightly.',
      'Combine Aachar Mirchi, Rai Powder, the lightly crushed Rai Dal, and turmeric powder in a bowl.',
      'Add the spice mix to the mango pieces and toss well to ensure every piece is coated.',
      'Transfer the pickle to a clean jar, pour the remaining oil on top, and seal tightly.',
      'Let the pickle rest for 24 hours before serving for the best flavor and texture.'
    ],
    tips: [
      'Use dry, spotless jars to keep the pickle fresh for longer.',
      'If you prefer extra tang, add a little extra lemon juice before sealing.',
      'For a milder version, reduce the Aachar Mirchi slightly and balance with extra oil.'
    ],
    spiceTags: ['Aachar Mirchi', 'Rai Powder', 'Rai Dal']
  },
  {
    id: 2,
    title: 'Spicy Red Chilli Curry',
    image: imageAssets.recipes.spicyCurry,
    cookTime: '40 minutes',
    difficulty: 'Medium',
    servings: 4,
    description: 'Flavorful curry enhanced with the bold taste and natural color of Lion Red Chilli Powder.',
    ingredients: [
      '250 g mixed vegetables',
      '2 tbsp Red Chilli Powder',
      '1 tbsp Coriander Powder',
      '1 tsp Turmeric Powder',
      '2 tomatoes, chopped',
      '1 onion, sliced',
      '2 tbsp oil',
      '1 cup water',
      'Salt to taste'
    ],
    steps: [
      'Heat oil in a pan and sauté the onions until soft and lightly golden.',
      'Add the tomatoes and cook until they turn soft and the oil separates.',
      'Stir in Red Chilli Powder, Coriander Powder, Turmeric Powder, and salt for a fragrant masala base.',
      'Add the vegetables and toss well so they absorb the spice mixture.',
      'Pour in water, cover, and simmer until the vegetables are cooked through and the curry thickens.',
      'Adjust the consistency with a splash more water if needed, then finish with fresh coriander.',
      'Serve hot with rice or flatbread for a rich and colorful meal.'
    ],
    tips: [
      'Use fresh tomatoes for a deeper, richer gravy color.',
      'Add a pinch of sugar to balance the spice if you like a slightly sweeter curry.',
      'For extra aroma, finish with a small amount of ghee before serving.'
    ],
    spiceTags: ['Red Chilli Powder', 'Coriander Powder', 'Turmeric Powder']
  },
  {
    id: 3,
    title: 'Traditional Turmeric Dal',
    image: imageAssets.recipes.turmericDal,
    cookTime: '35 minutes',
    difficulty: 'Easy',
    servings: 4,
    description: 'Comforting homemade dal prepared with pure turmeric and aromatic spices.',
    ingredients: [
      '1 cup yellow lentils',
      '1 tsp Turmeric Powder',
      '1 tbsp Coriander Powder',
      '1 onion, finely chopped',
      '2 garlic cloves, minced',
      '1 tbsp ghee',
      '1 tsp cumin seeds',
      'Salt to taste',
      '3 cups water'
    ],
    steps: [
      'Wash the lentils thoroughly and cook them with turmeric powder and water until soft.',
      'In a separate pan, heat ghee and temper with cumin seeds until they crackle.',
      'Add onion and garlic, then sauté until fragrant and lightly golden.',
      'Stir in Coriander Powder and cook for 30 seconds to release its aroma.',
      'Pour the tempered masala into the cooked dal and mix gently.',
      'Simmer for another 5–7 minutes, allowing the flavors to combine.',
      'Adjust salt and serve hot with rice, roti, or steamed vegetables.'
    ],
    tips: [
      'Do not overcook the lentils; a soft texture gives the best dal consistency.',
      'A small spoon of ghee at the end adds a restaurant-style finish.',
      'Top with fresh coriander and lemon juice for extra freshness.'
    ],
    spiceTags: ['Turmeric Powder', 'Coriander Powder']
  },
  {
    id: 4,
    title: 'Rai Tempered Vegetable Curry',
    image: imageAssets.recipes.vegetableCurry,
    cookTime: '25 minutes',
    difficulty: 'Easy',
    servings: 4,
    description: 'Healthy and flavorful vegetable curry prepared with the authentic taste of Rai Powder and Rai Dal.',
    ingredients: [
      '2 cups mixed vegetables',
      '1 tbsp Rai Powder',
      '1 tbsp Rai Dal',
      '1 tsp turmeric powder',
      '1 onion, chopped',
      '2 tbsp oil',
      '1 cup water',
      'Salt to taste',
      'Fresh coriander for garnish'
    ],
    steps: [
      'Heat oil in a pan and add the Rai Dal, letting it splutter gently for a few seconds.',
      'Add onion and cook until soft and lightly browned.',
      'Stir in Rai Powder and turmeric powder to build the base flavor.',
      'Add the vegetables and toss until evenly coated with the spice mix.',
      'Pour in water, cover, and cook until the vegetables become tender.',
      'Uncover and simmer briefly to thicken the curry just right.',
      'Garnish with fresh coriander and serve with rice or roti.'
    ],
    tips: [
      'Keep the Rai Dal lightly toasted for deeper aroma without burning it.',
      'Use seasonal vegetables for the best texture and taste.',
      'A splash of coconut milk can be added for a creamier finish.'
    ],
    spiceTags: ['Rai Powder', 'Rai Dal']
  }
];
