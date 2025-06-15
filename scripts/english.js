export let translations = {
    "header-title": "Welcome to Mimc - Your Body Mass Index Calculator",
    "language": "Language",
    "main-weight": "Enter your weight:",
    "main-height": "Enter your height:",
    "main-calculate": "Calculate",
    "underweight": "Below the ideal weight",
    "normalWeight": "Within the ideal weight",
    "overweight": "Above the ideal weight",

    "imc-results-error": "Error generating your Body Mass Index. Please try again.",
    "imc-results-success": (imc, minimumIMC, maximumIMC) => `Your Body Mass Index is ${imc.toFixed(2)}. Your ideal weight range is between ${minimumIMC.toFixed(2)} and ${maximumIMC.toFixed(2)} kilograms.`,

    "daily-water-error-tip": "Tip: You should drink at least 2 liters of water per day to stay hydrated.",
    "daily-water-success": (waterPerDay) => `Based on your weight, you should drink ${waterPerDay.toFixed(2)} liters of water per day to stay hydrated.`
}