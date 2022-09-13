const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {
    try {
        // getting token from cookies
        const { token } = req.cookies;
        // if token not exist it means user is not login so return error code 401
        if (!token) {
            return res.status(401).json({
                message: "Please Login First"
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded._id)
        next()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}