import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const server = app.listen(8080, () => {
  console.log("running on 8080");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);
  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  socket.send("hello from the serrver");
});
