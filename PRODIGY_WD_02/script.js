window.onload = function() {
    // Initialisation des variables pour le suivi du temps
    let minutes = 0;
    let seconds = 0;
    let tens = 0;
    let interval; // Variable pour stocker l'intervalle du chronomètre

    // Sélection des éléments DOM pour afficher le temps et les boutons de contrôle
    const appendMinutes = document.querySelector('#minutes');
    const appendSeconds = document.querySelector('#seconds');
    const appendTens = document.querySelector('#tens');
    const startBtn = document.querySelector('#start');
    const stopBtn = document.querySelector('#stop');
    const resetBtn = document.querySelector('#reset');
    const lapBtn = document.querySelector('#lap');
    const lapsList = document.querySelector('#lapsList');

    // Fonction pour mettre à jour le chronomètre
    const startTimer = () => {
        tens++;
        if (tens <= 9) {
            appendTens.innerHTML = '0' + tens;
        } else {
            appendTens.innerHTML = tens;
        }

        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = '0' + seconds;
            tens = 0;
            appendTens.innerHTML = '00';
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }

        if (seconds > 59) {
            minutes++;
            appendMinutes.innerHTML = '0' + minutes;
            seconds = 0;
            appendSeconds.innerHTML = '00';
        }

        if (minutes > 9) {
            appendMinutes.innerHTML = minutes;
        }
    };

    // Événements des boutons
    startBtn.onclick = function() {
        clearInterval(interval);
        interval = setInterval(startTimer, 10); // Mettre à jour toutes les 10 ms
    };

    stopBtn.onclick = function() {
        clearInterval(interval);
    };

    resetBtn.onclick = function() {
        clearInterval(interval); // Arrêter le chronomètre
        tens = 0; // Réinitialiser les dixièmes
        seconds = 0; // Réinitialiser les secondes
        minutes = 0; // Réinitialiser les minutes
        appendTens.innerHTML = '00'; // Mettre à jour l'affichage
        appendSeconds.innerHTML = '00'; // Mettre à jour l'affichage
        appendMinutes.innerHTML = '00'; // Mettre à jour l'affichage
        lapsList.innerHTML = ''; // Effacer les tours
    };

    lapBtn.onclick = function() {
        const lapTime = `${appendMinutes.innerHTML}:${appendSeconds.innerHTML}:${appendTens.innerHTML}`;
        const li = document.createElement('li'); // Créer un nouvel élément de liste pour le tour
        li.innerText = lapTime; // Définir le texte sur le temps du tour
        lapsList.appendChild(li); // Ajouter l'élément du tour à la liste des tours
    };
};
