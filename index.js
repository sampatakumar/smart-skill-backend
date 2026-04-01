import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";


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

app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} on url : ${url}. `);
});