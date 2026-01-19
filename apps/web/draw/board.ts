import { Shape } from "../stores/useCanvasStore";

export const board = (
  canvas: HTMLCanvasElement,
  shapes: Shape[],
  selectedShape: string,
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
    if (selectedShape === "line") {
      addShape({
        type: "line",
        startX: startX,
        startY: startY,
        endX: event.offsetX,
        endY: event.offsetY,
      });
    }
    if (selectedShape === "rectangle") {
      const width = event.offsetX - startX;
      const height = event.offsetY - startY;

      addShape({
        type: "rect",
        x: startX,
        y: startY,
        width,
        height
      });


      // renderExisting([...shapes, {
      //   type: "rect",
      //   x: event.offsetX - startX,
      //   y: event.offsetY - startY,
      //   width,
      //   height
      // }], ctx, canvas);
    }

    if (selectedShape === "circle") {
      const left = Math.min(startX, event.offsetX);
      const top = Math.min(startY, event.offsetY);
      const width = Math.abs(event.offsetX - startX);
      const height = Math.abs(event.offsetY - startY);

      const radius = Math.min(width, height) / 2;
      const cx = left + radius;
      const cy = top + radius;
      addShape({
        type: "circle",
        x: cx,
        y: cy,
        radius: radius,
        startAngle: 0,
        endAngle: Math.PI * 2
      });
    }
  };

  canvas.onmousemove = (event) => {
    if (!clicked) return;
    if (selectedShape === "line") {
      renderExisting(shapes, ctx, canvas);
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    }

    if (selectedShape === "rectangle") {
      renderExisting(shapes, ctx, canvas);
      ctx.strokeStyle = "white";
      ctx.strokeRect(
        startX,
        startY,
        event.offsetX - startX,
        event.offsetY - startY
      );
    }

    if (selectedShape === "circle") {
      const endX = event.offsetX;
      const endY = event.offsetY;

      const left = Math.min(startX, endX);
      const top = Math.min(startY, endY);
      const width = Math.abs(endX - startX);
      const height = Math.abs(endY - startY);

      const radius = Math.min(width, height) / 2;
      const cx = left + radius;
      const cy = top + radius;
      renderExisting(shapes, ctx, canvas);
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
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
    if (shape.type === "line") {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.stroke();
    }
    if (shape.type === "circle") {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, shape.startAngle, shape.endAngle);
      ctx.stroke();
    }
  });
}
