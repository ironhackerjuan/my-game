const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function startGame() {
  ['game-intro', 'game-board'].forEach(id => {
    document.getElementById(id).classList.toggle('inactive')
  })

  const game = new Game(ctx)
  game.start()

  document.querySelector('canvas').focus()
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
      startGame();
  };
};


window.addEventListener('resize', resize);

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
  
      // calculate the scale factor to keep a correct aspect ratio
    let scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
    
    if (IS_CHROME) {
      canvas.width = CANVAS_WIDTH * scaleFactor;
      canvas.height = CANVAS_HEIGHT * scaleFactor;
      ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);   
    } else {
      // resize the canvas css properties
      canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
      canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px'; 
    }
  }



  