import mongoose from "mongoose";

import Product from "../models/product.js";
import defaultProducts from "../data/defaultProducts.js";
import {
  normalizeProductInput,
  serializeProduct,
  validateProductInput,
} from "../utils/productPayload.js";

const findProduct = async (identifier) => {
  const numericId = Number(identifier);

  if (Number.isInteger(numericId) && numericId > 0) {
    return Product.findOne({ productId: numericId });
  }

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    return Product.findById(identifier);
  }

  return null;
};

const buildProductFilters = (query) => {
  const filters = {};

  if (query.category) {
    const category = String(query.category).trim().toLowerCase();
    filters.category = category === "shringar" ? "shringaar" : category;
  }

  if (query.search) {
    const pattern = String(query.search).trim();

    if (pattern) {
      filters.$or = [
        { name: { $regex: pattern, $options: "i" } },
        { description: { $regex: pattern, $options: "i" } },
        { tags: { $elemMatch: { $regex: pattern, $options: "i" } } },
      ];
    }
  }

  return filters;
};

export const getProducts = async (req, res) => {
  try {
    const filters = buildProductFilters(req.query);
    const rawLimit = Number(req.query.limit);
    const limit =
      Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : null;

    let query = Product.find(filters).sort({ productId: 1 });

    if (limit) {
      query = query.limit(limit);
    }

    let products = await query;

    if (req.query.offers === "true") {
      products = products.filter((product) => product.originalPrice > product.price);
    }

    if (req.query.featured === "true") {
      products = products.slice(0, 8);
    }

    return res.json(products.map(serializeProduct));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await findProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(serializeProduct(product));
  } catch {
    return res.status(500).json({ message: "Unable to load product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const normalizedProduct = normalizeProductInput(req.body);
    const errors = validateProductInput(normalizedProduct);

    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const lastProduct = await Product.findOne().sort({ productId: -1 }).select("productId");
    const nextProductId = (lastProduct?.productId || 0) + 1;

    const product = await Product.create({
      ...normalizedProduct,
      productId: nextProductId,
      user: req.user._id,
    });

    return res.status(201).json(serializeProduct(product));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await findProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const normalizedProduct = normalizeProductInput({
      ...serializeProduct(product),
      ...req.body,
    });
    const errors = validateProductInput(normalizedProduct, { partial: true });

    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0], errors });
    }

    Object.assign(product, normalizedProduct);
    const updatedProduct = await product.save();

    return res.json(serializeProduct(updatedProduct));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await findProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    return res.json({ message: "Product removed" });
  } catch {
    return res.status(500).json({ message: "Unable to delete product" });
  }
};

export const resetProducts = async (req, res) => {
  try {
    await Product.deleteMany({});

    const nextProducts = defaultProducts.map((product) => ({
      ...product,
      user: req.user._id,
    }));

    await Product.insertMany(nextProducts);

    return res.json(nextProducts.map((product) => ({
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
    })));
  } catch {
    return res.status(500).json({ message: "Unable to reset products" });
  }
};
