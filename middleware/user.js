const jwt = require("jasonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if(decoded){
        req.userId = decoded.id;
        next()
    }
    else{
        res.status(403).json({
            message: "you arent signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}