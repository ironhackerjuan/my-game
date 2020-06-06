class Bullet {
    constructor(ctx, x, y) {
        this._ctx = ctx
        
        this.x = x -30
        this.y = y -75

        this.w = 20
        this.h = 80
        
        this.vy = 10

        this._img = new Image()
        this._img.src = "./images/missile1.png"
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
        this.y -= this.vy
    }

    isVisible() {
        return (
            this.x < this._ctx.canvas.width &&
            this.x > 0 && 
            this.y > 0 && 
            this.y < this._ctx.canvas.height
        )
    }
}


