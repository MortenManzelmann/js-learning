function ShoppingList(img) {

    const DELTA = 50; 
    const SQUARE_LEN = 50; // Gibst die Seiten länge der Quadrate für den lokal Threshold an 
    var width=0,height=0;
    var context;
    var canvas;
    var imageData;
    var data;


    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = (img.naturalHeight/img.naturalWidth)*canvas.width;
    width = canvas.width;
    height = canvas.height;
    context.drawImage(img, 0, 0, width, height);
    imageData = context.getImageData(0, 0, width, height);
    data = imageData.data;

    this.getCanvas = function () {       
        return canvas;
    };

    this.process = function() {
        
        // debug(data,true);
        // initaliese all the needed obj here
        var im = new ImageManipulation();
        var objectDetection = new ObjectDetection();

        // manipulate the image to a monochrom 2D matrix
        var grayImg =  im.grayscale(data);
        var matrix = im.convertArrayToMatrix(grayImg,width,height);
        var monoImage = im.monochrom(matrix);
        console.log("Monoimage: ");
        console.dir(monoImage);
        

        // detect the textobjects and return an array 
        // of textobjects
        var textObjArr = objectDetection.detectObjects(monoImage);        
        console.dir(textObjArr);
        // reconstruct the image to be displayed
        textObjArr.forEach(function(textObj){
            textObj.drawBox(monoImage)
        })
        
        var monoArr = im.convertMatrixToArray(monoImage);
        im.decompressData(imageData.data, monoArr);
        console.dir(imageData.data);
        
        // put image back into canvas
        context.putImageData(imageData, 0, 0);   
    }

    
  
  
}