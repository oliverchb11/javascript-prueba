const URL = "./model/";

let model, webcam, labelContainer, maxPredictions;
let texto = document.querySelector('#texto')

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(700, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        // labelContainer.childNodes[i].innerHTML = classPrediction;
        if (prediction[i].probability.toFixed(2) > 0.80) {
            // console.log(`Eres ${prediction[i].className} con una probabilidad de ${prediction[i].probability.toFixed(2)}`);
            if (prediction[i].className === 'Popeye' || prediction[i].className === 'Garavito' || prediction[i].className === 'Pablo Escobar') {

                texto.innerHTML = `Tu eres ${prediction[i].className} con una probabilidad de ${prediction[i].probability.toFixed(2)} Eres un Criminal`;
            } else {
                texto.innerHTML = `Tu eres ${prediction[i].className} con una probabilidad de ${prediction[i].probability.toFixed(2)} No Eres un Criminal`;
            }
        }
    }
}