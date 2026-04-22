const VALID_CATEGORIES = new Set(["shringaar", "games", "clothing"]);

const normalizeCategory = (value) => {
  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  if (normalized === "shringar") {
    return "shringaar";
  }

  return normalized;
};

const toNumber = (value, fallback = 0) => {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
};

export const serializeProduct = (product) => ({
  id: product.productId,
  name: product.name,
  description: product.description,
  category: product.category,
  tags: product.tags || [],
  price: product.price,
  originalPrice: product.originalPrice,
  rating: product.rating,
  reviews: product.reviews,
  stock: product.stock,
  badge: product.badge,
  image: product.image,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

export const normalizeProductInput = (input = {}) => {
  const tags = Array.isArray(input.tags)
    ? input.tags
    : String(input.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

  const category = normalizeCategory(input.category);

  return {
    name: String(input.name || "").trim(),
    description: String(input.description || "").trim(),
    category,
    tags,
    price: toNumber(input.price),
    originalPrice: toNumber(input.originalPrice),
    rating: toNumber(input.rating),
    reviews: toNumber(input.reviews),
    stock: toNumber(input.stock),
    badge: String(input.badge || "").trim(),
    image: String(input.image || "").trim(),
  };
};

export const validateProductInput = (input, { partial = false } = {}) => {
  const errors = [];

  if (!partial || "name" in input) {
    if (!input.name) errors.push("Name is required");
  }

  if (!partial || "description" in input) {
    if (!input.description) errors.push("Description is required");
  }

  if (!partial || "image" in input) {
    if (!input.image) errors.push("Image is required");
  }

  if (!partial || "category" in input) {
    if (!VALID_CATEGORIES.has(input.category)) {
      errors.push("Category must be shringaar, games, or clothing");
    }
  }

  if ((!partial || "price" in input) && input.price < 0) {
    errors.push("Price cannot be negative");
  }

  if ((!partial || "originalPrice" in input) && input.originalPrice < 0) {
    errors.push("Original price cannot be negative");
  }

  if ((!partial || "stock" in input) && input.stock < 0) {
    errors.push("Stock cannot be negative");
  }

  if ((!partial || "reviews" in input) && input.reviews < 0) {
    errors.push("Reviews cannot be negative");
  }

  if ((!partial || "rating" in input) && (input.rating < 0 || input.rating > 5)) {
    errors.push("Rating must be between 0 and 5");
  }

  return errors;
};
