"use client"
import { useEffect, useRef } from "react";
import { board } from "../../../draw/board";
import { useCanvasStore } from "../../../stores/useCanvasStore";
import { socketManager } from "../../../utils/socketManagment";

const Canvas = () => {
    const { shapes, addShape } = useCanvasStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(()=>{
        socketManager.connect();
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            board(canvasRef.current, shapes, addShape);
        }
    }, [shapes])
    return (
        <div>
            <canvas ref={canvasRef} className="h-[100vh] w-[100vw] w-screen block" ></canvas>
        </div>
    )
}

export default Canvas;