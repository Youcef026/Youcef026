    var ws = null;
    var توقعاتسابقة = []; // Previous predictions
    var currentIndex = 0; // Index of the prediction to display

    function openWebSocket() {
        var url = 'wss://1xbet.com/games-frame/sockets/crash?whence=50&fcountry=8&ref=1&gr=70&appGuid=games-web-master&lng=fr&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85MTE4NTk0OTMiLCJwaWQiOiIxIiwianRpIjoiMC9jZjZmMmMyMDVmYzlmNzExMGQwOGM2NzFkOWU3ZGYyZmJlZjliNGNjZDczNTBjZWMwNDI5Y2IzNWUwM2FiNzMyIiwiYXBwIjoiTkEiLCJpbm5lciI6InRydWUiLCJuYmYiOjE3Mjk2OTQ4NjgsImV4cCI6MTcyOTcwOTI2OCwiaWF0IjoxNzI5Njk0ODY4fQ.1t5uFekX4yYXNyFVx1Ylr21HRKQCWMBW02CC7qdBuL8qvNize0AmAgdUxYuxXYG5RPq8afQ2HOW2Ff3ilkF2wA';
        ws = new WebSocket(url);
        ws.onopen = function() {
            console.log('WebSocket opened');
            // Send initial messages if needed (you might need to adjust these)
            ws.send('{"protocol":"json","version":1}\x1e');
            ws.send('{"arguments":[{"activity":30,"account":911859493}],"invocationId":"0","target":"Account","type":1}\x1e');
        };
        ws.onclose = function() {
            console.log('WebSocket closed');
            ws = null;
        };
        ws.onmessage = function(event) {
            var data = JSON.parse(event.data.slice(0, -1));
            if (data.target === 'OnCrash') {
                // Store the crash value in the array
                توقعاتسابقة.push(data.arguments[0].f);
                عرضالتوقعالتالي(); // Display the next prediction
            }
        };
        ws.onerror = function(event) {
            console.error('WebSocket error:', event);
        };
    }

    function عرضالتوقعالتالي() { // Function to display the next prediction
        if (currentIndex < توقعاتسابقة.length) {
            var crashValueElement = document.getElementById('crash-value');
            crashValueElement.innerText = توقعاتسابقة[currentIndex];
            currentIndex++;
        }
    }

    openWebSocket(); // Open the WebSocket connection
