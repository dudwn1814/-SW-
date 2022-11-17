var inFile, inCanvas, inCtx, inPaper;
var inImage, inH, inW;
var outCanvas, outCtx, outPaper;
var outImage, outH, outW;

function init() {
  inCanvas = document.getElementById('inCanvas');
  inCtx = inCanvas.getContext('2d');
  outCanvas = document.getElementById('outCanvas');
  outCtx = outCanvas.getContext('2d');
}

function openImage() {
  inFile = document.getElementById('inFile').files[0];
  inH = inW = Math.floor(Math.sqrt(inFile.size));

  inImage = new Array(inH);
  for (var i = 0; i < inH; i++) {
    inImage[i] = new Array(inW);
  }

  inCanvas.height = inH;
  inCanvas.width = inW;

  //파일 -> 메모리로 로딩
  var reader = new FileReader();
  reader.readAsBinaryString(inFile);
  reader.onload = function () {
    var blob = reader.result;
    for (var i = 0; i < inH; i++) {
      for (var k = 0; k < inW; k++) {
        var sPixel = i * inH + k;
        var ePixel = i * inH + k + 1;
        inImage[i][k] = blob.slice(sPixel, ePixel).charCodeAt(0);
      }
    }
    displayInImage();
  };
}

function displayInImage() {
  inPaper = inCtx.createImageData(inH, inW);
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      var px = inImage[i][k];
      inPaper.data[(i * inH + k) * 4 + 0] = px; // Red
      inPaper.data[(i * inH + k) * 4 + 1] = px; // Green
      inPaper.data[(i * inH + k) * 4 + 2] = px; // Blue
      inPaper.data[(i * inH + k) * 4 + 3] = 255; // Alpha
    }
  }
  inCtx.putImageData(inPaper, 0, 0);
}

function displayOutImage() {
  outPaper = outCtx.createImageData(outH, outW);
  for (var i = 0; i < outH; i++) {
    for (var k = 0; k < outW; k++) {
      var px = outImage[i][k];
      outPaper.data[(i * outH + k) * 4 + 0] = px; // Red
      outPaper.data[(i * outH + k) * 4 + 1] = px; // Green
      outPaper.data[(i * outH + k) * 4 + 2] = px; // Blue
      outPaper.data[(i * outH + k) * 4 + 3] = 255; // Alpha
    }
  }
  outCtx.putImageData(outPaper, 0, 0);
}

function makeOutImageArr() {
  outH = inH;
  outW = inW;

  outImage = new Array(outH);
  for (var i = 0; i < outH; i++) {
    outImage[i] = new Array(outW);
  }
}

function makeOutCanvas() {
  outCanvas.height = outH;
  outCanvas.width = outW;
}
