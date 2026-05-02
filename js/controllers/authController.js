
document.addEventListener("DOMContentLoaded", () => {
    

    const formRegistro = document.getElementById("formRegistro");
    const formLogin = document.getElementById("formLogin");

    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("regNombre").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("regConfirmPassword").value;
            const alertBox = document.getElementById("registerAlert");

            // Función para mostrar alertas
            const mostrarAlerta = (mensaje, tipo) => {
                alertBox.textContent = mensaje;
                alertBox.className = `mb-4 p-3 rounded-lg text-sm font-medium text-center block ${tipo === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
            };

            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                mostrarAlerta("Las contraseñas no coinciden.", "error");
                return;
            }

            // Obtener usuarios existentes (o crear un array vacío si no hay)
            let usuariosDB = JSON.parse(localStorage.getItem("checaLifes_usuarios")) || [];

            // Verificar si el correo ya está registrado
            const usuarioExiste = usuariosDB.find(user => user.email === email);
            if (usuarioExiste) {
                mostrarAlerta("Este correo ya está registrado. Intenta iniciar sesión.", "error");
                return;
            }

            // Crear el nuevo usuario (Simulación de inserción en BD)
            const nuevoUsuario = {
                id: Date.now(), 
                nombre: nombre,
                email: email,
                password: password 
            };

            // Guardar en la "Base de Datos"
            usuariosDB.push(nuevoUsuario);
            localStorage.setItem("checaLifes_usuarios", JSON.stringify(usuariosDB));

            // Mostrar éxito y redirigir
            mostrarAlerta("¡Cuenta creada con éxito! Redirigiendo...", "success");
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500); // Espera 1.5 segundos para que lea el mensaje
        });
    }


    // LOGICA DE INICIO DE SESIÓN
    
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const alertBox = document.getElementById("loginAlert");

            // Traer la base de datos de usuarios
            let usuariosDB = JSON.parse(localStorage.getItem("checaLifes_usuarios")) || [];

            // Buscar si existe un usuario con ese correo y contraseña
            const usuarioValido = usuariosDB.find(user => user.email === email && user.password === password);

            if (usuarioValido) {
                // Ocultar alerta por si estaba visible
                alertBox.classList.add("hidden");

                // Guardar la "Sesión Activa" (Token simulado)
                localStorage.setItem("checaLifes_sesionActiva", JSON.stringify({
                    id: usuarioValido.id,
                    nombre: usuarioValido.nombre,
                    email: usuarioValido.email
                }));

                // Redirigir al inicio del triaje médico
                window.location.href = "../triaje/datos.html";
            } else {
                // Mostrar alerta de error
                alertBox.classList.remove("hidden");
                alertBox.textContent = "Correo o contraseña incorrectos.";
            }
        });
    }
});