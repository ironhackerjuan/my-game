class Background {
    constructor(ctx) {
        this._ctx = ctx

        this.x = 0
        this.y = 0
        
        this.w = CANVAS_WIDTH
        this.h = CANVAS_HEIGHT

        this.vx = 0
        this.vy = 0.675

        this._img = new Image ()
        this._img.src = "./images/space.png"
    }

    draw() {
        this._ctx.drawImage(
            this._img,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this._ctx.drawImage(
            this._img,
            this.x,
            this.y - this.h,
            this.w,
            this.h
        )
    }

    move() {
        this.y += this.vy
        if (this.y >= this.h) {
            this.y = 0
        }
    }
}

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