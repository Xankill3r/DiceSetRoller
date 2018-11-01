var setCount = 3;
var setSize = 6;
var diceSides = 6;
var diceRolls = 4;

function init() {
    for (var i = 0; i < setCount; i++) {
        document.body.appendChild(document.createTextNode("Set " + (i + 1) + "\u00A0"));
        generateAndDisplayStatSet();
    }
}

function generateAndDisplayStatSet() {
    var message = "";
    for (var i = 0; i < setSize; i++) {
        var curTotal = 0, curMin = diceSides + 1;
        for (var j = 0; j < diceRolls; j++) {
            var val = getRandomInt(diceSides) + 1;
            curTotal += val;
            curMin = val < curMin ? val : curMin;
            message += val + (j == diceRolls - 1 ? "" : ", ");
        }
        message += " : " + (curTotal - curMin) + "\u00A0";
        var textNode = document.createTextNode(message);
        document.body.appendChild(textNode);
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
