//Global variables
var flImage=null;
var grayImage=null;
var sepiaImage=null;
var redImage=null;
var frameImage=null;

var canFilter;

//load filter image
function loadFilterImage(){
    var flImageFile=document.getElementById("filterImage");
    canFilter=document.getElementById("canFilter");      
    createImage(flImageFile);
    flImage.drawTo(canFilter);
}

//for each filter create original image copy
function createImage(image){
    flImage=new SimpleImage(image);
    grayImage=new SimpleImage(image);
    sepiaImage=new SimpleImage(image);  
    redImage=new SimpleImage(image);
    frameImage=new SimpleImage(image);
    return flImage;
}

//Apply a grayscale filter 
function makeGray() {
   if(imageIsLoaded(grayImage)){
        grayFilter(grayImage);
        grayImage.drawTo(canFilter); 
   }        
}

//Grayscale filter algotithm
function grayFilter(image){
    for(var pixel of image.values()){
        var avgColor=(pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
        pixel.setRed(avgColor);
        pixel.setBlue(avgColor);
        pixel.setGreen(avgColor);
    }   
}

//Apply a red filter
function makeRed(){
    if(imageIsLoaded(redImage)){
        redFilter(redImage);
        redImage.drawTo(canFilter);
    }
}

//Red filter algorithm
function redFilter(image){
    for(var pixel of image.values()){
        console.log("test:" + pixel);
        var avgColor=(pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
        if(avgColor<128){
            pixel.setRed(2*avgColor);
            pixel.setGreen(0);
            pixel.setBlue(0);
        }else{
            pixel.setRed(255);
            pixel.setGreen(2*avgColor-255);
            pixel.setBlue(2*avgColor-255);
        }
    }
}

//Apply sepia filter
function makeSepia(){
    if(imageIsLoaded(sepiaImage)){
        sepiaFilter(sepiaImage);
        sepiaImage.drawTo(canFilter);
}
}

//Sepia filter algorithm
function sepiaFilter(image){
    for(var pixel of image.values()){              
        var tr=0.393*pixel.getRed()+0.796*pixel.getGreen()+0.186*pixel.getBlue();
        var tg=0.349*pixel.getRed()+0.686*pixel.getGreen()+0.168*pixel.getBlue();
        var tb=0.272*pixel.getRed()+0.534*pixel.getGreen()+0.131*pixel.getBlue();
        
        if(tr>255){
            pixel.setRed(255);
        }else {
            pixel.setRed(tr);
        }
        
        if(tg>255){
            pixel.setGreen(255);
        }else {
            pixel.setGreen(tg);
        }
        
        if(tb>255){
            pixel.setBlue(255);
        }else {
            pixel.setBlue(tb);
        }
    }
}

//Apply frame to image
function makeFrame(){
   if(imageIsLoaded(frameImage)){
        addBorder(frameImage,5);
        addText();
        frameImage.drawTo(canFilter);
   }
}
//Draw a border
function addBorder(image, border){
    for (var pixel of image.values()){
        if((pixel.getX()<border|| pixel.getX()>image.getWidth()-border)||(pixel.getY()<border|| pixel.getY()>image.getHeight()-border)){
             setColor(pixel,0,0,0);
        }
    }
}
//Apply color to border
function setColor(pixel,r,g,b){
    pixel.setRed(r);
    pixel.setGreen(g);
    pixel.setBlue(b);
    return pixel;
}

//Add text on Image
function addText()
{
    canFilter=document.getElementById("canFilter"); 
    var ctx=canFilter.getContext("2d");
    ctx.fillStyle="red";
    ctx.font='italic 30px Arial';
    ctx.textAlign="right";
    ctx.fillText("With love",canFilter.width-100,canFilter.height-100);
}

//Reset filter and show original image
function resetFilter(){
    if(imageIsLoaded(flImage)){
        canFilter=document.getElementById("canFilter");
        flImage.drawTo(canFilter);
        grayImage=flImage;
        sepiaImage=flImage;  
        redImage=flImage;
        frameImage=flImage;
    }
}

//Image loading check
function imageIsLoaded(image){
    if(image==null || !image.complete()){
        alert("Upload image first!");
        return;
    }else
    {return true;}   
}



   