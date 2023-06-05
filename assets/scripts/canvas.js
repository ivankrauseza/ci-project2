let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 1024;

// READ IMAGE DATA
let uploadFile = new Image(); // This is the image for the canvas.
let imgWdt;
let imgHgt;
let imgInput = document.getElementById('file');

imgInput.addEventListener('change', function(e) {
    
    if(e.target.files) {
        
        let imageData = e.target.files[0]; // Here we assign the file data
        let reader = new FileReader(); // Read the file function

        reader.readAsDataURL(imageData);

        reader.onloadend = function(e) {
        
            uploadFile.src = e.target.result; // Assign image source

            uploadFile.onload = function() {
                
                // ASSIGN & SHOW SIZE
                imgWdt = uploadFile.width;
                imgHgt = uploadFile.height;

                console.log(imgWdt+"x"+imgHgt);

                // GET ORIENTATION
                if(imgWdt < imgHgt) {
                    console.log('portrait');
                }
                else if(imgWdt > imgHgt) {
                    console.log('landscape');
                }
                else if(imgWdt == imgHgt) {
                    console.log('square');
                }
                else {
                    console.log('unknown');
                }

                draw();
            }
        }
    } 
});

// ADD CAPTION TO THE CANVAS
function caption() {
    //console.log('caption');
    ctx.font = "65px Impact";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.fillText(
        "This is the caption".toUpperCase(), // Text content
        canvas.width / 2, // Start left
        0, // Start Top
    )
}

// DRAW THE FINAL CANVAS
function draw() {
    console.log('draw');
    caption();
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