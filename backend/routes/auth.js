import { Router } from "express";
import User from "../models/User.js";
import { registerValidation } from "../validators/auth.js";

const router = Router();

export default (mainRouter) => {
    mainRouter.use("/auth", router);

    router.post("/register", async(req, res) => {
        // Validate the data before creating a user
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Checking if the user is already in the DB
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send("Email already exists");

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (err) {
            res.status(400).send(err);
        }
    });
};