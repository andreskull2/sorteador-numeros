// Formulário
const form = document.querySelector('form');

// Campos de número
const numbers = document.getElementById("input-number");
const rangerWhere = document.getElementById("input-where");
const rangerAt = document.getElementById("input-at");
const dontReapeat = document.getElementById("repeat");
const again = document.getElementById("again");
const btnAgain = document.querySelector(".btn-again .button-border");
const againWrapper = document.querySelector(".btn-again");

// Resultado
const resultsBlock = document.getElementById("results");
const resultsView = document.querySelector(".results-wrapper");

// Lógica dos números aleatórios
const numeroAleatorio = ({ length, min, max, repeat }) => {
    // Array para armazenar os números gerados
    const resultsRandom = [];

    // Verificação se é permitido repetir números
    if(repeat) {
        // Geração de números aleatórios com ranger passado
        for(let i = 0; resultsRandom.length < length; i++) {
            resultsRandom.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    } else {
        while(resultsRandom.length < length) {
            const numberRandom = Math.floor(Math.random() * (max - min + 1)) + min;

            // Adiciona o número ao array apenas se ele não existir
            if(!resultsRandom.includes(numberRandom)) {
                resultsRandom.push(numberRandom);
            }
        }
    }

    return resultsRandom;
}

const newResult = ({results}) => {
    resultsView.innerHTML = "";
    btnAgain.classList.remove("show");

    results.forEach((result, index) => {
        const resultRandom = document.createElement("div");
        resultRandom.classList.add("result-random");

        const resultAnimate = document.createElement("div");
        resultAnimate.classList.add("wrapper-animate");

        const numberResult = document.createElement("span");
        numberResult.innerText = result;

        resultRandom.append(resultAnimate, numberResult);
        resultsView.append(resultRandom);
    })
}

const animateResults = () => {
    const resultsItems = resultsView.querySelectorAll(".result-random");
    const animationTotalTime = 4000;

    resultsItems.forEach((item, index) => {
        const wrapper = item.querySelector(".wrapper-animate");
        const span = item.querySelector("span");
        const baseDelay = index * animationTotalTime;

        // Atrasos para as animações do .wrapper-animate
        // Show (delay 0), rotate (delay 1s), hidden (delay 3s)
        wrapper.style.animationDelay = `${baseDelay}ms, ${baseDelay + 1000}ms, ${baseDelay + 3000}ms`;
        
        // Atrasos pas as animações do span
        // numberAnimate (delay 1.5s), numberResult (delay 3s)
        span.style.animationDelay = `${baseDelay + 1500}ms, ${baseDelay + 3000}ms`;

        // AO chegar ao final da lista, define atraso para botão "again" aparecer
        if(index === resultsItems.length - 1) {
            againWrapper.style.display = "block";
            againWrapper.style.animationDelay = `${baseDelay + 4000}ms`
        }
    })
}

// Formatando o envio padrão do formulário
form.onsubmit = (e) => {
    e.preventDefault();

    const resultados = numeroAleatorio({min: Number(rangerWhere.value), max: Number(rangerAt.value), length: Number(numbers.value), repeat: !dontReapeat.checked});

    form.classList.remove("show");
    resultsBlock.classList.remove("hidden");
    resultsBlock.classList.add("show");

    newResult({results: resultados});

    animateResults();
}

again.addEventListener("click", (e) => {
    form.classList.add("show");
    resultsBlock.classList.remove("show");
    resultsBlock.classList.add("hidden");
})
