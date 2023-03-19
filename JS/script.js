/*
Este es el Javascript que contiene las funciones para index.html
con las funciones 
*/
const frases = {
    opcion1: [
        "It's a beautiful day outside.",
        "Why do you greet me twice?",
        "Birds are singing, flowers are blooming...",
        "Hello, nice day uh?",
        "Seems like you have an addiction to greetings"
    ],
    opcion2: [
        "Wanna say somethin'?"
    ],
    opcion9: [
        "What did the skeleton say when he served Spaghetti? Bone-Appetit!!",
        "Did you know that Skeletons are musically inclined? They play the trombone.",
        "I dont get undertale jokes. They dont make any Sans.",
        "Where did the computer go to dance? The DISK-o",
    ],
    opcion3: [
        "See ya'",
        "Free to go.",
        "Bye nerd.",
    ],
    muerte: [
        "This is it.",
    ],
};

const indiceActual = {
    opcion1: 0,
    opcion2: 0,
    opcion9: 0,
    opcion3: 0,
    muerte: 0,
};
const finalHit = document.getElementById('final-hit');
const hit = document.getElementById('hit');
const music = document.getElementById('music');
finalHit.volume = 0.4;
hit.volume = 0.1;
music.volume= 0.4;

var active = false;
var i = 0;
var indFrase = 0;
var intervalID;
var opcion1Boton = document.getElementById("opcion1");
var opcion2Boton = document.getElementById("opcion2");
var opcion3Boton = document.getElementById("opcion3");
var opcion9Boton = document.getElementById("opcion9");
var frase = document.getElementById("frase");
var sansImg = document.getElementById("sans");
var baloonImg = document.querySelector(".globo-img");
const buttons = document.querySelectorAll('button');

opcion1Boton.addEventListener("click", function () {
    opcion1Boton.disabled = true;
    frase.innerHTML = "";
    var currentArray = frases["opcion1"];
    var indiceActualOpcion1 = indiceActual["opcion1"];
    intervalID = escribirYReproducir(indiceActualOpcion1, currentArray, "opcion1");
});
opcion9Boton.addEventListener("click", function () {
    opcion9Boton.disabled = true;
    frase.innerHTML = "";
    var currentArray = frases["opcion9"];
    var indiceActualOpcion9 = indiceActual["opcion9"];
    intervalID = escribirYReproducir(indiceActualOpcion9, currentArray, "opcion9");
    document.getElementById("sans").src = "../media/img/sans2.gif";
});
opcion3Boton.addEventListener("click", function () {
    opcion3Boton.disabled = true;
    frase.innerHTML = "";
    var currentArray = frases["opcion3"];
    var indiceActualOpcion3 = indiceActual["opcion3"];
    intervalID = escribirYReproducir(indiceActualOpcion3, currentArray, "opcion3");
});
///////////////////////////////////////////////////////////////////////////
var menu = document.getElementById("menu");
var Opciones = menu.querySelectorAll("li");
let selectedOpcion = null;
let isWriting = false;

// Show/hide menu when button is clicked
opcion2Boton.addEventListener("click", () => {
    opcion2Boton.disabled = true;
    frase.innerHTML = "";
    var currentArray = frases["opcion2"];
    var indiceActualOpcion2 = indiceActual["opcion2"];
    intervalID = escribirYReproducir(indiceActualOpcion2, currentArray, "opcion2");
    document.getElementById("sans").src = "../media/img/sans2.gif";
    const isMenuHidden = menu.classList.contains("hidden");
    if (isMenuHidden) {
        menu.classList.remove("hidden");
        Opciones[0].focus();
        selectedOpcion = Opciones[0];
    }
});

// Keyboard navigation
menu.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "ArrowUp" && selectedOpcion.previousElementSibling) {
        selectedOpcion = selectedOpcion.previousElementSibling;
        selectedOpcion.focus();
    } else if (key === "ArrowDown" && selectedOpcion.nextElementSibling) {
        selectedOpcion = selectedOpcion.nextElementSibling;
        selectedOpcion.focus();
    } else if (key === "Enter") {
        //Se simula click en el link
        const link = selectedOpcion.querySelector("a");
        const clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        link.dispatchEvent(clickEvent);
    }
});

// Prevent default scrolling when arrow keys are pressed
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "ArrowUp" || key === "ArrowDown") {
        event.preventDefault();
    }
});

// If something that is not the button gets clicked, dissappear the menu
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target !== opcion2Boton && !menu.contains(target)) {
        menu.classList.add("hidden");
    }
});


////////////////////////////////////// OTRAS OPCIONES /////////////////////////////////
document.getElementById("opcion4").addEventListener("click", function () {
    sansImg.src = "../media/img/sans2.gif";
})

document.getElementById("opcion5").addEventListener("click", function () {
    sansImg.src = "../media/img/sans.gif";
})

document.getElementById("opcion6").addEventListener("click", function () {
    active = true;
    sansImg.src = "../media/img/papyrus.gif";
})

document.getElementById("opcion7").addEventListener("click", function () {
    sansImg.src = "../media/img/sans.gif";
})

