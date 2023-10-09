const birthSetter = (newDate)=>{
  const date = newDate.split("T")[0]
  const [year,month,day] = date.split("-")
  return `${day}/${month}/${year}`
}

module.exports = {birthSetter}