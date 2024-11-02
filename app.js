    var ws = null;
    var توقعاتسابقة = []; // Previous predictions
    var currentIndex = 0; // Index of the prediction to display

    function openWebSocket() {
        var url = 'wss://1xbet.com/games-frame/sockets/crash?whence=50&fcountry=8&ref=1&gr=70&appGuid=games-web-master&lng=fr&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85MTE4NTk0OTMiLCJwaWQiOiIxIiwianRpIjoiMC9jZWQ2MGE3NTQyZGFjOGYyMTc2MDY2OTQyYTE5MGQxOGNmZTMwNGVkOTMxYTM1ZDA0YjU2MjZmMTAwYTk2YTYwIiwiYXBwIjoiTkEiLCJpbm5lciI6InRydWUiLCJuYmYiOjE3MzA1NzA0NDcsImV4cCI6MTczMDU4NDg0NywiaWF0IjoxNzMwNTcwNDQ3fQ.asGZu1LQ34ke4x5J2x-02I4rRjFL1VfNA2ebw-ng9AmgH9elZQk4zHFRnIlRhKqLh8p7m38zr88aI6KVrnKcvQ';
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
