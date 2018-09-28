function TextObject(xStart, yStart, xStop, yStop){
    this.xStart = xStart;
    this.yStart = yStart;
    this.xStop = xStop; 
    this.yStop = yStop

    this.drawBox = function(monoImage) {
         //horizontale Linien
         for(var i=xStart; i<xStop; i++){
            monoImage[i][yStart] = 128;
            monoImage[i][yStop] = 128;
       }
       //verticale Linien
       for(var i=yStart; i<yStop; i++){
           monoImage[xStart][i] = 128;
           monoImage[xStop][i] = 128;
      }
    }
    
}