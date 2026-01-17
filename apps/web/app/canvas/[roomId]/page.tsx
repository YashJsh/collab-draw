"use client"
import { useEffect, useRef } from "react";
import { board } from "../../../draw/board";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            board(canvasRef.current);
        }
    }, [canvasRef])
    return (
        <div>
            <canvas ref={canvasRef} ></canvas>
        </div>
    )
}

export default Canvas;