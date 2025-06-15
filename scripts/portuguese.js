export let translations = {
    "header-title": "Bem-vindo ao Mimc - O seu calculador de índice de massa corporal",
    "language": "Idioma",
    "main-weight": "Digite seu peso:",
    "main-height": "Digite sua altura:",
    "main-calculate": "Calcular",
    "underweight": "Abaixo do peso ideal",
    "normalWeight": "Dentro do peso ideal",
    "overweight": "Acima do peso ideal",

    "imc-results-error": "Erro ao gerar seu índice de Massa Corporal. Tente novamente.",
    "imc-results-success": (imc, minimumIMC, maximumIMC) => `Seu Índice de Massa Corporal é de ${imc.toFixed(2)}. Seu peso ideal é de ${minimumIMC.toFixed(2)} a ${maximumIMC.toFixed(2)} quilos.`,

    "daily-water-error-tip": "Dica: você precisa beber pelo menos 02 litros de água por dia para manter-se hidratado.",
    "daily-water-success": (aguaPorDia) => `De acordo com seu peso, você precisa beber ${aguaPorDia.toFixed(2)} litros de água por dia para manter-se hidratado.`
}