import http from "http";
import {WebSocketServer}from "ws";
import {app} from "./app.js"
import { setupWebSocketHandlers } from "./socket/socket.js";

const server = http.createServer(app);

const wss = new WebSocketServer ({ server });
setupWebSocketHandlers(wss);
 
server.listen(3001, ()=>{
    console.log("Server is listening on port 3001");
});

export { wss };
