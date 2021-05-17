let video = document.getElementById("video");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const setupCamera = () => {
    navigator.mediaDevices.getUserMedia({
        video: { width: 600, height: 400 },
        audio: false,
    }).then(stream => {
        video.srcObject = stream;
    });

};

const detectFaces = async () => {
    const prediction = await model.estimateFaces(video, false);

    ctx.drawImage(video, 0, 0, 600, 400);



    prediction.forEach(pred => {


        ctx.fillStyle = "red";

        ctx.fillRect(pred.landmarks[0][0], pred.landmarks[0][1], 5, 5);
        ctx.fillRect(pred.landmarks[1][0], pred.landmarks[1][1], 5, 5);


    });





};

setupCamera();

video.addEventListener("loadeddata", async () => {
    model = await blazeface.load();

    setInterval(detectFaces, 100);


});

