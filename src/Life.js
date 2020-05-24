class Life {
    constructor(life) {
        this.lifeTracker = life
        this.showLife()
    }

    showLife() {
        $('#life-tracker').css('width', this.lifeTracker + '%')
    }

    reduceLife() {
        let newLife = this.lifeTracker - 5
        this.lifeTracker = newLife

        $('#life-tracker').css('width', this.lifeTracker + '%')
        if (this.lifeTracker <= 30) {
            $('#life-tracker').css('backgroundImage', 'none')
            $('#life-tracker').css('backgroundColor', '#ff0000')

        } else if (this.lifeTracker <= 50) {


            $('#life-tracker').css('backgroundImage', 'none')
            $('#life-tracker').css('backgroundColor', '#fcff61')
            $('#life-tracker').css('boxShadow', '0 0 2px rgb(248, 69, 69), 0 0 2px #9bff61')
        } else {

            $('#life-tracker').css('backgroundImage', 'linear-gradient(' +
                'rgb(104, 255, 17),' +
                'rgb(190, 241, 160),' +
                'rgb(131, 255, 60)))')
            $('#life-tracker').css('boxShadow', '0 0 2px rgb(248, 69, 69), 0 0 2px #9bff61')
        }
        this.showLife()
    }

    increaseLife(amount) {
        let newLife = amount * 10
        this.lifeTracker += newLife

        $('#life-tracker').css('width', this.lifeTracker + '%')
        if (this.lifeTracker <= 30) {

            $('#life-tracker').css('backgroundImage', 'none')
            $('#life-tracker').css('backgroundColor', '#ff0000')
        } else if (this.lifeTracker <= 50) {

            $('#life-tracker').css('backgroundImage', 'none')
            $('#life-tracker').css('backgroundColor', '#fcff61')
            $('#life-tracker').css('boxShadow', '0 0 2px rgb(248, 69, 69), 0 0 2px #9bff61')

        } else {

            $('#life-tracker').css('backgroundImage', 'linear-gradient(' +
                'rgb(104, 255, 17),' +
                'rgb(190, 241, 160),' +
                'rgb(131, 255, 60)))')
            $('#life-tracker').css('boxShadow', '0 0 2px rgb(248, 69, 69), 0 0 2px #9bff61')
        }
        this.showLife()
    }


}