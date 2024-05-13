const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  //1) Create a transport
  const transporter = nodemailer.createTransport({
    service: 'sendGrid',
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'abhaygc24@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
