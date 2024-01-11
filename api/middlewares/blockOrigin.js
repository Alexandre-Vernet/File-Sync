const blockOrigin = (req, res, next) => {
    const { NODE_ENV, ALLOWED_ORIGIN } = process.env;
    const origin = req.get('origin');

    console.log('NODE_ENV: ' + NODE_ENV);
    console.log('ALLOWED_ORIGIN: ' + ALLOWED_ORIGIN);

    if (ALLOWED_ORIGIN === origin) {
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
