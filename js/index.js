const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


setImageSmoothing(false);


function startGame() {
    const game = new Game(ctx)

    game.start()
}

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    };
};

function setImageSmoothing(value) {
    ctx['imageSmoothingEnabled'] = value;
    ctx['mozImageSmoothingEnabled'] = value;
    ctx['oImageSmoothingEnabled'] = value;
    ctx['webkitImageSmoothingEnabled'] = value;
    ctx['msImageSmoothingEnabled'] = value;
  }


  function drawStartScreen() {
    fillCenteredText("BIL Invaders", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#702f8a', 36);
    fillBlinkingText("Press enter to play !", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 500, '#FFFFFF', 36);
    fillCenteredText("Then on spacebar to shoot", CANVAS_WIDTH/2, CANVAS_HEIGHT/1.5, '#05c3de', 36);
  }
  

window.addEventListener('resize', resize);

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
  
      // calculate the scale factor to keep a correct aspect ratio
    let scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
    
    if (IS_CHROME) {
      canvas.width = CANVAS_WIDTH * scaleFactor;
      canvas.height = CANVAS_HEIGHT * scaleFactor;
      setImageSmoothing(false);
      ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);   
    } else {
      // resize the canvas css properties
      canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
      canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px'; 
    }
  }



  