import http from "http";
import {WebSocketServer}from "ws";
import {app} from "./app.js"

const server = http.createServer(app);

const wss = new WebSocketServer ({ server });
 
export { wss };

server.listen(3001, ()=>{
    console.log("Server is listening on port 3001");
});
