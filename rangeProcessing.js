document.write(
  '<script type="text/javascript" src="./commonProcessing.js"></script>'
);

// 화소 영역 처리

function makeBorderArr() {
  // 임시 입력 배열 - for 테두리 처리
  var tmpInput = new Array(inH + 2);
  for (var i = 0; i < inH + 2; i++) {
    tmpInput[i] = new Array(inW + 2);
  }

  // 임시 입력 배열 초기화 (127로)
  for (var i = 0; i < inH + 2; i++) {
    for (var k = 0; k < inW + 2; k++) {
      tmpInput[i][k] = 127.0;
    }
  }

  // 원 입력 영상 --> 임시 입력에 덮어씌우기
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      tmpInput[i + 1][k + 1] = parseFloat(inImage[i][k]);
    }
  }

  // 임시 출력 배열
  var tmpOutput = new Array(outH);
  for (var i = 0; i < outH; i++) {
    tmpOutput[i] = new Array(outW);
  }
  return { tmpInput: tmpInput, tmpOutput: tmpOutput };
}

function doMaskProcess(mask) {
  var tmpArr = makeBorderArr();
  var tmpInput = tmpArr.tmpInput;
  var tmpOutput = tmpArr.tmpOutput;

  // 회선 연산
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      var S = 0.0;
      for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 3; n++) {
          S += tmpInput[i + m][k + n] * mask[m][n];
        }
      }
      tmpOutput[i][k] = S;
    }
  }

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (tmpOutput[i][k] > 255) {
        tmpOutput[i][k] = 255;
      } else if (tmpOutput[i][k] < 0) {
        tmpOutput[i][k] = 0;
      }
    }
  }

  return tmpOutput;
}

function embosImage() {
  makeOutImageArr();
  makeOutCanvas();

  var mask = [
    [-1.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 1.0],
  ];

  var tmpOutput = doMaskProcess(mask);

  // 후처리 : 마스크 합계가 0이라면 127 정도를 더하기
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(tmpOutput[i][k] + 127.0);
    }
  }
  displayOutImage();
}

function blurImage() {
  makeOutImageArr();
  makeOutCanvas();

  var mask = [
    [1 / 9.0, 1 / 9.0, 1 / 9.0],
    [1 / 9.0, 1 / 9.0, 1 / 9.0],
    [1 / 9.0, 1 / 9.0, 1 / 9.0],
  ];

  var tmpOutput = doMaskProcess(mask);

  // 후처리 : 마스크 합계가 0이라면 127 정도를 더하기
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(tmpOutput[i][k]);
    }
  }
  displayOutImage();
}

function gaussianImage() {
  makeOutImageArr();
  makeOutCanvas();

  var mask = [
    [1 / 16, 1 / 8, 1 / 16],
    [1 / 8, 1 / 4, 1 / 8],
    [1 / 16, 1 / 8, 1 / 16],
  ];

  var tmpOutput = doMaskProcess(mask);

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(tmpOutput[i][k]);
    }
  }
  displayOutImage();
}

function sharpImage() {
  makeOutImageArr();
  makeOutCanvas();

  var mask = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ];

  var tmpOutput = doMaskProcess(mask);

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(tmpOutput[i][k]);
    }
  }
  displayOutImage();
}

function edgeImage() {
  makeOutImageArr();
  makeOutCanvas();

  var mask = [
    [0.0, -1.0, 0.0],
    [-1.0, 2.0, 0.0],
    [0.0, 0.0, 0.0],
  ];

  var tmpOutput = doMaskProcess(mask);

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(tmpOutput[i][k]);
    }
  }
  displayOutImage();
}

function laplacianImage() {
  makeOutImageArr();
  makeOutCanvas();

  var mask = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ];

  var tmpOutput = doMaskProcess(mask);

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(tmpOutput[i][k]);
    }
  }
  displayOutImage();
}

function highPassFilterImage() {
  makeOutImageArr();
  makeOutCanvas();

  var mask = [
    [-1 / 9, -1 / 9, -1 / 9],
    [-1 / 9, 8 / 9, -1 / 9],
    [-1 / 9, -1 / 9, -1 / 9],
  ];

  var tmpArr = makeBorderArr();
  var tmpInput = tmpArr.tmpInput;
  var tmpOutput = tmpArr.tmpOutput;

  // 회선 연산
  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      var S = 0.0;
      for (var m = 0; m < 3; m++) {
        for (var n = 0; n < 3; n++) {
          S += 100 * tmpInput[i + m][k + n] * mask[m][n];
        }
      }
      tmpOutput[i][k] = S;
    }
  }

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      if (tmpOutput[i][k] > 255) {
        tmpOutput[i][k] = 255;
      } else if (tmpOutput[i][k] < 0) {
        tmpOutput[i][k] = 0;
      }
    }
  }

  for (var i = 0; i < inH; i++) {
    for (var k = 0; k < inW; k++) {
      outImage[i][k] = parseInt(tmpOutput[i][k]);
    }
  }
  displayOutImage();
}
