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

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });

    // send mail with defined transport object
    await transport.sendMail({
        from: 'File-Sync file-sync@test.com',
        to: email,
        subject: 'Verify your email',
        html: `
            <style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        background: #f5f6fa;
    }

    .container .header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
    }

    .container .header img {
        width: 100px;
        height: 100px;
    }

    .container .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        background: #fff;
        padding: 20px 100px;
    }

    .container .body h1 {
        font-size: 2em;
        font-weight: 600;
        color: #23b0ff;
    }

    .container .body p {
        font-size: 14px;
        margin-top: 10px;
        color: #9d9fa6;
    }

    .container .body input {
        width: 100%;
        border-radius: 5px;
        border: 1px solid #e6e6e6;
        padding: 10px 20px;
        margin-top: 10px;
        background: #23b0ff;
        color: #fff;
        font-size: 1.2em;
        margin-bottom: 20px;
    }

    .container .body span {
        font-size: 0.8em;
        color: #9d9fa6;
    }

</style>
            <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Verify Email</title>
</head>
<body>
<div class="container">
    <div class="header">
        <img src="https://raw.githubusercontent.com/Alexandre-Vernet/File-Sync/main/front/src/assets/icons/app_icon/icon.png"
             alt="icon">
    </div>
    <div class="body">
        <h1>Verify email</h1>
        <h2>Hi ${ displayName }</h2>
        <p>
            Please click on the link below to verify your email address.
        </p>
        <a href="${ link }">
            <input type="button" value="Verify email">
        </a>
        <span>
            This is an automated email, please do not reply.
        </span>


    </div>

</div>
</body>
</html>
            `
    });
}

module.exports = { checkUserFormat, sendCustomVerificationEmail };