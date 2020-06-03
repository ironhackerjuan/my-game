class Ship {
    constructor(ctx) {
        this._ctx = ctx

        this.x = this._ctx.canvas.width * 0.42
        this.y = this._ctx.canvas.height * 0.8

        this.w = 75
        this.h = 75

        this.vx = 0
        this.vy = 0

        this.ax = 0
        this.ay = 0

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
        document.addEventListener('keydown', event => {
            switch(event.keyCode) {
                case RIGHT:
                    this.x += 0.01;
                    break;
                case LEFT:
                    this.x -= 0.01;
                    break;
                case UP:
                    this.y -= 0.01;
                    break;
                case DOWN:
                    this.y += 0.01;
                    break;
            }
        })
        document.addEventListener('keyup', event => {
            switch(event.keyCode) {
                case RIGHT:
                    this.x += 0;
                    break;
                case LEFT: 
                    this.x -= 0;
                    break;
                case UP:
                    this.y += 0;
                    break;
                case DOWN:
                    this.y -= 0;
                    break;
            }
        })

        this.x += this.vx
        this.y += this.vy

    }
}