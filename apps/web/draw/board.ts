import { Shape } from "../stores/useCanvasStore";
import { socketManager } from "../utils/socketManagment";

export const board = (
  canvas: HTMLCanvasElement,
  shapes: Shape[],
  addShape: (shape: Shape) => void
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  renderExisting(shapes, ctx, canvas);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.onmousedown = (event) => {
    clicked = true;
    startX = event.offsetX; 
    startY = event.offsetY;   
  };

  canvas.onmouseup = (event) => {
    clicked = false;

    const width = event.offsetX - startX;   
    const height = event.offsetY - startY;  

    addShape({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height
    });

    renderExisting([...shapes, {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height
    }], ctx, canvas);
  };

  canvas.onmousemove = (event) => {
    if (!clicked) return;

    renderExisting(shapes, ctx, canvas);
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      startX,
      startY,
      event.offsetX - startX,   
      event.offsetY - startY    
    );
  };
};

function renderExisting(
  existingshapes: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingshapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "white";
      ctx.strokeRect(
        shape.x,
        shape.y,
        shape.width,  
        shape.height   
      );
    }
  });
}
