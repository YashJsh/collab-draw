import type { WebSocketServer } from "ws";
import {wss} from "../index.js";
import { verifyToken } from "../utils/tokenManagment.js";

export function setupWebSocketHandlers(wss : WebSocketServer) {
    wss.on("connection", (ws, request)=>{
    // const url = request.url;
    // if (!url){
    //     return;
    // }
    // const queryParams = new URLSearchParams(url.split("?")[1]);
    // const token = queryParams.get("token") || "";
    // const decoded = verifyToken(token);
    // if (!decoded || !decoded.userId){
    //     ws.close();
    //     return;
    // };
    console.log("New client connected to WebSocket");
    ws.on("message", (data : Buffer)=>{
        console.log("Received:", data);
        const dataStr = data.toString();
        console.log(data);
        const objectData = JSON.parse(dataStr);
        console.log(objectData);
        if (objectData.type === "ping"){
            ws.send(JSON.stringify({
                type : "pong",
                message : "Welcome to excali-draw websocket server"
            }));
        }
    });
})
}



