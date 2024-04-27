const Users = require("../modals/users");
const jwt = require("jsonwebtoken");

// Handle Errors
const handleError = (err) => {
  let errors = { email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // validation errors

  if (err.message === "incorrect email") {
    errors.email = "Incorrect email";
  }

  if (err.message === "incorrect password") {
    errors.password = "Incorrect password";
  }

  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    return err.message;
  }

  return errors;
};

/**
 *  CREATE JWT TOKEN
 */
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "testing secret", {
    expiresIn: maxAge,
  });
};

/**
 *  SIGN UP PAGE RENDER
 */

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

/**
 * LOGIN PAGE RENDER
 */

module.exports.login_get = (req, res) => {
  res.render("login");
};

/**
 * Create User
 */

module.exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRes = await Users.create({ email, password });
    const token = createToken(userRes._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: userRes._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRes = await Users.login(email, password);
    const token = createToken(userRes._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: userRes._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
