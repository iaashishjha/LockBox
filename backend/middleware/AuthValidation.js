const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(), 
        contact: Joi.number().min(8).required(),
        password: Joi.string().min(4).max(100).required(),
        company: Joi.string().min(3).max(100).required(),
        agency: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request", error: error.details });
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(), 
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request", error: error.details });
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}