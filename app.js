var ws = null;
var توقعاتسابقة = [];
var currentIndex = 0;
var terminal = document.getElementById('terminal');
var status = document.getElementById('status');
var predictionElement = document.getElementById('prediction');

function addTerminalLine(text) {
    var p = document.createElement('p');
    p.className = 'command';
    p.textContent = text;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}

function openWebSocket() {
    var url = 'wss://1xbet.com/games-frame/sockets/crash?whence=50&fcountry=8&ref=1&gr=70&appGuid=games-web-master&lng=fr&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85MTE4NTk0OTMiLCJwaWQiOiIxIiwianRpIjoiMC82NDgyOTE3M2FmNWJkZDMxYjA2MDRmMzdmOTA3ODhhYTEzYmUyOWM2ZTRiODk1ZGFiMThhZjkyODNmYWU4MzRkIiwiYXBwIjoiTkEiLCJpbm5lciI6InRydWUiLCJuYmYiOjE3MjgzMjA5MTksImV4cCI6MTcyODMzNTMxOSwiaWF0IjoxNzI4MzIwOTE5fQ.5u5jFbG3l0-Vaaddf1JyhNUTYkxMxnhjv-pikd-Z2kCrUjBOkg5N4jRO4xbJjRxmWIMjUKfsntn3npMdl94Zzg';
    ws = new WebSocket(url);
    ws.onopen = function() {
        addTerminalLine('WebSocket opened');
        status.textContent = 'Status: Connected';
        ws.send('{"protocol":"json","version":1}\x1e');
        ws.send('{"arguments":[{"activity":30,"account":911859493}],"invocationId":"0","target":"Account","type":1}\x1e');
    };
    ws.onclose = function() {
        addTerminalLine('WebSocket closed');
        status.textContent = 'Status: Disconnected';
        ws = null;
    };
    ws.onmessage = function(event) {
        var data = JSON.parse(event.data.slice(0, -1));
        if (data.target === 'OnCrash') {
            توقعاتسابقة.push(data.arguments[0].f);
            displayNextPrediction();
        }
    };
    ws.onerror = function(event) {
        console.error('WebSocket error:', event);
        addTerminalLine('Error: Unable to fetch data.');
    };
}

function displayNextPrediction() {
    if (currentIndex < توقعاتسابقة.length) {
        predictionElement.textContent = "Crash Value: " + توقعاتسابقة[currentIndex] + "x";
        currentIndex++;
        addTerminalLine('New prediction: ' + توقعاتسابقة[currentIndex - 1] + 'x');
    }
}

openWebSocket();
