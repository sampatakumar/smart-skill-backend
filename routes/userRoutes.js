import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// 🔥 Create or update user
router.post("/", verifyToken, async (req, res) => {
  try {
    const { uid, name, email, picture } = req.user;

    const user = await User.findByIdAndUpdate(
      uid,
      {
        _id: uid,
        name,
        email,
        photoURL: picture,
        provider: "firebase",
      },
      { upsert: true, new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔍 Get user
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.uid);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;