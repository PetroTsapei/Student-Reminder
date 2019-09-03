const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = function (req, res, data, callback) {
  const transporter = nodemailer.createTransport('SMTP',{
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    ...data
  };

  transporter.sendMail(mailOptions, function(error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Can't send activation link to user" });
    } else callback();
  });
};
