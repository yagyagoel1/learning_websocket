import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + " Received request for " + request.url);
  response.end("hi there");
});

const wss = new WebSocketServer({ server });

try {
  wss.on("connection", function connection(ws) {
    try {
      console.log("ejewfhewo");
      ws.on("error", console.error);

      ws.on("message", function message(data, isBinary) {
        console.log("reowihfoi;f");
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
          }
        });
      });

      ws.send("Hello! Message From Server!!");
    } catch (error) {
      console.log(error);
    }
  });
} catch (error) {
  console.log(error);
}

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
