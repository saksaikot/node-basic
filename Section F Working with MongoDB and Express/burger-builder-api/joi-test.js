const Joi = require("joi");

const userValidationSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(255).min(8).required(),
});

const user = { email: "as@disable", password: "1234" };

function validateUser(user) {
  const { error } = userValidationSchema.validate(user, { abortEarly: false });
  return error
    ? error.details.reduce(
        (previous, current) => [
          ...previous,
          { key: current.context.key, message: current.message },
        ],
        []
      )
    : null;
}
console.log(validateUser(user));
