document.write(
  '<script type="text/javascript" src="./commonProcessing.js"></script>'
);

// 기하학 처리

function mirroringLRImage() {
  makeOutImageArr();
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][inW - 1 - k] = inImage[i][k];
    }
  }
  displayOutImage();
}

function mirroringUDImag() {
  makeOutImageArr();
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[inH - 1 - i][k] = inImage[i][k];
    }
  }
  displayOutImage();
}

function zoomOutImage() {
  var scale = parseInt(prompt('축소할 배율을 입력하세요 ex) 2 ', 2));

  outH = parseInt(inH / scale);
  outW = parseInt(inW / scale);

  outImage = new Array(outH);
  for (var i = 0; i < outH; i++) {
    outImage[i] = new Array(outW);
  }
  makeOutCanvas();

  for (var i = 0; i < outH; i++) {
    for (var k = 0; k < outW; k++) {
      outImage[i][k] = inImage[i * scale][k * scale];
    }
  }
  displayOutImage();
}

function zoomInForwardImage() {
  var scale = parseInt(prompt('확대할 배율을 입력하세요 ex) 2 ', 2));

  outH = parseInt(inH * scale);
  outW = parseInt(inW * scale);

  outImage = new Array(outH);
  for (var i = 0; i < outH; i++) {
    outImage[i] = new Array(outW);
  }
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i * scale][k * scale] = inImage[i][k];
    }
  }
  displayOutImage();
}

function zoomInBackWardImage() {
  var scale = parseInt(prompt('확대할 배율을 입력하세요 ex) 2 ', 2));

  outH = parseInt(inH * scale);
  outW = parseInt(inW * scale);

  outImage = new Array(outH);
  for (var i = 0; i < outH; i++) {
    outImage[i] = new Array(outW);
  }
  makeOutCanvas();

  for (var i = 0; i < outH; i++) {
    for (var k = 0; k < outW; k++) {
      outImage[i][k] = inImage[parseInt(i / scale)][parseInt(k / scale)];
    }
  }
  displayOutImage();
}

function moveImage() {
  makeOutImageArr();
  makeOutCanvas();

  var [moveX, moveY] = prompt(
    '이동할 x, y 위치를 입력하세요 (ex) 100 150) : '
  ).split(' ');

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (i - parseInt(moveY) >= 0 && k + parseInt(moveX) >= 0)
        outImage[i - parseInt(moveY)][k + parseInt(moveX)] = inImage[i][k];
    }
  }
  displayOutImage();
}

function rotateImage() {
  makeOutImageArr();
  makeOutCanvas();

  var scale = parseInt(prompt('회전시킬 각도를 입력하세요', 90));
  var radian = scale * (Math.PI / 180);

  var centerX = parseInt(inH / 2);
  var centerY = parseInt(inW / 2);
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      var rotateX = parseInt(
        (i - centerX) * Math.cos(radian) -
          (k - centerY) * Math.sin(radian) +
          centerX
      );
      var rotateY = parseInt(
        (i - centerX) * Math.sin(radian) +
          (k - centerY) * Math.cos(radian) +
          centerY
      );

      if (inImage[rotateX]) {
        if (0 <= rotateX && 0 <= rotateY) {
          outImage[i][k] = inImage[rotateX][rotateY];
        }
      }
    }
  }
  displayOutImage();
}
