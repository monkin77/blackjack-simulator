import { Router } from "express";
import test from "./test.js";
import auth from "./auth.js";
import privateRoute from "./private.js";

export default () => {
    const mainRouter = Router();

    test(mainRouter);
    auth(mainRouter);
    privateRoute(mainRouter);

    return mainRouter;
};