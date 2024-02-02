const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    console.log("Server/AuthMiddleware --> says ...");
    return res.json({ error: "User not logged in!" });
  }

  try {
    const validToken = verify(accessToken, "importantsecret"); // The required local key
    req.user = validToken;
    if (validToken) {
      console.log("Server/AuthMiddleware , the valid token check -->")
      return next(); // What does this do
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
