import { Router } from "express";
import { getTest } from "../controllers/test.js";

const router = Router();

export default (mainRouter) => {
    mainRouter.use("/test", router);

    router.get("/", getTest);
};