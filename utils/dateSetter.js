const birthSetter = (newDate) => {
  const date = newDate.split("T")[0];
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const reservationDateSetter = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const monthInLetters = monthSetter(month)
  
  return `${day} de ${monthInLetters} de ${year} `;
};

function monthSetter(month) {
  switch (month) {
    case 1:
      month = "Enero";
      break;
    case 2:
      month = "Febrero";
      break;
    case 3:
      month = "Marzo";
      break;
    case 4:
      month = "Abril";
      break;
    case 5:
      month = "Mayo";
      break;
    case 6:
      month = "Junio";
      break;
    case 7:
      month = "Julio";
      break;
    case 8:
      month = "Agosto";
      break;
    case 9:
      month = "Septiembre";
      break;
    case 10:
      month = "Octubre";
      break;
    case 11:
      month = "Noviembre";
      break;
    case 12:
      month = "Diciembre";
      break;
    default:
      return;
  }
  
  return month
}




module.exports = { birthSetter, reservationDateSetter };




