import { Router } from "express";
import { getTest } from "../controllers/test.js";

const router = Router();

// import middleware

// api routes

export default (app) => {
    app.use("/", router);

    // Test route
    router.get("/test", getTest);
};