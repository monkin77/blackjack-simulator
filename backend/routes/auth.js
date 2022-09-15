import { Router } from "express";

const router = Router();

export default (mainRouter) => {
    mainRouter.use("/auth", router);

    router.post("/register", (req, res) => {
        res.send("Registered");
    });
};