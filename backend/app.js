import dotenv from "dotenv";
dotenv.config(); // This loads the .env file and makes the variables available in process.env

import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import mongoose from "mongoose";

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json()); // Converts the JSON data in the request body into a JavaScript object
// JSON body { "title": "Learn Express", "completed": false }
// req.body = { title: "Learn Express", completed: false }
// req.body.title = "Learn Express"

app.use(cors()); // Allow requests from different origins

// Routes  (todoRoutes = /api/todos)
app.use("/api/todos", todoRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
