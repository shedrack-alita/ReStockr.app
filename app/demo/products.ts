import type { Product } from '#shared/types/product'

export const mockCategories = [
  'Electronics',
  'Personal Care',
  'Footwear',
  'Eyewear',
  'Sportswear',
  'Bags',
  'Power',
  'Headwear',
  'Grocery',
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
    id: 'p-wireless-earbuds',
    slug: 'wireless-earbuds',
    name: 'True Wireless Earbuds',
    summary: 'TWS earbuds with LED battery-level charging case.',
    description:
      'True wireless earbuds with a compact charging case that shows left/right battery levels on an LED display. Touch controls and a secure in-ear fit.',
    category: 'Electronics',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: '/images/products/wireless-earbuds.jpg',
        alt: 'A pair of black wireless earbuds resting in their charging case with an LED battery display',
      },
    ],
    heroImage: { url: '/images/products/wireless-earbuds.jpg', alt: 'Black wireless earbuds and charging case' },
    badge: 'new',
  }),
  product({
    id: 'p-realme-buds-air',
    slug: 'realme-buds-air',
    name: 'Realme Buds Air',
    summary: 'In-ear wireless earbuds with a fast-charge case.',
    description: 'Realme wireless earbuds with a snug in-ear fit, punchy bass and a pocket-sized fast-charging case.',
    category: 'Electronics',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: '/images/products/realme-buds-air.jpg',
        alt: 'Black Realme wireless earbuds in an open yellow-lined charging case',
      },
    ],
    heroImage: { url: '/images/products/realme-buds-air.jpg', alt: 'Realme wireless earbuds and case' },
    badge: 'new',
  }),
  product({
    id: 'p-bluetooth-speaker',
    slug: 'portable-bluetooth-speaker',
    name: 'Portable Bluetooth Speaker',
    summary: 'Pill-shaped speaker with a fabric finish and deep bass.',
    description: 'A compact pill-shaped Bluetooth speaker with a rugged fabric shell, onboard playback controls and a bright bass port glow.',
    category: 'Electronics',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: '/images/products/bluetooth-speaker.jpg',
        alt: 'A navy blue pill-shaped Bluetooth speaker with fabric texture',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-mirrorless-camera',
    slug: 'mirrorless-camera',
    name: 'Mirrorless Camera',
    summary: 'Full-frame mirrorless camera with a zoom lens.',
    description: 'A full-frame mirrorless camera body paired with a standard zoom lens — an electronic viewfinder and in-body stabilization included.',
    category: 'Electronics',
    merchantName: 'Lagos Electronics Hub',
    images: [
      {
        url: '/images/products/mirrorless-camera.jpg',
        alt: 'A black mirrorless camera with a zoom lens attached',
      },
    ],
    heroImage: { url: '/images/products/mirrorless-camera.jpg', alt: 'Mirrorless camera with zoom lens' },
    badge: 'new',
  }),
  product({
    id: 'p-verca-eau-de-parfum',
    slug: 'verca-sevano-eau-de-parfum',
    name: 'Verca Sevano Eau de Parfum',
    summary: 'A bold red fragrance, 50ml eau de parfum.',
    description: 'Verca Sevano eau de parfum in a faceted red bottle — a warm, long-lasting scent for evening wear. 50ml.',
    category: 'Personal Care',
    merchantName: 'Glow & Co.',
    images: [
      {
        url: '/images/products/verca-eau-de-parfum.jpg',
        alt: 'A red faceted perfume bottle labelled Verca Sevano surrounded by a red liquid splash',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-hugo-boss-bottled-night',
    slug: 'hugo-boss-bottled-night',
    name: 'Hugo Boss Bottled Night',
    summary: 'Eau de toilette, natural spray, 100ml.',
    description: 'Hugo Boss Bottled Night eau de toilette in a deep blue glass bottle with its retail box — a woody, night-time signature scent.',
    category: 'Personal Care',
    merchantName: 'Glow & Co.',
    images: [
      {
        url: '/images/products/hugo-boss-bottled-night.jpg',
        alt: 'A dark blue Hugo Boss Bottled Night cologne bottle next to its box, with smoke curling around it',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-rose-gold-skincare-set',
    slug: 'rose-gold-skincare-set',
    name: 'Rose Gold Skincare Set',
    summary: '3-piece cleanser, serum and cream set.',
    description: 'A three-piece skincare set — cleanser, serum and moisturising cream — in matte white bottles with rose-gold pumps.',
    category: 'Personal Care',
    merchantName: 'Glow & Co.',
    images: [
      {
        url: '/images/products/rose-gold-skincare-set.jpg',
        alt: 'Three white skincare bottles and a jar with rose-gold caps',
      },
    ],
    heroImage: { url: '/images/products/rose-gold-skincare-set.jpg', alt: 'Rose-gold skincare bottle and jar set' },
    badge: 'new',
  }),
  product({
    id: 'p-led-grow-light-bulbs',
    slug: 'led-grow-light-bulbs',
    name: 'A19 LED Grow Light Bulbs (3-Pack)',
    summary: 'Full-spectrum grow bulbs, E26 base, pack of 3.',
    description: 'A pack of three A19 full-spectrum LED grow light bulbs — 9W drawing the output of a 100W bulb, standard E26 base, not dimmable.',
    category: 'Power',
    merchantName: 'Uyo Home Essentials',
    images: [
      {
        url: '/images/products/led-grow-light-bulbs.jpg',
        alt: 'A box of A19 LED grow light bulbs with three bulbs standing beside it',
      },
    ],
    heroImage: { url: '/images/products/led-grow-light-bulbs.jpg', alt: 'A19 LED grow light bulb pack' },
    badge: 'new',
  }),
  product({
    id: 'p-knit-sneakers',
    slug: 'knit-sneakers',
    name: 'Classic Knit Sneakers',
    summary: 'Breathable knit sneakers in four colourways.',
    description: 'Lightweight knit sneakers with a cushioned sole — breathable mesh upper, available in white, burgundy, tan and lilac.',
    category: 'Footwear',
    merchantName: 'Sole Story Footwear',
    images: [
      {
        url: '/images/products/knit-sneakers.jpg',
        alt: 'Four pairs of knit sneakers in white, burgundy, tan and lilac stacked on boxes',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-matte-aviator-sunglasses',
    slug: 'matte-aviator-sunglasses',
    name: 'Matte Aviator Sunglasses',
    summary: 'Oversized matte-black frame, UV400 lenses.',
    description: 'Oversized aviator-style sunglasses in a matte black frame with UV400-protected lenses and a soft-touch finish.',
    category: 'Eyewear',
    merchantName: 'Vista Eyewear Co.',
    images: [
      {
        url: '/images/products/matte-aviator-sunglasses.jpg',
        alt: 'Matte black oversized sunglasses resting on a white textured surface',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-classic-square-sunglasses',
    slug: 'classic-square-sunglasses',
    name: 'Classic Square Sunglasses',
    summary: 'Two-tone square frame with gradient lenses.',
    description: 'Square-frame sunglasses with a glossy two-tone finish and gradient lenses — a lightweight everyday pair.',
    category: 'Eyewear',
    merchantName: 'Vista Eyewear Co.',
    images: [
      {
        url: '/images/products/classic-square-sunglasses.jpg',
        alt: 'Black square-frame sunglasses with gradient lenses resting on a table',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-man-utd-home-kit',
    slug: 'man-utd-home-kit',
    name: 'Manchester United Home Kit',
    summary: 'Replica home, away and third jerseys.',
    description: 'A set of replica Manchester United jerseys — home, away and third kit — on hangers, true-to-size fit.',
    category: 'Sportswear',
    merchantName: 'Matchday Sports NG',
    images: [
      {
        url: '/images/products/man-utd-home-kit.jpg',
        alt: 'Three Manchester United replica jerseys in red, white and green hanging on a rail',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-leather-tote-handbag',
    slug: 'leather-tote-handbag',
    name: 'Leather Tote Handbag',
    summary: 'Structured tan leather handbag with a silk scarf.',
    description: 'A structured tan leather handbag with gold-tone hardware, twin top handles and a coordinating silk scarf.',
    category: 'Bags',
    merchantName: "Amaka's Leather Goods",
    images: [
      {
        url: '/images/products/leather-tote-handbag.jpg',
        alt: 'A tan leather handbag with gold hardware and a striped silk scarf tied to the handle',
      },
    ],
    badge: 'new',
  }),
  product({
    id: 'p-baseball-cap-multicolor',
    slug: 'baseball-cap-multicolor',
    name: 'Classic Baseball Cap',
    summary: 'Cotton six-panel cap, available in 24 colours.',
    description: 'A classic six-panel cotton baseball cap with an adjustable strap — available in 24 colourways.',
    category: 'Headwear',
    merchantName: 'Capstyle NG',
    images: [
      {
        url: '/images/products/baseball-cap-multicolor.jpg',
        alt: 'A grid of baseball caps in twenty-four different colours',
      },
    ],
    badge: 'new',
  }),

  // Best sellers
  product({
    id: 'p-dior-sauvage',
    slug: 'dior-sauvage-eau-de-parfum',
    name: 'Dior Sauvage Eau de Parfum',
    summary: 'Signature fresh, woody fragrance, 100ml.',
    description: 'Dior Sauvage eau de parfum in its signature dark glass bottle — a fresh, woody scent with strong lasting power. 100ml.',
    category: 'Personal Care',
    merchantName: 'Glow & Co.',
    images: [
      {
        url: '/images/products/dior-sauvage.jpg',
        alt: 'A dark blue Dior Sauvage eau de parfum bottle lit against a blue background',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-biomos-sleeping-mask',
    slug: 'biomos-sleeping-mask',
    name: 'Biomos Plant-Based Sleeping Mask',
    summary: 'Overnight face mask in a frosted green jar.',
    description: 'A plant-based overnight sleeping mask in a frosted green jar — leaves skin refreshed by morning. Fragrance-free, dermatologist tested.',
    category: 'Personal Care',
    merchantName: 'Glow & Co.',
    images: [
      {
        url: '/images/products/biomos-sleeping-mask.jpg',
        alt: 'Two frosted green Biomos sleeping mask jars, one open showing the cream inside',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-charger-power-bank-bundle',
    slug: 'charger-power-bank-bundle',
    name: 'Charger & Power Bank Bundle',
    summary: 'Wall chargers, car charger and power bank set.',
    description: 'A bundle of fast wall chargers, a car charger with magnetic mount and a slim power bank — everything needed to keep devices topped up.',
    category: 'Power',
    merchantName: 'Uyo Home Essentials',
    images: [
      {
        url: '/images/products/charger-power-bank-bundle.jpg',
        alt: 'A collection of wall chargers, a car charger and a power bank arranged on pedestals',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-nike-dunk-low',
    slug: 'nike-dunk-low',
    name: 'Nike Dunk Low',
    summary: 'Green and white leather low-top sneakers.',
    description: 'Nike Dunk Low sneakers in a green and white leather upper with a classic rubber sole — a streetwear staple.',
    category: 'Footwear',
    merchantName: 'Sole Story Footwear',
    images: [
      {
        url: '/images/products/nike-dunk-low.jpg',
        alt: 'A pair of green and white Nike Dunk Low sneakers with the laces undone',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-suede-runner-sneakers',
    slug: 'suede-runner-sneakers',
    name: 'Suede Runner Sneakers',
    summary: 'Cream suede runners with a chunky sole.',
    description: 'Cream suede runner sneakers with a chunky two-tone sole and reflective branding — a premium everyday trainer.',
    category: 'Footwear',
    merchantName: 'Sole Story Footwear',
    images: [
      {
        url: '/images/products/suede-runner-sneakers.jpg',
        alt: 'A pair of cream suede runner sneakers with a chunky white and tan sole',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-carrera-sport-sunglasses',
    slug: 'carrera-sport-sunglasses',
    name: 'Carrera Sport Sunglasses',
    summary: 'Matte navy sport frame with a hard case.',
    description: 'Carrera sport sunglasses in a matte navy frame, supplied with a hard travel case and cleaning cloth.',
    category: 'Eyewear',
    merchantName: 'Vista Eyewear Co.',
    images: [
      {
        url: '/images/products/carrera-sport-sunglasses.jpg',
        alt: 'A hand holding matte navy Carrera sunglasses beside their case and cleaning cloth',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-international-jersey-set',
    slug: 'international-football-jersey-set',
    name: 'International Football Jersey Set',
    summary: 'National team jerseys with a matchball.',
    description: 'A folded stack of national-team replica football jerseys, topped with an official-style matchball.',
    category: 'Sportswear',
    merchantName: 'Matchday Sports NG',
    images: [
      {
        url: '/images/products/international-jersey-set.jpg',
        alt: 'A stack of folded international football jerseys beneath a match ball',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-football-boots',
    slug: 'pro-match-football-boots',
    name: 'Pro Match Football Boots',
    summary: 'Leather firm-ground boots with moulded studs.',
    description: 'Leather football boots with moulded firm-ground studs and a snug lace-up fit — built for matchday traction.',
    category: 'Sportswear',
    merchantName: 'Matchday Sports NG',
    images: [
      {
        url: '/images/products/football-boots.jpg',
        alt: 'A red and white football boot resting on top of a football',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-distressed-dad-cap',
    slug: 'distressed-dad-cap',
    name: 'Distressed Dad Cap',
    summary: 'Washed cotton cap with a worn-in finish.',
    description: 'A washed cotton dad cap with a distressed, worn-in finish and an adjustable strap-back closure.',
    category: 'Headwear',
    merchantName: 'Capstyle NG',
    images: [
      {
        url: '/images/products/distressed-dad-cap.jpg',
        alt: 'A stack of five distressed cotton dad caps in red, brown, black, cream and tan',
      },
    ],
    badge: 'best-seller',
  }),
  product({
    id: 'p-soda-variety-pack',
    slug: 'sparkling-tonic-soda-variety-pack',
    name: 'Sparkling Tonic Soda Variety Pack',
    summary: '4 flavours of prebiotic sparkling soda, 355ml cans.',
    description: 'A variety pack of prebiotic sparkling tonic sodas — grape, ginger lemon, orange squeeze and strawberry vanilla, 355ml cans.',
    category: 'Grocery',
    merchantName: 'FreshCart Grocers',
    images: [
      {
        url: '/images/products/soda-variety-pack.jpg',
        alt: 'Four cans of sparkling tonic soda in grape, ginger lemon, orange and strawberry vanilla flavours',
      },
    ],
    badge: 'best-seller',
  }),
]

export function findMockProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug)
}
