const jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_SECRET;

const signToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ payload }, privateKey, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        }, { expiresIn: '168h' });   /*Expire in 1 week*/
    });
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

        jwt.verify(token, privateKey, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
}

const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

module.exports = { signToken, verifyToken, decodeToken };
