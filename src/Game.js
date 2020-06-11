class Game {
    constructor() {
        this.menu = new Menu()
        this.levels = new Levles();
        this.score = new Score();
        this.player = new Player();
        this.life = new Life(this.player.life);
        this.polits = [];
        this.politId = 0;
        this.animes = [];
        this.animeId = 0;
        this.animesDistroyed = [];
        this.animeFrequency = 50;
        this.time = 1;
        this.playerDeath = 0
        this.isLevelOver = false;
        this.isGameOver = false;
        this.bShooting = false; // Intention to shoot

        document.addEventListener("keydown", K.fn);
        document.addEventListener("keyup", K.fn);
        document.addEventListener("keyup", (e) => {
            //Indicates the Spacebar was released and there is intention to stop shooting
            if(e.code == "Space") this.bShooting = false;
        });
        document.addEventListener("keydown", (e) => {
            //Indicates the Spacebar was pressed and there is intention to start shooting
            if(e.code == "Space") this.bShooting = true;
        });
    }

    handelKeys() {
        let dist =
            (K[38] && (K[37] || K[39])) || (K[40] && (K[37] || K[39])) ? 0.707 : 1;
        dist += this.player.speed;

        this.movePlayer(dist);
        this.movePolits();
    }

    updatePolitsList() {
        this.polits.map((polit, i) => {
            polit.updateId(i);
        });
        this.politId = this.polits.length;
    }

    movePlayer(dist) {
        if (this.player.x <= width - playerWidth && this.player.x >= 3) {
            if (K[39]) this.player.x += dist;
            if (K[37]) this.player.x -= dist;
        } else if (this.player.x <= width - playerWidth) {
            if (K[39]) this.player.x += dist;
        } else if (this.player.x >= 3) {
            if (K[37]) this.player.x -= dist;
        }

        if (this.player.y <= height - playerHeight && this.player.y >= 3) {
            if (K[40]) this.player.y += dist;
            if (K[38]) this.player.y -= dist;
        } else if (this.player.y <= height - playerHeight) {
            if (K[40]) this.player.y += dist;
        } else if (this.player.y >= 3) {
            if (K[38]) this.player.y -= dist;
        }
    }

    movePolits() {
        this.polits.forEach((polit) => {
            polit.move();
        });
        this.hitAnime();
    }

    sendAnime() {
        this.animeId = this.animes.length;
        this.animes[this.animeId] = new Anime(this.animeId);
        this.animes[this.animeId].makeAnime();
        this.animes[this.animeId].speed += this.levels.level / 10
    }

    updateAnimeList() {
        this.animes.map((anime, i) => {
            anime.updateId(i);
        });
        this.animeId = this.animes.length;
    }

    moveAnimes() {
        this.animes.map((anime) => {
            anime.move();
            this.handelCollision(anime);
            //anime.fire()
            if (anime.isMissed) {
                this.player.reduceLife();
                this.life.reduceLife(this.player.life);

                this.animes.splice(anime.id, 1);
                this.updateAnimeList();
            }
        });
    }

    handelCollision(anime) {
        this.player.collide(anime);
        if (this.player.isCollided) {
            this.playSound("anime-hit");

            this.player.reduceLife();
            this.life.reduceLife(this.player.life);

            $("#anime" + anime.id).remove();
            this.animes.splice(anime.id, 1);
            this.updateAnimeList();

            this.player.isCollided = false;
        }
    }

    hitAnime() {
        this.polits.forEach((polit) => {
            if (polit.isMissed) {
                this.polits.splice(polit.id, 1);
                this.updatePolitsList();
            }

            this.animes.forEach((anime) => {
                anime.hit(polit.x, polit.y);

                if (anime.isInjured) {
                    this.polits.splice(polit.id, 1);
                    $("#polit" + polit.id).remove();
                    this.updatePolitsList();

                    anime.reduceLife();
                    anime.isInjured = false;

                } else if (anime.isKilled) {
                    this.playSound("anime-explode-2");

                    this.animesDistroyed.push(anime.shipType)
                    this.handelLevels()
                    //console.log(this.animesDistroyed.length)

                    this.polits.splice(polit.id, 1);
                    $("#polit" + polit.id).remove();
                    this.updatePolitsList();

                    this.handelScore(anime.shipType);

                    this.animes.splice(anime.id, 1);
                    $("#anime" + anime.id).remove();
                    this.updateAnimeList();
                }
            });
        });
    }

    playSound(track) {
        let audio = new Audio("./sounds/" + track + ".mp3");
        audio.volume = 0.3;
        audio.play();
    }

    handelScore(anmieType) {
        this.score.setScore(anmieType);
    }

    handelLevels() {
        if (this.animesDistroyed.length === this.levels.animesToPassLevel) {
            //console.log('next level')
            this.levels.isWon = true
            this.levels.animesToPassLevel += 3
            this.animeFrequency -= 1

            this.levels.setLevel()
            this.levelOver()
        }
    }

    levelOver() {
        this.reset();
        this.isLevelOver = true;
        this.handelManu('levelOver', this.score.scoreCount,
            this.life.lifeTracker,
            this.playerDeath,
            this.animesDistroyed,
            this.levels.level)
        this.goToNextLevel()
    }

    goToNextLevel() {
        setTimeout(() => {
            $('#play-btn').on('click', () => {
                //console.log('next levlelstart')
                this.animesDistroyed = []
                this.score.scoreCount = this.menu.score
                this.score.printScore()

                this.life.increaseLife(this.menu.timesSold)
                this.menu.timesSold = 0;

                $('.menu-item').remove()
                $('#menu').hide('slow', () => {
                    $('#player').show()
                    this.isLevelOver = false
                    this.run()
                })

            })

        }, 1000)
    }

    gameOver() {
        if (this.life.lifeTracker <= 0) {
            this.reset();
            this.isGameOver = true;
            this.handelManu('gameOver')
        } else if (this.player.life <= 0) {
            this.life.reduceLife()
            this.playerDeath += 1
            this.player.life = 100
            this.player.updateLife()
        }
    }

    handelManu(menuType, score, life, death, animeanimesDistroyed, level) {
        this.menu.show(menuType, score, life, death, animeanimesDistroyed, level)
    }

    reset() {
        clearInterval(this.id);
        $('#player').hide()
        this.player.life = 100;
        this.player.updateLife()
        this.player.x = (width / 2 - playerWidth / 2)
        this.player.y = (height - playerHeight)
        this.player.move()

        $(".polit").remove();
        this.animes.map((anime) => {
            $("#anime" + anime.id).remove();
        });
        setTimeout(() => {
            this.polits = [];
            this.animes = [];
        }, 200)

    }

    update() {
        this.handelKeys();
        this.player.move();
        this.time += 1;
        if (this.time % this.animeFrequency === 0 && this.animes.length < 8) {
            this.sendAnime();
        }
        if (this.time % 200 === 0) {
            this.playSound("space");
            this.playSound("space2");
        }
        this.moveAnimes();
        this.gameOver();      
        
        // Checks 8 frames interval to shoot again
        if (this.time % 8 === 0) {
            this.shoot();
        }
    }

    shoot() {
        if (!this.isGameOver && !this.isLevelOver && this.bShooting) {
            this.playSound("laser-gun-5");
            this.politId = this.polits.length;
            this.polits[this.politId] = new Polit(
                this.politId,
                this.player.x + 45,
                this.player.y
            );
            this.polits[this.politId].makePolit(this.politId);
        }
    }

    run() {
        this.id = setInterval(() => this.update(), 20);
    }
}

const K = {
    fn(ev) {
        const k = ev.which;
        if (k >= 37 && k <= 40) {
            ev.preventDefault();
            K[k] = ev.type === "keydown"; // If is arrow
        }
    },
};
