
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });
console.log("Servidor web socket rodando na 3001")

const connectedClients = new Set();

const sendDataToClients = (data) => {
  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
		console.log(data)
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (socket) => {
  console.log('Cliente conectado.');
  connectedClients.add(socket);

  socket.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);

    socket.send('Mensagem recebida pelo servidor.');
  });

  socket.on('close', () => {
    console.log('Cliente desconectado.');
    connectedClients.delete(socket);
  });
});

const sendToClients = () => {
  const data = { message: 'Atualização automática' };
  sendDataToClients(data);
};

module.exports = { sendDataToClients }
