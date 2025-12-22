export const nutrientCategories = [
    { id: 'protein', label: 'Proteins', color: 'var(--accent-blue)' },
    { id: 'carbs', label: 'Carbohydrates', color: 'var(--accent-green)' },
    { id: 'fats', label: 'Healthy Fats', color: 'var(--accent-teal)' },
    { id: 'fiber', label: 'Fiber', color: 'var(--accent-purple)' },
    { id: 'iron', label: 'Iron', color: '#f43f5e' }, // Rose color
    { id: 'calcium', label: 'Calcium', color: '#eab308' } // Yellow color
];

export const foodRecommendations = {
    protein: [
        { name: 'Paneer (Cottage Cheese)', amount: '100g', value: '18g Protein', cal: 265 },
        { name: 'Lentils (Dal)', amount: '1 cup', value: '18g Protein', cal: 230 },
        { name: 'Chickpeas (Chana)', amount: '1 cup', value: '15g Protein', cal: 269 },
        { name: 'Greek Yogurt', amount: '1 cup', value: '10g Protein', cal: 59 },
        { name: 'Tofu', amount: '100g', value: '8g Protein', cal: 76 },
        { name: 'Almonds', amount: '30g', value: '6g Protein', cal: 170 }
    ],
    carbs: [
        { name: 'Brown Rice', amount: '1 cup', value: '45g Carbs', cal: 216 },
        { name: 'Oats', amount: '1 cup', value: '27g Carbs', cal: 150 },
        { name: 'Sweet Potato', amount: '1 medium', value: '26g Carbs', cal: 112 },
        { name: 'Quinoa', amount: '1 cup', value: '39g Carbs', cal: 222 },
        { name: 'Banana', amount: '1 medium', value: '27g Carbs', cal: 105 }
    ],
    fats: [
        { name: 'Avocado', amount: '1 medium', value: '21g Fat', cal: 234 },
        { name: 'Walnuts', amount: '30g', value: '18g Fat', cal: 185 },
        { name: 'Chia Seeds', amount: '2 tbsp', value: '9g Fat', cal: 138 },
        { name: 'Olive Oil', amount: '1 tbsp', value: '14g Fat', cal: 119 },
        { name: 'Flax Seeds', amount: '1 tbsp', value: '3g Fat', cal: 37 }
    ],
    iron: [
        { name: 'Spinach', amount: '1 cup', value: '6mg Iron', cal: 41 },
        { name: 'Dark Chocolate', amount: '30g', value: '3mg Iron', cal: 170 },
        { name: 'Lentils', amount: '1 cup', value: '6.6mg Iron', cal: 230 },
        { name: 'Pumpkin Seeds', amount: '30g', value: '2.5mg Iron', cal: 151 }
    ]
};

export const healthTips = [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Aim for 7-9 hours of sleep to improve focus and productivity.",
    "Include protein in every meal to maintain muscle mass.",
    "Walking 10,000 steps a day helps keep your heart healthy.",
    "Reduce added sugars to lower the risk of chronic diseases.",
    "Eat a rainbow of vegetables to get a variety of nutrients.",
    "Practice mindful eating to avoid overeating.",
    "Limit caffeine intake 6 hours before bedtime for better sleep."
];
