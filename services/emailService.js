const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASS,
    }
});

const sendMail = async (userEmail, emailService) => {
    if (emailService === "forgetPassword") {
        await transporter.sendMail({
            from: `"PlanDay - Planner" <${process.env.USER_EMAIL}>`,
            to: userEmail,
            subject: "Forget Password - PlanDay",
            html: `
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        * {
                            margin: 0px;
                            padding: 0px;
                        }

                        #heading {
                            margin: 12px;
                            font-family: Georgia, 'Times New Roman', Times, serif;
                            font-size: 23px;
                            text-align: center;
                        }

                        p {
                            margin: 14px;
                            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
                            font-size: 16px;
                            text-align: center;
                        }

                        #link {
                            text-decoration: none;
                            font-weight: bold;
                            color: #3766e9;
                        }

                        #link:hover {
                            color: crimson;
                            cursor: pointer;
                        }
                    </style>
                </head>

                <body>
                    <h1 id="heading">FORGET PASSWORD - PLANDAY</h1>
                    <p>Here is your link for Reset Password</p>
                    <p><a href="https://techgenius-zgsb.onrender.com/" id="link">Set Password</a></p>
                </body>

                </html>`});
    }
}

module.exports = {
    sendMail,
}
