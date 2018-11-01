var setCount = 3;
var setSize = 6;
var diceSides = 6;
var diceRolls = 4;

function init() {
    for (var i = 0; i < setCount; i++) {
        document.body.appendChild(document.createTextNode("Set " + (i + 1)));
        document.body.appendChild(document.createElement("br"));
        generateAndDisplayStatSet();
    }
}

function generateAndDisplayStatSet() {
    for (var i = 0; i < setSize; i++) {
        var curTotal = 0, curMin = diceSides + 1;
        var message = "";
        for (var j = 0; j < diceRolls; j++) {
            var val = getRandomInt(diceSides) + 1;
            curTotal += val;
            curMin = val < curMin ? val : curMin;
            message += val + (j == diceRolls - 1 ? "" : ", ");
        }
        message += " : " + (curTotal - curMin);
        var textNode = document.createTextNode(message);
        document.body.appendChild(textNode);
        document.body.appendChild(document.createElement("br"));
        document.body.appendChild(document.createElement("br"));
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
