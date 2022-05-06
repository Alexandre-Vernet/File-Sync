function checkUserFormat(req, res, next) {
    const { displayName, email, password } = req.body.user;

    // Check if data exist
    if (!displayName || !email || !password) {
        return res.status(400).send({
            message: 'Invalid format'
        });
    }

    // Check display name length
    if (displayName.length <= 5 || displayName.length >= 25) {
        return res.status(400).send({
            message: 'Display name must be between 5 and 25 characters'
        });
    }

    // Check if email is valid
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
        return res.status(400).send({
            message: 'Invalid email'
        });
    }

    // Check password length
    if (password.length <= 6 || password.length >= 25) {
        return res.status(400).send({
            message: 'Password must be between 6 and 25 characters'
        });
    }

    next();
}

module.exports = checkUserFormat;