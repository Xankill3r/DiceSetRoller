var setCount = 3;
var setSize = 6;
var diceSides = 6;
var diceRolls = 4;

function init() {
    for (var i = 0; i < setCount; i++) {
        document.getElementById("stats").appendChild(document.createTextNode("Set " + (i + 1)));
        generateAndDisplayStatSet();
    }
}

function generateAndDisplayStatSet() {
    var grandTotal = 0;
	document.getElementById("stats").appendChild(document.createElement("br"));
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
        grandTotal += curTotal - curMin;
        var textNode = document.createTextNode(message);
        document.getElementById("stats").appendChild(textNode);
        document.getElementById("stats").appendChild(document.createElement("br"));
    }
    document.getElementById("stats").appendChild(document.createTextNode("Total : " + grandTotal));
	document.getElementById("stats").appendChild(document.createElement("br"));
    document.getElementById("stats").appendChild(document.createElement("br"));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function copyStats() {
    copyTextToClipboard(document.getElementById("stats").innerText);
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      console.log("Async: Copying to clipboard was successful!");
    },
    function(err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
