objects=[];

video="";

status="";

function preload(){
video=createVideo("video.mp4");
video.hide();
}

function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
console.log("Model Loaded");
status="true";
}

function setup(){
canvas=createCanvas(480,380);
canvas.center()
}

function draw(){
image(video,0,0,480,380);
video.loop(); 
video.volume(1);
video.speed(1);
if(status!=""){
    objectDetector.detect(video,gotResults);
    for(i=0;i<objects.length;i++){
        document.getElementById("number_of_objects").innerHTML="Number Of Objects Detected Are: "+objects.length;

        document.getElementById("status").innerHTML="Objects Detected";
        fill("#09ff00");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+10,objects[i].y+10);
        noFill();
        stroke("#09ff00");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}

function gotResults(error,results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            objects=results;
        }
}