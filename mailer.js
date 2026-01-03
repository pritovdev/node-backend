//"use strict"
const nodemailer = require('nodemailer');

//async... await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // Generate test SMTP service account for ethereal.email
  // Only needed if you do not have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // Create reusabel transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,  // Generated ethereal user
      pass: testAccount.pass,  // Generated ethereal password
    },
  });
};

// Send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Pepito Perez" "pepito@mail.com"', // Sender adderss
  to: "pepita@mail.com, juanito@mail.com",  // List of receivers
  subject: "Emails intention", //Subject line
  text: "Hi everyone", // Plain text body
  html: "<b> Hi all </b>", // html body 
});

console.log("Message sent: %s", info.messageId);
// Message sent: <asdlkns-sdnuaisd-dsad34wsd@example.com>

// Preview only available when sending through en Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/daAEravase24FAS...

sendMail();