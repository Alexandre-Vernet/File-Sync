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
    if (!refreshToken) {
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
    });
}

const getAccessTokenFromRefreshToken = (refreshToken) => {
    const { payload } = jwt.decode(refreshToken);
    return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(getAccessToken(payload));
            });
        }
    );
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
    getRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeAccessToken,
    getAccessTokenFromRefreshToken
};
