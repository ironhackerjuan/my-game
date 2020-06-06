class Ship {
    constructor(ctx) {
        this._ctx = ctx

        this.x = CANVAS_WIDTH * 0.42
        this.y = CANVAS_HEIGHT * 0.8

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
            down: false,
            shoot: false
        }

        this._img = new Image ()
        this._img.src = "./images/nave.png"

        this.weapon = new Weapon(this)

        this._setListeners()
    }

    draw() {
        this._ctx.drawImage(
            this._img,
            this.x,
            this.y,
            this.w,
            this.h
        );

        this.weapon.draw()
    }

    move() {
        this._applyActions()
        this.weapon.move()
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

        if(this.actions.shoot) {
            this.weapon.shoot()
        }

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
                break;
            case SPACE:
                this.actions.shoot = apply
                break;
        }
    }
}