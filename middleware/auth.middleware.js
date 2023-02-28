const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and check user role
const authenticate = (role) => async (req, res, next) => {
    try {
        // Get token from request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify token and get payload
        const payload = jwt.verify(token, "masai");

        // Check user role
        if (payload.user.role !== role) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Add payload to request object
        req.payload = payload;

        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Unauthorized" });
    }
};





module.exports = authenticate 
