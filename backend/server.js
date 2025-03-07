import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for your frontend URL
app.use(
  cors({
    origin: "https://globetrotter-challenge-2-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Allow Preflight Requests
app.options("*", cors());

app.use(express.json());

// ✅ Use Routes
app.use("/api", questionRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));
