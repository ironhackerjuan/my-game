class Asteroid {
    constructor(ctx, vy = 3) {
        this._ctx = ctx

        this.x = Math.random() * 500
        this.y = -50

        this.w = (Math.random() * 50) + 26
        this.h = (Math.random() * 50) + 25

        this.vy = vy

        this._img = new Image ()
        this._img.src = "./images/asteroid.png"
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
}