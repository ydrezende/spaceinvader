class Polit {
    constructor(id, x, y) {
        this.id = id
        this.x = x
        this.y = y
        this.speed = 10
        this.isMissed = false
    }

    makePolit() {
        let markup = '<div id="polit' + (this.id) + '" class="polit"></div>'
        $('#canvas').prepend(markup)
        $('#polit' + this.id).css('left', this.x + 'px')
        $('#polit' + this.id).css('top', this.y + 'px')

    }

    move() {
        if (this.y >= 3) {
            this.y -= this.speed
            $('#polit' + this.id).css('top', this.y + 'px')
        } else {
            $('#polit' + this.id).remove()
            this.isMissed = true
        }
    }

    updateId(newId) {
        $('#polit' + this.id).attr('id', 'polit' + newId)
        this.id = newId
    }

}