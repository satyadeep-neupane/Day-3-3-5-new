const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3269509923cc49",
      pass: "76db0469e08524"
    }
  });

  module.exports = transporter

// transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// }, (err, info) => {
//     if(err)
//         console.log("Email Sending Failed");
//     else
//         console.log("Email Sent Successfully");
// });
