import { Product, ScentNotes } from '../types';

export const PREMIUM_PRODUCTS: Product[] = [
  {
    id: 'arz-01',
    name: 'Oud Al Karachi',
    brand: 'Arzhaar Brhave',
    price: 8500,
    originalPrice: 10500,
    rating: 4.9,
    reviewsCount: 48,
    gender: 'Unisex',
    category: 'Luxury',
    scentType: 'Woody Oriental',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'A rich celebration of Karachi’s evening sea breeze mixed with golden agarwood and exotic spices.',
    description: 'Oud Al Karachi is the flagship masterwork from Arzhaar Brhave. Inspired by the warm, breezy evenings of the Arabian Sea intersecting the city’s lively spice bazaars. It opens with an exhilarating splash of saffron and cardamon, settling into a deep, mesmerizing heart of pure Cambodian Oud and Taif Rose, and leaves a persistent, unforgettable trail of amber, leather, and white musk.',
    ingredients: 'Alcohol Denat, Aqua (Water), Parfum (Fragrance), Linalool, Limonene, Benzyl Salicylate, Oud Essence Oil, Oud Al-Karachi, Geraniol, Citronellol.',
    sizePriceMultipliers: {
      '30ml': 0.7,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 19,
    statusTags: ['Best Seller', 'Signature'],
    reviews: [
      { id: 'rev-01-1', userName: 'Zia Ahmed', rating: 5, comment: 'Outstanding performance! Lasts easily over 14 hours. The Cambodian Oud is very smooth and not animalic at all. High luxury!', date: '2026-05-12', helpfulCount: 14 },
      { id: 'rev-01-2', userName: 'Mariam Ali', rating: 5, comment: 'Absolutely divine. Got multiple compliments at a wedding in Clifton. The packing was royal.', date: '2026-05-18', helpfulCount: 9 },
      { id: 'rev-01-3', userName: 'Kamran Khan', rating: 4, comment: 'Very potent scent, a bit heavy for the afternoon sun but absolutely spectacular for late evening wear.', date: '2026-05-20', helpfulCount: 3 }
    ]
  },
  {
    id: 'arz-02',
    name: 'Asad Special',
    brand: 'Lattafa',
    price: 4800,
    originalPrice: 5500,
    rating: 4.7,
    reviewsCount: 32,
    gender: 'Men',
    category: 'Best Sellers',
    scentType: 'Warm Spicy',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'An exclusive bold blend of black pepper, rich coffee, vanilla, and sweet tobacco.',
    description: 'Lattafa Asad is an iconic vanilla-warm spicy fragrance for men. The scent profile projects elegance with a powerful spice opening, creating a mesmerizing blend of black pepper, pineapple, coffee, patchouli, and a strong base of amberwood, premium vanilla, dry wood, and labdanum.',
    ingredients: 'Alcohol Denat, Parfum, Aqua (Water), Limonene, Coumarin, Linalool, Citronellol, Eugenol.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5,
    },
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1512303500371-55536e95a535?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 12,
    statusTags: ['Best Seller'],
    reviews: [
      { id: 'rev-02-1', userName: 'Fahad Malik', rating: 5, comment: 'Scent profile is awesome. Smells like a high-end French designer scent. Price is super reasonable.', date: '2026-04-30', helpfulCount: 8 }
    ]
  },
  {
    id: 'arz-03',
    name: 'Wisal Dhahab',
    brand: 'Ajmal',
    price: 6200,
    originalPrice: 7500,
    rating: 4.8,
    reviewsCount: 29,
    gender: 'Unisex',
    category: 'Luxury',
    scentType: 'Floral Woody',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'Golden liquid projection of premium orchid, geranium, sandalwood, and sweet musk.',
    description: 'Wisal Dhahab by Ajmal is crafted for those seeking to add an extra touch of gold and luxury to their aura. Built around fresh floral-woody infusions, it blooms with notes of rose, jasmine, geranium, sandalwood, and heavy amber.',
    ingredients: 'Aqua, Premium Parfum, Sandalwood Extracts, Floral Attar Concentrates, Benzyl Alcohol.',
    sizePriceMultipliers: {
      '30ml': 0.7,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 17,
    statusTags: ['Luxury'],
    reviews: [
      { id: 'rev-03-1', userName: 'Aisha Baloch', rating: 5, comment: 'Very beautiful floral woody scent. Smells exceptionally royal and lasts on clothes for days.', date: '2026-05-02', helpfulCount: 11 }
    ]
  },
  {
    id: 'arz-04',
    name: 'Hawas for Him',
    brand: 'Rasasi',
    price: 11500,
    originalPrice: 13000,
    rating: 4.8,
    reviewsCount: 112,
    gender: 'Men',
    category: 'Best Sellers',
    scentType: 'Fresh Aquatic',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'An aquatic masterpiece blending cinnamon, green apple, fresh melon, and salty ambergris.',
    description: 'Rasasi Hawas has taken the international perfume community by storm. Featuring an energetic aquatic vibe with apple, grey amber, sandalwood, and violet, it represents the ultimate power of freshness combined with premium longevity.',
    ingredients: 'Alcohol, Fragrance, Water, Limonene, Methyl-2-octynoate, Citral, Geraniol, Evernia Prunastri Extract.',
    sizePriceMultipliers: {
      '30ml': 0.65,
      '50ml': 1.0,
      '100ml': 1.55
    },
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1588405748373-122b2321bc31?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 11,
    statusTags: ['Best Seller', 'Trending'],
    reviews: [
      { id: 'rev-04-1', userName: 'Imran Shah', rating: 5, comment: 'Best compliment-getter in my collection! Perfect for Karachi summers. Absolutely refreshing.', date: '2026-05-15', helpfulCount: 22 }
    ]
  },
  {
    id: 'arz-05',
    name: 'Karachi Rose Oud',
    brand: 'Arzhaar Brhave',
    price: 7900,
    originalPrice: 9500,
    rating: 4.6,
    reviewsCount: 21,
    gender: 'Women',
    category: 'Women',
    scentType: 'Rose Floral Oud',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'Bespoke damask rose layered on a smooth dark cushion of vanilla and white agarwood.',
    description: 'Karachi Rose Oud captures the absolute elegance of hand-picked Taif roses wrapped in a luxurious, warm velvet coat of agarwood, honey, and madagascar vanilla. It evokes the feeling of premium Karachi high society gatherings.',
    ingredients: 'Perfume Extract, Water, Damascene Rose oil, Vanilla Absolute, Patchouli, Oud Oil.',
    sizePriceMultipliers: {
      '30ml': 0.7,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1627850604058-df3afccf997f?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 16,
    statusTags: ['New Arrival'],
    reviews: [
      { id: 'rev-05-1', userName: 'Saba Naqvi', rating: 5, comment: 'Sweet, highly luxurious rose scent. The sweet wood background prevents it from being overly sweet. Absolute love.', date: '2026-05-19', helpfulCount: 6 }
    ]
  },
  {
    id: 'arz-06',
    name: 'Sultani Blue',
    brand: 'Al Haramain',
    price: 9200,
    originalPrice: 11000,
    rating: 4.5,
    reviewsCount: 15,
    gender: 'Men',
    category: 'Luxury',
    scentType: 'Citrus Aquatic',
    longevity: '8-12 Hours',
    sillage: 'Moderate',
    shortDescription: 'Fresh bergamot, grapefruit, lavender, and rich dark cedarwood.',
    description: 'Sultani Blue expresses modern royalty. Crisp, citrusy highlights merge with lavender, pepper, and cedarwood to create a masculine charisma. Perfectly wearable in corporate settings and casual luxury affairs.',
    ingredients: 'Alcohol Denat, Citral, Linalool, Limonene, Aqua, Fragrance Oils.',
    sizePriceMultipliers: {
      '30ml': 0.7,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1615655403159-8664687d61b3?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615655403159-8664687d61b3?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 16,
    statusTags: ['New Arrival'],
    reviews: [
      { id: 'rev-06-1', userName: 'Bilal Farooqi', rating: 4, comment: 'Super fresh and elegant. Reminds me of the Mediterranean. Great performance inside air-conditioned rooms.', date: '2026-05-05', helpfulCount: 4 }
    ]
  },
  {
    id: 'arz-07',
    name: 'Khamrah Divine',
    brand: 'Lattafa',
    price: 5900,
    originalPrice: 7000,
    rating: 4.9,
    reviewsCount: 145,
    gender: 'Unisex',
    category: 'Best Sellers',
    scentType: 'Gourmand Sweet',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'Luxurious vanilla bouquet, warm dates, baked praline, cinnamon, and balsamic amber.',
    description: 'Lattafa Khamrah is a viral superstar. Unbelievably rich and intoxicating sweetness. It mixes warm dates, toasted pralines, vanilla pod extracts, warm cinnamon bark oil, and expensive resins. A sweet, warm gourmand cloud that lasts for days.',
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Coumarin, Cinnamyl Alcohol, Linalool, Eugenol, Benzyl Benzoate.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 15,
    statusTags: ['Best Seller', 'Viral'],
    reviews: [
      { id: 'rev-07-1', userName: 'Aamir Sohail', rating: 5, comment: 'What a beast of a fragrance! The date and praline scent is beautiful. Excellent value for money. Easily lasts 16+ hours!', date: '2026-05-24', helpfulCount: 41 }
    ]
  },
  {
    id: 'arz-08',
    name: 'Majestic Jasmine Attar',
    brand: 'Arzhaar Brhave',
    price: 3200,
    originalPrice: 4000,
    rating: 4.8,
    reviewsCount: 18,
    gender: 'Unisex',
    category: 'Attar',
    scentType: 'White Floral Concentrated',
    longevity: '12+ Hours',
    sillage: 'Strong',
    shortDescription: '100% alcohol-free concentrated oil of delicate white jasmine blossoms and precious sandalwood.',
    description: 'This is a premium, traditional concentrated fragrance oil (attar). Absolutely alcohol-free. Distilled with standard artisanal techniques in Karachi, taking standard organic Jasmine flowers and binding them to heavy sandalwood extract. A single drop offers full-day deep, pristine, refreshing floral sillage.',
    ingredients: '100% Pure Sandalwood Oil base, Jasmine Flower Essential Oils, Organic Musk.',
    sizePriceMultipliers: {
      '30ml': 0.8, // Attars have less size variance or highly dense pricing
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 20,
    statusTags: ['Pure Attar', 'Organic'],
    reviews: [
      { id: 'rev-08-1', userName: 'Hassan Raza', rating: 5, comment: 'Clean, beautiful jasmine scent without the harshness of alcohol. Feels very traditional yet elite.', date: '2026-05-11', helpfulCount: 5 }
    ]
  },
  {
    id: 'arz-09',
    name: 'Amber Wood',
    brand: 'Ajmal',
    price: 11900,
    originalPrice: 14000,
    rating: 4.9,
    reviewsCount: 54,
    gender: 'Unisex',
    category: 'Luxury',
    scentType: 'Amber Woody',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'A true masterpiece of warm cedarwood, cardamom, patchouli, and golden liquid amber.',
    description: 'Ajmal Amber Wood is a masterpiece. Deeply warm, luxurious, sparkling with spices and dry woods. It features cardamom, white pepper, lavender, and deep patchouli, with a dry-down emphasizing powerful raw amber.',
    ingredients: 'Premium Parfum, Alcohol, Amber extracts, Cedarwood essential oil, Limonene.',
    sizePriceMultipliers: {
      '30ml': 0.65,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1512303500371-55536e95a535?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512303500371-55536e95a535?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 15,
    statusTags: ['Best Seller', 'Masterpiece'],
    reviews: [
      { id: 'rev-09-1', userName: 'Salman Sheikh', rating: 5, comment: 'The projection is huge! This is easily in the top 3 woody scents of all time. Definitely worth every rupee.', date: '2026-05-09', helpfulCount: 16 }
    ]
  },
  {
    id: 'arz-10',
    name: 'Egra for Men',
    brand: 'Rasasi',
    price: 3900,
    originalPrice: 4500,
    rating: 4.4,
    reviewsCount: 22,
    gender: 'Men',
    category: 'Men',
    scentType: 'Green Fougere',
    longevity: '6-8 Hours',
    sillage: 'Moderate',
    shortDescription: 'Clean, green forest essence with violet leaf, sandalwood, and sweet moss.',
    description: 'Rasasi Egra is a highly energetic fougere scent presenting the freshness of mountain herbs, wild violet leaves, iris, fir, and intense oakmoss. It is exceptionally clean and professional, suited for burning hot seasons.',
    ingredients: 'Alcohol Denat, Aqua, Fragrance, Coumarin, Benzyl Alcohol, Evernia furfuracea.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1590156546746-c58d048d8440?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590156546746-c58d048d8440?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 13,
    statusTags: ['Classic'],
    reviews: [
      { id: 'rev-10-1', userName: 'Noman Butt', rating: 4, comment: 'Smells exactly like Irish tweed. Very fresh, masculine, and has a pleasant mossy dry-down.', date: '2026-05-14', helpfulCount: 3 }
    ]
  },
  {
    id: 'arz-11',
    name: 'Karachi Midnight',
    brand: 'Arzhaar Brhave',
    price: 7200,
    originalPrice: 8500,
    rating: 4.7,
    reviewsCount: 25,
    gender: 'Men',
    category: 'New Arrivals',
    scentType: 'Leather Amber',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'An ultra-modern masculine night scent featuring dark Tuscan leather, raspberry, and frankincense.',
    description: 'Karachi Midnight is a love letter to Karachi’s active late-night culture. Formulated with top notes of sweet raspberry and hot saffron, transitioning into a bold center of jasmine and leather, and settled on high-quality amberwood, cedar, and vetiver.',
    ingredients: 'Perfume concentrates, Alcohol, Water, Saffron, Leather distillates, Cedarwood extract.',
    sizePriceMultipliers: {
      '30ml': 0.7,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1557170334-a96405f63d24?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1557170334-a96405f63d24?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 15,
    statusTags: ['Trending', 'Hot'],
    reviews: [
      { id: 'rev-11-1', userName: 'Yaseen Shah', rating: 5, comment: 'Pure class in a bottle! That sweet raspberry and dark leather combo is incredibly captivating.', date: '2026-05-22', helpfulCount: 7 }
    ]
  },
  {
    id: 'arz-12',
    name: 'Sandalwood Musk Attar',
    brand: 'Arzhaar Brhave',
    price: 2900,
    originalPrice: 3500,
    rating: 4.6,
    reviewsCount: 12,
    gender: 'Unisex',
    category: 'Attar',
    scentType: 'Woody Creamy Musk',
    longevity: '12+ Hours',
    sillage: 'Moderate',
    shortDescription: 'Rich, smooth Indian Sandalwood concentrate enriched with exquisite white musk.',
    description: 'A luxurious alcohol-free attar, featuring rich and creamy Mysore Sandalwood distillations, accented by soft fluffy white musk. Gentle on the skin and incredibly long-lasting.',
    ingredients: 'Concentrated perfume oil, Mysore Sandalwood absolute, Light white musk, Cedarwood fractions.',
    sizePriceMultipliers: {
      '30ml': 0.8,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 17,
    statusTags: ['Pure Attar'],
    reviews: [
      { id: 'rev-12-1', userName: 'Tariq Lodhi', rating: 5, comment: 'Incredibly soothing scent. Perfect to apply after Friday prayers. Highly recommended.', date: '2026-04-18', helpfulCount: 2 }
    ]
  },
  {
    id: 'arz-13',
    name: 'Yara Rose Couture',
    brand: 'Lattafa',
    price: 4900,
    originalPrice: 5600,
    rating: 4.8,
    reviewsCount: 89,
    gender: 'Women',
    category: 'Women',
    scentType: 'Sweet Floral Gourmand',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'Fluffy pink marshmallow, sweet vanilla orchids, juicy tropical fruits, and heavy musk.',
    description: 'Yara Rose Couture is a gorgeous sweet-gourmand fragrance for women. It smells like standard strawberries, heavy vanilla cream, fluffy marshmallows, and delicate orchids. Perfect for sweet fragrance wearers seeking immense projection.',
    ingredients: 'Alcohol denat., Aqua, Fragrance, Benzyl Salicylate, Benzyl Benzoate, Anise Alcohol.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 12,
    statusTags: ['Best Seller', 'Best For Women'],
    reviews: [
      { id: 'rev-13-1', userName: 'Zoya Rahim', rating: 5, comment: 'Sweetest, most comforting strawberry vanilla cloud ever. Got me endless compliments.', date: '2026-05-23', helpfulCount: 14 }
    ]
  },
  {
    id: 'arz-14',
    name: 'Shuhrah Pour Homme',
    brand: 'Rasasi',
    price: 5200,
    originalPrice: 6000,
    rating: 4.6,
    reviewsCount: 37,
    gender: 'Men',
    category: 'Men',
    scentType: 'Leathery Floral Smokey',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'An ultra-beast mode mix of robust dry tobacco, dark rose, tomato leaf, and leather.',
    description: 'Rasasi Shuhrah is a legendary projector. Known in the perfume community as a true nuclear scent. A powerful combination of tomato leaf, freesia, dry tobacco leaves, jasmine, leather, and oakmoss that stays on clothes for multiple washes.',
    ingredients: 'Alcohol Denat, Aqua, Fragrance, Benzyl Alcohol, Citral, Citronellol, Eugenol, Tobacco Concentrates.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 13,
    statusTags: ['Beast Mode'],
    reviews: [
      { id: 'rev-14-1', userName: 'Waqas Jafri', rating: 5, comment: 'Unbelievable longevity. Scent projection is massive. Just 2 sprays are enough for the whole day.', date: '2026-05-21', helpfulCount: 9 }
    ]
  },
  {
    id: 'arz-15',
    name: 'Karachi Royale Amber',
    brand: 'Arzhaar Brhave',
    price: 9900,
    originalPrice: 12000,
    rating: 4.9,
    reviewsCount: 19,
    gender: 'Unisex',
    category: 'Luxury',
    scentType: 'Amber Spiced Spicy',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'Sumptuous, golden molten amber absolute laced with fresh cinnamon, patchouli, and raw tobacco.',
    description: 'Arzhaar Brhave Karachi Royale Amber is a stunning luxury formulation. Designed with ultra-thick natural amber extracts, rich patchouli leaves, dark tobacco absolute, bourbon vanilla, and spicy cinnamon. Feels highly regal and complex.',
    ingredients: 'Parfum, Alcohol Denat, Cinnamon oil, Amber resin absolute, Coumarin, Eugenol, Oakmoss extract.',
    sizePriceMultipliers: {
      '30ml': 0.7,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1458538977777-0549b23f65d3?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1458538977777-0549b23f65d3?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 17,
    statusTags: ['Exclusive', 'Artisanal'],
    reviews: [
      { id: 'rev-15-1', userName: 'Yumna Fatima', rating: 5, comment: 'Warm, resinous, comforting, and incredibly heavy. Pure luxury.', date: '2026-05-18', helpfulCount: 4 }
    ]
  },
  {
    id: 'arz-16',
    name: 'Daarej pour Homme',
    brand: 'Rasasi',
    price: 4500,
    originalPrice: 5000,
    rating: 4.7,
    reviewsCount: 61,
    gender: 'Men',
    category: 'Best Sellers',
    scentType: 'Vanilla Spicy Powdery',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'Sensual spicy cardamom, cumin, sweet vanilla, tonka bean, and warm creamy sandalwood.',
    description: 'Rasasi Daarej is a highly seductive, spicy masculine masterpiece. Opens with sharp cumin, cardamom, and mugwort, developing into a sweet flowery heart of rose and root, before resolving into thick patchouli, sweet amber, warm sandalwood, vanilla, and tonka.',
    ingredients: 'Alcohol Denat, Aqua, Fragrance, Coumarin, Cumin Distillates, Vanillin, Linalool.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 10,
    statusTags: ['Best Seller', 'Seductive'],
    reviews: [
      { id: 'rev-16-1', userName: 'Asif Mahmood', rating: 5, comment: 'Best date night scent! Ridiculously cheap for this level of complex sweet-spicy vanilla.', date: '2026-05-20', helpfulCount: 12 }
    ]
  },
  {
    id: 'arz-17',
    name: 'Oud 24 Hours',
    brand: 'Ard Al Zaafaran',
    price: 3500,
    originalPrice: 4200,
    rating: 4.5,
    reviewsCount: 28,
    gender: 'Unisex',
    category: 'Unisex',
    scentType: 'Warm Gourmand Oud',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'Chocolate-drenched dark orchids, sweet vanilla, sandalwood, and soft agarwood.',
    description: 'Oud 24 Hours is a luscious dark gourmand. Inspired by high-end dark chocolate and black truffle scents, it blends sweet orchid blossoms, sandalwood, light woody oud fractions, incense, and luxurious vanilla bean pulp.',
    ingredients: 'Alcohol denat, Parfum, Aqua (water), Hexyl Cinnamal, Linalool, Chocolatum flavor fractions.',
    sizePriceMultipliers: {
      '30ml': 0.8,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1528740561666-ac2479dc0002?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1528740561666-ac2479dc0002?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 16,
    statusTags: ['Budget Value'],
    reviews: [
      { id: 'rev-17-1', userName: 'Khurram Shahzad', rating: 4, comment: 'Extremely sweet and delicious. Smells expensive. Incredible price packaging.', date: '2026-05-10', helpfulCount: 3 }
    ]
  },
  {
    id: 'arz-18',
    name: 'Karachi Fresh Breeze',
    brand: 'Arzhaar Brhave',
    price: 4500,
    originalPrice: 5500,
    rating: 4.6,
    reviewsCount: 14,
    gender: 'Unisex',
    category: 'New Arrivals',
    scentType: 'Citrus Fresh Aquatic',
    longevity: '6-8 Hours',
    sillage: 'Moderate',
    shortDescription: 'An energizing burst of crushed sea salt, green lime, cool mint, and salty vetiver.',
    description: 'Formulated to conquer the hot, sticky summers of Karachi. Arzhaar Brhave Karachi Fresh Breeze is an instant cool-down. Clean, sharp key lime, real mineral sea salt, peppermint oils, lavender, and absolute clean light woody vetiver.',
    ingredients: 'Alcohol, Water, Mentha piperita oil, Citrus aurantifolia essence, Fragrance oil complexes.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1595131838555-57271c96a604?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595131838555-57271c96a604?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 18,
    statusTags: ['Summer Ideal', 'New'],
    reviews: [
      { id: 'rev-18-1', userName: 'Adeel Murtaza', rating: 5, comment: 'A lifesaver in Karachi heat! Extremely cooling minty opening. Lasts very well for a citrus fresh cologne.', date: '2026-05-17', helpfulCount: 4 }
    ]
  },
  {
    id: 'arz-19',
    name: 'Fakhar Extract',
    brand: 'Lattafa',
    price: 4900,
    originalPrice: 5800,
    rating: 4.5,
    reviewsCount: 31,
    gender: 'Men',
    category: 'Men',
    scentType: 'Aromatic Sweet Fougere',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'Sweet crisp red apple oil, premium sage leaf, heavy lavender, and amberwood roots.',
    description: 'Lattafa Fakhar presents a luxurious designer fragrance vibe. Very aromatic, opening with apple fruit pulp, ginger root, and bergamot, with a thick cedarwood and amberwood dry down.',
    ingredients: 'Alcohol, Aqua, Parfum, Benzyl Salicylate, Citral, Citronellol, Coumarin, Geraniol.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1631730359575-38e4755d772b?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1631730359575-38e4755d772b?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 15,
    statusTags: ['Top Compliments'],
    reviews: [
      { id: 'rev-19-1', userName: 'Sohail Tanveer', rating: 4, comment: 'Excellent presentation. Very versatile. Smells like expensive luxury malls.', date: '2026-05-13', helpfulCount: 2 }
    ]
  },
  {
    id: 'arz-20',
    name: 'Dehn Al Oud Attar',
    brand: 'Ajmal',
    price: 5500,
    originalPrice: 6500,
    rating: 4.8,
    reviewsCount: 19,
    gender: 'Unisex',
    category: 'Attar',
    scentType: 'Traditional Cambodian Oud',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'Thick, ultra-potent classic concentrated oil of pure cured Cambodian agarwood.',
    description: 'Dehn Al Oud by Ajmal is highly respected by traditional fragrance connoisseurs. Made from pure, deep-aged Cambodian wood condensations. Zero alcohol. Incredibly rich woodiness.',
    ingredients: '100% Pure Cambodian Agarwood Oil distillation.',
    sizePriceMultipliers: {
      '30ml': 0.8,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 15,
    statusTags: ['Traditional', 'Pure Oil'],
    reviews: [
      { id: 'rev-20-1', userName: 'Farooq Ahmed', rating: 5, comment: 'Pure authentic oudh. Rich wood depth. Lasts forever on cuffs.', date: '2026-05-02', helpfulCount: 8 }
    ]
  },
  {
    id: 'arz-21',
    name: 'Bade\'e Al Oud (Oud for Glory)',
    brand: 'Lattafa',
    price: 6500,
    originalPrice: 7500,
    rating: 4.8,
    reviewsCount: 92,
    gender: 'Unisex',
    category: 'Best Sellers',
    scentType: 'Woody Herbal Spicy',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'Bold dark luxury of medicinal saffron, warm lavender, nutmeg, patchouli, and earthy oud wood.',
    description: 'Often referred to as the "Oud for Glory," this fragrance is highly smoky, spicy, and woody. Combining sharp saffron, lavender, patchouli, wood oil, musk, and premium incense.',
    ingredients: 'Alcohol denat, Parfum (Fragrance), Safran oil, Nutmeg distillate, Patchouli extract.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 13,
    statusTags: ['Glorious', 'Best Seller'],
    reviews: [
      { id: 'rev-21-1', userName: 'Javed Miandad', rating: 5, comment: 'Spectacular. Smells like elite power and royalty. Heavy sillage!', date: '2026-05-18', helpfulCount: 19 }
    ]
  },
  {
    id: 'arz-22',
    name: 'Teef Al Hub',
    brand: 'Ard Al Zaafaran',
    price: 4200,
    originalPrice: 5000,
    rating: 4.7,
    reviewsCount: 23,
    gender: 'Women',
    category: 'Women',
    scentType: 'Rose Vanilla Powdery',
    longevity: '8-12 Hours',
    sillage: 'Strong',
    shortDescription: 'Captivating soft red rose petals, powdered white sugar, creamy vanilla, and musk.',
    description: 'Teef Al Hub is a beautiful romantic translation. It embodies the sweetness of standard confectioneries mingled with freshly cut rose blooms. A powdery vanilla wrap makes it very cozy.',
    ingredients: 'Alcohol Denat, Aqua, Fragrance, Rose oil fraction, Vanillin absolute.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1512303500371-55536e95a535?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512303500371-55536e95a535?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 16,
    statusTags: ['Romantic Scent'],
    reviews: [
      { id: 'rev-22-1', userName: 'Sana Javed', rating: 5, comment: 'Extremely feminine and beautiful. Smells sweet like fresh rose candy! Hubby loved it.', date: '2026-05-20', helpfulCount: 4 }
    ]
  },
  {
    id: 'arz-23',
    name: 'Karachi Velvet Gold',
    brand: 'Arzhaar Brhave',
    price: 8900,
    originalPrice: 10800,
    rating: 4.9,
    reviewsCount: 16,
    gender: 'Women',
    category: 'Luxury',
    scentType: 'Floral Amber Gourmand',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'Rich orange blossom, orchid, molten white chocolate, patchouli, and heavy golden amber.',
    description: 'Arzhaar Brhave Velvet Gold represents absolute custom velvet luxury. It pairs radiant white floral citrus oils with creamy French chocolate, caramel, amber extracts, and sweet dry woods. Absolutely captivating and deeply lingering.',
    ingredients: 'Perfume concentrates, Alcohol denat, Water, Caramel flavor fractions, Sandalwood absolute.',
    sizePriceMultipliers: {
      '30ml': 0.7,
      '50ml': 1.0,
      '100ml': 1.6
    },
    image: 'https://images.unsplash.com/photo-1590156546746-c58d048d8440?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590156546746-c58d048d8440?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 17,
    statusTags: ['Luxury', 'Limited Edition'],
    reviews: [
      { id: 'rev-23-1', userName: 'Amna Shah', rating: 5, comment: 'Unbelievably rich velvet. Smells like rich chocolate amber candy layered with white flowers. Outstanding!', date: '2026-05-22', helpfulCount: 3 }
    ]
  },
  {
    id: 'arz-24',
    name: 'Ehsas Al Arabia',
    brand: 'Al Haramain',
    price: 7600,
    originalPrice: 9000,
    rating: 4.6,
    reviewsCount: 11,
    gender: 'Unisex',
    category: 'Unisex',
    scentType: 'Fresh Wood Spicy',
    longevity: '8-12 Hours',
    sillage: 'Moderate',
    shortDescription: 'Vibrant clean lemon grass, patchouli, cardamom, and luxury musk extracts.',
    description: 'Ehsas Al Arabia represents premium Arabian essence. It provides a balanced citric cleanliness and a spicy body of patchouli and musk. Versatile, great for day-long outdoor freshness.',
    ingredients: 'Alcohol, Aqua, Parfum, Citral, Cardamom oil fractions, Musk extract compounds.',
    sizePriceMultipliers: {
      '30ml': 0.75,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 15,
    statusTags: ['Fresh Traditional'],
    reviews: [
      { id: 'rev-24-1', userName: 'Saad Siddiqui', rating: 5, comment: 'Wonderful spicy citrus combination. projects perfectly.', date: '2026-05-15', helpfulCount: 1 }
    ]
  },
  {
    id: 'arz-25',
    name: 'Snoopy Blue Breeze',
    brand: 'Arzhaar Brhave',
    price: 2500,
    originalPrice: 3000,
    rating: 4.3,
    reviewsCount: 17,
    gender: 'Unisex',
    category: 'New Arrivals',
    scentType: 'Citrus Fruity',
    longevity: '6-8 Hours',
    sillage: 'Moderate',
    shortDescription: 'Playful, refreshing sweet orange, blue cotton candy, fresh marine elements, and light vanilla.',
    description: 'Snoopy Blue Breeze is our young, delightful entry-level fresh blend. Opens with vibrant, tangy sweet orange and lemon zest, blending into a center of sweet blue cotton candy and sea-breeze aquatic highlights, drying into cozy light vanilla musk.',
    ingredients: 'Alcohol, Light fragrance compounds, Water, Limonene, Linalool, Vanilla vanillin.',
    sizePriceMultipliers: {
      '30ml': 0.8,
      '50ml': 1.0,
      '100ml': 1.4
    },
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 16,
    statusTags: ['Youth', 'Affordable'],
    reviews: [
      { id: 'rev-25-1', userName: 'Basit Malik', rating: 4, comment: 'Sweet orange and cotton candy. Very fun, playful, budget-friendly and great scent.', date: '2026-05-19', helpfulCount: 4 }
    ]
  },
  {
    id: 'arz-26',
    name: 'Karachi Majestic Attar',
    brand: 'Arzhaar Brhave',
    price: 3600,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 33,
    gender: 'Unisex',
    category: 'Attar',
    scentType: 'Rich Spicy Amber Oud Oil',
    longevity: '12+ Hours',
    sillage: 'Heavy',
    shortDescription: 'Premium alcohol-free pure oil distillation of dark gold amber, black oud wood, and saffron.',
    description: 'This traditional premium attar oil delivers ultimate concentration. Blending Karachi gold amber, rich dark Cambodian wood resin, and natural high-grade Kashmiri saffron strands. Highly royal sillage.',
    ingredients: '100% Concentrated Essential Fragrance Oils, Gold Amber absolute, Black Oud oil fractions.',
    sizePriceMultipliers: {
      '30ml': 0.8,
      '50ml': 1.0,
      '100ml': 1.5
    },
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&h=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&h=800&q=80',
      'https://images.unsplash.com/photo-1512303500371-55536e95a535?auto=format&fit=crop&w=600&h=800&q=80'
    ],
    discount: 20,
    statusTags: ['Pure Attar', 'Best Seller'],
    reviews: [
      { id: 'rev-26-1', userName: 'Mustafa Kamal', rating: 5, comment: 'Remarkable premium depth. Saffron and dark amber make this completely irresistible.', date: '2026-05-23', helpfulCount: 7 }
    ]
  }
];

// Scent Notes Mapping helper
export const SCENT_NOTES_DATA: { [key: string]: ScentNotes } = {
  'arz-01': {
    top: ['Kashmiri Saffron Oil', 'Green Cardamom', 'Bergamot'],
    middle: ['Taif Rose', 'Cambodian Oud Wood Oil', 'Geranium Leaf'],
    base: ['Molten Amber Resin', 'Warm Leather', 'White Fluffy Musk', 'Patchouli']
  },
  'arz-02': {
    top: ['Black Pepper Oil', 'Pineapple Puree', 'Sweet Tobacco Leaves'],
    middle: ['Coffee Bean Roasted', 'Patchouli Wood', 'Iris Flower root'],
    base: ['Madagascar Vanilla Pod', 'Dry Cedar Wood', 'Labdanum Resin', 'Amber Compound']
  },
  'arz-03': {
    top: ['Orchid Petals', 'Fresh Lilac', 'Peach Blossom'],
    middle: ['Geranium Leaf', 'Rosewater essence', 'Jasmine Absolute'],
    base: ['Mysore Sandalwood Oil', 'Thick Gold Amber', 'Warm Musk']
  },
  'arz-04': {
    top: ['Cinnamon Bark', 'Crisp Red Apple Oil', 'Zesty Grapefruit', 'Sweet Melon'],
    middle: ['Ocean Brine', 'French Lavender', 'Violet Flower Absolute'],
    base: ['Mineral Grey Ambergris', 'Earthy Vetiver Root', 'Sandalwood', 'Patchouli']
  },
  'arz-05': {
    top: ['Damask Rose', 'Sweet Honeycomb', 'Red Currant'],
    middle: ['White Agarwood', 'Indonesian Patchouli Oil', 'Saffron'],
    base: ['Madagascar Vanilla', 'Rich Incense Smoke', 'Sandalwood fractions']
  },
  'arz-06': {
    top: ['Bergamot Oil', 'Fresh Grapefruit', 'Cardamom zest'],
    middle: ['Dry Lavender', 'Peppermint leaves', 'Geranium blossom'],
    base: ['Atlas Cedarwood oil', 'Vetiver roots', 'Oakmoss Absolute']
  },
  'arz-07': {
    top: ['Warm Dates extract', 'Saffron oil', 'Sweet Cinnamon bark'],
    middle: ['Baked Brown Praline', 'Creamy Orchids', 'White Jasmine flowers'],
    base: ['Bourbon Vanilla Pod', 'Molten Amber resin', 'Tonka Beans', 'Myrrh']
  },
  'arz-08': {
    top: ['Fresh Royal Jasmine Flowers', 'Green Leaf extracts'],
    middle: ['Orchid essence', 'Sandalwood oil'],
    base: ['Mysore Sandalwood pure oil base', 'White Musk seeds']
  },
  'arz-09': {
    top: ['Cardamom pod extracts', 'White Pepper oil', 'Soft Lavender'],
    middle: ['Cedarwood branches', 'Patchouli leaves', 'Orris concrete'],
    base: ['Golden Amber resin absolute', 'Sandalwood wood', 'Vetiver strands']
  },
  'arz-10': {
    top: ['Violet Leaf extract', 'Fresh Spruce', 'Green Vetiver root'],
    middle: ['Iris Flower concrete', 'Geranium petals', 'Sandalwood branches'],
    base: ['Oakmoss Absolute', 'Musk kernels', 'Amberwood molecules']
  },
  'arz-11': {
    top: ['Sweet Raspberry pulp', 'Saffron threads', 'Thyme oil'],
    middle: ['Jasmine flower absolute', 'Olibanum resin smoke'],
    base: ['Tuscan Dark Leather', 'Black Velvet Suede', 'Amberwood', 'Earthy Vetiver']
  },
  'arz-12': {
    top: ['Mysore Sandalwood shavings', 'Cedar logs'],
    middle: ['Light White Musk seeds', 'Creamy vanilla flowers'],
    base: ['Sandalwood concentrated resin absolute', 'Suede skin musk']
  },
  'arz-13': {
    top: ['Pink Marshmallow fibers', 'Sweet Strawberry juice', 'Tangy Mandarin'],
    middle: ['Vanilla Orchid blossoms', 'Tropical Fruit pulp', 'Rose petals'],
    base: ['Heavy Cream Candy', 'White Fluffy Musk', 'Sandalwood twigs']
  },
  'arz-14': {
    top: ['Vine Tomato Leaf', 'Freesia blossoms', 'Rose oil details'],
    middle: ['Dry Tobacco leaves', 'Jasmine blossoms', 'Cedarwood logs'],
    base: ['Heavy Oakmoss Absolute', 'Dark Suede Leather', 'Molten Patchouli resin']
  },
  'arz-15': {
    top: ['Cinnamon flakes', 'Saffron oil', 'Warm Nutmeg'],
    middle: ['Molten Gold Amber', 'Patchouli herbs', 'Bourbon Vanilla pod'],
    base: ['Thick Rich Ambergris', 'Dark Tobacco leaves', 'Benzoin tears']
  },
  'arz-16': {
    top: ['Cardamom pods', 'Cumin essential oil', 'Mugwort leaves'],
    middle: ['Rose blossoms', 'Orris roots', 'Lavender fields'],
    base: ['Vanilla beans paste', 'Warm Sandalwood', 'Tonka bean flakes', 'Amberwood']
  },
  'arz-17': {
    top: ['Dark Chocolate shavings', 'Black Truffles oil', 'Bergamot zest'],
    middle: ['Sweet Orchid blossoms', 'Orris root powder', 'Ylang-Ylang'],
    base: ['Bourbon Vanilla extract', 'Sandalwood', 'Agarwood fractions', 'Frankincense']
  },
  'arz-18': {
    top: ['Grated Key Lime zest', 'Crushed Peppermint', 'Himalayan Pink Salt'],
    middle: ['Ocean Spray mineral', 'Wild Sage', 'Dry Lavender'],
    base: ['Clean White Musk', 'Salty Vetiver grass', 'Cedar shavings']
  },
  'arz-19': {
    top: ['Sweet Red Apple', 'Bergamot zest', 'Ginger root oil'],
    middle: ['Clary Sage leaves', 'Lavender buds', 'Juniper berries'],
    base: ['Crisp Amberwood', 'Tonka beans', 'Patchouli', 'Atlas Cedar']
  },
  'arz-20': {
    top: ['Cambodian Oud Wood chips', 'Earth dust'],
    middle: ['Deep Oud resin distillations', 'Ancient frankincense smoke'],
    base: ['Cured Agarwood aged absolute', 'Warm Animalic Leather', 'Gold Amber']
  },
  'arz-21': {
    top: ['Medicinal Saffron Threads', 'Nutmeg oil', 'French Lavender buds'],
    middle: ['Aged Agarwood Wood', 'Patchouli leaves absolute'],
    base: ['Incense tears', 'Sandalwood', 'Grey Ambergris molecules']
  },
  'arz-22': {
    top: ['Red Rose petals', 'Powdered White Sugar zest'],
    middle: ['Damask Rose absolute', 'Vanilla flower orchid'],
    base: ['Madagascar Vanilla extract', 'Sandalwood', 'Musk powder']
  },
  'arz-23': {
    top: ['Mandarin zest', 'Orange Blossom nectar', 'Pear slices'],
    middle: ['White Jasmine flowers', 'Vanilla orchid', 'French Caramel syrup'],
    base: ['French Chocolate absolute', 'Warm Sandalwood', 'Molten Amber resin']
  },
  'arz-24': {
    top: ['Fresh Lemon grass oil', 'Bergamot zest'],
    middle: ['Patchouli leaves', 'Green Cardamom seeds', 'Rose petals'],
    base: ['Sweet Woods absolute', 'White Musk concentrates']
  },
  'arz-25': {
    top: ['Sweet Citrus Orange pulp', 'Lemon peel extracts'],
    middle: ['Blue Cotton Candy floss', 'Peppermint spray', 'Ocean salt'],
    base: ['Vanilla Pod vanilla', 'Cozy light musk', 'Sandalwood twigs']
  },
  'arz-26': {
    top: ['Kashmiri Saffron strands', 'Spice oil extracts'],
    middle: ['Dark Gold Amber concentrate', 'Frankincense resin'],
    base: ['Cambodian Black Oud core absolute', 'Warm Suede Leather']
  }
};
