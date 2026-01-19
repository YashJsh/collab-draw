"use client"
import { use, useEffect, useRef, useState } from "react";
import { board } from "../../../draw/board";
import { useCanvasStore } from "../../../stores/useCanvasStore";
import { socketManager } from "../../../utils/socketManagment";

const Canvas = () => {
    const { shapes, addShape } = useCanvasStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedShape, setShape] = useState<"line" | "rectangle" | "circle">("line");
    
    useEffect(()=>{
        socketManager.connect();
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            board(canvasRef.current, shapes, selectedShape, addShape);
        }
    }, [shapes, selectedShape])
    return (
        <div>
            <canvas ref={canvasRef} width={1000} height={1000}></canvas>
            <button onClick={() => setShape("line")} className="">Line</button>
            <button onClick={() => setShape("rectangle")}>Rectangle</button>
            <button onClick={() => setShape("circle")}>Circle</button>
        </div>
    )
}

export default Canvas;