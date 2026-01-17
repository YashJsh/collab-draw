"use client"
import { useEffect, useRef } from "react";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                return;
            }
            let clicked = false;
            let StartX = 0;
            let StartY = 0;

            canvas.addEventListener('mousedown', function (event) {
                clicked = true;
                StartX = event.x;
                StartY = event.y;
            });
            canvas.addEventListener('mouseup', function (event) {
                clicked = false;
                const screenx = event.x;
                const screeny = event.y;
                StartX = 0;
                StartY = 0;
                
                console.log("x : ", screenx, "y :", screeny);
            });
            canvas.addEventListener('mousemove', function(event){
                if (clicked){
                    console.log("x : ", event.x, "y : ", event.y);
                    ctx.fillRect(StartX, StartY, event.x - StartX, event.y - StartY)
                }
            });
        }
    }, [canvasRef])
    return (
        <div>
            <canvas ref={canvasRef} width={500} height={1000}></canvas>
        </div>
    )
}

export default Canvas;