//////////////////////////////PORCENTAJE/////////////////////////////////
document.getElementById("opcion8").addEventListener("click", function(){
    if(active){
        decreasePercentagePapyrus();
    }else{
        decreasePercentageSans();
    }
});
var currentPercentage = 50;

function decreasePercentageSans() {
    var percentageBar = document.getElementById("percentage-bar");
    var currentWidth = percentageBar.style.width;
    currentPercentage = parseFloat(currentWidth) || currentPercentage;
    var newPercentage = currentPercentage - 5;
    percentageBar.style.width = newPercentage + "%";
    percentageBar.style.backgroundColor = "red";
    if (newPercentage <= 0) {
        deactivate();
        finalHit.play();
        sansImg.src = "../media/img/sans-death.gif";
        sansImg.style.width = "240px";
        setTimeout(function () {
            sansImg.src = "../media/img/death-frame.png"; // change the image after 2 seconds
        }, 1400);
        frase.innerHTML = "";
        var currentArray = frases["muerte"];
        var indiceActualOpcionMuerte = indiceActual["muerte"];
        setTimeout(function () {
            intervalID = escribirYReproducir(indiceActualOpcionMuerte, currentArray, "muerte");
        }, 2000);

    } else {
        hit.play();
        sansImg.src = "../media/img/sans-damage.gif";
        sansImg.classList.add("shaking-image");
        baloonImg.classList.add("shaking-image");
        frase.classList.add("shaking-image");
        setTimeout(function () {
            sansImg.src = "../media/img/sans.gif";
            sansImg.classList.remove("shaking-image");
            baloonImg.classList.remove("shaking-image");
            frase.classList.remove("shaking-image");
            percentageBar.style.backgroundColor = "";
        }, 500);
    }
}

function decreasePercentagePapyrus() {
    var percentageBar = document.getElementById("percentage-bar");
    var currentWidth = percentageBar.style.width;
    currentPercentage = parseFloat(currentWidth) || currentPercentage;
    var newPercentage = currentPercentage - 5;
    percentageBar.style.width = newPercentage + "%";
    percentageBar.style.backgroundColor = "red";
    if (newPercentage <= 0) {
        deactivate();
        finalHit.play();
        sansImg.src = "../media/img/papyrus-death.gif";
        sansImg.style.width = "240px";
        setTimeout(function () {
            sansImg.src = "../media/img/papyrus-death-frame.png"; // change the image after 2 seconds
        }, 10000);
        frase.innerHTML = "";
        var currentArray = frases["muerte"];
        var indiceActualOpcionMuerte = indiceActual["muerte"];
        setTimeout(function () {
            intervalID = escribirYReproducir(indiceActualOpcionMuerte, currentArray, "muerte");
        }, 2000);
    } else {
        hit.play();
        sansImg.src = "../media/img/papyrus-damage.gif";
        sansImg.classList.add("shaking-image");
        baloonImg.classList.add("shaking-image");
        frase.classList.add("shaking-image");
        setTimeout(function () {
            sansImg.src = "../media/img/papyrus.gif";
            sansImg.classList.remove("shaking-image");
            baloonImg.classList.remove("shaking-image");
            frase.classList.remove("shaking-image");
            percentageBar.style.backgroundColor = "";
        }, 500);
    }
}

function deactivate() {
    for (let i = 0; i < buttons.length; i++) { // iterates through each button element
        const button = buttons[i]; // stores current button element in a variable
        button.disabled = true;
    }
}

function activate() {
    for (let i = 0; i < buttons.length; i++) { // iterates through each button element
        const button = buttons[i]; // stores current button element in a variable
        button.disabled = false;
    }
}

function escribir(ind, frases, opcion) {
    var element = document.querySelector(".globo-img");
    element.classList.remove("hidden");
    element.style.display = "block";
    deactivate();
    var txt = frases[ind];
    if (i < txt.length) {
        frase.innerHTML += txt.charAt(i);
        i++;
    } else {
        i = 0;
        indiceActual[opcion]++;
        if (indiceActual[opcion] >= frases.length) {
            indiceActual[opcion] = 0;
        }
        clearInterval(intervalID);
        if (opcion != "opcion2" && opcion != "muerte") {
            document.getElementById("sans").src = "../media/img/sans.gif";
        }
        if (opcion != "muerte") {
            activate();
        }
    }
}

const audioContext = new AudioContext();
function playAudio() {
    const audioFileUrl = '../media/audio/txtsans.wav';
    const audioRequest = new XMLHttpRequest();
    audioRequest.open('GET', audioFileUrl, true);
    audioRequest.responseType = 'arraybuffer';
    audioRequest.onload = function () {
        audioContext.decodeAudioData(audioRequest.response, function (buffer) {
            const audioSource = audioContext.createBufferSource();
            audioSource.buffer = buffer;

            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0.2;

            audioSource.connect(gainNode);
            gainNode.connect(audioContext.destination);

            audioSource.start(0);
        });
    };
    audioRequest.send();
}

function escribirYReproducir(indiceActual, arrayActual, audioID) {
    music.play();
    const intervalID = setInterval(function () {
      escribir(indiceActual, arrayActual, audioID);
      playAudio();
    }, 50);
    return intervalID;
}