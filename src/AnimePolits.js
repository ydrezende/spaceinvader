class AnimePolits {
    constructor(id, x, y) {
        this.id = id
        this.x = x
        this.y = y
        this.speed = 1.6
        this.isMissed = false
    }

    makePoilt() {
        let markup = '<div id="anime-polit' + (this.id) + '" class="polit"></div>'
        $('#canvas').prepend(markup)
        $('#anime-polit' + this.id).css('left', this.x + 'px')
        $('#anime-polit' + this.id).css('top', this.y + 'px')
    }

    move() {
        if (this.y < height) {
            this.y += this.speed
            console.log(this.y)
            $('#anime-polit' + this.id).css('top', this.y + 'px')
        } else {
            $('#anime-polit' + this.id).remove()
            this.isMissed = true
        }

    }

    updateId(newId) {
        $('#anime-polit' + this.id).attr('id', 'anime-polit' + newId)
        this.id = newId
    }
}