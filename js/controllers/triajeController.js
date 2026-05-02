// GUARDAR DATOS
document.getElementById("formDatos")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value,
    edad: document.getElementById("edad").value,
  };

  localStorage.setItem("datosPaciente", JSON.stringify(datos));

  window.location.href = "sintomas.html";
});

// RESULTADOS INTELIGENTES
function verResultado() {
  const sintomas = [];
  document
    .querySelectorAll("input[type=checkbox]:checked")
    .forEach((el) => sintomas.push(el.value));

  let diagnostico = "Condición leve";
  let receta = "Descansar y tomar líquidos.";
  let solucion = "Evitar estrés y mantener buena alimentación.";

  if (sintomas.includes("dolor_cabeza")) {
    diagnostico = "Migraña leve";
    receta = "Paracetamol + descanso en lugar oscuro.";
    solucion = "Evitar pantallas y dormir bien.";
  }

  if (sintomas.includes("fiebre")) {
    diagnostico = "Infección leve";
    receta = "Paracetamol y líquidos.";
    solucion = "Reposo y control de temperatura.";
  }

  if (sintomas.includes("pecho") || sintomas.includes("respirar")) {
    diagnostico = "⚠ Posible emergencia";
    receta = "NO automedicarse.";
    solucion = "Acudir inmediatamente al hospital.";
  }

  const datos = JSON.parse(localStorage.getItem("datosPaciente"));

  document.getElementById("resultado").innerHTML = `
        <h3 class="text-xl font-bold mb-3">Resultado</h3>
        <p><strong>Paciente:</strong> ${datos?.nombre || "No registrado"}</p>
        <p><strong>Diagnóstico:</strong> ${diagnostico}</p>
        <p><strong>Receta:</strong> ${receta}</p>
        <p><strong>Solución:</strong> ${solucion}</p>
    `;

  document.getElementById("resultado").classList.remove("hidden");
}
