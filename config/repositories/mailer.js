const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { reservationDateSetter } = require("../../utils/dateSetter");
dotenv.config();
const { google } = require("googleapis");
const calendar = google.calendar("v3");

// Configura la autenticación para la api calendar con el JSON de las credenciales
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.CALENDAR_CREDENTIALS_PATH,
  scopes: "https://www.googleapis.com/auth/calendar",
});

// Crea un evento en el calendario del usuario
const createEvent = async (eventDetails) => {
  const calendarId =
    "8936dd793638bbbbdebe0e7006f3c1e88414984d1a3b9b09d5ed6678513fa147@group.calendar.google.com";

  try {
    const calendar = google.calendar({ version: "v3", auth });
    const event = await calendar.events.insert({
      calendarId,
      requestBody: eventDetails,
    });
    console.log("Evento creado: ", event.data.htmlLink);
  } catch (error) {
    console.error("Error al crear el evento: ", error);
  }
};
/* const createEventWithInvitation = async (userEmail, eventDetails) => {
  const calendarId =
    "7d65961f3db75069853c420954506cd2a9d09e1c16fd5cdb84532f4c2d0ecd41@group.calendar.google.com";

  try {
    const calendar = google.calendar({ version: "v3", auth });

    eventDetails.attendees = [{ email: userEmail }];

    const event = await calendar.events.insert({
      calendarId,
      requestBody: eventDetails,
    });

    console.log("Invitación enviada a: ", userEmail);
    console.log("Evento creado: ", event.data.htmlLink);
  } catch (error) {
    console.error("Error al enviar la invitación: ", error);
  }
}; */ //Esta función tira error: Service accounts cannot invite attendees without Domain-Wide Delegation of Authority.

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

//Mail con link para confirmar registro de usuario
const sendEmail = (to, registerToken) => {
  transporter.sendMail({
    from: process.env.EMAIL_ADMIN, // sender address
    to: to, // list of receivers
    subject: "Confirmacion de registro de usuario", //Subject line
    html: `<h2>Hola ${to}! Tu usuario se registro con éxito</h2>
    <p><a href=${originUrl}/confirm-user/${registerToken}>Haga click aquí</a> para confirmar su contraseña y ya podrá iniciar sesión</p>
    <h4><b>Muchisimas gracias!</b></h4>`,
  });
};

//Mail para resetear contraseña
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

//Mail confirmando reserva de turno y creando evento en calendar

const newBookingConfirmationEmail = (
  to,
  recieverName,
  newReservation,
  table,
  office
) => {
  const reservationTime =
    newReservation.shift === "mañana"
      ? `${office.openingTime.slice(0, 5)} a 13:00hs`
      : `14:00 a ${office.closingTime.slice(0, 5)}hs`;

  const date = reservationDateSetter(newReservation.day);

  transporter.sendMail({
    from: process.env.EMAIL_ADMIN, // sender address
    to: to, // list of receivers
    subject: "Reserva confirmada - Co-Work", //Subject line
    html: `<h2>Hola ${recieverName}!</h2>
    <h4>Tu reserva en nuestra oficina ${office.name} fue realizada con éxito!</h4>
    <p>Fecha de reserva: ${date}<p>
    <p>Dirección: ${office.address} - ${office.city} - ${office.province}<p>
    <p>Turno: ${newReservation.shift}<p>
    <p>Horario: ${reservationTime}<p>
    <p>Mesa: ${table.name}<p>

    <p>Si no puede concurrir a la reserva, le pedimos por favor la cancelación de la misma hasta dos horas antes haciendo <a href=${originUrl}/bookings>click aqui</a><p>
    <h4><b>Saludos!</b></h4>`,
  });

  // Setea la hora de finalización (4hs después del inicio)
  const startTime = new Date(newReservation.day.getTime() + 180 * 60 * 1000); //Se le agregan 3 hs porque la zona horaria BsAs le resta 3 hs
  const endTime = new Date(startTime.getTime() + 240 * 60 * 1000);
  const formattedEndTime = endTime.toISOString();

  const description = `Espacio de trabajo reservado en la mesa ${table.name} de ${office.name}. Dirección de la oficina: ${office.address} - ${office.city} - ${office.province}`;

  //Setea los detalles del evento creado en Calendar
  const eventDetails = {
    summary: "Reserva de Co-Work",
    description: description,
    start: {
      dateTime: startTime.toISOString(), //Setea hora de inicio
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: formattedEndTime, //Setea hora de finalización
      timeZone: "America/Argentina/Buenos_Aires",
    },
  };

  createEvent(eventDetails);
};

const reservationCancellationToOfficeClosureEmail = (to, reservation) => {
  transporter.sendMail({
    from: process.env.EMAIL_ADMIN,
    to: to,
    subject: "Reserva Cancelada - Oficina Deshabilitada",
    html: `<h2>Hola ${to}!</h2>
    <p>Tu reserva #${reservation.id} ha sido cancelada debido a la deshabilitación de la oficina.</p>
    <p>Fecha de reserva: ${reservation.day}</p>
    <p>Turno: ${reservation.shift}</p>
    <p>Si tienes alguna pregunta o necesitas más información, por favor, contáctanos.</p>
    <h4><b>Saludos!</b></h4>`,
  });
};

module.exports = {
  transporter,
  sendEmail,
  resetPasswordEmail,
  newBookingConfirmationEmail,
  reservationCancellationToOfficeClosureEmail,
};
