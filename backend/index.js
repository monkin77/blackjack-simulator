// import modules
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/test.js";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/index.js";

dotenv.config();

// app
const app = express();

// db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED!"))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(morgan("dev")); // Used to beautify output of requests to the backend
app.use(cors({ origin: true, credentials: true }));

// routes
app.use("/api", apiRoutes());

// port
const port = process.env.PORT || 8081;

// listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));