let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 1024;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;


// WATERMARK
let watermark = new Image();
watermark.src = "./assets/img/watermark.png";

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
                    localStorage.setItem('orientation', 'portrait');
                    localStorage.setItem('width', uploadFile.width);
                    localStorage.setItem('height', uploadFile.height);
                }
                else if(imgWdt > imgHgt) {
                    console.log('landscape');
                    localStorage.setItem('orientation', 'landscape');
                    localStorage.setItem('width', uploadFile.width);
                    localStorage.setItem('height', uploadFile.height);
                }
                else if(imgWdt == imgHgt) {
                    console.log('square');
                    localStorage.setItem('orientation', 'square');
                    localStorage.setItem('width', uploadFile.width);
                    localStorage.setItem('height', uploadFile.height);
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
let InsertText = "";
function caption() {
    // Draw solid text
    ctx.font = "65px Impact"; // Font size and family
    ctx.textAlign = "center"; // Draw start point
    ctx.textBaseline = "top";
    ctx.fillStyle = "white"; // Text color
    ctx.fillText(
        InsertText.toUpperCase(), // Text content
        canvas.width / 2, // Start left
        canvas.height / 100 * 80, // Start Top
    )
    // Draw the outline
    ctx.font = "65px Impact"; // Font size and family
    ctx.textAlign = "center"; // Draw start point
    ctx.textBaseline = "top";
    ctx.lineWidth = 2; // Text color
    ctx.strokeStyle = "black";
    ctx.strokeText(
        InsertText.toUpperCase(), // Text content
        canvas.width / 2, // Start left
        canvas.height / 100 * 80, // Start Top
    )
}


// DRAW THE FINAL CANVAS
function draw() {

    let newWdt;
    let newHgt;

    let getOrient = localStorage.getItem('orientation');
    let getWidth = localStorage.getItem('width');
    let getHeight = localStorage.getItem('height');
    console.log(getOrient+" ("+getWidth+"x"+getHeight+")");

    if(getOrient == 'portrait') {
        console.log('portrait');
        if(imgWdt < canvas.height) {
            console.log('smaller');
            let increaseCalc = (1024 / imgWdt);
            console.log(increaseCalc);
            newWdt = imgWdt * increaseCalc;
            newHgt = imgHgt * increaseCalc;
        }
        else {
            console.log('larger');
            let increaseCalc = (imgWdt / 1024);
            console.log(increaseCalc);
            newWdt = imgWdt / increaseCalc;
            newHgt = imgHgt / increaseCalc;
        }
    }
    else if(getOrient == 'landscape') {
        console.log('landscape');
        if(imgHgt < canvas.height) {
            console.log('smaller');
            let increaseCalc = (1024 / imgHgt);
            console.log(increaseCalc);
            newWdt = imgWdt * increaseCalc;
            newHgt = imgHgt * increaseCalc;
        }
        else {
            console.log('larger');
            let increaseCalc = (imgHgt / 1024);
            console.log(increaseCalc);
            newWdt = imgWdt / increaseCalc;
            newHgt = imgHgt / increaseCalc;
        }
    }
    else if(getOrient == 'square') {
        console.log('square');
        newWdt = 1024;
        newHgt = 1024;
    }
    else {
        console.log('no match');
        newWdt = 1024;
        newHgt = 1024;
    }

    let changeWdt = newWdt / 2;
    let changeHgt = newHgt / 2;
    ctx.drawImage(
        uploadFile,
        centerX - changeWdt,
        centerY - changeHgt,
        newWdt,
        newHgt
    );
    
    caption(); // Then draw caption

    ctx.drawImage(
        watermark,
        canvas.width - 165, // LEFT
        canvas.height - 50, // TOP
        142.4341, // WDT
        25.8162 // HGT
    );
}


// UPDATE CAPTION TEXT
let textInput = document.getElementById('caption');
textInput.addEventListener('change', function(e) {
    InsertText = e.target.value;
    draw();
});


// COUNT CAPTION TEXT
let countChar = document.getElementById('caption');
let charCount = document.getElementById('charCount');
countChar.onkeyup = function() {
    charCount.innerText = countChar.value.length;
}


// DOWNLOAD THE FINAL DRAWING
function download() {
    
    if(localStorage.getItem('orientation') == null) {
        alert('no image');
    }
    else {
        const download = document.createElement("div");
        download.classList.add("overlay");
        download.innerText = "Downloading";
        document.body.appendChild(download);

        setTimeout(() => {
            let fileName = Date.now();
            let anchor = document.createElement('a');
            anchor.href = canvas.toDataURL('image/jpeg', 1);
            anchor.download = fileName+"_image.jpg";
            anchor.click();

            reset();
        }, 5000);
    }

}


// RESET THE CANVAS
function reset() {
    window.location.reload();
}


// DEFAULT ONLOAD
window.onload = () => {
    localStorage.clear();
}