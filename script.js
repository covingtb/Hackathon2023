// JavaScript code for rolling the die

function rollDie() {
    var die = document.getElementById('die');
    var result = Math.floor(Math.random() * 6) + 1; // Randomize the result from 1 to 6

    die.style.animation = 'none'; // Reset animation
    void die.offsetWidth; // Trigger reflow to restart the animation

    die.style.backgroundImage = 'url(' + images + '.png)'; // Replace 'result' with the file name pattern for your die images
}

// Call the rollDie function to display the initial die
rollDie();
