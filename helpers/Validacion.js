export function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toLocaleUpperCase());
}

export function validarNombre(nombre) {
  const regex = /^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/;
  const nombreCapitalizado = capitalizeWords(nombre);

  return regex.test(nombreCapitalizado);
}

export function validarApellido(apellido) {
  const regex = /^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/;
  const apellidoCapitalizado = capitalizeWords(apellido);

  return regex.test(apellidoCapitalizado);
}

export function validarPretensionSalarial(pretensionSalarial) {
  return pretensionSalarial > 0;
}

export function validarCorreo(correo) {
  const regex = /^[A-Za-z0-9]+([._%+-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*(\.[A-Za-z]{2,})+$/;

  return regex.test(correo);
}

export function validarPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+#=(){}[\]<>|\\/^~`,.;:_-])[A-Za-z\d@$!%*?&+#=(){}[\]<>|\\/^~`,.;:_-]{8,}$/;

  return regex.test(password);
}

export function validarTel(tel) {
  const regex = /^\+[0-9]{1,3}-[0-9]{1,14}$/;

  return regex.test(tel);
}

// Ejemplo de uso
console.log(validarNombre('juan perez')); // true
console.log(validarApellido('gonzalez lopez')); // true
console.log(validarNombre('maría123')); // false
console.log(validarApellido('san 123')); // false
console.log(validarPretensionSalarial(5000)); // true
console.log(validarPretensionSalarial(0)); // false
console.log(validarCorreo('correo@example.com')); // true
console.log(validarCorreo('invalido@correo')); // false
console.log(validarTel('+1-123456789')); // true
console.log(validarTel('123')); // false
