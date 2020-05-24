class Levles {
    constructor() {
        this.levels = 7
        this.level = 0
        this.addLevle()
        this.animesToPassLevel = 10
        this.isWon = false
    }

    addLevle() {
        for (let i = 0; i < this.levels; i++) {
            if (i < this.level) {
                let markup = '<img class="level level-on" src="./img/star.png" alt="level-star">'
                $('#levels-container').append(markup)
            } else {
                let markup = '<img class="level level-off" src="./img/star.png" alt="level-star">'
                $('#levels-container').append(markup)

            }
        }
    }

    setLevel() {
        if (this.isWon) {
            this.level += 1
            $('.level').remove()
            this.addLevle()
        }
    }
}