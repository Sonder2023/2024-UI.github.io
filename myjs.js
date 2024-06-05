var UI = {};
if(window.innerWidth>600){
    UI.appWidth=600;
}else{
    UI.appWidth = window.innerWidth;
}


UI.appHeight = window.innerHeight;

let baseFont = UI.appWidth /20;
//通过改变body对象的字体大小，这个属性可以影响其后代
document.body.style.fontSize = baseFont +"px";
//通过把body的高度设置为设备屏幕的高度，从而实现纵向全屏
//通过CSS对子对象百分比（纵向）的配合，从而达到我们响应式设计的目标
document.body.style.width = UI.appWidth - baseFont + "px";
document.body.style.height = UI.appHeight - baseFont*4 + "px";
if(window.innerWidth<1000){
    $("aid").style.display='none';
}
$("aid").style.width=window.innerWidth-UI.appWidth - baseFont*3 +'px';
$("aid").style.height= UI.appHeight - baseFont*3 +'px';

//尝试对鼠标和触屏设计一套代码实现UI控制
var Pointer = {};
Pointer.isDown= false;
Pointer.x = 0;
Pointer.deltaX =0;
{ //Code Block begin
    let handleBegin = function(ev){
        Pointer.isDown=true;

        if(ev.touches){console.log("touches1"+ev.touches);
            Pointer.x = ev.touches[0].pageX ;
            Pointer.y = ev.touches[0].pageY ;
            console.log("Touch begin : "+"("+Pointer.x +"," +Pointer.y +")" ) ;
            $("bookface").textContent= "触屏事件开始，坐标："+"("+Pointer.x+","+Pointer.y+")";
        }else{
            Pointer.x= ev.pageX;
            Pointer.y= ev.pageY;
            console.log("PointerDown at x: "+"("+Pointer.x +"," +Pointer.y +")" ) ;
            $("bookface").textContent= "鼠标按下，坐标："+"("+Pointer.x+","+Pointer.y+")";
        }
    };
    let handleEnd = function(ev){
        Pointer.isDown=false;
        ev.preventDefault()
        //console.log(ev.touches)
        if(ev.touches){
            $("bookface").textContent= "";
            if(Math.abs(Pointer.deltaX) > 100){
                $("bookface").textContent += ""  ;
            }else{
                $("bookface").textContent += " "  ;
                $("bookface").style.left = '7%' ;
            }
        }else{

            $("bookface").textContent= "";
            if(Math.abs(Pointer.deltaX) > 100){
                $("bookface").textContent += ""  ;
            }else{
                $("bookface").textContent += " "  ;
                $("bookface").style.left = '7%' ;
            }
        }
    };
    let handleMoving = function(ev){
        ev.preventDefault();
        if (ev.touches){
            if (Pointer.isDown){
                console.log("Touch is moving");
                Pointer.deltaX = parseInt( ev.touches[0].pageX - Pointer.x );
                // $("bookface").textContent= "正在滑动触屏，滑动距离：" + Pointer.deltaX +"px 。";
                $('bookface').style.left =  Pointer.deltaX + 'px' ;
            }
        }else{
            if (Pointer.isDown){
                console.log("Pointer isDown and moving");
                Pointer.deltaX = parseInt( ev.pageX - Pointer.x );
                // $("bookface").textContent= "正在拖动鼠标，距离：" + Pointer.deltaX +"px 。";
                $('bookface').style.left =  Pointer.deltaX + 'px' ;
            }
        }
    };

    $("bookface").addEventListener("mousedown",handleBegin );
    $("bookface").addEventListener("touchstart",handleBegin );
    $("bookface").addEventListener("mouseup", handleEnd );
    $("bookface").addEventListener("touchend",handleEnd );
    $("bookface").addEventListener("mouseout", handleEnd );
    $("bookface").addEventListener("mousemove", handleMoving);
    $("bookface").addEventListener("touchmove", handleMoving);
    let count = 0;
    document.body.addEventListener("keypress", function(ev){
        if(count === 30){
            $("keyboard").textContent += "\n";
            count = 0;
        } else {
            $("keyboard").textContent += ev.key;
            count++;
        }
    });


}
//Code Block  end
function $(ele){
    if (typeof ele !== 'string'){
        throw("自定义的$函数参数的数据类型错误，实参必须是字符串！");
        return
    }
    let dom = document.getElementById(ele) ;
    if(dom){
        return dom ;
    }else{
        dom = document.querySelector(ele) ;
        if (dom) {
            return dom ;
        }else{
            throw("执行$函数未能在页面上获取任何元素，请自查问题！");
            return ;
        }
    }
} //end of $
