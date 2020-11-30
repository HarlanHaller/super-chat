module.exports = (io) => {
  io.on('connection', (client) => {
    console.log('Client Connected');

    client.on('message', (mes) => {
      io.emit('message', mes);
      console.log(`Message Recieved: ${mes}`);
    });

    client.on('disconnect', (_) => {
      console.log('Client Disconnected');
    });
  });
};