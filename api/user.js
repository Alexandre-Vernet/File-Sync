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

const sendCustomVerificationEmail = (email, displayName, link) => {
// Construct email verification template, embed the link and send
    // using custom SMTP server.
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: 'irebase Auth',
            to: email,
            subject: 'Verify your email',
            html: `<p>Hi ${ displayName },</p>
                <p>Please verify your email by clicking the link below:</p>
                <p><a href="${ link }">${ link }</a></p>
                <p>Thank you!</p>`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports = checkUserFormat;