objectDetector="";
status1 = "";
object1=[];
img="";

function preload(){
    img= loadImage('zebra.jpg');
}
function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380)
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status- Detecting objects";
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status1!= ""){
        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0; i<object1.length; i++){
           document.getElementById("status").innerHTML="Status- Object Detected";
           document.getElementById("number_of_objects").innerHTML="Number of Objects detected- " + object1.length;

           fill(r,g,b);
           percent=floor(object1[i].confidence * 100);
           text(object1[i].label + " " + percent + "%", object1[i].x+15, object1[i].y+15);
           noFill();
           stroke(r,g,b);
           rect(object1[i].x, object1[i].y, object1[i].width, object1[i].height);

        }
    }
}
function modelLoaded(){
    console.log("Model loaded");
    status1=true;
    objectDetector.detect(video, gotResults);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object1=results;
    }
}
