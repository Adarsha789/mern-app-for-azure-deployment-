import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import route from "./routes/userRoute.js";

// Load environment variables from .env
dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors({ origin: ["http://localhost:3000"] })); // Adjust as needed for production

// Environment Variables
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGOURL || "mongodb://localhost:27017/crud-app";

// ✅ Root route (Fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("✅ Backend API is running");
});

// Routes
app.use("/api", route);

// MongoDB Connection and Server Start
mongoose.connect(MONGOURL)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    });
