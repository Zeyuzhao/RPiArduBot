var pointers = [];


var canvas, c;

var moved = true;
document.addEventListener("DOMContentLoaded", init);

window.onorientationchange = resetCanvas;

window.onresize = resetCanvas;


function init() {
    setupCanvas();
    canvas.addEventListener('pointerdown', onPointerDown, false);
    canvas.addEventListener('pointermove', onPointerMove, false);
    canvas.addEventListener('pointerup', onPointerUp, false);
    canvas.addEventListener('pointerout', onPointerUp, false);
    window.requestAnimationFrame(draw);
}

function resetCanvas(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.scrollTo(0, 0);
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i in pointers) {
        p = pointers[i];
        c.beginPath();
        c.fillStyle = "white";
        c.fillText(p.type + " x:" + p.x + " y:" + p.y, p.x + 30, p.y - 30);
        c.beginPath();
        c.strokeStyle = p.color;
        c.lineWidth = "6";
        c.arc(p.x, p.y, 40, 0, Math.PI * 2);
        c.stroke();
    }
    window.requestAnimationFrame(draw);
}
function createPointer(event)
{
    var type, color;

    switch(event.pointerType) {
        case "mouse":
            type = "MOUSE";
            color = "red";
            break;
        case "pen":
            type = "PEN";
            color = "lime";
            break;
        case "touch":
            type = "TOUCH";
            color = "cyan";
            break;
    }
    return {id: event.pointerId, x: event.clientX, y: event.clientY,
    type: type, color: color };
}
function onPointerDown(e) {
    pointers[e.pointerId - 1] = createPointer(e);
}

function onPointerMove(e) {
    if (pointers[e.pointerId - 1]) {
        pointers[e.pointerId - 1].x = e.clientX;
        pointers[e.pointerId - 1].y = e.clientY;
    }
    //console.log(pointers[e.pointerId - 1].x);
}
function onPointerUp(e) {
    pointers = pointers.splice(e.pointerId,1);
}
function setupCanvas() {
    canvas = document.getElementById('box');
    c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.strokeStyle = "#ffffff";
    c.lineWidth = 2;
}
