import http from "http";
import ws from "ws";
import {app} from "./app"

const server = http.createServer(app);

const wss = new ws.Server({ server });

server.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});