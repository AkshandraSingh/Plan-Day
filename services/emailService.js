const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASS,
    }
});

const forgetPassword = async (userEmail) => {
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

                </html>`,
    })
}

const taskNotification = async (userEmail, userName, taskName, taskDescription) => {
    await transporter.sendMail({
        from: `"PlanDay - Planner" <${process.env.USER_EMAIL}>`,
        to: userEmail,
        subject: `Task Notification - ${userName}`,
        html: `
            <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Task Reminder</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }

            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }

            .header {
                background-color: #4CAF50;
                color: white;
                padding: 20px;
                text-align: center;
            }

            .content {
                padding: 20px;
            }

            .footer {
                background-color: #f4f4f4;
                color: #666;
                text-align: center;
                padding: 10px;
                font-size: 12px;
            }

            .task-details {
                margin: 20px 0;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background-color: #fafafa;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="header">
                <h1>TASK NOTIFICATION</h1>
            </div>
            <div class="content">
                <p>Hi ${userName},</p>
                <p>This is a reminder for your upcoming task:</p>
                <div class="task-details">
                    <p><strong>Task:</strong> ${taskName}</p>
                    <p><strong>Description:</strong> ${taskDescription}</p>
                </div>
                <p>Don't forget to complete it on time!</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Plan Day Application. All rights reserved.</p>
            </div>
        </div>
    </body>

    </html>
`,
    })
}

module.exports = {
    forgetPassword,
    taskNotification
}
