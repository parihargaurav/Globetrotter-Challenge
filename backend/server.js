import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", questionRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log("❌ MongoDB connection error:", err));
