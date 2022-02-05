const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const splited = token.split(' ')
        console.log(splited)
        if (splited[0] != "Bearer") {
            return res.sendStatus(401);
        }
        const decoded = jwt.verify(splited[1], process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
};

module.exports = verifyToken;