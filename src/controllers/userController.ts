import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/token";

// ------------------------
// 1️⃣ Register User
// ------------------------
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, birthDate, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      fullName,
      birthDate,
      email,
      password: hashedPassword,
      role: role || "user",
      status: true,
    });

    res.status(201).json({ message: "User registered", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ------------------------
// 2️⃣ Login User
// ------------------------
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ------------------------
// 3️⃣ Get User by ID
// ------------------------
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requestingUser = (req as any).user;

    if (requestingUser.role !== "admin" && requestingUser.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ------------------------
// 4️⃣ Get All Users (Admin Only)
// ------------------------
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const requestingUser = (req as any).user;
    if (requestingUser.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// ------------------------
// 5️⃣ Block User
// ------------------------
export const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requestingUser = (req as any).user;

    if (requestingUser.role !== "admin" && requestingUser.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User blocked", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};