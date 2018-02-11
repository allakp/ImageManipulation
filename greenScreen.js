//Global variables
var fgImage=null;
var bgImage=null;
var resImage=null;

var can1;
var can2;


//Load foreground image 
function loadForegroundImage() {
    var fgImageFile=document.getElementById("fgImage");
    can1=document.getElementById("can1");
    fgImage=new SimpleImage(fgImageFile);
    fgImage.drawTo(can1);
}

//Load background image
function loadBackgroundImage() {
    var bgImageFile=document.getElementById("bgImage");
    can2=document.getElementById("can2");
    bgImage=new SimpleImage(bgImageFile);
    bgImage.drawTo(can2);   
}


//Clear all canvases on the form
function reset(){
    clearCanvas(can1);
    clearCanvas(can2);
    clearCanvas(resultCan);
}

//Clear content of a canvas
function clearCanvas(canvas) {
    var context=canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
}


//Display merged image
function showResult() {
    if(fgImage==null || !fgImage.complete()){
        alert("Foreground image is not loaded!");
        return;
    }
    
    if(bgImage==null || !bgImage.complete()){
        alert("Background image is not loaded!");
        return;
    }    
 
    var resultCan=document.getElementById("resultCan");
    clearCanvas(resultCan);
    var mergedImage=mergeImages();
    mergedImage.drawTo(resultCan);
}    

//Merge fgImage and bgImage
function mergeImages() {
    //TODO: add triming the result image to the smallest one.
    resImage=new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
    
    for (var pixel of fgImage.values()){
        if(pixel.getGreen()>pixel.getRed()+pixel.getBlue()){
            var fgX = pixel.getX();
            var fgY = pixel.getY();
            var bgPixel = bgImage.getPixel(fgX, fgY);
            resImage.setPixel(fgX,fgY,bgPixel);
        } 
        else{
            resImage.setPixel(pixel.getX(),pixel.getY(),fgImage.getPixel(pixel.getX(),pixel.getY()));
        }
    }
    return resImage;
}
