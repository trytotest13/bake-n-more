import chocolateCakeImg from '../assets/menu_cake.jpg';
import strawberryCakeImg from '../assets/menu_strawberry_cake.jpg';
import blackForestCakeImg from '../assets/menu_black_forest_cake.jpg';
import butterscotchPastryImg from '../assets/menu_butterscotch_pastry.jpg';
import chocoChipPastryImg from '../assets/menu_pastry.jpg';
import pizzaImg from '../assets/menu_pizza.jpg';
import burgerImg from '../assets/menu_burger.jpg';
import southIndianImg from '../assets/menu_south_indian.jpg';
import celebrationComboImg from '../assets/custom_celebration_cake.jpg';
import specialAssortmentImg from '../assets/bakery_food_assortment.jpg';

export const menuCategories = [
  { id: 'cakes', name: 'Cakes' },
  { id: 'pastries', name: 'Pastries' },
  { id: 'pizzas', name: 'Pizzas' },
  { id: 'burgers', name: 'Burgers & Rolls' },
  { id: 'sandwiches', name: 'Sandwiches' },
  { id: 'noodles-south-indian', name: 'Noodles & South Indian' },
  { id: 'combos', name: 'Combos & Offers' },
];

export const menuSections = [
  {
    id: 'cakes',
    title: 'CAKES',
    subtitle: 'Freshly baked celebration sponges layered with luscious creams & frostings',
    items: [
      {
        id: 'chocolate-cake',
        name: 'Chocolate Cake',
        description: 'Rich decadent chocolate sponge layered with smooth chocolate ganache and chocolate shavings.',
        price: 'Price on request',
        isVeg: true,
        image: chocolateCakeImg,
      },
      {
        id: 'strawberry-cake',
        name: 'Strawberry Cake',
        description: 'Delicate vanilla sponge infused with fresh strawberry compote and light whipped cream.',
        price: 'Price on request',
        isVeg: true,
        image: strawberryCakeImg,
      },
      {
        id: 'black-forest-cake',
        name: 'Black Forest Cake',
        description: 'Classic layers of chocolate sponge, whipped vanilla cream, dark cherries and chocolate flakes.',
        price: 'Price on request',
        isVeg: true,
        image: blackForestCakeImg,
      },
    ],
  },
  {
    id: 'pastries',
    title: 'PASTRIES',
    subtitle: 'Single-serve bakery treats, fresh cream slices and chocolate delights',
    items: [
      {
        id: 'butterscotch-pastry',
        name: 'Butterscotch Pastry',
        description: 'Soft vanilla sponge layered with caramelized butterscotch praline and rich cream.',
        price: 'Price on request',
        isVeg: true,
        image: butterscotchPastryImg,
      },
      {
        id: 'choco-chip-pastry',
        name: 'Choco Chip Pastry',
        description: 'Loaded with premium dark chocolate chips, creamy chocolate mousse and fudge drizzle.',
        price: 'Price on request',
        isVeg: true,
        image: chocoChipPastryImg,
      },
      {
        id: 'black-forest-pastry',
        name: 'Black Forest Pastry',
        description: 'Individual cut of our signature dark chocolate sponge, cherry reduction and whipped frosting.',
        price: 'Price on request',
        isVeg: true,
        image: blackForestCakeImg,
      },
    ],
  },
  {
    id: 'pizzas',
    title: 'PIZZAS',
    subtitle: 'Stone-baked crusts loaded with bubbling mozzarella cheese and fresh café toppings',
    items: [
      {
        id: 'simply-cheese-pizza',
        name: 'Simply Cheese Pizza',
        description: 'Melted golden mozzarella cheese on our house-made tomato sauce and hand-tossed crust.',
        price: 'Price on request',
        isVeg: true,
        image: pizzaImg,
      },
      {
        id: 'bake-n-more-special-pizza',
        name: 'Bake N More Special Pizza',
        description: 'Chef special loaded with crisp bell peppers, sweet corn, paneer cubes, olives and herbs.',
        price: 'Price on request',
        isVeg: true,
        image: specialAssortmentImg,
      },
      {
        id: 'pizza-slices',
        name: 'Pizza Slices',
        description: 'Generous hot and cheesy grab-and-go personal slice, baked fresh throughout the day.',
        price: 'Price on request',
        isVeg: true,
        image: pizzaImg,
      },
    ],
  },
  {
    id: 'burgers',
    title: 'BURGERS, ROLLS & SANDWICHES',
    subtitle: 'Warm café snacks, toasted buns, wraps and multi-layer grilled sandwiches',
    items: [
      {
        id: 'veg-cheese-burger',
        name: 'Veg Cheese Burger',
        description: 'Crisp seasoned vegetable patty topped with melted cheese, fresh tomato, onion and tangy café sauce.',
        price: 'Price on request',
        isVeg: true,
        image: burgerImg,
      },
      {
        id: 'masala-hot-dog',
        name: 'Masala Hot Dog',
        description: 'Spiced savory filling inside a soft toasted bakery bun with signature herb drizzle.',
        price: 'Price on request',
        isVeg: true,
        image: burgerImg,
      },
      {
        id: 'stuffed-pita',
        name: 'Stuffed Pita',
        description: 'Warm pocket pita stuffed with seasoned crunch veggies, cottage cheese and garlic yogurt dressing.',
        price: 'Price on request',
        isVeg: true,
        image: burgerImg,
      },
      {
        id: 'crispy-corn-roll',
        name: 'Crispy Corn Roll',
        description: 'Golden fried crispy tortilla roll filled with sweet corn kernels, cheese and spices.',
        price: 'Price on request',
        isVeg: true,
        image: burgerImg,
      },
      {
        id: 'veg-grilled-sandwich',
        name: 'Veg Grilled Sandwich',
        description: 'Three-layered toasted sandwich with garden-fresh veggies, mint chutney and melted cheese.',
        price: 'Price on request',
        isVeg: true,
        image: burgerImg,
      },
    ],
  },
  {
    id: 'noodles-south-indian',
    title: 'NOODLES & SOUTH INDIAN',
    subtitle: 'Wok-tossed street-style noodles and authentic crisp South Indian dosas with chutneys',
    items: [
      {
        id: 'singapuri-noodles',
        name: 'Singapuri Noodles',
        description: 'Wok-tossed noodles with shredded cabbage, capsicum, carrots in aromatic curry-tinged spices.',
        price: 'Price on request',
        isVeg: true,
        image: southIndianImg,
      },
      {
        id: 'veg-noodles',
        name: 'Veg Noodles',
        description: 'Classic street-style stir-fried hakka noodles with crunchy vegetables and savory soya seasoning.',
        price: 'Price on request',
        isVeg: true,
        image: southIndianImg,
      },
      {
        id: 'masala-dosa',
        name: 'Masala Dosa',
        description: 'Crisp golden rice-lentil crepe wrapped around spiced potato masala, served with sambhar and chutneys.',
        price: 'Price on request',
        isVeg: true,
        image: southIndianImg,
      },
    ],
  },
];
