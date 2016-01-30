var main=document.querySelector("#main");
var oLis=document.querySelectorAll("#list>li");
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var desW=640;
var desH=960;
var contact=document.getElementById("contact");
//contact.style.animation-play-state:paused;

if(winW/winH<desW/desH){
    main.style.webkitTransform="scale("+winH/desH+")";
}else{
    main.style.webkitTransform="scale("+winW/desW+")";
}

[].forEach.call(oLis,function(){
    var oLi=arguments[0]
    oLi.index=arguments[1];
    oLi.addEventListener("touchstart",start,false);
    oLi.addEventListener("touchmove",move,false);
    oLi.addEventListener("touchend",end,false);
});

function start(e){
    this.startX= e.changedTouches[0].pageX;
}

function move(e){
    this.flag=true;
    e.preventDefault();
    var moveTouch= e.changedTouches[0].pageX;
    var movePos=moveTouch-this.startX;
    var index=this.index;
    [].forEach.call(oLis,function(){
        arguments[0].className="";
        if(arguments[1]!=index){
            arguments[0].style.display="none";
        }
        arguments[0].firstElementChild.id="";
    });

    if(movePos>0){
        this.prev=(index===0?oLis.length-1:index-1);
        var pos=-winW+movePos;
    }else if(movePos<0){
        this.prev=(index===oLis.length-1?0:index+1);
        var pos=winW+movePos;
    }


    oLis[this.prev].className="zIndex";
    oLis[this.prev].style.display="block";
    oLis[this.prev].style.webkitTransform="translate("+pos+"px,0)";
    //this.style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH)+")  translate(0,"+movePos+"px)";
}

function end(e){
    if(this.flag){
        oLis[this.prev].style.webkitTransform="translate(0,0)";
        oLis[this.prev].style.webkitTransition="1s";
        oLis[this.prev].addEventListener("webkitTransitionEnd",function(e){
            if(e.target.tagName=="LI"){
                this.style.webkitTransition="";
            }
            this.firstElementChild.id="a"+(this.index+1);
        },false);
    }
}



