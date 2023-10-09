const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASS_ADMIN,
  },
});

const originUrl = process.env.ORIGIN;

transporter.verify().then(() => console.log("Ready to send email"));

const sendEmail = (to, registerToken) => {
  transporter.sendMail({
    from: process.env.EMAIL_ADMIN, // sender address
    to: to, // list of receivers
    subject: "Confirmacion de registro de usuario", //Subject line
    html: `<h2>Hola ${to}! Tu usuario se registro con éxito</h2>
    <a href=${originUrl}/confirm-user/${registerToken}>Redirigir al sitio:</a>
    <h4><b>Muchisimas gracias!</b></h4>`,
  });
};

// Ver de reutilizar el mismo sendEmail para ambos casos, diferenciando si es Create o Reset.

const resetPasswordEmail = (to, resetToken) => {
  transporter.sendMail({
    from: process.env.EMAIL_ADMIN, // sender address
    to: to, // list of receivers
    subject: "Restablecer contraseña Co-Work", //Subject line
    html: `<h2>Hola ${to}!</h2>
    <p>Ingresa al siguiente link para establecer una nueva contraseña.</p>
    <a href=${originUrl}/confirm-user/${resetToken}>Redirigir al sitio:</a>
    <h4><b>Saludos!</b></h4>`,
  });
};

const newBookingConfirmationEmail =(to, recieverName , newReservation , table, office)=>{
  transporter.sendMail({
    from: process.env.EMAIL_ADMIN, // sender address
    to: to, // list of receivers
    subject: "Reserva confirmada - Co-Work", //Subject line
    html: `<h2>Hola ${recieverName}!</h2>
    <h4>Tu reserva en nuestra oficina ${office.name} fue realizada con éxito!</h4>
    <p>Fecha de reserva: ${newReservation.day}<p>
    <p>Turno: ${newReservation.shift}<p>
    <p>Mesa: ${table.name}<p>

    <p>Si no puede concurrir a la reserva, le pedimos por favor la cancelación de la misma haciendo <a href=${originUrl}/bookings>click aqui</a><p>
    <h4><b>Saludos!</b></h4>`,
  });
}

module.exports = { transporter, sendEmail, resetPasswordEmail, newBookingConfirmationEmail };
