window.onload = function () {
    // Initialize variables for time tracking
    let minutes = 0;
    let seconds = 0;
    let tens = 0;

    // Select elements from the DOM to display time and control buttons
    let appendMinutes = document.querySelector('#minutes');
    let appendTens = document.querySelector('#tens');
    let appendSeconds = document.querySelector('#seconds');
    let startBtn = document.querySelector('#start');
    let stopBtn = document.querySelector('#stop');
    let resetBtn = document.querySelector('#reset');
    let lapBtn = document.querySelector('#lap');
    let lapsList = document.querySelector('#lapsList');
    let Interval; // Variable to hold the timer interval

    // Function to update the timer
    const startTimer = () => {
        tens++; // Increment the tenths of a second
        if (tens <= 9) {
            appendTens.innerHTML = '0' + tens; // Display tenths with leading zero if needed
        }
        if (tens > 9) {
            appendTens.innerHTML = tens; // Display tenths without leading zero
        }
        if (tens > 99) { // If tenths exceeds 99, reset and increment seconds
            seconds++;
            appendSeconds.innerHTML = '0' + seconds; // Display seconds with leading zero if needed
            tens = 0; // Reset tenths
            appendTens.innerHTML = '0' + 0; // Reset tenths display
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds; // Display seconds without leading zero
        }
        if (seconds > 59) { // If seconds exceeds 59, reset and increment minutes
            minutes++;
            appendMinutes.innerHTML = '0' + minutes; // Display minutes with leading zero if needed
            seconds = 0; // Reset seconds
            appendSeconds.innerHTML = '0' + 0; // Reset seconds display
        }
    };

    // Start the timer when the start button is clicked
    startBtn.onclick = () => {
        clearInterval(Interval); // Clear any existing interval to avoid multiple timers running
        Interval = setInterval(startTimer, 10); // Start the timer, updating every 10 milliseconds
    };

    // Stop the timer when the stop button is clicked
    stopBtn.onclick = () => {
        clearInterval(Interval); // Stop the timer by clearing the interval
    };

    // Reset the timer and lap times when the reset button is clicked
    resetBtn.onclick = () => {
        clearInterval(Interval); // Stop the timer
        tens = '00'; // Reset tenths
        seconds = '00'; // Reset seconds
        minutes = '00'; // Reset minutes
        appendTens.innerHTML = tens; // Update display
        appendSeconds.innerHTML = seconds; // Update display
        appendMinutes.innerHTML = minutes; // Update display
        lapsList.innerHTML = ""; // Clear lap times on reset
    };

    // Record a lap time when the lap button is clicked
    lapBtn.onclick = () => {
        const lapTime = `${appendMinutes.innerHTML}:${appendSeconds.innerHTML}:${appendTens.innerHTML}`; // Format lap time
        const lapItem = document.createElement("li"); // Create a new list item for the lap
        lapItem.textContent = lapTime; // Set the text to the lap time
        lapsList.appendChild(lapItem); // Add the lap item to the laps list
    };
};
