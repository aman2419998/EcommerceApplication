import express from "express";
import {
  deleteUsers,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  userAuth,
  getUserById,
  updateUser,
  getUserByIdOrder,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/login", userAuth);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router.route("/test/:id").get(protect, getUserByIdOrder);

export default router;
