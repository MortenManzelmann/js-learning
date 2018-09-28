function ImageManipulation() {

//    var N_CANVAS = 16; // Gibt die Anzahl der Canvas über die gemittelt werden soll an
  
   var minGray = 255;
   var maxGray = 0;
   var medianGray = 0;      // Mittlere Grauwert
   var tonal = 0;       // Tonwertumfang

   /**
    * Aus den Bilddaten wird eine Graustufenbild 
    * erstellt und die Arraylänge auf ein Viertel reduziert.
    * Durch das kleine Array wird Rechenleistung gespart und
    * wir brauchen für die nächsten Schritte nur einen Graustufenwert
    */
   this.grayscale = function(data){
      var grayscale = 0;
      var len = data.length;
      var retArr = new Uint8ClampedArray(len>>>2);

      for (var i = 0; i < len; i += 4) {
         grayScale = .299 * data[i] +
                     .587 * data[i + 1] +
                     .114 * data[i + 2];
         retArr[i>>>2] = grayScale;
         if (grayScale < minGray) minGray = grayScale;
         if (grayScale > maxGray) maxGray = grayScale;
      }        
      
      medianGray = (minGray+maxGray)/2;
      tonal = maxGray - minGray;
      console.log("Tonwertumfang: " + tonal);
      console.log("Mittlere Grauwert: " + medianGray);
      console.log("Maximaler Grauwert: " + maxGray);
      console.log("Minimaler Grauwert: " + minGray);
      return retArr;
   };

   this.convertArrayToMatrix = function(arr, width, height){
      debug("Spalten Matrix: " + width, false);
      debug("Zeilen Matrix: " + height, false);
      debug("Das Array: ", false);
      debug(arr);
      var array2D = new Array(width);
      
      for(var i=0; i < width; i++){
            array2D[i] = new Array(height);
            for (var j=0;j<height;j++){
                  array2D[i][j]= arr[j*width+i]; 
         }
      }
    
      debug("2 dimensinale Matrix: ", false);
      debug( array2D);
      return array2D;
   }

  this.monochrom = function(matrix){
        var size_sqr = 20;
        var width = matrix.length;
        var height = matrix[0].length;
      //   console.log("Welcome to monochrom");
        for(var i=0;i<height;i+=size_sqr){
              for(var j=0;j<width;j+=size_sqr){
                  //   console.log("Hi I'm in the loop");
                    localSpreadHistogramm(matrix, j, i,j+size_sqr,i+size_sqr)
              }
        }

        console.dir(matrix);
        return matrix;
  };

   /**
    * Histogrammspreizung über das komprimierte Array
    * @param {*} arr 
    */
   localSpreadHistogramm = function(matrix,x_start, y_start, x_stop, y_stop){
      var N = (x_stop-x_start)*(y_stop-y_start);
      var curremtVal=0;
      var min=255, max=0;
      var localMedian = 127;
      var localAritMedian = 0;
      var localTonal = 50;      
      var scaleFactor = 255 / (maxGray - minGray);

      // console.log("Start: " + x_start + ", " + y_start);
      // console.log("Start: " + x_stop + ", " + y_stop);
      // console.log("Matrix im SpreadHistogramm: "); console.dir(matrix);

      for(var i=x_start;i<x_stop;i++){
            for(var j=y_start; j<y_stop; j++){
                  curremtVal = matrix[i][j];
                  if (curremtVal < min) min = curremtVal;
                  if (curremtVal > max) max = curremtVal;
                  localAritMedian += curremtVal;
            }
      }

      scaleFactor = 255 / (max - min);
      for(var i=x_start; i<x_stop; i++){
            for(var j=y_start; j<y_stop; j++){
                  matrix[i][j] = (matrix[i][j]-min) * scaleFactor;           
            }
      }


    

      localAritMedian /= N;

      // localTonal = max -min;
      // localMedian = (min+max)/2;
      // console.log("N: " + N);
      // console.log("Median Histogramm: " + localMedian);
      // console.log("Lokaler arithmetischer Mittelwert: " + localAritMedian);
      // console.log("Lokaler Tonwertumfang: " + localTonal);
      // console.log("Histogramm Max: " + max);
      // console.log("Histogramm Min: " + min);
      
    
      if((max-min)<(localTonal)){ //} && (localAritMedian-localMedian) < 20){
            for(var i=x_start;i<x_stop;i++){
                  for(var j=y_start;j<y_stop;j++){
                        matrix[i][j] = 255;
                  }
            }
      } else {
            for(var i=x_start;i<x_stop;i++){
                  for(var j=y_start;j<y_stop;j++){
                        matrix[i][j]= matrix[i][j]>localMedian?255:0;
                  }
            }
      }
      // return ((min==0)&&(max==255))?true:false;
   };


   localThreshold = function(matrix){
      var matrixColumn = matrix.length;   // Spalten der Matrix
      var matrixRow = matrix[0].length;   // Zeilen der Matrix
      var size_sqr = delta*delta;         // Größe eines Quadrates
      var N_canvases = (matrixColumn*matrixRow)/size_sqr; // Anzahl der Quadrate
      var x=0,y=0;
      
      debug("Anzahl der Canvases: " + N_canvases, false);
      for(var i=0;i<N_canvases; i++){

      }
   }

   

   this.convertMatrixToArray = function(matrix){
         var matrixColumn = matrix.length;
         var matrixRow = matrix[0].length;
         var array1D = new Uint8ClampedArray(matrixColumn*matrixRow);
         var len = array1D.length;
         var x = 500, y = -1;

        console.log("Convert Matrix to Array");

         for(var i=0; i<len; i++){
            if(x >= matrixColumn-1){
                  x = 0;
                  y++;
            } else {
                  x++;
            }
            array1D[i] = matrix[x][y];
         }

         return array1D;
   }

   
   
    /**
    * Es werden die Daten für ein Bild zurück gegeben nach der 
    * Bearbeiteiung.
    * @param {*} arr 
    */
   this.decompressData = function(data,arr){
      var len = arr.length;
      
      var currentData;

      for(var i=0; i<len; i++){
            currentData = arr[i] > 255 ? 255 : Math.round(arr[i]);
            data[i<<2] = currentData;
            data[(i<<2)+1] = currentData;
            data[(i<<2)+2] = currentData;
            data[(i<<2)+3] = 255;
      }
            
   };

   /**
    * Invertiert alle Elemente des Arrays
    */
   this.invert = function (arr) {
      var len = arr.length;
      for (var i = 0; i < len; i += 4) {
         arr[i] = 255 - arr[i]; // red
         arr[i + 1] = 255 - arr[i + 1]; // green
         arr[i + 2] = 255 - arr[i + 2]; // blue
      }
     
   };

   /**
    * Es soll eine gefensterte Fast-Fourier-Transformation
    * angewendet werden. Nur leider ist die Funktion sehr
    * rechen intensiv
    * @param {*} arr 
    */
   this.windowedFFT = function (arr) {
      var len = arr.length;
      var retArr = new Uint8ClampedArray(len);
      var N_over_pi = Math.PI/len;
      
      // auessere schleife um array zu durchlaufen
      for(var i=0;i<len;i++){
            //schleife um spektrum zu bestimmen
            for(var j=0;j<len;j++){
                  retArr[i] += (arr[j]*Math.cos(N_over_pi * (j- 0.5) * i))
            }
            retArr[i] /=len;
      }
      console.dir(retArr);
      return retArr;
   };
}
