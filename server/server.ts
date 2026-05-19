import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/connectDb.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use("/api", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Smart Leads API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
});

export default app;
