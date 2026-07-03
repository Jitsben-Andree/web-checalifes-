
document.addEventListener("DOMContentLoaded", () => {
    const btnDescargar = document.getElementById("btnDescargarPDF");
    
    if (btnDescargar) {
        btnDescargar.addEventListener("click", () => {
            // Seleccionamos qué parte de la pantalla queremos en el PDF
            const elemento = document.getElementById("tarjetaResultado");
            const botones = document.getElementById("contenedorBotones");

            // Ocultamos los botones temporalmente para que no salgan impresos en el PDF
            if (botones) botones.style.display = 'none';

            // Configuramos cómo se verá el PDF
            const opciones = {
                margin:       0.5,
                filename:     'ChecaLifes_Reporte_Medico.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true }, 
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generamos el PDF y cuando termine, volvemos a mostrar los botones
            html2pdf().set(opciones).from(elemento).save().then(() => {
                if (botones) botones.style.display = 'flex';
            });
        });
    }
});