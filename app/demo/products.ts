import type { Product } from '#shared/types/product'

export const mockCategories = [
  'Home Decor',
  'Electronics',
  'Power',
  'Personal Care',
  'Home Appliances',
  "Women's",
  "Men's",
  'Kiddies',
  'Office Appliances',
] as const

function product(p: Omit<Product, 'price' | 'comparePrice' | 'stockStatus' | 'stockLabel'>): Product {
  return {
    ...p,
    price: 3500,
    comparePrice: 4000,
    stockStatus: 'low-stock',
    stockLabel: 'Few Units Left',
  }
}

export const mockProducts: Product[] = [
  // Newly listed
  product({
    id: 'p-android-smart-tv',
    slug: 'android-smart-tv',
    name: 'Android Smart TV',
    summary: '43" full-HD smart display with built-in streaming apps.',
    description:
      'A 43" Android-powered smart TV with a full-HD display, built-in Wi-Fi and all the streaming apps you already use pre-installed. Slim bezel design fits any stand or wall mount.',
    category: 'Electronics',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/CeBIT_2006_Philips_3D_Display_42_3D6W01_WOW_Richardson_Electronics_KUKFilm_1298_by_HDTVTotalDOTcom.jpg',
        alt: 'A flat-screen TV mounted on a wall, displaying a colorful image',
      },
    ],
    heroImage: { url: 'https://img.icons8.com/3d-fluency/375/tv.png', alt: '3D render of a flat-screen TV' },
    badge: 'new',
  }),
  product({
    id: 'p-smart-watch-series-9',
    slug: 'smart-watch-series-9',
    name: 'Smart Watch Series 9',
    summary: 'Calls, messages and fitness tracking on your wrist.',
    description:
      'Series 9 smart watch with an always-on display, call and message notifications, and all-day fitness and sleep tracking. Comes with an adjustable woven band.',
    category: 'Electronics',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Apple_Watch_Ultra_Series_3_Natural_Titanium_Case.jpg',
        alt: 'A smart watch on a wrist, showing the time and status rings',
      },
    ],
    heroImage: { url: 'https://img.icons8.com/3d-fluency/375/apple-watch.png', alt: '3D render of a smart watch' },
    badge: 'new',
  }),
  product({
    id: 'p-noise-cancelling-headphones',
    slug: 'noise-cancelling-headphones',
    name: 'Noise Cancelling Headphones',
    summary: 'Over-ear headphones with active noise cancellation.',
    description:
      'Over-ear wireless headphones with active noise cancellation, 30-hour battery life and a foldable design that comes with a hard travel case.',
    category: 'Electronics',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Bose_QuietComfort_25_Acoustic_Noise_Cancelling_Headphones.jpg',
        alt: 'Black over-ear noise cancelling headphones',
      },
    ],
    heroImage: { url: 'https://img.icons8.com/3d-fluency/375/headset.png', alt: '3D render of a headset' },
    badge: 'new',
  }),
  product({
    id: 'p-crochet-shorts-rust',
    slug: 'crochet-shorts-rust',
    name: 'Crochet Shorts',
    summary: 'Hand-crocheted shorts in a warm rust colourway.',
    description: 'Hand-crocheted cotton shorts with an elastic drawstring waist. Breathable, hand-wash only.',
    category: "Women's",
    merchantName: "Amaka's Knitwear",
    images: [
      {
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crochet_clothes.jpg',
        alt: 'Hands crocheting a rust-orange garment with yarn',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-crochet-shorts-coral',
    slug: 'crochet-shorts-coral',
    name: 'Crochet Shorts',
    summary: 'Hand-crocheted shorts in a coral colourway.',
    description: 'Hand-crocheted cotton shorts with an elastic drawstring waist. Breathable, hand-wash only.',
    category: "Women's",
    merchantName: "Amaka's Knitwear",
    images: [
      {
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crochet_clothes.jpg',
        alt: 'Hands crocheting a warm-toned garment with yarn',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-cordless-hand-blender',
    slug: 'cordless-hand-blender',
    name: 'Cordless Hand Blender',
    summary: 'Rechargeable hand blender for smoothies and soups.',
    description: 'USB-rechargeable cordless hand blender with two speed settings and a detachable, dishwasher-safe blending shaft.',
    category: 'Home Appliances',
    merchantName: 'Uyo Home Essentials',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Bamix_M100_wand_blender_with_accessories.jpg',
        alt: 'Cordless hand blender standing upright',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-rechargeable-table-fan',
    slug: 'rechargeable-table-fan',
    name: 'Rechargeable Table Fan',
    summary: 'Battery-backed table fan for outage-proof cooling.',
    description: 'A rechargeable table fan with a built-in battery that keeps running for up to 8 hours through a power outage, plus an LED light.',
    category: 'Power',
    merchantName: 'Uyo Home Essentials',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Electric_Oscillating_Table_Fan_by_Emerson.jpg',
        alt: 'An electric table fan on a stand',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-ceramic-vase-set',
    slug: 'ceramic-vase-set',
    name: 'Ceramic Vase Set',
    summary: 'Set of three matte ceramic vases, three sizes.',
    description: 'A set of three matte-finish ceramic vases in graduated sizes — a quick way to dress up a shelf or console table.',
    category: 'Home Decor',
    merchantName: 'Nsukara Living',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Vase_%28AM_9630-5%29.jpg',
        alt: 'A white ceramic decorative vase',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-kids-puzzle-cube',
    slug: 'kids-puzzle-cube',
    name: 'Kids Puzzle Cube',
    summary: 'Colourful twist puzzle for ages 5 and up.',
    description: 'A classic twist puzzle cube in bright colours, sized for smaller hands. A screwdriver for tensioning adjustment is included.',
    category: 'Kiddies',
    merchantName: 'Little Sprouts Toys',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Rubik%27s_cube_variations.jpg',
        alt: 'Colourful twist puzzle cubes',
      },
    ],
    heroImage: { url: 'https://img.icons8.com/3d-fluency/375/rubiks-cube.png', alt: '3D render of a puzzle cube' },
    badge: 'new',
  }),
  product({
    id: 'p-desk-organizer-tray',
    slug: 'desk-organizer-tray',
    name: 'Desk Organizer Tray',
    summary: 'Multi-compartment tray for pens, cards and clips.',
    description: 'A wood-finish multi-compartment desk tray that keeps pens, business cards and paperclips within reach.',
    category: 'Office Appliances',
    merchantName: 'Uyo Home Essentials',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/USVI_IMG_5202_-_Minimalist_desk_with_colorful_pencils_in_a_cardboard_holder_a_cup_holding_pens_and_scissors_and_a_notebook_with_botanical_patterns_all_under_soft_light.jpg',
        alt: 'A desk organizer tray holding pens and pencils',
      },
    ],
    badge: 'new',
  }),

  // Best sellers
  product({
    id: 'p-cotton-club-body-spray',
    slug: 'cotton-club-body-spray',
    name: 'Cotton Club Body Spray',
    summary: 'Long-lasting fragrance body spray, 200ml.',
    description: 'A long-lasting eau de parfum body spray with a soft, powdery cotton scent. 200ml bottle.',
    category: 'Personal Care',
    merchantName: 'Glow & Co.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Boss_Bottled.jpg',
        alt: 'A fragrance body spray bottle',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-shea-butter-lotion',
    slug: 'shea-butter-lotion',
    name: 'Shea Butter Lotion',
    summary: 'Whipped shea butter body lotion, 250ml.',
    description: 'A whipped shea butter body lotion that absorbs quickly and leaves skin soft without a greasy finish.',
    category: 'Personal Care',
    merchantName: 'Glow & Co.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Naturally_Processed_Shea_Butter_2.jpg',
        alt: 'Jar of whipped shea butter lotion',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-mens-leather-belt',
    slug: 'mens-leather-belt',
    name: "Men's Leather Belt",
    summary: 'Full-grain leather belt with a brushed buckle.',
    description: 'A full-grain leather belt with a brushed metal buckle, available in one size with a trimmable end.',
    category: "Men's",
    merchantName: 'Uyo Menswear Co.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Lederarbeiten_002_2016_11_26.jpg',
        alt: 'A row of leather belts with buckles on display',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-mens-cotton-polo',
    slug: 'mens-cotton-polo',
    name: "Men's Cotton Polo",
    summary: 'Breathable pique cotton polo shirt.',
    description: 'A breathable pique cotton polo with a ribbed collar and two-button placket. Machine washable.',
    category: "Men's",
    merchantName: 'Uyo Menswear Co.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Stack_of_purple_St._John%27s_Bay_polos_at_JCPenney.jpg',
        alt: "Folded polo shirts stacked on a store shelf",
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-solar-rechargeable-lamp',
    slug: 'solar-rechargeable-lamp',
    name: 'Solar Rechargeable Lamp',
    summary: 'Solar-and-mains lamp with 3 brightness levels.',
    description: 'A lamp that charges from sunlight or a wall outlet, with three brightness levels and up to 12 hours of runtime.',
    category: 'Power',
    merchantName: 'Uyo Home Essentials',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Lontor_rechargeable_lamp.jpg',
        alt: 'A rechargeable LED lamp on a stand',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-non-stick-frying-pan',
    slug: 'non-stick-frying-pan',
    name: 'Non-stick Frying Pan',
    summary: '28cm non-stick frying pan with heat-safe handle.',
    description: 'A 28cm non-stick frying pan with an even-heat base and a heat-resistant handle. Dishwasher safe.',
    category: 'Home Appliances',
    merchantName: 'Nsukara Living',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Tortilla_de_papas_argentina_en_sart%C3%A9n_de_tefl%C3%B3n.jpg',
        alt: 'A non-stick frying pan in use on a stove',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-kids-backpack',
    slug: 'kids-backpack',
    name: 'Kids Backpack',
    summary: 'Lightweight backpack sized for primary school.',
    description: 'A lightweight, water-resistant backpack sized for primary-school books, with padded straps and a chest clip.',
    category: 'Kiddies',
    merchantName: 'Little Sprouts Toys',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/School_bag_backpack.jpg',
        alt: 'A red and black backpack',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-throw-pillow-set',
    slug: 'throw-pillow-set',
    name: 'Throw Pillow Set',
    summary: 'Set of two patterned linen-blend throw pillows.',
    description: 'A set of two 45cm linen-blend throw pillow covers with a concealed zip. Inserts not included.',
    category: 'Home Decor',
    merchantName: 'Nsukara Living',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Decorative_pillows_with_traditional_Armenian_patterns.jpg',
        alt: 'Two patterned throw pillows on a couch',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-wireless-mouse',
    slug: 'wireless-mouse',
    name: 'Wireless Mouse',
    summary: 'Silent-click wireless mouse with USB receiver.',
    description: 'A silent-click wireless mouse with an ergonomic shape, adjustable DPI and a plug-and-play USB receiver.',
    category: 'Office Appliances',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/A_black_wireless_computer_mouse.jpg',
        alt: 'A black wireless computer mouse',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-womens-tote-bag',
    slug: 'womens-tote-bag',
    name: "Women's Tote Bag",
    summary: 'Canvas tote bag with an interior zip pocket.',
    description: 'A durable canvas tote bag with reinforced handles and an interior zip pocket for keys and cards.',
    category: "Women's",
    merchantName: "Amaka's Knitwear",
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Canvas_two-tone_tote_Navy_and_Natural7_%289038437258%29.jpg',
        alt: "Women's striped canvas tote bag",
      },
    ],
    badge: 'best-seller',
  }),
]

export function findMockProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug)
}
