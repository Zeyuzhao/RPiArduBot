function init() {
    window.requestAnimationFrame(draw);
}
var touch = new Object();
touch.x = 350;
touch.y = 350;
touch.startX = 0;
touch.startY = 0;
touch.color = "black";

var statusdiv = document.getElementById('statusdiv');
var debugDiv = document.getElementById('debug');
var startDiv = document.getElementById('debug2');
var startX = 0;
var startY = 0;
var dist = 0;
var startTouch = false;

function draw() {
    var canvas = document.getElementById("box");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = touch.color;
        ctx.lineWidth = "6";
        ctx.arc(touch.x, touch.y, 100, 0, 2 * Math.PI);
        ctx.stroke();
    }
    if (startTouch) {
        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = "10";
        ctx.arc(touch.x, touch.y, 90, 0, 2 * Math.PI);
        ctx.stroke();
    }
    window.requestAnimationFrame(draw);
}

box.addEventListener('touchstart', function (e) {
    var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
    touchStart = true;
    touch.x = parseInt(touchobj.clientX);
    touch.y = parseInt(touchobj.clientY);
    touch.color = "red";
    startX = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
    startY = parseInt(touchobj.clientY);
    touch.startX = startX;
    touch.startY = startY;
    statusdiv.innerHTML = 'Status: touchstart<br> ClientX: ' + startX + 'px';
    e.preventDefault();
}, false);

box.addEventListener('touchmove', function (e) {
    touchStart = false;
    var touchobj = e.changedTouches[0]; // reference first touch point for this event
    touch.x = parseInt(touchobj.clientX);
    touch.y = parseInt(touchobj.clientY);

    var distX = Math.abs(parseInt(touchobj.clientX) - startX);
    var distY = Math.abs(parseInt(touchobj.clientY) - startY);
    var dist = Math.sqrt(distX * distX + distY * distY);
    if (dist > 5) {
        touch.color = "blue";
    }
    statusdiv.innerHTML = 'Status: touchmove<br> distance traveled: ' + dist + 'px';
    startDiv.innerHTML = "startX: " + touch.startX + "    " + "startY:" + touch.startY;
    debugDiv.innerHTML = "distX: " + distX + "    " + "distY:" + distY;
    e.preventDefault();
}, false);

box.addEventListener('touchend', function (e) {
    touchStart = false;
    var touchobj = e.changedTouches[0]; // reference first touch point for this event
    touch.x = parseInt(touchobj.clientX);
    touch.y = parseInt(touchobj.clientY);
    statusdiv.innerHTML = 'Status: touchend<br> Resting x coordinate: ' + touchobj.clientX + 'px';
    e.preventDefault();
    touch.color = "black";
}, false);