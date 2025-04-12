require('dotenv').config();
const jwt = require('jsonwebtoken');

//---------------- For verify jwt token for incomming request

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization; // get token from headers

    if (!authorization) {
        res.status(401).json({
            message: "Token not found"
        });
    }

    // Extract jwt token from request headers
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Unauthorized user."
        });
    }

    // Verify jwt token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.jwtPayload = decoded;
        next();
    } catch (err) {
        console.error("JWT token error: ", err);

        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = jwtAuthMiddleware;