const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const getAccessToken = (payload) => {
    return jwt.sign({ payload }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
}

const getRefreshToken = (payload) => {
    return jwt.sign({ payload }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

const verifyToken = (req, res, next) => {
    const env = process.env.NODE_ENV;
    if (env === 'development') {
        next();
    } else {
        const bearerHeader = req.headers.authorization;
        const token = bearerHeader && bearerHeader.split(' ')[1];
        if (token === null) {
            return res.sendStatus(401);
        }

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
}

const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports = { getAccessToken, getRefreshToken, verifyToken, decodeToken };
