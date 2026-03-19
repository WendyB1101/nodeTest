import { Router } from "express";
import { registerUser, loginUser, getUserById, getAllUsers, blockUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminOnly, adminOrSelf } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Get user by ID -> admin or self
router.get("/:id", authMiddleware, adminOrSelf, getUserById);

// Get all users -> admin only
router.get("/", authMiddleware, adminOnly, getAllUsers);

// Block user -> admin or self
router.patch("/:id/block", authMiddleware, adminOrSelf, blockUser);

export default router;