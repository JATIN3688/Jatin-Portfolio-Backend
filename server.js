require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
connectDB();
app.use(express.json());
app.use(contactRoutes);
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Backend is Running ");
});
app.get("/about", (req, res) => {
  res.send("This is About API");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
