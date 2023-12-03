import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/prodductRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
import redis from "redis";

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

dotenv.config();
connectDB();

// Create a Redis client
const redisClient = redis.createClient();

// Check if the Redis client is connected
function checkRedisConnection(callback) {
  if (redisClient.connected) {
    callback();
  } else {
    redisClient.on("connect", () => {
      console.log("Redis client connected.");
      callback();
    });
  }
}

// Middleware for caching
app.use((req, res, next) => {
  const cacheKey = req.originalUrl;

  // Ensure the Redis client is connected before attempting to get data from the cache
  checkRedisConnection(() => {
    // Try to get data from the cache
    redisClient.get(cacheKey, (err, cachedData) => {
      if (err) {
        console.error("Error retrieving data from cache:", err);
        // If an error occurs, proceed to the next middleware
        next();
      } else if (cachedData) {
        // Data found in the cache
        const data = JSON.parse(cachedData);
        res.json(data);
      } else {
        // Data not found in the cache, proceed to the next middleware
        next();
      }
    });
  });
});

app.use(express.json()); // Move jsonParser middleware here to ensure it runs after caching

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
