const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/users");

const app = express();
const PORT = 3000;

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User Management API is running");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});