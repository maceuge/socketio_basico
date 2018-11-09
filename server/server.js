const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


io.on('connection', (client) => {
    console.log(`Usuario conectado!`);

    client.on('disconnect', () => {
        console.log(`Usuario se desconecto!`);
    });

    client.on('sendMsg', (msg) => {
        console.log(`Mensaje del ${msg.name} que dice: ${msg.msg}`);

        io.emit('recibido', {
            message: 'Recepcion del sever correcta'
        });
    });
});



server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});