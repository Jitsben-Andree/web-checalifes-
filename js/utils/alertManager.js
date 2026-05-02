document.addEventListener("DOMContentLoaded", () => {
    
    // Ejecutamos el algoritmo de Jarol que importamos en el HTML
    const resultado = procesarDiagnostico();

    // Referencias a los elementos del HTML
    const elNombre = document.getElementById("resNombre");
    const elEdad = document.getElementById("resEdad");
    const elDiagnostico = document.getElementById("resDiagnostico");
    const elRecomendacion = document.getElementById("resRecomendacion");
    const elEspecialista = document.getElementById("resEspecialista");
    const alertaEmergencia = document.getElementById("alertaEmergencia");
    const tarjetaResultado = document.getElementById("tarjetaResultado");

    // Pintar los datos en la pantalla
    if (elNombre) elNombre.textContent = resultado.paciente;
    if (elEdad) elEdad.textContent = `Edad: ${resultado.edad} años`;
    if (elDiagnostico) elDiagnostico.textContent = resultado.diagnostico;
    if (elRecomendacion) elRecomendacion.textContent = resultado.recomendacion;
    if (elEspecialista) elEspecialista.textContent = resultado.especialista;

    // LÓGICA DE ALERTAS VISUALES (Tu tarea principal)
    if (resultado.urgencia === "ALTA") {
        // Mostrar banner rojo parpadeante
        alertaEmergencia.classList.remove("hidden");
        
        // Cambiar el borde de la tarjeta a rojo
        tarjetaResultado.classList.remove("border-checa-blue");
        tarjetaResultado.classList.add("border-red-600");
        
        // Colorear el diagnóstico de rojo peligro
        elDiagnostico.className = "text-lg font-bold text-red-800 bg-red-100 p-4 rounded-lg border-l-4 border-red-600";
    } 
    else if (resultado.urgencia === "MEDIA") {
        // Alerta preventiva amarilla/naranja
        tarjetaResultado.classList.remove("border-checa-blue");
        tarjetaResultado.classList.add("border-orange-500");
        elDiagnostico.className = "text-lg font-medium text-orange-800 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500";
    }
    // Si es BAJA, mantiene los colores azules originales de Tailwind.
});