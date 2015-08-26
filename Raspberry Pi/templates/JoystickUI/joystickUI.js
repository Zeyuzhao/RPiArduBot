var pointer = {};
pointer.tracker = {};
pointer.origin = {};

var canvas, c;

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
    if (!(jQuery.isEmptyObject(pointer.origin))) {
        o = pointer.origin;
        c.beginPath();
        c.strokeStyle = "black";
        c.lineWidth = "10";
        c.arc(o.x, o.y, 40, 0, Math.PI * 2);
        c.stroke();
        
        
        p = pointer.tracker;
        c.beginPath();
        c.fillStyle = "white";
        c.fillText(p.type + " x:" + p.x + " y:" + p.y + " dist:" + p.dist, p.x + 30, p.y - 30);
        
        c.beginPath();
        c.strokeStyle = p.color;
        c.lineWidth = "6";
        c.arc(p.x, p.y, 40, 0, Math.PI * 2);
        c.stroke();
        
        
        
        
    }
    window.requestAnimationFrame(draw);
}

function createPointer(event) {
    var type, color;

    switch (event.pointerType) {
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
    return {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        type: type,
        color: color,
        dist: 0
    };
}

function onPointerDown(e) {
    pointer.origin = createPointer(e);
    pointer.tracker = createPointer(e);
}

function onPointerMove(e) {
    var x = e.clientX;
    var y = e.clientY;
    var dist = Math.sqrt(Math.pow(pointer.origin.x - x, 2) + Math.pow(pointer.origin.y - y, 2));
    pointer.tracker.x = x;
    pointer.tracker.y = y;
    pointer.tracker.dist = dist;
}

function onPointerUp(e) {
    pointer.tracker = {};
    pointer.origin = {};
}

function setupCanvas() {
    canvas = document.getElementById('box');
    c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}