class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this._intervalId = null;
        this._tick = 0;
        this.score = 0
        this.lives = 2
        this.asteroidsVY = 3

        this._bg = new Background(ctx)
        this._asteroids = []
        this._lives = []
        this._ship = new Ship(ctx)
        this._bullet = new Bullet(ctx)
        this._enemies = ENEMIES_COORDINATES.map(enemy => {
            return new Enemy(ctx, enemy.x, enemy.y)
        })

        this._audio = new Audio('sounds/space-odyssey.mp3')
        this._audio.loop = true
        this._audioCrash = new Audio('sounds/astToShip.mp3')
        this._audioCrashEnemy = new Audio('sounds/enemyCrash.mp3')
        this._gameOverAudio = new Audio('sounds/game-over.mp3')
        this._audioCrashAst = new Audio('sounds/crashAst.mp3')

    }

    start() {
        this._audio.play()
        this._intervalId = setInterval(() => {
            this._clear()
            this._draw()
            this.drawBottomHud()
            this._move()
            this._checkIfWin()
            this._checkBullets()
            this._addAsteroid()
            this._addLive()
            this._checkEnemies()
            this._checkAsteroids()
            this._checkLives()
            this._clearAsteroids()
            this._clearLive()
            this._checkIfEmpty()
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
        this._asteroids.push(new Asteroid(this._ctx, this.asteroidsVY))
    }

    _clearLive() {
        this._lives = this._lives.filter(a => a.isVisible())
    }

    _addLive() {
        if (this._tick % 2000) return
        this._lives.push(new Live(this._ctx))
        console.log(this._tick)
    }

    _clear() {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height)
    }

    _draw() {
        this._bg.draw()
        this._lives.forEach(live => live.draw())
        this._asteroids.forEach(asteroid => asteroid.draw())
        this._ship.draw()
        this._enemies.forEach(enemy => {enemy.draw()})
        //this._enemies.draw()
        this._bullet.draw()
    }

    _move() {
        this._bg.move()
        this._lives.forEach(live => live.move())
        this._asteroids.forEach(asteroid => asteroid.move())
        //this._enemies.forEach(enemy => {enemy.move()})
        //this._enemies.move()
        this._ship.move()
        this._bullet.move()
    }

    _checkAsteroids() {
        const ship = this._ship 
        this._asteroids.forEach((asteroid, i) => {
            const astX = asteroid.x < ((ship.x - 15) + (ship.w - 5)) && ((asteroid.x - 15) + (asteroid.w - 5)) > ship.x;
            const astY = ((asteroid.y - 5) + (asteroid.h - 20)) > ship.y && asteroid.y < ((ship.y -15) + (ship.h - 15));
            if (astX && astY) {
                this._audioCrash.play()
                this.lives -= 1  
                this._asteroids.splice(i, 1)
                if (this.lives < 0) {
                this._gameOver()
                }
            }
        })
    }

    _checkLives() {
        const ship = this._ship 
        this._lives.forEach((live, i) => {
            const astX = live.x < ((ship.x - 15) + (ship.w - 5)) && ((live.x - 15) + (live.w - 5)) > ship.x;
            const astY = ((live.y - 5) + (live.h - 20)) > ship.y && live.y < ((ship.y -15) + (ship.h - 15));
            if (astX && astY) {
                this._audioCrash.play()
                this.lives += 1  
                this._lives.splice(i, 1)
            }
        })
    }

    _checkBullets() {
        const missile = this._ship.weapon.bullets
        this._asteroids.forEach((asteroid, a) => {
            missile.forEach(missil => {
            const astX = asteroid.x < ((missil.x) + (missil.w)) && ((asteroid.x - 15) + (asteroid.w - 5)) > missil.x;
            const astY = ((asteroid.y - 5) + (asteroid.h - 5)) > missil.y && asteroid.y < ((missil.y - 5) + (missil.h - 5));
            if (astX && astY) {
                this._audioCrashAst.play()
                missile.splice(missil)
                this._asteroids = this._asteroids.filter(el => el !== asteroid)
                this.score += 5
            }
          })
        })
    }

    _checkEnemies() {
        const missile = this._ship.weapon.bullets
        this._enemies.forEach((enemy, a) => {
            missile.forEach((missil, b) => {
            const astX = enemy.x < ((missil.x) + (missil.w)) && ((enemy.x - 15) + (enemy.w - 5)) > missil.x;
            const astY = ((enemy.y - 5) + (enemy.h - 5)) > missil.y && enemy.y < ((missil.y - 5) + (missil.h - 5));
                if (astX && astY) {
                    this._audioCrashEnemy.play()
                    missile.splice(b, 1)
                    this.score += 300
                    this._enemies.splice(a, 1)
                }
            })
        })
    }

    _checkIfEmpty() {
        if (this._enemies.length === 0) {
            this._enemies = ENEMIES_COORDINATES.map(enemy => {
                return new Enemy(ctx, enemy.x, enemy.y)
            }) 
            this.asteroidsVY += 3
        }
    }

    _checkIfWin() {
        if(this.score >= 100000) {
            this._gameWin()
        }
    }

    _gameOver() {
        this._audio.pause()
        this._gameOverAudio.play()
        clearInterval(this._intervalId)
        this._ctx.font = "40px Comic Sans MS";
        this._ctx.textAlign = "center";
        this._ctx.fillStyle = "red"
        this._ctx.fillText(
            "GAME OVER",
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2
        )
        this._ctx.fillText(
            "Restart in 10 seconds",
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2 + 50,
        )
        setTimeout(() => {
            window.location.reload()
        }, 10000);
    }

    _gameWin() {
        clearInterval(this._intervalId)

        this._ctx.font = "40px Comic Sans MS";
        this._ctx.textAlign = "center";
        this._ctx.fillStyle = "green"
        this._ctx.fillText(
            "YOU WIN!",
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2
        )
    }

    drawBottomHud() {
        this._ctx.fillStyle = '#FFF';
        this._ctx.fillRect(0, CANVAS_HEIGHT - 25, CANVAS_WIDTH, 2);
        this._ctx.fillText('Pandora B-12', CANVAS_WIDTH - 65, CANVAS_HEIGHT - 7.5);
        this._ctx.fillText('Lives: ' + this.lives, CANVAS_WIDTH - 500, CANVAS_HEIGHT - 7.5);
        this._ctx.fillText('SCORE: ' + this.score, CANVAS_WIDTH/2 - 20, 20);
      }
      
}