const { getAuth } = require("firebase-admin/auth");

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    const bearer = token.split(' ')[1];

    getAuth()
        .verifyIdToken(bearer)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(401).send({
                message: 'You are not authorized to access this resource \nPlease sign-in again'
            });
        });
}

module.exports = verifyToken;