exports.contactUsEmail = (
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    countrycode
) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
                border: 1px solid #dddddd;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
            .message {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #333;
            }
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
            .support {
                font-size: 14px;
                color: #555555;
                margin-top: 20px;
            }
            .highlight {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="EasyNotes Logo"></a>
            <div class="message">Contact Form Confirmation</div>
            <div class="body">
                <p>Dear ${firstname} ${lastname},</p>
                <p>Thank you for reaching out to us. We have received your message and will respond to you as soon as possible.</p>
                <p>Here are the details you provided:</p>
                <p><span class="highlight">Name:</span> ${firstname} ${lastname}</p>
                <p><span class="highlight">Email:</span> ${email}</p>
                <p><span class="highlight">Phone Number:</span> ${countrycode}-${phoneNo}</p>
                <p><span class="highlight">Message:</span> ${message}</p>
                <p>We appreciate your interest and will get back to you shortly.</p>
            </div>
            <div class="support">
                <p>If you have any further questions or need immediate assistance, please feel free to reach out to us at <a href="mailto:connectwithsiddh@gmail.com">connectwithsiddh@gmail.com</a>. We are here to help!</p>
            </div>
        </div>
    </body>
    </html>`;
}
