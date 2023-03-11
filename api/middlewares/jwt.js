const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const getAccessToken = (payload) => {
    return jwt.sign({ payload }, ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
}

const getRefreshToken = (payload) => {
    return jwt.sign({ payload }, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

const verifyAccessToken = (req, res, next) => {
    const env = process.env.NODE_ENV;
    if (env === 'development') {
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

const verifyRefreshToken = (req, res, next) => {
    const { refreshToken } = req.body;
    if (refreshToken === null) {
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403);
        }
        next();
    });
}

const getAccessTokenFromRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
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

module.exports = {
    getAccessToken,
    getRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeToken,
    getAccessTokenFromRefreshToken
};
