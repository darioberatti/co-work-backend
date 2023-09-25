const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASS_ADMIN,
  },
});

transporter.verify().then(() => console.log("Ready to send email"));

exports.sendEmail = (to, registerToken) => {
  transporter.sendMail({
    from: '"Retro Futbol Club" <e.retrofutbolclub@gmail.com>', // sender address
    to: to, // list of receivers
    subject: "Confirmacion de registro de usuario", //Subject line
    html: `<h2>Hola ${to}! Tu usuario se registro con éxito</h2>
    <a href=http://localhost:3000/confirm-user/${registerToken}>Redirigir al sitio:</a>
    <h4><b>Muchisimas gracias!</b></h4>`,
  });
};

module.exports = transporter;
