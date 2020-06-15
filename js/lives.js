class Live {
    constructor(ctx) {
        this._ctx = ctx

        this.x = Math.random() * 500
        this.y = -50

        this.w = 25
        this.h = 25

        this.vy = 4

        this._img = new Image ()
        this._img.src = "./images/nave.png"
    }

    draw() {
        this._ctx.drawImage(
            this._img,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this.y += this.vy
    }

    isVisible() {
        return (
          this.x < this._ctx.canvas.width * 2 &&
          this.x > 0 - this._ctx.canvas.width
        )
      }
}