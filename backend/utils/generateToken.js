
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  try {
    const token = jwt.sign(
      { userid: userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return token;
  } catch (error) {
    console.log("Token Generation failed", error.message);
  }
};

module.exports = generateToken;
