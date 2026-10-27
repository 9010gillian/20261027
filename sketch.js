// 宣告全域變數以儲存精靈圖圖片物件
let spriteImage;

// 宣告變數以儲存角色的 X 座標位置
let charX;

// 宣告變數以儲存角色的 Y 座標位置
let charY;

// 宣告變數來控制角色的移動速度像素值
let moveSpeed = 4;

// 宣告變數來記錄當前播放的動畫影格索引（0 到 2）
let currentFrame = 0;

// 宣告變數來記錄角色面向的方向（1 表示向右，-1 表示向左）
let facingDirection = 1;

// 宣告變數來記錄角色目前是否正在移動
let isMoving = false;

// 宣告變數記錄圖片是否成功載入
let imageLoaded = false;

// 預先載入圖片資源的非同步函式
function preload() {
  // 載入橫向精靈圖檔案 walk.png，並設定成功與失敗的回呼函式
  spriteImage = loadImage(
    'walk.png',
    // 圖片成功載入後執行的匿名函式
    () => {
      imageLoaded = true;
    },
    // 圖片載入失敗時執行的匿名函式
    (err) => {
      console.error('圖片載入失敗，請確認 walk.png 是否存在', err);
    }
  );
}

// 初始化畫布與角色初始設定的函式
function setup() {
  // 建立一個佔滿整個瀏覽器視窗的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 將角色的初始 X 座標設定在畫布正中央
  charX = width / 2;
  
  // 將角色的初始 Y 座標設定在畫布正中央
  charY = height / 2;
  
  // 設定圖片繪製的基準點為中心點
  imageMode(CENTER);
}

// 每畫格持續執行的繪圖與邏輯更新函式
function draw() {
  // 設定畫布背景顏色為指定的十六進位色碼 bde0fe
  background('#bde0fe');
  
  // 檢查圖片是否尚未載入完成
  if (!imageLoaded) {
    // 設定文字填滿顏色為黑色
    fill(0);
    // 設定文字大小為 20 像素
    textSize(20);
    // 設定文字對齊方式為水平與垂直置中
    textAlign(CENTER, CENTER);
    // 在畫布正中央顯示載入中提示文字
    text('正在載入圖片 walk.png...', width / 2, height / 2);
    // 終止當前畫格的後續執行
    return;
  }
  
  // 預設每一幀開始時角色狀態為停止移動
  isMoving = false;
  
  // 檢查鍵盤的右方向鍵是否被持續按下
  if (keyIsDown(RIGHT_ARROW)) {
    // 將角色 X 座標向右增加移動速度的距離
    charX += moveSpeed;
    
    // 設定角色面向右方
    facingDirection = 1;
    
    // 將角色移動狀態設為真
    isMoving = true;
  }
  
  // 檢查鍵盤的左方向鍵是否被持續按下
  if (keyIsDown(LEFT_ARROW)) {
    // 將角色 X 座標向左減少移動速度的距離
    charX -= moveSpeed;
    
    // 設定角色面向左方
    facingDirection = -1;
    
    // 將角色移動狀態設為真
    isMoving = true;
  }
  
  // 檢查角色是否正在移動
  if (isMoving) {
    // 每經過 6 個畫格就切換一次動畫影格
    if (frameCount % 6 === 0) {
      // 將當前影格索引遞增，並透過取餘數循環（0, 1, 2）
      currentFrame = (currentFrame + 1) % 3;
    }
  } else {
    // 如果沒有移動，則將動畫影格重設為第一個影格
    currentFrame = 0;
  }
  
  // 儲存目前的繪圖狀態設定
  push();
  
  // 將繪圖原點座標平移至角色當前的位置
  translate(charX, charY);
  
  // 根據面向方向進行水平翻轉（若向左則水平縮放為 -1，向右為 1）
  scale(facingDirection, 1);
  
  // 計算精靈圖中單張圖片的寬度（總寬度 463 除以 3 張圖片）
  let frameWidth = 463 / 3;
  
  // 計算精靈圖中單張圖片的高度（總高度 136）
  let frameHeight = 136;
  
  // 計算當前影格在精靈圖中的來源 X 座標
  let sx = currentFrame * frameWidth;
  
  // 設定來源 Y 座標為 0
  let sy = 0;
  
  // 在畫布上裁剪並繪製精靈圖的對應影格
  image(spriteImage, 0, 0, frameWidth, frameHeight, sx, sy, frameWidth, frameHeight);
  
  // 恢復先前儲存的繪圖狀態
  pop();
}

// 當瀏覽器視窗大小改變時自動觸發的調整函式
function windowResized() {
  // 重新調整畫布尺寸以符合新的視窗寬高
  resizeCanvas(windowWidth, windowHeight);
}