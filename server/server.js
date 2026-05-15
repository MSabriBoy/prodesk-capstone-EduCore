const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const rateLimit = require("express-rate-limit");
const aiRoutes = require("./routes/aiRoutes");



connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ]
  })
);
app.use(express.json());

app.use("/api/auth", limiter);
app.use("/api/ai", limiter);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("EduCore Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(
    `EduCore API live on port ${PORT}`
  );
});