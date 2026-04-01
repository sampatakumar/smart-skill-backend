import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";


import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "1.0.0.1"]);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.BACKEND_URL;

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("🚀 Smart Skill Hub Backend Running");
});

app.get("/api/author", (req, res) => {
  res.send("Sampatakumar")
  console.log("git : https://github.com/sampatakumar")
});

app.use("/api/users", userRoutes);
app.use("/", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} on url : ${url}. `);
});