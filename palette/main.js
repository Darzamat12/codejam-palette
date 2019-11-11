let canvas=document.getElementById("canvas");

let currentTool="colorPicker";
let currentColor="#FFFFFF";
let previusColor="#000000";

let tools=["pencil", "bucket","colorPicker"];
let basicColors=[
["#00BCD4", "#FFEB3B","#FFEB3B","#00BCD4"],
["#FFEB3B", "#FFC107","#FFC107","#FFEB3B"],
["#FFEB3B", "#FFC107","#FFC107","#FFEB3B"],
["#00BCD4", "#FFEB3B","#FFEB3B","#00BCD4"]
];

for (let i=0;i<4;i++)
    for(let j=0;j<4;j++){
canvas.getContext('2d').fillStyle=basicColors[i][j];
canvas.getContext('2d').fillRect(128 * i, 128 * j, 128, 128);
    }

canvas.onmousedown=function(event){
    if(currentTool==="pencil"){
        canvas.getContext('2d').fillStyle=currentColor;
        console.log(event.offsetX);
        canvas.getContext('2d').fillRect(128*Math.floor(event.offsetX/128), 128*Math.floor(event.offsetY/128),128,128);

        canvas.onmousemove=function(event){
            canvas.getContext('2d').fillRect(128*Math.floor(event.offsetX/128), 128*Math.floor(event.offsetY/128),128,128);
        }

        canvas.onmouseup=()=>{
            canvas.onmousemove=null;
        }
    }
    else if(currentTool == "bucket"){

        canvas.getContext('2d').fillStyle = currentColor;
        canvas.getContext('2d').fillRect(0, 0, 512, 512);
    }

    else if(currentTool==="colorPicker"){
        let r = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data[0];
        let g = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data[1];
        let b = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data[2];
        previusColor=currentColor;
        currentColor=rgbToHex(r,g,b);
        
    }
}


