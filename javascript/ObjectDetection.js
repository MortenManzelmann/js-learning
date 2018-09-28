function ObjectDetection()
{

    this.detectObjects = function(monoImage)
    {
        var blackPixel = false;
        var x1 = null, x2 = 0;
        var y1 = null, y2 = 0;
        var intImageWidth = monoImage.length;
        var intImageHeight = monoImage[0].length;
        var arrayTextObject = new Array();
       


        // step through image line after line
        for(var y=0; y<intImageHeight;y++){
            blackPixel = false;
            for(var x=0; x<intImageWidth;x++){
                // black pixel detected
                if((monoImage[x][y] == 0)){
                    if(x1===null){
                        x1=x;
                        y1=y;
                    } else {
                        if(x < x1) x1 = x;
                        if(x > x2) x2 = x;
                        blackPixel = true;
                    }
                }
            }

            if(!blackPixel && (x1!==null)){
                y2 = y;
                arrayTextObject.push(new TextObject(x1,y1,x2,y2));
                x1 = null;
                x2 = 0;
            }
        }

        return arrayTextObject;
    }
}