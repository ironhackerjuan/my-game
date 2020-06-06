class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this._intervalId = null;
        this._tick = 0;

        this._bg = new Background(ctx)
        this._asteroids = []
        this._ship = new Ship(ctx)
        this._bullet = new Bullet(ctx)
        this._enemies = new Enemy(ctx)

    }

    start() {
        this._intervalId = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
            this._addAsteroid()
            this._checkAsteroids()
            this._checkBullets
            this._clearAsteroids
            this._tick++
            if (this._tick >= 10000) {
                this._tick = 0
            }
        }, 1000/60)
    }

    _clearAsteroids() {
        this._asteroids = this._asteroids.filter(a => a.isVisible())
    }

    _addAsteroid() {
        if (this._tick % 50) return
        this._asteroids.push(new Asteroid(this._ctx))
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
    }

    _draw() {
        this._bg.draw()
        this._asteroids.forEach(asteroid => asteroid.draw())
        this._ship.draw()
        this._enemies.draw()
        this._bullet.draw()
    }

    _move() {
        this._bg.move()
        this._asteroids.forEach(asteroid => asteroid.move())
        this._enemies.move()
        this._ship.move()
        this._bullet.move()
    }

    _checkAsteroids() {
        const ship = this._ship 
        this._asteroids.forEach(asteroid => {
            const astX = asteroid.x < ((ship.x - 15) + (ship.w - 5)) && ((asteroid.x - 15) + (asteroid.w - 5)) > ship.x;
            const astY = ((asteroid.y - 5) + (asteroid.h - 5)) > ship.y && asteroid.y < ((ship.y -15) + (ship.h - 15));
            if (astX && astY) {
                this._gameOver()
            }
        })
    }

    _checkBullets() {
        const missile = this._bullet
        this._asteroids.forEach(asteroid => {
            const astX = asteroid.x < ((missile.x) + (missile.w)) && ((asteroid.x) + (asteroid.w)) > missile.x;
            const astY = ((asteroid.y) + (asteroid.h)) > missile.y && asteroid.y < ((missile.y) + (missile.h));
            if (astX && astY) {
                this._gameOver()
            }
        })

    }

    _gameOver() {
        clearInterval(this._intervalId)

        this._ctx.font = "40px Comic Sans MS";
        this._ctx.textAlign = "center";
        this._ctx.fillStyle = "red"
        this._ctx.fillText(
            "GAME OVER",
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2
        )
    }
}