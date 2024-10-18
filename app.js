
        var ws = null;
        var توقعاتسابقة = [];
        var currentIndex = 0;

        function openWebSocket() {
            var url = 'wss://1xbet.com/games-frame/sockets/crash?whence=50&fcountry=8&ref=1&gr=70&appGuid=games-web-master&lng=fr&access_token=eyJhbGciOiJFUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiI1MC85MTE4NTk0OTMiLCJwaWQiOiIxIiwianRpIjoiMC8yNmUwY2I2ZjA1N2VhNDE1YmYwM2ZhOTdhMWNmMWJhNzY4NGE5NTdiZTFmYmY3MTI4MTI4MzE4NzI2ODA4MmM2IiwiYXBwIjoiTkEiLCJpbm5lciI6InRydWUiLCJuYmYiOjE3MjkyNzk4NzAsImV4cCI6MTcyOTI5NDI3MCwiaWF0IjoxNzI5Mjc5ODcwfQ.a1TJSLHjqMiOUAXxi5cvf0whzlzz7kOX4OSD0CyzgArdeJ0zf7XXcPvLVmQOoJ3dczce_rgs2251GbFk2Yl8ZQ';
            ws = new WebSocket(url);
            ws.onopen = function() {
                console.log('WebSocket opened');
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
                    توقعاتسابقة.push(data.arguments[0].f);
                    عرضالتوقعالتالي();
                }
            };
            ws.onerror = function(event) {
                console.error('WebSocket error:', event);
            };
        }

        function عرضالتوقعالتالي() {
            if (currentIndex < توقعاتسابقة.length) {
                var crashValueElement = document.getElementById('crashValue');
                crashValueElement.innerText = توقعاتسابقة[currentIndex];
                currentIndex++;
            }
        }

        openWebSocket();
