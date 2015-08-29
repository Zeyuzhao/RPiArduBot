var VanillaRunOnDomReady = function() {
skipScroll = document.getElementById("skipScroll");

var scrollFunc = function () {
    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
       html.clientHeight, html.scrollHeight, html.offsetHeight );
    
    var y = window.scrollY;
    if (y > 0.2*height && y < 0.75*height) {
        skipScroll.className = "bottomMenu show"
    } else {
        skipScroll.className = "bottomMenu hide"
    }
};

window.addEventListener("scroll", scrollFunc);
}

var alreadyrunflag = 0;

if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", function(){
        alreadyrunflag=1; 
        VanillaRunOnDomReady();
    }, false);
else if (document.all && !window.opera) {
    document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
    var contentloadtag = document.getElementById("contentloadtag")
    contentloadtag.onreadystatechange=function(){
        if (this.readyState=="complete"){
            alreadyrunflag=1;
            VanillaRunOnDomReady();
        }
    }
}

window.onload = function(){
  setTimeout("if (!alreadyrunflag){VanillaRunOnDomReady}", 0);
}