const envValidation = (()=>{
  const requiredEnvVariables = [
    "PORT",
    "ORIGIN",
    "SECRET",
    "USER",
    "PASSWORD",
    "HOST",
    "EMAIL_ADMIN",
    "PASS_ADMIN",
  ];
  const missingEnvVariables = requiredEnvVariables.filter(
    (variable) => !process.env[variable]
  );
  if (missingEnvVariables.length > 0) {
    console.error(
      `Faltan variables de entorno requeridas: ${missingEnvVariables.join(
        ", "
      )}`
    );
    process.exit(1);
  }
  return "Variables de entorno validadas correctamente"
})();

module.exports = {envValidation}
