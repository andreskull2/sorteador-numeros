// script.js - CÓDIGO FINAL CORRIGIDO

const form = document.querySelector('form');
const numbers = document.getElementById("input-number");
const rangerWhere = document.getElementById("input-where");
const rangerAt = document.getElementById("input-at");
const dontReapeat = document.getElementById("repeat");
const again = document.getElementById("again");

// MUDANÇA 1: Agora pegamos pelo ID que colocamos no HTML
const againWrapper = document.getElementById("again-wrapper"); 

const resultsBlock = document.getElementById("results");
const resultsView = document.querySelector(".results-wrapper");

const numeroAleatorio = ({ length, min, max, repeat }) => {
    const resultsRandom = [];
    if(repeat) {
        while(resultsRandom.length < length) {
            resultsRandom.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    } else {
        while(resultsRandom.length < length) {
            const numberRandom = Math.floor(Math.random() * (max - min + 1)) + min;
            if(!resultsRandom.includes(numberRandom)) {
                resultsRandom.push(numberRandom);
            }
        }
    }
    return resultsRandom;
}

const newResult = ({results}) => {
    resultsView.innerHTML = "";
    // MUDANÇA 2: Garante que o container do botão suma ao iniciar novo sorteio
    if(againWrapper) {
        againWrapper.style.display = "none";
    }

    results.forEach((result) => {
        const resultRandom = document.createElement("div");
        resultRandom.classList.add("result-random");
        resultRandom.innerHTML = `
            <div class="wrapper-animate"></div>
            <span>${result}</span>
        `;
        resultsView.append(resultRandom);
    });
}

const animateResults = () => {
    const resultsItems = resultsView.querySelectorAll(".result-random");
    
    resultsItems.forEach((item, index) => {
        const wrapper = item.querySelector(".wrapper-animate");
        const span = item.querySelector("span");
        const baseDelay = index * 600; 

        wrapper.style.animationDelay = `${baseDelay}ms, ${baseDelay + 500}ms, ${baseDelay + 1500}ms`;
        span.style.animationDelay = `${baseDelay + 800}ms, ${baseDelay + 1500}ms`;

        if(index === resultsItems.length - 1) {
            setTimeout(() => {
                // MUDANÇA 3: Faz o botão aparecer com o ID certo
                if(againWrapper) {
                    againWrapper.style.display = "flex";
                    againWrapper.animate([
                        { opacity: 0, transform: 'translateY(10px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ], { duration: 500, fill: 'forwards' });
                }
            }, baseDelay + 2000);
        }
    });
}

form.onsubmit = (e) => {
    e.preventDefault();
    const resultados = numeroAleatorio({
        min: Number(rangerWhere.value), 
        max: Number(rangerAt.value), 
        length: Number(numbers.value), 
        repeat: !dontReapeat.checked
    });

    form.classList.remove("show");
    form.classList.add("hidden");
    resultsBlock.classList.remove("hidden");
    resultsBlock.classList.add("show");

    newResult({results: resultados});
    animateResults();
}

again.onclick = () => {
    resultsBlock.classList.add("hidden");
    resultsBlock.classList.remove("show");
    form.classList.remove("hidden");
    form.classList.add("show");
}