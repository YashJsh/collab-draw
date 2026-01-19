import type { WebSocketServer } from "ws";

export type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
    };

export interface DrawData {
  shapes: Shape[];
}

export function setupWebSocketHandlers(wss: WebSocketServer) {
  wss.on("connection", (ws, request) => {
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
 
    ws.on("message", (data: Buffer) => {
      const dataStr = data.toString();
      const objectData = JSON.parse(dataStr);
      console.log(objectData);
      if (objectData.type === "draw") {
        console.log("Received drawing data from client");
        const drawData: DrawData = objectData.data;
        // Broadcast the drawing data to all connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === 1) {
            client.send(
              JSON.stringify({
                type: "draw",
                data: drawData,
              }),
            );
          }
        });
      }
    });
  });
}
