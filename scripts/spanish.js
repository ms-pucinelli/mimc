export let translations = {
    "header-title": "Bienvenido a Mimc - Tu calculadora de índice de masa corporal",
    "language": "Idioma",
    "main-weight": "Introduce tu peso:",
    "main-height": "Introduce tu altura:",
    "main-calculate": "Calcular",
    "underweight": "Por debajo del peso ideal",
    "normalWeight": "Dentro del peso ideal",
    "overweight": "Por encima del peso ideal",

    "imc-results-error": "Error al calcular tu Índice de Masa Corporal. Por favor, inténtalo de nuevo.",
    "imc-results-success": (imc, minimumIMC, maximumIMC) => `Tu Índice de Masa Corporal es ${imc.toFixed(2)}. Tu peso ideal está entre ${minimumIMC.toFixed(2)} y ${maximumIMC.toFixed(2)} kilogramos.`,

    "daily-water-error-tip": "Consejo: debes beber al menos 2 litros de agua al día para mantenerte hidratado.",
    "daily-water-success": (aguaPorDia) => `Según tu peso, debes beber ${aguaPorDia.toFixed(2)} litros de agua al día para mantenerte hidratado.`
}