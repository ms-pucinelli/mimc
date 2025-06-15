function withTranslation(language, translationID, lambda) {
    let loadingLanguagePackage

    if (language === "PT"){
        loadingLanguagePackage = import ("./portuguese.js")
    }

    else if (language === "EN"){
        loadingLanguagePackage = import ("./english.js")
    }

    else {
        loadingLanguagePackage = import ("./spanish.js")
    }

    loadingLanguagePackage.then(languagepackage => {
        lambda(languagepackage.translations[translationID])
    })
}

function loadTranslations(language) {
    sessionStorage.setItem('language', language)

    let elementsWithTranslationID = document.querySelectorAll("[data-translate-id]")

    elementsWithTranslationID.forEach(element =>{
        let translationID = element.getAttribute("data-translate-id")
        withTranslation(language, translationID, function( translatedText) {
            element.textContent = translatedText
        })
    })
}

let language = sessionStorage.getItem('language') || 'PT'
loadTranslations(language)

let parametros = new URLSearchParams(window.location.search) // Aqui busco o que contém na URL

function calcularImc(peso, altura) { // Função criada para calcular o meu IMC
    let alturaEmMetros = altura / 100;
    let alturaAoQuadrado = alturaEmMetros * alturaEmMetros;
    let imc = peso / alturaAoQuadrado
    return imc
}

function calcularAgua(peso) { // Função criada para calcular o que devo beber de agua no dia
    let aguaPorDia = (peso * 35) / 1000
    return aguaPorDia
}

function getImcColor(imc) {
    if(imc >= 25) {
        return "red"
    } 
    else if(imc >= 18) {
        return "green"
    }
    else {
        return "yellow"
    }
}

function getMinimumIMC(imc, peso) {
  let minimumIMC = (peso * 18) /imc
    return minimumIMC
}

function getMaximumIMC(imc, peso){
   let maximumIMC = (peso * 24.99) /imc
    return maximumIMC
}

let pesoString = parametros.get("weight") // Aqui pego da URL o valor do tipo de dao, ou seja, o objeto e converto em uma Int
let peso = parseInt(pesoString)
let alturaString = parametros.get("height")
let altura = parseInt(alturaString)

let imc = calcularImc(peso, altura) // Aqui passo os parâmentros anteriores para a minha função
let aguaPorDia = calcularAgua (peso)
let minimumIMC = getMinimumIMC(imc, peso)
let maximumIMC = getMaximumIMC(imc, peso) 

if(parametros.has("weight") && parametros.has("height")) { // Aqui eu condiciono para que apenas apareça a mensagem quando tiver os valores na URL.
    let imcResults = document.getElementById("IMC-results") // Aqui eu digo pego o meu elemento do HTML e mudo o seu conteudo (IMC)
    if(Number.isNaN(imc)) {
        withTranslation(language, "imc-results-error", translatedText => {
            imcResults.textContent = translatedText
        })
        imcResults.classList.add("unavailable") 
    }
    
    else {
        imcResults.classList.add(getImcColor(imc))
        withTranslation(language, "imc-results-success", translatedLambda => {
            imcResults.textContent = translatedLambda(imc, minimumIMC, maximumIMC)
        })
    }
    
    let dailyWater = document.getElementById("daily-water") // Aqui eu digo pego o meu elemento do HTML e mudo o seu conteudo (agua)
    dailyWater.classList.add("ready") // Aqui eu adiciono uma classe para mudar o CSS ao mostrar o resultado do daily-water
    if(Number.isNaN(imc)) {
        withTranslation(language, "daily-water-error-tip", translatedText =>  {
            dailyWater.textContent = translatedText
        })
    }

    else {
        withTranslation(language, "daily-water-success", translatedLambda =>{
            dailyWater.textContent = translatedLambda(aguaPorDia)
        }) 
}
}
