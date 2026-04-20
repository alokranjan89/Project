import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products | CREATE product
router
  .route("/")
  .get(getProducts)
  .post(protect, admin, createProduct);

// GET single | UPDATE | DELETE
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;