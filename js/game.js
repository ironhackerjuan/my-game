class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this._intervalId = null;
        this.tick = 0;

        this._bg = new Background(ctx)
        this._asteroids = []
        this._ship = new Ship(ctx)
    }

    start() {
        this._intervalId = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
            this._addAsteroid()
            this.tick++
            if (this.tick >= 10000) {
                this.tick = 0
            }
        }, 1000/60)
    }

    _addAsteroid() {
        if (this.tick % 50) return
        this._asteroids.push(new Asteroid(this._ctx))
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
    }

    _draw() {
        this._bg.draw()
        this._asteroids.forEach(asteroid => asteroid.draw())
        this._ship.draw()
    }

    _move() {
        this._bg.move()
        this._asteroids.forEach(asteroid => asteroid.move())
        this._ship.move()
    }
}