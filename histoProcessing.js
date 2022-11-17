document.write(
  '<script type="text/javascript" src="./commonProcessing.js"></script>'
);

// 히스토그램 처리

function histoStretchImage() {
  makeOutImageArr();
  makeOutCanvas();

  //outImage = (inImage - MIN) * HIGH(255) / (MAX - MIN);
  var min = (max = inImage[0][0]);
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] < min) {
        min = inImage[i][k];
      }
      if (inImage[i][k] > max) {
        max = inImage[i][k];
      }
    }
  }

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = ((inImage[i][k] - min) * 255) / (max - min);
    }
  }
  displayOutImage();
}

function endInImage() {
  makeOutImageArr();
  makeOutCanvas();

  var min = (max = inImage[0][0]);
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] < min) {
        min = inImage[i][k];
      }
      if (inImage[i][k] > max) {
        max = inImage[i][k];
      }
    }
  }

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (inImage[i][k] <= min) outImage[i][k] = 0;
      else if (inImage[i][k] >= max) outImage[i][k] = 255;
      else outImage[i][k] = ((inImage[i][k] - min) * 255) / (max - min);
    }
  }
  displayOutImage();
}

function histoEqualImage() {
  makeOutImageArr();
  makeOutCanvas();

  //1. 히스토그램, 누적히스토그램 생성 & 초기화
  var histo = new Array(256); //pixel 값
  var sumHisto = new Array(256);
  for (var i = 0; i < 256; i++) {
    histo[i] = 0;
    sumHisto[i] = 0;
  }

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      histo[inImage[i][k]]++;
    }
  }

  //2. 누적 히스토그램 계산
  var sumValue = 0;
  for (var i = 0; i < 256; i++) {
    sumValue += histo[i];
    sumHisto[i] = sumValue;
  }

  //3. 정규화된 누적합 생성
  // n[i] = sum[i] * 1/N * max(255)
  var normalHisto = new Array(256);
  for (var i = 0; i < 256; i++) {
    normalHisto[i] = sumHisto[i] * (1.0 / (inH * inW)) * 255.0;
  }

  //4단계 : 정규화된 히스토그램을 적용시켜서 픽셀값을 변환
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = normalHisto[inImage[i][k]];
    }
  }
  displayOutImage();
}
