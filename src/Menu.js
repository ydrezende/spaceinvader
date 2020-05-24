class Menu {
    constructor() {
        this.isShown = false
        this.score = 0
        this.life = 0
        this.id
        this.timesSold = 0
    }

    show(menuType, score, life, death, animeanimesDistroyed, level) {
        if (menuType === 'gameOver') {
            $('#menu').show('slow', () => {
                this.setGameOver()
                $('.menu-item').fadeIn(2000)
            })
        } else if (menuType === 'levelOver') {
            $('#menu').show('slow', () => {
                this.setLevelOver(score, life, death, animeanimesDistroyed, level)
                $('.menu-item').fadeIn(2000)
            })
        }
        this.isShown = true

    }

    setGameOver() {
        let markup = '<div id="gameover" class="menu-item">😕Game Over...</div>' +
            '<div id="tryagin" class="menu-item">💪Try Again!</div>' +
            '<a href="#"><img  class="menu-btn menu-item" id="replay-btn" src="./img/replay-icon2.png"></a>'
        $('#menu').append(markup)
        $('#replay-btn').on('click', () => {
            location.reload()
        })
    }

    setLevelOver(score, life, death, animeanimesDistroyed, level) {
        this.life = life
        this.calculateScore(animeanimesDistroyed)
        let markup = '<div id="level-over-header" class="menu-item">😀Good Job</div>' +

            '<div id="level-over-body" class="menu-item">' +

            '<dive id="level-over-body-left" class="body-item">' +

            '<div id="diamond-scoer-contianer" class="body-left-item" ><img src="./img/blue-diamond.png" alt="score-diamond">' + this.score +
            '</div>' +
            '<div id="life-score-container" class="body-left-item"><img src="./img/life-2.png" alt="life-img">' + this.life + '%' +
            '</div>' +

            '<div class="body-left-item">' +
            '<img id="sell-life" src="./img/life.png">' + '<img style="width: 12%; margin-right:0;" src="./img/life-2.png">10 =' +
            '<img style="width: 12%;" src="./img/blue-diamond.png">100' +
            '</div>' +

            '</dive>' +

            '<dive id="level-over-body-right" class="body-item">' +

            '<div id="distroied" class="body-right-item">' +
            '</div>' +
            '<div class="body-right-item">' + '<img src="./img/ship.png" alt="player-ship" width="80" height="80" />-' +
            death +
            '</div>' +

            '</dive>' +

            '</div>' +

            '<div id="level-over-levels" class="menu-item"></div>' +

            '<a href="#"><img class="menu-btn menu-item" id="play-btn" src="./img/play-icon.png"></a>'

        $('#menu').append(markup)
        this.printDeadAnimes(animeanimesDistroyed)
        this.printLevels(level)
        this.sellLife(life)
    }

    printLevels(level) {
        for (let i = 0; i < 7; i++) {
            if (i < level) {
                let markup = '<img class="level level-on" src="./img/star.png" alt="level-star">'
                $('#level-over-levels').append(markup)
            } else {
                let markup = '<img class="level level-off" src="./img/star.png" alt="level-star">'
                $('#level-over-levels').append(markup)

            }
        }
    }

    update_Score_Life() {
        $('#diamond-scoer-contianer').remove()
        $('#life-score-container').remove()
        let markup = ''
        markup += '<div id="diamond-scoer-contianer" class="body-left-item" ><img src="./img/blue-diamond.png" alt="score-diamond">' + this.score +
            '</div>' +
            '<div id="life-score-container" class="body-left-item"><img src="./img/life-2.png" alt="life-img">' + this.life + '%' +
            '</div>'
        $('#level-over-body-left').prepend(markup)

    }

    calculateScore(animeanimesDistroyed) {
        let type1 = 0
        let type2 = 0
        let type3 = 0
        let type4 = 0
        for (let i = 0; i < animeanimesDistroyed.length; i++) {
            switch (animeanimesDistroyed[i]) {
                case 1:
                    type1 += 1
                    this.score += 10
                    break
                case 2:
                    type2 += 1
                    this.score += (2 * 10)
                    break
                case 3:
                    type3 += 1
                    this.score += (3 * 10)
                    break
                case 4:
                    type4 += 1
                    this.score += (4 * 10)
                    break
                default:
                    break
            }
        }

    }

    printDeadAnimes(animeanimesDistroyed) {
        let type1 = 0
        let type2 = 0
        let type3 = 0
        let type4 = 0
        for (let i = 0; i < animeanimesDistroyed.length; i++) {
            switch (animeanimesDistroyed[i]) {
                case 1:
                    type1 += 1
                    break
                case 2:
                    type2 += 1
                    break
                case 3:
                    type3 += 1
                    break
                case 4:
                    type4 += 1
                    break
                default:
                    break
            }
        }
        let markup = ''
        let types = [type1, type2, type3, type4]
        for (let i = 0; i < 4; i++) {
            markup += '<img src="./img/anime-ship' + (i + 1) +
                '.png" alt="anime-ship" width="65" height="65">' +
                types[i]
        }
        $('#distroied').append(markup)
    }

    sellLife(life) {
        this.life = life
        if (life <= 90) {
            $('#sell-life').on('click', () => {
                console.log('sell life clicked')
                if (this.score >= 100) {
                    if (this.life <= 90) {
                        this.score -= 100
                        this.life += 10
                        this.timesSold += 1
                    }
                }
                //console.log(this.life, this.score, this.timesSold)
                this.update_Score_Life()

            })


            let times = 0
            this.id = setInterval(() => {
                times++
                setTimeout(() => {
                    $('#sell-life').css('filter', 'drop-shadow(0 4px 5px rgba(0, 255, 98, 0.63))')
                    $('#sell-life').css('bottom', '+=3px')

                }, 200)
                $('#sell-life').css('filter', 'none')
                $('#sell-life').css('bottom', '-=3px')
                if (times === 20) {
                    clearInterval(this.id)
                }
            }, 900)
        }
    }
}