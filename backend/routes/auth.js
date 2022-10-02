import { Router } from "express";
import User from "../models/User.js";
import { loginValidation, registerValidation } from "../validators/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

export default (mainRouter) => {
    mainRouter.use("/auth", router);

    // Register
    router.post("/register", async(req, res) => {
        // Validate the data before creating a user
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Checking if the user is already in the DB
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send("Email already exists");

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        try {
            const savedUser = await user.save();
            res.send({ user_id: savedUser._id });
        } catch (err) {
            res.status(400).send(err);
        }
    });

    // Login
    router.post("/login", async(req, res) => {
        // Validate the data before we login
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Checking if the user exists in the DB
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Email or password is wrong");

        // Check if password is correct
        const validPass = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPass)
            return res.status(400).send("Email or password is wrong");

        // Create JWT Token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
        res.header("auth-token", token).send("Logged in! Token: " + token);
    });
};