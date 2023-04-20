const blockOrigin = (req, res, next) => {
    const { NODE_ENV, FRONTEND_URL } = process.env;
    const origin = req.get('origin');

    if (FRONTEND_URL === origin) {
        next();
    } else {
        if (NODE_ENV === 'development') {
            next();
            return;
        }
        console.error('Forbidden request from: ' + origin);
        res.status(403).send('Forbidden');
    }
}

module.exports = { blockOrigin };
