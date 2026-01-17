type Shape = {
    type : 'rect'
    x : number,
    y : number,
    width : number,
    height : number,
} | {
    type : 'circle'
    x : number,
    y : number,
    radius : number
}


export const board = (canvas : HTMLCanvasElement) => {
    const existingshapes : Shape[] = [];
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return;
    }
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

        const screenx = event.x - StartX;
        const screeny = event.y - StartY;
        existingshapes.push({
            type : 'rect',
            x : StartX,
            y : StartY,
            height : screenx,
            width : screeny
        })
    });
    canvas.addEventListener('mousemove', function (event) {
        if (clicked) {
            renderExisting(existingshapes, ctx, canvas);
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(StartX, StartY, event.x - StartX, event.y - StartY)
        }
    });
}

function renderExisting(existingshapes : Shape[], ctx : CanvasRenderingContext2D, canvas : HTMLCanvasElement){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingshapes.map((shape) => {
        if (shape.type == "rect"){
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(shape.x, shape.y, shape.height, shape.width);
        }
    })
}