const io = require('socket.io-client');
const delay = require('delay');

const socket = io('wss://cxjtptayah.com/games-frame/sockets/crash');

socket.on('connect', () => {
    console.log('Connected to WebSocket');

    // Fonction pour envoyer un message avec dÃ©lai
    const sendWithDelay = (message) => {
        delay(1000).then(() => {
            socket.emit('message', message);
        });
    };

    // Envoyer un message immÃ©diatement
    sendWithDelay('Message immÃ©diat');

    // Envoyer un message avec un dÃ©lai de 2 secondes
    setTimeout(() => {
        sendWithDelay('Message avec dÃ©lai de 2 secondes');
    }, 20000);

    // Envoyer un message avec un dÃ©lai alÃ©atoire entre 3 et 5 secondes
    delay(Math.random() * 2 + 30000).then(() => {
        sendWithDelay('Message avec dÃ©lai alÃ©atoire');
    });
});
