const templateMail = (displayName, verifyLink) => {
    return `
        <html lang="en">
            <style>
                .page {
                    background: #f5f5f5;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    font-family: 'poppins', sans-serif;
                }
                .container {
                    margin: 20px;
                    padding: 20px;
                    background-color: #ffffff;
                }
                .header {
                    width: 100%;
                    display:flex;
                    justify-content: center;
                }
                .header img {
                    width: 200px;
                    height: 200px;
                }
                .header h1 {
                    font-size: 2.5rem;
                    font-weight: 500;
                    margin-left: 1rem;
                }
                .content {
                    width: 100%;
                    margin-top: 2rem;
                }
                .content p {
                    margin-bottom: 1.1em;
                }
                .content a {
                    text-decoration: none;
                    display:flex;
                    justify-content: center;
                }
                .content a:hover {
                    color: #000;
                    text-decoration: underline;
                }
                .content a button {
                    background-color: #23b0ff;
                    color: #fff;
                    border: none;
                    border-radius: 20px;
                    padding: .6em 1.2em;
                    font-size: 1.1em;
                }
            </style>
            <body>
                <div class="page">
                    <div class="container">
                        <div class="header">
                            <img alt="icon" src="https://raw.githubusercontent.com/Alexandre-Vernet/File-Sync/main/front/src/assets/icons/app_icon/icon.png">
                        </div>
                        <div class="content">
                            <h1>Hi ${ displayName },</h1>
                            <p>Thanks for signing up for File-Sync !</p>
                            <p>Before you can start using File-Sync, you need to verify your email address.</p>
                            <p>Click the button below to verify your email address.</p>
                            <a href="${ verifyLink }" target="_blank" rel="noopener noreferrer">
                                <button>Verify email</button>
                            </a>
                            <p>If you didn't create an account, you can safely delete this email.</p>
                            <p>Thanks,</p>
                            <p>The File-Sync Team</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;
}

module.exports = templateMail;
