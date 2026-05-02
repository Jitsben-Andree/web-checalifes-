
function procesarDiagnostico() {
    // Obtener datos de la memoria 
    const sintomas = JSON.parse(localStorage.getItem("sintomasPaciente")) || [];
    const datosPersonales = JSON.parse(localStorage.getItem("datosPaciente")) || {};

    // 2. Variables por defecto
    let diagnostico = "Condición leve o no específica.";
    let recomendacion = "Mantener reposo, hidratación y observar evolución.";
    let urgencia = "BAJA"; // BAJA, MEDIA, ALTA
    let especialista = "Médico General";

    // Lógica de cruce de síntomas 
    
    // Emergencias Rojas
    if (sintomas.includes("pecho") || sintomas.includes("respirar")) {
        diagnostico = "Posible afección cardiopulmonar o emergencia severa.";
        recomendacion = "NO AUTOMEDICARSE. Requiere atención médica inmediata. Mantenga la calma y busque ayuda.";
        urgencia = "ALTA";
        especialista = "Urgencias / Cardiología";
    } 
    // Infecciones / Virus
    else if (sintomas.includes("fiebre") && (sintomas.includes("tos") || sintomas.includes("garganta"))) {
        diagnostico = "Posible cuadro infeccioso o viral (Ej. Gripe, Faringitis).";
        recomendacion = "Tomar abundantes líquidos, controlar la temperatura y guardar reposo. Si la fiebre no cede en 48h, acudir al médico.";
        urgencia = "MEDIA";
        especialista = "Medicina General / Neumología";
    }
    // Problemas digestivos
    else if (sintomas.includes("nauseas") || sintomas.includes("vomito")) {
        diagnostico = "Posible afección gastrointestinal.";
        recomendacion = "Mantener hidratación constante con suero oral. Comer dieta blanda. Si no tolera líquidos, acudir a urgencias.";
        urgencia = "MEDIA";
        especialista = "Gastroenterología";
    }
    // Migraña o estrés
    else if (sintomas.includes("dolor_cabeza") && sintomas.includes("vision")) {
        diagnostico = "Posible migraña con aura o fatiga visual severa.";
        recomendacion = "Descansar en una habitación oscura y silenciosa. Evitar pantallas.";
        urgencia = "BAJA";
        especialista = "Neurología / Oftalmología";
    }

    // Modificadores por hábitos
    if (datosPersonales.fuma === "SI" && sintomas.includes("tos")) {
        recomendacion += " (Nota: El tabaquismo activo empeora los síntomas respiratorios. Considere reducir el consumo).";
    }

    // Retornar el objeto con los resultados
    return {
        paciente: datosPersonales.nombre || "Usuario Invitado",
        edad: datosPersonales.edad || "N/A",
        diagnostico,
        recomendacion,
        urgencia,
        especialista
    };
}