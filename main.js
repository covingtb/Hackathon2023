function rollDice() {
    var numDice = document.getElementById("numDice").value;
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    for (var i = 0; i < numDice; i++) {
        var rollResult = Math.floor(Math.random() * 6) + 1;
        var resultText = document.createTextNode("You rolled: " + rollResult);
        resultsDiv.appendChild(resultText);
        resultsDiv.appendChild(document.createElement("br"));
    }
}
