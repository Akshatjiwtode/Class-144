song = "";

leftWristX = "";
leftWristY = "";

rightWristX = "";
rightWristY = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture();
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Model is initiated");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX :" + leftWristX + "leftWristY :" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX :" + rightWristX + "rightWristY :" + rightWristY);
    }

}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){
        
    circle(leftWristX, leftWristY, 20);
    InNumberLeftWristY = Number(leftWristY);
    removeDecimals = floor(InNumberLeftWristY);
    volume = removeDecimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        if(rightWrist > 0 && rightWristY <=100){
            document.getElementById("sound").innerHTML = "Speed = 0.5";
            song.rate(0.5);
        }

        else if(rightWrist > 100 && rightWristY <=200){
            document.getElementById("sound").innerHTML = "Speed = 1";
            song.rate(1);
        }

        else if(rightWrist > 200 && rightWristY <=300){
            document.getElementById("sound").innerHTML = "Speed = 1.5";
            song.rate(1.5);
        }

        else if(rightWrist > 300 && rightWristY <=400){
            document.getElementById("sound").innerHTML = "Speed = 2";
            song.rate(2);
        }

        else if(rightWrist > 400 && rightWristY <=500){
            document.getElementById("sound").innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }
    }
    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
    
}



