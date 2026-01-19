import { Shape, useCanvasStore } from "../stores/useCanvasStore";

class SocketManager {
  private socket: WebSocket | null = null;

  connect() {
    if (this.socket) return;
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onmessage = (event)=>{
        console.log(event.data);
        this.onMessage(event.data);
    }
  }

  sendShapes(data: Shape[]) {
    if (!this.socket) return;
    this.socket.send(
      JSON.stringify({
        type: "draw",
        data: data,
      }),
    );
  }

  private onMessage = (data : string) => {
    const parsedData = JSON.parse(data);
    console.log("Parsed Data : ", parsedData);

    if (parsedData.type === "draw") {
        console.log("Paresed data of draw type from server : ", parsedData);
        console.log("Updating shapes from server");
        useCanvasStore.getState().setShapes(parsedData.data);
    }
  };
}

export const socketManager = new SocketManager();
