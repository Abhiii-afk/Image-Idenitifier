let model;
let imageElement = document.getElementById("inputImage");
let predictionElement = document.getElementById("predictionResult");

// Load the pre-trained MobileNet model
async function loadModel() {
  model = await mobilenet.load();
  console.log("Model loaded!");
}

// Handle image upload and make prediction
document.getElementById("imageUpload").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imageElement.src = e.target.result;
      imageElement.onload = function() {
        predictImage();
      };
    };
    reader.readAsDataURL(file);
  }
});

// Predict the image using the model
async function predictImage() {
  if (!model) {
    console.log("Model not loaded yet!");
    return;
  }
  const predictions = await model.classify(imageElement);
  predictionElement.innerText = predictions[0].className + " (" + (predictions[0].probability * 100).toFixed(2) + "%)";
}

// Initialize the model
loadModel();
