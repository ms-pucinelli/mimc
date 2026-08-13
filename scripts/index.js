const languagePackages = window.translationPackages
const documentLanguages = { PT: "pt-BR", EN: "en", ES: "es" }
const resultClasses = ["yellow", "green", "red", "unavailable"]

let currentLanguage = getSupportedLanguage(sessionStorage.getItem("language"))
let currentTranslations
let latestCalculation = null

const form = document.querySelector(".form form")
const imcResults = document.getElementById("IMC-results")
const dailyWater = document.getElementById("daily-water")

function getSupportedLanguage(language) {
    return Object.hasOwn(languagePackages, language) ? language : "PT"
}

function loadTranslations(language) {
    const requestedLanguage = getSupportedLanguage(language)
    currentLanguage = requestedLanguage
    sessionStorage.setItem("language", currentLanguage)
    currentTranslations = languagePackages[currentLanguage]
    document.documentElement.lang = documentLanguages[currentLanguage]

    document.querySelectorAll("[data-translate-id]").forEach(element => {
        element.textContent = currentTranslations[element.dataset.translateId]
    })

    renderCalculation()
}

function calcularImc(peso, altura) {
    const alturaEmMetros = altura / 100
    return peso / (alturaEmMetros * alturaEmMetros)
}

function calcularAgua(peso) {
    return (peso * 35) / 1000
}

function getImcColor(imc) {
    if (imc >= 25) return "red"
    if (imc >= 18.5) return "green"
    return "yellow"
}

function getMinimumIMC(imc, peso) {
    return (peso * 18.5) / imc
}

function getMaximumIMC(imc, peso) {
    return (peso * 25) / imc
}

function renderCalculation() {
    if (!currentTranslations || !latestCalculation) return

    imcResults.classList.remove(...resultClasses)
    dailyWater.classList.add("ready")

    if (!latestCalculation.valid) {
        imcResults.textContent = currentTranslations["imc-results-error"]
        imcResults.classList.add("unavailable")
        dailyWater.textContent = currentTranslations["daily-water-error-tip"]
        return
    }

    const { imc, aguaPorDia, minimumIMC, maximumIMC } = latestCalculation
    imcResults.classList.add(getImcColor(imc))
    imcResults.textContent = currentTranslations["imc-results-success"](imc, minimumIMC, maximumIMC)
    dailyWater.textContent = currentTranslations["daily-water-success"](aguaPorDia)
}

form.addEventListener("submit", event => {
    event.preventDefault()
    const weightValue = form.elements.weight.value.trim()
    const heightValue = form.elements.height.value.trim()
    const peso = Number(weightValue)
    const altura = Number(heightValue)
    const valid = weightValue !== "" && heightValue !== "" &&
        Number.isFinite(peso) && Number.isFinite(altura) && peso > 0 && altura > 0

    if (!valid) {
        latestCalculation = { valid: false }
        renderCalculation()
        return
    }

    const imc = calcularImc(peso, altura)
    latestCalculation = {
        valid: Number.isFinite(imc) && imc > 0,
        imc,
        aguaPorDia: calcularAgua(peso),
        minimumIMC: getMinimumIMC(imc, peso),
        maximumIMC: getMaximumIMC(imc, peso)
    }
    renderCalculation()
})

document.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => {
        loadTranslations(button.dataset.language)
    })
})

loadTranslations(currentLanguage)
