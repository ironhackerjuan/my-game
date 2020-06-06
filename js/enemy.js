class Enemy {
    constructor(ctx) {
        this._ctx = ctx
        
        this.x = 0
        this.y = 0

        this.w = 70
        this.h = 35
        
        this.vy = 0

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
        this.y -= this.vy
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