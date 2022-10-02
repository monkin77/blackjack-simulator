import { Router } from "express";
import User from "../models/User.js";
import { verifyToken } from "../validators/middleware/verifyToken.js";

const router = Router();

export default (mainRouter) => {
    mainRouter.use("/private", router);

    // Hello
    router.get("/hello", verifyToken, async(req, res) => {
        const user = await User.findOne({ _id: req.user._id });
        if (!user)
            return res.status(400).send("User not found for the given token");

        res.send("Hello World! Mr/Ms " + user.name);
    });
};