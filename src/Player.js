const width = parseFloat($('#canvas').css('width'))
const height = parseFloat($('#canvas').css('height'))

const playerWidth = parseFloat($('#player').css('width'))
const playerHeight = parseFloat($('#player').css('height'))
const playerTop = parseFloat($('#player-container').css('top'))
const plaerLeft = parseFloat($('#player-container').css('left'))


class Player {
    constructor() {
        this.x = (width / 2 - playerWidth / 2)
        this.y = (height - playerHeight)
        this.speed = 4
        this.life = 100
        this.isCollided = false
        this.addLife()
    }

    addLife() {
        let markup = '<div class="life" id="player-life"></div>'
        $('#player-container').append(markup)
    }

    updateLife() {
        $('#player-life').remove()
        this.addLife()
    }

    move() {
        $('#player-container').css('left', this.x + 'px')
        $('#player-container').css('top', this.y + 'px')
    }

    collide(anime) {
        if (Math.floor(this.y <= Math.floor(anime.y) + 7) &&
            Math.floor(this.y <= Math.floor(anime.y) + 88) &&
            Math.floor(this.x + playerWidth) >= Math.floor(anime.x) &&
            Math.floor(this.x) <= Math.floor(anime.x) + anime.width) {
            this.isCollided = true
        }
    }

    reduceLife() {
        this.life -= 20;
        $('#player-life').css('width', this.life + '%')
        if (this.life <= 30) {
            $('#player-life').css('backgroundColor', '#ff0000')
        } else if (this.life <= 60) {
            $('#player-life').css('backgroundColor', '#fcff61')
            $('#player-life').css('boxShadow', '0 0 10px #ff0000, 0 0 5px #fcff61')
        } else {
            $('#player-life').css('backgroundColor', 'rgb(123, 255, 47)')
            $('#player-life').css('boxShadow', '0 0 5px rgb(193, 255, 47), 0 0 2px #fcff61')
        }
    }
}