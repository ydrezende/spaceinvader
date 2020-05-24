const animeHeight = parseFloat($('#player').css('height'))
class Anime {
    constructor(id) {
        this.id = id
        this.x = Math.floor(Math.random() * Math.floor(width - 80))
        this.y = 0
        this.width = 80
        this.height = 80 + parseInt($('.animeLife').css('height'))
        this.shipType = 0
        this.speed = 1.5
        this.isMissed = false
        this.isInjured = false
        this.isKilled = false
        this.life = 0
        this.polits = []
        this.politId = this.polits.length + '_' + Math.random().toString(36).substr(2, 9);
        this.timeToFire = 0 + Math.floor(Math.random() * 1)
    }

    makeAnime() {
        let shipImgNum = 1 + Math.floor(Math.random() * Math.floor(4))
        this.shipType = shipImgNum
        let markup = '<div id="anime' + this.id +
            '" class="anime">' +
            '<div class="animeLife" id="animeLife' + this.id + '"></div>' +
            '<img id="anime' + this.id +
            '"src="./img/anime-ship' + shipImgNum +
            '.png" alt="anime-ship" width="80" height="80">' +
            '</div>'

        $('#canvas').prepend(markup)
        $('#anime' + this.id).css('left', this.x + 'px')
        $('#anime' + this.id).css('top', this.y + 'px')
        this.width = parseFloat($('#anime' + this.id).css('width'))
        this.height = parseFloat($('#anime' + this.id).css('height'))

        this.setLife()
    }

    setLife() {
        switch (this.shipType) {
            case 1:
                this.life = 20
                break
            case 2:
                this.life = 20
                break
            case 3:
                this.life = 30
                break
            case 4:
                this.life = 40
                break
            default:
                break
        }
        $('#animeLife' + this.id).css('width', this.life + 30 + '%')
    }

    move() {
        this.y += this.speed
        $('#anime' + this.id).css('top', this.y + 'px')

        this.missed()
    }

    missed() {
        if (Math.floor(this.y) + this.height >= Math.floor(height)) {
            $('#anime' + this.id).remove()
            this.isMissed = true
        }
    }

    reduceLife() {
        this.life -= 10;
        $('#animeLife' + this.id).css('width', this.life + '%')
        $('#animeLife' + this.id).css('backgroundColor', 'red')
        this.isInjured = false
    }

    hit(politX, politY) {
        if (Math.floor(politY) <= Math.floor(this.y) + 7 &&
            Math.floor(politY) <= Math.floor(politY) + 88 &&
            Math.floor(politX) >= Math.floor(this.x) &&
            Math.floor(politX) <= Math.floor(this.x) + this.width) {
            if (this.life === 10) {
                this.isKilled = true
            } else {
                this.isInjured = true
            }
        }
    }

    fire() {
        this.timeToFire += 1
        if (this.timeToFire % 100 === 0) {
            this.politId = this.polits.length + '_' + Math.random().toString(36).substr(2, 9);
            this.polits[this.politId] = new AnimePolits(this.politId, this.x + this.width / 2, this.y + this.height)
            this.polits[this.politId].makePoilt();
            console.log(this.polits[this.politId])
        }
        this.movePolits()
    }

    movePolits() {
        this.polits.map(polit => {
            polit.move()
            if (polit.isMissed) {
                this.polits.splice(polit.id, 1)
                this.updatePolitsList()
            }
        })
    }

    updatePolitsList() {
        this.polits.forEach((polit, i) => {
            polit.updateId(i)
        })
        this.politId = this.polits.length + '_' + Math.random().toString(36).substr(2, 9)
    }

    updateId(newId) {
        $('#anime' + this.id).attr('id', 'anime' + newId)
        $('#animeLife' + this.id).attr('id', 'animeLife' + newId)
        this.id = newId
    }
}