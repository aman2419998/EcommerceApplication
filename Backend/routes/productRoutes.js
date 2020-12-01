import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(fetchProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(fetchProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/review").post(protect, createReview);

export default router;
