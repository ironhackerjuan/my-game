class Game {
    constructor(ctx) {
        this._ctx = ctx;
        this._intervalId = null;
        this._tick = 0;
        this.score = 0
        this.lives = 3

        this._bg = new Background(ctx)
        this._asteroids = []
        this._ship = new Ship(ctx)
        this._bullet = new Bullet(ctx)
        this._enemies = ENEMIES_COORDINATES.map(enemy => {
            return new Enemy(ctx, enemy.x, enemy.y)
        })

    }

    start() {
        this._intervalId = setInterval(() => {
            this._clear()
            this._draw()
            this.drawBottomHud()
            this._move()
            this._checkBullets()
            this._addAsteroid()
            this._checkEnemies()
            this._checkAsteroids()
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
        this._enemies.forEach(enemy => {enemy.draw()})
        //this._enemies.draw()
        this._bullet.draw()
    }

    _move() {
        this._bg.move()
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
            const astY = ((asteroid.y - 5) + (asteroid.h - 5)) > ship.y && asteroid.y < ((ship.y -15) + (ship.h - 15));
            if (astX && astY) {
                this.lives -= 1  
                this._asteroids.splice(i, 1)
                console.log(this.lives)
                if (this.lives < 0) {
                this._gameOver()
                }
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
                missile.splice(missil)
                this._asteroids.splice(a, 1)
                this.score += 5
                console.log(this.score)
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
                    missile.splice(b, 1)
                    this.score += 300
                    this._enemies.live -= 500
                    this._enemies.splice(a, 1)

                    // if (this._enemies.live <= 0) {
                    //     this._enemies.splice(a, 1)
                    // }
                    console.log(this._enemies.live)
                }
                if (this._enemies.live <= 0) {
                    this._gameWin()
                }
            })
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
        this._ctx.fillText('My Game', CANVAS_WIDTH - 50, CANVAS_HEIGHT - 7.5);
        this._ctx.fillText('Lives: ' + this.lives, CANVAS_WIDTH - 500, CANVAS_HEIGHT - 7.5);
        this._ctx.fillText('SCORE: ' + this.score, CANVAS_WIDTH/2 - 20, 20);
      }

    drawStartScreen() {
        fillCenteredText("BIL Invaders", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#702f8a', 36);
        fillBlinkingText("Press enter to play !", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 500, '#FFFFFF', 36);
        fillCenteredText("Then on spacebar to shoot", CANVAS_WIDTH/2, CANVAS_HEIGHT/1.5, '#05c3de', 36);
      }
      
}