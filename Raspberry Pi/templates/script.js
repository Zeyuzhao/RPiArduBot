var box;
var allowed = true;

function reload_img() {
    var source = "http://" + "10.0.0.19" + ":80/" + "cam_pic.php?time=" + new Date().getTime();
    box.src = source;
}
function error_img() {
    setTimeout(reload_img(), 100);
}

function init() {
    box = document.getElementById("box");
    box.onload = reload_img;
    box.onerror = error_img;
    reload_img();
}


$(document).ready(
    function () {
        $(document).keydown(function (e) {
            if (e.repeat != undefined) {
                allowed = !e.repeat;
            }
            if (!allowed) return;
            allowed = false;
            switch (e.which) {
            case 37: // left
                $.get("/robot/l");
                break;

            case 38: // up
                $.get("/robot/f");
                break;

            case 39: // right
                $.get("/robot/r");
                break;

            case 40: // down
                $.get("/robot/b");
                break;

            default:
                return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
        $(document).keyup(function (e) {
            allowed = true;
            switch (e.which) {
            case 37: // left
                $.get("/robot/break");
                break;

            case 38: // up
                $.get("/robot/break");
                break;

            case 39: // right
                $.get("/robot/break");
                break;

            case 40: // down
                $.get("/robot/break");
                break;

            default:
                return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    }
);
