import http from "http";
import {WebSocketServer}from "ws";
import {app} from "./app.js"

const server = http.createServer(app);

const wss = new WebSocketServer ({ server });

server.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});