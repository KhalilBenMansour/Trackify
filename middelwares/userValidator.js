const Joi = require("joi");
exports.userValidate = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(44).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
};
