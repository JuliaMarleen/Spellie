class GameOverScreen {

    private div: HTMLElement
    private game : Game
    playScreen:PlayScreen
    private button: HTMLElement
    private scoreElement : HTMLElement

    constructor(p:PlayScreen, g:Game) {
        this.game = g
        this.playScreen = p
        this.div = document.createElement("endgame")
        document.body.appendChild(this.div)
        this.div.innerHTML = "GAME OVER"
        // score weergeven
        this.scoreElement = document.createElement('score')
        document.body.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = `Score : ${this.playScreen.score - 1}`
        // knop terug naar startscherm
        this.button = document.createElement("button")
        document.body.appendChild(this.button)
        this.button.innerHTML = "START AGAIN"
    }

    public update(): void {
        this.button.addEventListener("click", ()=>this.buttonClicked())
    }

    private buttonClicked() {
        // TODO: geef door aan 'game' dat het spel gestart moet worden
        this.game.startAgain()
    }
}