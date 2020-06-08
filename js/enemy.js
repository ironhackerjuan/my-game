class Enemy {
    constructor(ctx, x, y) {
        this._ctx = ctx
        this.live = 1000
        
        this.x = x
        this.y = y

        this.w = 70
        this.h = 35
        
        this.vx = 10

        this._img = new Image()
        this._img.src = "./images/Enemy Ships.png"
        this._img.frames = 17
        this._img.frameIndex = 0

        this._ticks = 0
    }

    draw() {
        this._ctx.drawImage(
            this._img,
            this._img.frameIndex * this._img.width / this._img.frames,
            0,
            this._img.width / this._img.frames,
            this._img.height,
            this.x,
            this.y,
            this.w,
            this.h
          )

          this._animate()
    }

    move() {
        this.x -= this.vx

        if(this.x >= CANVAS_WIDTH) {
            this.x = 0 - this.w
        } else if (this.x < 0 - this.w) {
            this.x = CANVAS_WIDTH
        }

        if (this.y >= CANVAS_HEIGHT *0.85) {
            this.y = CANVAS_HEIGHT * 0.85
        } else if (this.y < 0) {
            this.y = 0
        }
    }

    _animate() {
        if (this._ticks++ > 132) {
            this._ticks = 0
        }
        if (++this._img.frameIndex >= this._img.frames) {
            this._img.frameIndex = 0
        }
    }
}