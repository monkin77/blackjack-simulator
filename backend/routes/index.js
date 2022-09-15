import { Router } from "express";
import test from "./test.js";
import auth from "./auth.js";

export default () => {
    const mainRouter = Router();

    test(mainRouter);
    auth(mainRouter);

    return mainRouter;
};