let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 1024;

// READ IMAGE DATA
let uploadFile = new Image();
let imgWdt;
let imgHgt;
let imgInput = document.getElementById('file');

imgInput.addEventListener('change', function(e) {
    
    if(e.target.files) {
        
        let imageData = e.target.files[0]; // Here we assign the file data
        let reader = new FileReader(); // Read the file function

        reader.readAsDataURL(imageData);

        reader.onloadend = function () {
            console.log(imageData);
        }
    } 

});

// ADD CAPTION TO THE CANVAS
function caption(event) {
    event.preventDefault();
    console.log('caption');
}

// DRAW THE FINAL CANVAS
function draw() {
    console.log('draw');
}

// DOWNLOAD THE FINAL DRAWING
function download() {
    console.log('download');
}

// RESET THE CANVAS
function reset() {
    console.log('reset');
}

// DEFAULT ONLOAD
window.onload = () => {
    localStorage.clear();
}