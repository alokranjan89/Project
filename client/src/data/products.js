const createImageUrl = (photoId, options = "q=80&w=900&auto=format&fit=crop") =>
  `https://images.unsplash.com/${photoId}?${options}`;

export const products = [
  {
    id: 1,
    name: "Velvet Matte Lip Kit",
    category: "shringaar",
    description:
      "A long-wear lip kit with rich pigment, smooth application, and a soft matte finish that stays comfortable through the day.",
    tags: ["makeup", "beauty", "lipstick", "matte", "daily wear"],
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviews: 186,
    stock: 42,
    badge: "Best Seller",
    image: createImageUrl("photo-1586495777744-4413f21062fa"),
  },
  {
    id: 2,
    name: "Radiance Makeup Vanity Set",
    category: "shringaar",
    description:
      "A complete beauty starter set with compact essentials for day-to-night looks, packed in a sleek travel-friendly case.",
    tags: ["makeup", "beauty", "kit", "gift", "cosmetics"],
    price: 1499,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 94,
    stock: 18,
    badge: "Gift Pick",
    image: createImageUrl("photo-1522335789203-aabd1fc54bc9"),
  },
  {
    id: 3,
    name: "Botanical Glow Perfume",
    category: "shringaar",
    description:
      "A floral-fruity perfume with soft jasmine notes and a fresh finish designed for everyday wear and special evenings.",
    tags: ["perfume", "fragrance", "beauty", "gift", "floral"],
    price: 1199,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 77,
    stock: 26,
    badge: "Trending",
    image: createImageUrl("photo-1594035910387-fea47794261f"),
  },
  {
    id: 4,
    name: "Embroidered Festive Kurti",
    category: "clothing",
    description:
      "A breathable festive kurti with elegant embroidery, tailored for comfort and polished styling across casual and festive occasions.",
    tags: ["fashion", "clothing", "kurti", "ethnic", "women"],
    price: 1299,
    originalPrice: 1799,
    rating: 4.5,
    reviews: 132,
    stock: 31,
    badge: "Festive Edit",
    image: createImageUrl("photo-1618354691373-d851c5c3a990"),
  },
  {
    id: 5,
    name: "Classic Red Party Dress",
    category: "clothing",
    description:
      "A statement evening dress with fluid structure, flattering lines, and a versatile silhouette for party and event styling.",
    tags: ["dress", "fashion", "party", "women", "occasion"],
    price: 2499,
    originalPrice: 3199,
    rating: 4.7,
    reviews: 211,
    stock: 14,
    badge: "Limited Drop",
    image: createImageUrl("photo-1521334884684-d80222895322"),
  },
  {
    id: 6,
    name: "Structured Everyday Handbag",
    category: "clothing",
    description:
      "A polished handbag with roomy compartments, durable stitching, and a refined silhouette built for daily errands and office wear.",
    tags: ["handbag", "fashion", "accessories", "bag", "daily use"],
    price: 1899,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 88,
    stock: 23,
    badge: "Editor Pick",
    image: createImageUrl("photo-1584917865442-de89df76afd3"),
  },
  {
    id: 7,
    name: "Arcade Speed Racer Car",
    category: "games",
    description:
      "A durable toy race car with smooth wheels, vibrant detailing, and a fun design for quick indoor play sessions.",
    tags: ["toy", "kids", "games", "car", "play"],
    price: 549,
    originalPrice: 749,
    rating: 4.4,
    reviews: 59,
    stock: 67,
    badge: "Kids Favorite",
    image: createImageUrl("photo-1594787318286-3d835c1d207f"),
  },
  {
    id: 8,
    name: "Neon Gaming Controller",
    category: "games",
    description:
      "A responsive wireless controller with textured grip, precise input feedback, and long battery life for casual and competitive play.",
    tags: ["gaming", "controller", "console", "games", "tech"],
    price: 2199,
    originalPrice: 2799,
    rating: 4.8,
    reviews: 145,
    stock: 20,
    badge: "Top Rated",
    image: createImageUrl("photo-1606813907291-d86efa9b94db"),
  },
  {
    id: 9,
    name: "Puzzle Quest Board Set",
    category: "games",
    description:
      "A family board set with replayable challenges, colorful pieces, and an engaging game flow suitable for groups and gifting.",
    tags: ["board game", "family", "games", "puzzle", "gift"],
    price: 999,
    originalPrice: 1399,
    rating: 4.5,
    reviews: 71,
    stock: 35,
    badge: "Weekend Pick",
    image: createImageUrl("photo-1610890716171-6b1bb98ffd09"),
  },
  {
    id: 10,
    name: "Signature Nude Lipstick",
    category: "shringaar",
    description:
      "A creamy nude lipstick with buildable coverage and a comfortable satin finish for polished everyday makeup looks.",
    tags: ["lipstick", "beauty", "makeup", "nude", "satin"],
    price: 499,
    originalPrice: 699,
    rating: 4.5,
    reviews: 124,
    stock: 39,
    badge: "Everyday Essential",
    image: createImageUrl("photo-1631214540553-ff044a3cc81d"),
  },
  {
    id: 11,
    name: "Soft Cotton Casual Dress",
    category: "clothing",
    description:
      "A relaxed cotton dress with an airy drape, soft hand-feel, and versatile styling for daily comfort in warmer weather.",
    tags: ["dress", "casual", "clothing", "cotton", "fashion"],
    price: 1599,
    originalPrice: 2099,
    rating: 4.4,
    reviews: 96,
    stock: 29,
    badge: "Daily Wear",
    image: createImageUrl("photo-1496747611176-843222e1e57c"),
  },
  {
    id: 12,
    name: "Portable Strategy Game Kit",
    category: "games",
    description:
      "A compact strategy game kit designed for travel, quick setup, and repeat sessions with friends or family.",
    tags: ["strategy", "games", "travel", "family", "fun"],
    price: 899,
    originalPrice: 1199,
    rating: 4.3,
    reviews: 52,
    stock: 46,
    badge: "Travel Ready",
    image: createImageUrl("photo-1511512578047-dfb367046420"),
  },
];

export const featuredProducts = products.slice(0, 8);

export const categoryHighlights = [
  {
    title: "Shringaar",
    image: createImageUrl(
      "photo-1596462502278-27bfdc403348",
      "q=80&w=700&auto=format&fit=crop"
    ),
    path: "/category/shringaar",
  },
  {
    title: "Games",
    image: createImageUrl(
      "photo-1606813907291-d86efa9b94db",
      "q=80&w=700&auto=format&fit=crop"
    ),
    path: "/category/games",
  },
  {
    title: "Clothing",
    image: createImageUrl(
      "photo-1521334884684-d80222895322",
      "q=80&w=700&auto=format&fit=crop"
    ),
    path: "/category/clothing",
  },
];

export const offerProducts = products
  .filter((product) => product.originalPrice > product.price)
  .sort(
    (a, b) =>
      (b.originalPrice - b.price) / b.originalPrice -
      (a.originalPrice - a.price) / a.originalPrice
  )
  .slice(0, 8);
