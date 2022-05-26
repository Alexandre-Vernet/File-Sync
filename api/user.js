const templateMail = require('./mail');


const checkUserFormat = (req, res, next) => {
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

const sendCustomVerificationEmail = async (email, displayName, link) => {
    const nodemailer = require("nodemailer");

    // const transport = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: process.env.MAIL_EMAIL,
    //         pass: process.env.MAIL_PASSWORD
    //     }
    // });

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "59ecea4151d527",
            pass: "1ec584fe4ae797"
        }
    });


    // send mail with defined transport object
    await transport.sendMail({
        from: `File-Sync ${ process.env.MAIL_EMAIL }`,
        to: email,
        subject: 'Verify your email',
        html: templateMail(displayName, link)
    });
}

module.exports = { checkUserFormat, sendCustomVerificationEmail };
