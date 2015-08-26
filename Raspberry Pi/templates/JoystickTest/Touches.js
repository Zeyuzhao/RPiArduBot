//  Sample refactored by David Rousset - Microsoft France - http://blogs.msdn.com/davrous 
//  Using Hand.js to support all platforms

//  Based on https://github.com/sebleedelisle/JSTouchController/blob/master/Touches.html 

//  Copyright (c)2010-2011, Seb Lee-Delisle, sebleedelisle.com. All rights reserved.

//  Redistribution and use in source and binary forms, with or without modification, are permitted provided 
//  that the following conditions are met:

//    * Redistributions of source code must retain the above copyright notice, 
//      this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright notice, 
//      this list of conditions and the following disclaimer in the documentation 
//      and/or other materials provided with the distribution.

//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
//  AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR 
//  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
//  OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
//  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY 
//  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

"use strict";

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var touches; // collections of pointers

var canvas,
c; // c is the canvas' context 2D

document.addEventListener("DOMContentLoaded", init);

window.onorientationchange = resetCanvas;
window.onresize = resetCanvas;

function init() {
    setupCanvas();
    touches = new Collection();
    canvas.addEventListener('pointerdown', onPointerDown, false);
    canvas.addEventListener('pointermove', onPointerMove, false);
    canvas.addEventListener('pointerup', onPointerUp, false);
    canvas.addEventListener('pointerout', onPointerUp, false);
    requestAnimFrame(draw);
}

function resetCanvas(e) {
    // resize the canvas - but remember - this clears the canvas too.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //make sure we scroll to the top left.
    window.scrollTo(0, 0);
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    touches.forEach(function (touch) {
        c.beginPath();
        c.fillStyle = "white";
        c.fillText(touch.type + " id : " + touch.identifier + " x:" + touch.x + " y:" + touch.y, touch.x + 30, touch.y - 30);

        c.beginPath();
        c.strokeStyle = touch.color;
        c.lineWidth = "6";
        c.arc(touch.x, touch.y, 40, 0, Math.PI * 2, true);
        c.stroke();
    });

    requestAnimFrame(draw);
}

function createPointerObject(event) {
    var type;
    var color;
    switch (event.pointerType) {
        case event.POINTER_TYPE_MOUSE:
            type = "MOUSE";
            color = "red";
            break;
        case event.POINTER_TYPE_PEN:
            type = "PEN";
            color = "lime";
            break;
        case event.POINTER_TYPE_TOUCH:
            type = "TOUCH";
            color = "cyan";
            break;
        default:
            console.log(event.pointerType);
            console.log(event.POINTER_TYPE_MOUSE);
            console.log(event);
    }
    return { identifier: event.pointerId, x: event.clientX, y: event.clientY, type: type, color: color };
}

function onPointerDown(e) {
    touches.add(e.pointerId, createPointerObject(e));
}

function onPointerMove(e) {
    if (touches.item(e.pointerId)) {
        touches.item(e.pointerId).x = e.clientX;
        touches.item(e.pointerId).y = e.clientY;
    }
}

function onPointerUp(e) {
    touches.remove(e.pointerId);
}

function setupCanvas() {
    canvas = document.getElementById('canvasSurface');
    c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.strokeStyle = "#ffffff";
    c.lineWidth = 2;
}