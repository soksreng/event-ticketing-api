// This file is responsible for sending emails using nodemailer
const nodemailer = require('nodemailer');
// This function configures the nodemailer transporter and sends an email
// It takes the recipient's email address, subject, and text as parameters
const sendEmail = async (to, subject, text) => {
    // Create a transporter object using Gmail service and authentication details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Email address
            pass: process.env.EMAIL_PASS, // App password
        },
    });

    // Define the email options including sender, recipient, subject, and text
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    // Send the email using the transporter and handle the response
    await transporter.sendMail(mailOptions);
    };

module.exports = sendEmail;
