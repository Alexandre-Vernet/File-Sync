const { getAuth } = require("firebase-admin/auth");

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    const bearer = token.split(' ')[1];

    getAuth()
        .verifyIdToken(bearer)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(401).send({
                message: 'Unauthorized'
            });
        });
}

module.exports = verifyToken;