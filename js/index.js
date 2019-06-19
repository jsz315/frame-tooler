// var file = "";
// var total = 0;
var scale = 1;

window.onload = function(){
    document.querySelector(".path").value = localStorage.getItem("path");
    document.querySelector(".num").value = localStorage.getItem("num");
    document.querySelector(".scale").value = localStorage.getItem("scale");
}

/*开始*/
function start(){
    var path = document.querySelector(".path").value;
    var num = document.querySelector(".num").value;
    scale = document.querySelector(".scale").value;
    scale = scale ? Number(scale) : 1;
    localStorage.setItem("path", path);
    localStorage.setItem("num", num);
    localStorage.setItem("scale", scale);
    var list = num.split("-");
    loadImages(path, Number(list[0]), Number(list[1]), drawImages);
}

/*绘制序列图片*/
function drawImages(imgs){
    var total = imgs.length;
    var w = Math.ceil(imgs[0].naturalWidth * scale);
    var h = Math.ceil(imgs[0].naturalHeight * scale);
    //var col = total > 4 ? 4 : total;
    var col = total;
    var row = Math.ceil(total / col);
    var canvas = document.querySelector(".canvas");
    canvas.width = col * w;
    canvas.height = row * h;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var id = 0;
    for(var i = 0; i < row; i++){
        for(var j = 0; j < col; j++){
            if(id < total){
                ctx.drawImage(imgs[id++], j * w, i * h, w, h);
            }
        }
    }
    
    document.querySelector(".view").style.display = "block";
    createStyle(w, h, total, col);
    makeCartoon(w, h, total, canvas);
}

/*加载绘制序列图片*/
function makeCartoon(w, h, total, canvas){
    var cartoon = document.querySelector(".cartoon");
    cartoon.style.width = w + "px";
    cartoon.style.height = h + "px";
    try{
        cartoon.style.backgroundImage = 'url("' + canvas.toDataURL() + '")';
        cartoon.style.animation = "play steps(" + total + ") 1s infinite";
    }
    catch(e){
        console.log(e);
        cartoon.style.backgroundColor = "#f00";
    }
    
}

/*生成动画样式*/
function createStyle(w, h, total, col){
    var style = document.createElement("style");
    var list = ["@keyframes play{"];
    list.push("0%{background-position: 0;}");
    list.push("100%{background-position: -" + w * total + "px;}");
    list.push("}");
    var css = list.join("\n");
    style.innerHTML = css;
    document.body.appendChild(style);

    list.push("item{");
    list.push("width:" + w + "px;");
    list.push("height:" + h + "px;");
    list.push("background-image: url(\"name.png\");");
    list.push("animation: play steps(" + total + ") 1s infinite;");
    list.push("}");
    document.querySelector(".css").innerHTML = list.join("<br>");
}

/*加载序列图片*/
function loadImages(name, start, end, callback){
    var progress = 0;
    var total = end - start + 1;
    var imgs = [];
    for(var i = start; i <= end; i++){
        var img = new Image();
        // img.crossOrigin = "anonymous";
        img.src = name.replace("*", i);
        img.onload = function(){
            if(++progress == total){
                callback(imgs);
            }
        }
        imgs.push(img);
    } 
}