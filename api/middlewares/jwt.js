const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, NODE_ENV } = process.env;

const getAccessToken = (payload) => {
    return jwt.sign({ payload }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
}

const verifyAccessToken = (req, res, next) => {
    if (NODE_ENV === 'development') {
        next();
    } else {
        const bearerHeader = req.headers.authorization;
        const accessToken = bearerHeader && bearerHeader.split(' ')[1];
        if (accessToken === null) {
            return res.sendStatus(401);
        }

        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
}

const decodeAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    getAccessToken,
    verifyAccessToken,
    decodeAccessToken,
};
