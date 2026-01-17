import {wss} from "../index.js";
import { verifyToken } from "../utils/tokenManagment.js";

wss.on("connection", (ws, request)=>{
    const url = request.url;
    if (!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId){
        ws.close();
        return;
    }
    ws.on("message", (data)=>{
        ws.send("PONG");
    });
})

