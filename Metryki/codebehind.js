//globals ftw xd

var c = document.getElementById("plane").getContext("2d");
var plane = document.getElementById("plane");
var width = plane.width;
var height = plane.height;
var center ={x:(width/2),y:(height/2)};
var languageChangeButtons = document.getElementsByClassName("lang-switch");
for (var i=0;i<languageChangeButtons.length;i++){
    console.log(languageChangeButtons[i]);
    languageChangeButtons[i].onclick = function(){
     
        languageChangeEvent(event.target);
}
}
drawAxes();
langChange("eng");
function languageChangeEvent(btn){
    console.log(event.target);
    langChange(event.target.dataset.lang);
}
function langChange(name){
    for (var key in langData[name]){
        console.log(langData[name][key]);
       var d =  document.getElementsByClassName(key);
       console.log(d);
       d[0].innerHTML = langData[name][key];
    }
}
function drawEntirePlaneUsingMetricsInTextarea(){
    metrics = new Function("p1","p2",document.getElementById("codeInput").value);
    p1={x:-2,y:-3};
    p2={x:-4,y:4};
    console.log(metrics(p1,p2));
    drawPlane(metrics);
}
function drawSphereUsingMetricsInTextarea(){
    //getting the function
    metrics = new Function("p1","p2",document.getElementById("codeInput").value);
    p1={x:-2,y:-3};
    p2={x:-4,y:4};
    console.log(metrics(p1,p2));
    drawSphere(metrics);
}
function drawPlane(metrics){
    c.fillStyle="white"
    c.fillRect(0,0,width,height);
     var xc=0,yc=0;
     xc = Number(document.getElementById("x").value);
     yc =Number(document.getElementById("y").value);
    
     var origin ={x:(width/2)+xc,y:(height/2)+yc};
    console.log(origin);
    //finding max distance from origin
    let max = 0;
    for (var row =0; row<height; row++){
        for (var column =0; column<width; column++){
            var currentPoint = {x:column,y:row};
            
           //console.log(JSON.stringify(currentPoint));
            var distanceFromOrigin = metrics(currentPoint,origin);
            if (distanceFromOrigin>max) max=distanceFromOrigin;
        }
    }

    //drawing
     for (var row =0; row<height; row++){
         for (var column =0; column<width; column++){
             var currentPoint = {x:column,y:row};
             
            //console.log(JSON.stringify(currentPoint));
             var distanceFromOrigin = metrics(currentPoint,origin);
             
             
                 //point is in a sphere
                 var newCoordinates=currentPoint;
                 ///var newCoordinates = translateCartesianToCanvas(currentPoint);

                 c.fillStyle = `rgba(0,0,0,${distanceFromOrigin/max})`;
                 c.fillRect(newCoordinates.x,newCoordinates.y,1,1);
             
             
         } 
     }
     drawAxes();
}
function drawSphere(metrics){
   c.fillStyle="white"
   c.fillRect(0,0,width,height);
    var xc=0,yc=0;
    xc = Number(document.getElementById("x").value);
    yc =Number(document.getElementById("y").value);
   
    var origin ={x:(width/2)+xc,y:(height/2)+yc};
   console.log(origin);
    for (var row =0; row<height; row++){
        for (var column =0; column<width; column++){
            var currentPoint = {x:column,y:row};
            
           //console.log(JSON.stringify(currentPoint));
            var distanceFromOrigin = metrics(currentPoint,origin);
            
            if (distanceFromOrigin<100){
                //point is in a sphere
                var newCoordinates=currentPoint;
                ///var newCoordinates = translateCartesianToCanvas(currentPoint);
                c.fillStyle = "#2c3e50";
                c.fillRect(newCoordinates.x,newCoordinates.y,1,1);
            }
            
        } 
    }
    drawAxes();
    
}
function drawAxes(){
    var size = 25;
    
    c.fillStyle = "#16a085";
    c.fillRect(0,center.y,width,1);
    c.fillRect(center.x,0,1,height);

    for (var i =0;i<=width;i=i+50){
        c.fillRect(i,center.y-size/2,1,size);
    }

    for (var i =0;i<=width;i=i+50){
        c.fillRect(center.x-size/2,i,size,1);
    }
}
function translateCartesianToCanvas(point){
    return point;
}
document.getElementById("submit-sphere").onclick = drawSphereUsingMetricsInTextarea;
document.getElementById("submit-plane").onclick = drawEntirePlaneUsingMetricsInTextarea;
