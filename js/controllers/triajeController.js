

document.addEventListener("DOMContentLoaded", () => {

    const formDatos = document.getElementById("formDatos");   
    if (formDatos) {
        formDatos.addEventListener("submit", function (e) {
            e.preventDefault(); 

            // Capturamos todos los campos que pusimos en el HTML
            const datos = {
                nombre: document.getElementById("nombre").value,
                edad: document.getElementById("edad").value,
                sexo: document.getElementById("sexo").value,
                fuma: document.getElementById("fuma").value,
                bebe: document.getElementById("bebe").value,
            };

            // Guardamos en memoria
            localStorage.setItem("datosPaciente", JSON.stringify(datos));

            // Redirigimos al paso 2
            window.location.href = "sintomas.html";
        });
    }

    //  sintomas.html
    
    const formSintomas = document.getElementById("formSintomas");

    if (formSintomas) {
        formSintomas.addEventListener("submit", function (e) {
            e.preventDefault();

            const sintomas = [];
  
            document.querySelectorAll("input[type=checkbox]:checked").forEach((el) => {
                sintomas.push(el.value);
            });

            // Validación básica
            if (sintomas.length === 0) {
                alert("Por favor, selecciona al menos un síntoma para continuar.");
                return;
            }

            localStorage.setItem("sintomasPaciente", JSON.stringify(sintomas));

  
            window.location.href = "../resultados/diagnostico.html";
        });
    }

});