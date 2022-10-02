import Joi from "@hapi/joi";

// Register Validation
export const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(4).max(255).email().required(),
        password: Joi.string().min(6).max(1024).required(),
    });

    return schema.validate(data);
};

// Login Validation
export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(4).max(255).email().required(),
        password: Joi.string().min(6).max(1024).required(),
    });

    return schema.validate(data);
};