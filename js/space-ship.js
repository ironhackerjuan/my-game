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

        this.actions = {
            right: false,
            left: false,
            up: false, 
            down: false
        }

        this._img = new Image ()
        this._img.src = "./images/nave.png"

        this._setListeners()
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
        this._applyActions()
    }

    _setListeners() {
        document.onkeydown = e => this._switchAction(e.keyCode, true)
        document.onkeyup = e => this._switchAction(e.keyCode, false)
    }

    _applyActions() {
        if (this.actions.right) {
            this.x += 1.5
        } else if (this.actions.left) {
            this.x -= 1.5
        } 

        if (this.actions.up) {
            this.y -= 1.5
        } else if (this.actions.down) {
            this.y += 1.5
        }

        if(this.x >= this._ctx.canvas.width) {
            this.x = 0 - this.w
        } else if (this.x < 0 - this.w) {
            this.x = this._ctx.canvas.width
        }

        if (this.y >= this._ctx.canvas.height *0.85) {
            this.y = this._ctx.canvas.height * 0.85
        } else if (this.y < 0) {
            this.y = 0
        }
    }

    _switchAction(key, apply) {
        switch (key) {
            case LEFT:
                this.actions.left = apply
                break;
            case RIGHT:
                this.actions.right = apply
                break;
            case UP:
                this.actions.up = apply
                break;
            case DOWN:
                this.actions.down = apply
        }
    }
}