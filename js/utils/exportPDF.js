document.addEventListener("DOMContentLoaded", () => {
    const btnDescargar = document.getElementById("btnDescargarPDF");
    
    if (btnDescargar) {
        btnDescargar.addEventListener("click", () => {
            const elemento = document.getElementById("tarjetaResultado");
            const botones = document.getElementById("contenedorBotones");

            // Ocultamos los botones temporalmente para que no salgan impresos en el PDF
            if (botones) botones.style.display = 'none';

            // Esta clase nos permitirá aplicar CSS específico (ej. evitar saltos de página dentro de tablas)
            elemento.classList.add("pdf-export-mode");

            const opciones = {
                margin:       [0.8, 0.5, 0.8, 0.5], // Arriba, Derecha, Abajo, Izquierda (espacio para encabezados)
                filename:     'ChecaLifes_Reporte_Mejorado.pdf', // AQUÍ PROVOCAREMOS EL CONFLICTO
                image:        { type: 'jpeg', quality: 0.90 }, // Reducimos un poco para optimizar el tamaño
                html2canvas:  { scale: 2, useCORS: true, letterRendering: true }, // Escala 2 para no perder nitidez
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] } // Evita que los elementos se corten a la mitad
            };

            html2pdf().set(opciones).from(elemento).save().then(() => {
                // Restauramos la vista original tras generar el documento
                if (botones) botones.style.display = 'flex';
                elemento.classList.remove("pdf-export-mode");
            }).catch(error => {
                console.error("Error crítico al generar el reporte PDF:", error);
                alert("Ocurrió un problema al generar el PDF. Por favor, intente nuevamente.");
                if (botones) botones.style.display = 'flex';
                elemento.classList.remove("pdf-export-mode");
            });
        });
    }
});