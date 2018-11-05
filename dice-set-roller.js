var setCount = 3;
var setSize = 6;
var diceSides = 6;
var diceRolls = 4;

var outputText;
function init() {
    var ctx = document.getElementById("stats").getContext("2d");
    outputText = "";
    for (var i = 0; i < setCount; i++) {
        outputText += "Set " + (i + 1);
        outputText += generateAndDisplayStatSet();
    }
    ctx.font = "16px serif"
    fillTextWithNewlines(ctx, outputText, 5, 15, 18);
    var downloadLink = document.getElementById("save-img-link");
    downloadLink.download = "stats.png";
    downloadLink.href = document.getElementById("stats").toDataURL();
}

function fillTextWithNewlines(ctx, txt, x, y, lineHeight) {
    var lines = txt.split("\n");
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + (i * lineHeight));
    }
}

function generateAndDisplayStatSet() {
    var grandTotal = 0;
    var txt = "\n";
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
        txt += message;
        txt += "\n";
    }
    txt += "Total : " + grandTotal;
	txt += "\n";
    txt += "\n";
    return txt;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function copyStats() {
    copyTextToClipboard(outputText);
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
