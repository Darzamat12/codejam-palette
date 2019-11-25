const canvas=document.getElementById("canvas");
const ctx=canvas.getContext('2d');
let currentTool="pencil";
let currentColor=localStorage.getItem("currentColor");
let previusColor=localStorage.getItem("previusColor");

changeColor();

let basicColors=[
["#00BCD4", "#FFEB3B","#FFEB3B","#00BCD4"],
["#FFEB3B", "#FFC107","#FFC107","#FFEB3B"],
["#FFEB3B", "#FFC107","#FFC107","#FFEB3B"],
["#00BCD4", "#FFEB3B","#FFEB3B","#00BCD4"]
];

if(localStorage.getItem("canvas")){
    var dataURL = localStorage.getItem("canvas");
    var img = new Image;
    img.src = dataURL;
    img.onload = function () {
    ctx.drawImage(img, 0, 0);
};
}
else{
for (let i=0;i<4;i++)
    for(let j=0;j<4;j++){
ctx.fillStyle=basicColors[i][j];
ctx.fillRect(128 * i, 128 * j, 128, 128);
    }
}
canvas.onmousedown=function(event){
    if(currentTool==="pencil"){
        ctx.fillStyle=currentColor;
        ctx.fillRect(128*Math.floor(event.offsetX/128), 128*Math.floor(event.offsetY/128),128,128);
        canvas.onmousemove=function(event){
            ctx.fillRect(128*Math.floor(event.offsetX/128), 128*Math.floor(event.offsetY/128),128,128);
        }
        canvas.onmouseup=()=>{
            canvas.onmousemove=null;
            localStorage.setItem("canvas", canvas.toDataURL());
        }
    }
    else if(currentTool === "bucket"){
        ctx.fillStyle = currentColor;
        ctx.fillRect(0, 0, 512, 512);
    }

    else if(currentTool==="colorPicker"){
        let r = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[0];
        let g = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[1];
        let b = ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[2];
        previusColor=currentColor;
        currentColor=rgbTranslate(r,g,b);    
    }

}

document.addEventListener("keyup",function(event){
    switch(event.keyCode){
        case 80: removeActiveClass();
        currentTool="pencil";
        document.querySelector(".tools__pencil").classList.add("active-tool");
        break;
        case 66: removeActiveClass();
        currentTool="bucket";
        document.querySelector(".tools__bucket").classList.add("active-tool");
        break;
        case 67: removeActiveClass();
        currentTool="colorPicker";
        document.querySelector(".tools__color-picker").classList.add("active-tool");
        break;
    }
    
})

function rgbTranslate(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;
  
    return "#" + r + g + b;
}


function changeColor(){
    document.querySelector('.previus-circle').style.backgroundColor=previusColor;
    document.querySelector('.current-circle').style.backgroundColor=currentColor;
    
}




document.querySelector(".colors__red").addEventListener("click",function(event){
    previusColor=currentColor;
    currentColor="#FF0000";
    localStorage.setItem("currentColor",currentColor);
    localStorage.setItem("previusColor", previusColor);
    changeColor();
})

document.querySelector(".colors__blue").addEventListener("click",function(event){
    previusColor=currentColor;
    currentColor="#0000FF";
    localStorage.setItem("currentColor",currentColor);
    localStorage.setItem("previusColor", previusColor);
    changeColor();
})

document.querySelector(".colors__previus-color").addEventListener("click",function(event){
    let tmp=previusColor;
    previusColor=currentColor;
    currentColor=tmp;
    localStorage.setItem("currentColor",currentColor);
    localStorage.setItem("previusColor", previusColor);
    changeColor();
})


document.querySelector(".tools__bucket").addEventListener("click",function(event){
    removeActiveClass();
    currentTool="bucket";
    document.querySelector(".tools__bucket").classList.add("active-tool");

})

document.querySelector(".tools__color-picker").addEventListener("click",function(event){
    removeActiveClass();
    currentTool="colorPicker";
    document.querySelector(".tools__color-picker").classList.add("active-tool");

})

document.querySelector(".tools__pencil").addEventListener("click",function(event){
    removeActiveClass();
    currentTool="pencil";
    document.querySelector(".tools__pencil").classList.add("active-tool");

})

function removeActiveClass(){
    document.querySelector(".tools__bucket").classList.remove("active-tool")
    document.querySelector(".tools__color-picker").classList.remove("active-tool")
    document.querySelector(".tools__pencil").classList.remove("active-tool")
}
