const { io } = require("../index");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Client connected");

  client.on("disconnect", () => {
    console.log("Client disconected");
  });

  // client.on('mensaje', ( payload ) => {
  //     console.log('Mensaje', payload);
  //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
  // });

});
