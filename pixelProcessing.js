document.write(
  '<script type="text/javascript" src="./commonProcessing.js"></script>'
);

//화소점 처리

function equalImage() {
  makeOutImageArr();
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = inImage[i][k];
    }
  }
  displayOutImage();
}

function addImage() {
  makeOutImageArr();
  makeOutCanvas();

  var addValue = parseInt(prompt('올릴 밝기를 입력하세요 ex) 50 ', 50));

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] + addValue > 255) outImage[i][k] = 255;
      else outImage[i][k] = inImage[i][k] + addValue;
    }
  }
  displayOutImage();
}

function subImage() {
  makeOutImageArr();
  makeOutCanvas();

  var subValue = parseInt(prompt('어둡게 할 값을 입력하세요 ex) 50 ', 50));

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] - subValue < 0) outImage[i][k] = 0;
      else outImage[i][k] = inImage[i][k] - subValue;
    }
  }
  displayOutImage();
}

function reverseImage() {
  makeOutImageArr();
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = 255 - inImage[i][k];
    }
  }
  displayOutImage();
}

function grayScale128Image() {
  makeOutImageArr();
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] > 128) outImage[i][k] = 255;
      else outImage[i][k] = 0;
    }
  }
  displayOutImage();
}

function grayScaleAvgImage() {
  makeOutImageArr();
  makeOutCanvas();

  var sum = (avg = 0);
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      sum += inImage[i][k];
    }
  }
  avg = sum / (inH * inW);

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] > avg) outImage[i][k] = 255;
      else outImage[i][k] = 0;
    }
  }
  displayOutImage();
}

function grayScaleMidImage() {
  makeOutImageArr();
  makeOutCanvas();

  var idx = (mid = 0);
  var tmpArr = new Array(inH * inW);
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      tmpArr[idx++] = inImage[i][k];
    }
  }
  tmpArr.sort();
  mid = tmpArr[parseInt((inH * inW) / 2)];

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] > mid) outImage[i][k] = 255;
      else outImage[i][k] = 0;
    }
  }
  displayOutImage();
}

function gammaImage() {
  makeOutImageArr();
  makeOutCanvas();

  var gammaValue = prompt('감마값을 입력하세요 ex) 0.8 ', 0.8);
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(Math.pow(inImage[i][k], 1 / gammaValue));
    }
  }
  displayOutImage();
}

function rangeImage() {
  makeOutImageArr();
  makeOutCanvas();

  var [left_range, right_range] = prompt(
    '강조할 범위를 입력하세요 (ex) 100 150) : '
  ).split(' ');
  var low, high;

  if (parseInt(left_range) >= parseInt(right_range)) {
    low = parseInt(right_range);
    high = parseInt(left_range);
  } else {
    low = parseInt(left_range);
    high = parseInt(right_range);
  }

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (low <= inImage[i][k] && inImage[i][k] <= high) {
        outImage[i][k] = 255;
      } else {
        outImage[i][k] = inImage[i][k];
      }
    }
  }
  displayOutImage();
}

function parabolaCapImage() {
  makeOutImageArr();
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = 255 * Math.pow(inImage[i][k] / 127 - 1, 2);
    }
  }
  displayOutImage();
}

function parabolaCupImage() {
  makeOutImageArr();
  makeOutCanvas();

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = -255 * Math.pow(inImage[i][k] / 127 - 1, 2) + 255;
    }
  }
  displayOutImage();
}
