const fs = require("fs");
let userId = 1;
function generateUserId() {
  return userId++;
}

function singUp() {
  let name = document.getElementById("Name").value;
  let email = document.getElementById("Email").value;
  let phone = document.getElementById("Phone").value;
  let password = document.getElementById("Password").value;
  let password2 = document.getElementById("Password2").value;

  // Expresión regular para validar el nombre con dos palabras
  let nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

  // Expresión regular para validar el número de teléfono con 9 dígitos
  let phoneRegex = /^\d{9}$/;

  // Expresión regular para validar el email
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expresión regular para validar la contraseña
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  let errorMessage = ""; // Mensaje de error inicialmente vacío

  if (!name.match(nameRegex)) {
    errorMessage += "El nombre debe contener dos palabras.\n";
  }

  if (!phone.match(phoneRegex)) {
    errorMessage += "El número de teléfono debe tener exactamente 9 dígitos.\n";
  }

  if (!email.match(emailRegex)) {
    errorMessage += "El email debe tener un formato válido.\n";
  }

  if (!password.match(passwordRegex)) {
    errorMessage +=
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo, y tener una longitud mínima de 8 caracteres.\n";
  }

  if (password !== password2) {
    errorMessage += "Las contraseñas no coinciden.\n";
  }

  if (errorMessage === "") {
    alert("Sign Up Successful");
    let user = {
      id: generateUserId(), // Generar un nuevo ID de usuario
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    // Convertir el objeto de usuario a formato de cadena
    let userString = JSON.stringify(user);

    // Agregar el usuario al archivo de texto
    fs.appendFile("users.txt", userString + "\n", function (err) {
      if (err) {
        console.error("Error al escribir en el archivo:", err);
      } else {
        console.log("Usuario agregado correctamente:", user);
        alert("Sign Up Successful");
        window.location.href = "index.html";
      }
    });

    window.location.href = "index.html";
  } else {
    alert("Sign Up Failed:\n" + errorMessage);
  }
}

function login() {
  let email = document.getElementById("Email").value;
  let password = document.getElementById("Password").value;

  // Leer el archivo de texto para obtener los usuarios almacenados
  fs.readFile("users.txt", "utf8", function (err, data) {
    if (err) {
      console.error("Error al leer el archivo:", err);
      alert("Login Failed");
      return;
    }

    // Dividir el contenido del archivo en líneas
    let lines = data.split("\n");
    let found = false;

    // Recorrer cada línea para buscar el usuario
    lines.forEach(function (line) {
      let user = JSON.parse(line);
      // Comprobar si el email y la contraseña coinciden con algún usuario
      if (user.email === email && user.password === password) {
        alert("Login Successful");
        window.location.href = "index.html";
        found = true;
        return;
      }
    });

    // Si no se encontró el usuario, mostrar mensaje de error
    if (!found) {
      alert("Login Failed");
    }
  });
}
