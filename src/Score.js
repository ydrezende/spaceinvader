class Score {
    constructor() {
        this.scoreCount = 0
        this.printScore()
    }

    printScore() {
        $('#score').text(this.scoreCount);
    }

    setScore(animeType) {
        let newScore = animeType * 10
        this.scoreCount += newScore
        this.printScore()
    }
}