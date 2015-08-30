var pointer = {};
pointer.tracker = {};
pointer.origin = {};
var canvas, c;

var imageUrl;

document.addEventListener("DOMContentLoaded", init);
window.onorientationchange = resetCanvas;
window.onresize = resetCanvas;

//**********************************************************

/*
Image refresh, get images from camera
*/
var image = document.getElementById("image");

function reload_img() {
    var source = "http://" + "10.0.0.19" + ":80/" + "cam_pic.php?time=" + new Date().getTime();
    image.src = source;
}
function error_img() {
    setTimeout(reload_img(), 100);
}

function start() {
    image.onload = reload_img;
    image.onerror = error_img;
    reload_img();
}
//************************************************************



//setup camera img tag and the canvas
function init() {
    setTimeout('start();', 100); //delay camera a bit, stablization
    setupCanvas();
    canvas.addEventListener('pointerdown', onPointerDown, false);
    canvas.addEventListener('pointermove', onPointerMove, false);
    canvas.addEventListener('pointerup', onPointerUp, false);
    canvas.addEventListener('pointerout', onPointerUp, false);
    window.requestAnimationFrame(draw); //start canvas drawing
}

//reset canvas, if the window changes size
function resetCanvas(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    image.width = window.innerWidth;
    image.height = window.innerHeight;
    window.scrollTo(0, 0);
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height); //reset canvas after each frame
    if (!(jQuery.isEmptyObject(pointer.origin))) { //test if origin object is empty, if empty then mouse isn't down => don't do anything

        //draw the origin, joystick core
        o = pointer.origin;
        c.beginPath();
        c.strokeStyle = "black";
        c.lineWidth = "10";
        c.arc(o.x, o.y, 40, 0, Math.PI * 2);
        c.stroke();

        //draw the joystick tracker debug info, should not be on final product
        p = pointer.tracker;
        c.beginPath();
        c.fillStyle = "white";
        c.fillText(p.type + " x:" + p.x + " y:" + p.y + " dist:" + p.dist, p.x + 30, p.y - 30);

        //draw the actual tracker
        c.beginPath();
        c.strokeStyle = p.color;
        c.lineWidth = "6";
        c.arc(p.x, p.y, 40, 0, Math.PI * 2);
        c.stroke();




    }
    window.requestAnimationFrame(draw); //recursion, needed to draw next frame!!!
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
        id: event.pointerId, // if mouse id starts at 1; otherwise it starts at two, add 1 to every increase in pointers (stimulus)
        x: event.clientX,
        y: event.clientY,  //position relative to viewport (window)
        type: type,
        color: color, //color depends on stimulus: mouse, pen and touch
        dist: 0  //distance from origin joystick
    };
}

function onPointerDown(e) {
    pointer.origin = createPointer(e);  //activates when first pressed
    pointer.tracker = createPointer(e);
}

function onPointerMove(e) {
    var x = e.clientX;
    var y = e.clientY;
    var dist = Math.sqrt(Math.pow(pointer.origin.x - x, 2) + Math.pow(pointer.origin.y - y, 2)); //find the distance of tacker to origin, pythagorean theroem
    pointer.tracker.x = x;
    pointer.tracker.y = y;
    pointer.tracker.dist = dist;
}

function onPointerUp(e) {
    pointer.tracker = {};  //remove variables
    pointer.origin = {};
}

function setupCanvas() {
    canvas = document.getElementById('detect');
    image = document.getElementById('image');
    c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    image.width = window.innerWidth;
    image.height = window.innerHeight;
}
