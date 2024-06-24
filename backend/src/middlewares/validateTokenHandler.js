const jwt = require('jsonwebtoken');

const validateTokenHandler = async (req, res, next) => {
    let token;
    let autHeader = req.headers.Authorization || req.headers.authorization; // check authorization in headers
    if (autHeader && autHeader.startsWith("Bearer")) { // check authorization
      token = autHeader.split(" ")[1];
      jwt.verify(token, process.env.ADMIN_TOKEN_SECRET, (err, decode) => { // check token
        if (err) {
          res.status(401);
          throw new Error("Admin is not authorized");
        }
        req.admin = decode.admin;
        next();
      })
    }
    if(!token) {
        res.status(401);
        throw new Error("Admin is not authorized or token is missing");
    }
}

module.exports = validateTokenHandler;