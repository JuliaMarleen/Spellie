class StartScreen {

    private div: HTMLElement
    game : Game

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.innerHTML = "START THE GAME"
    }

    public update(): void {
        this.div.addEventListener("click", ()=>this.splashClicked())
    }

    private splashClicked() {
        // TODO: geef door aan 'game' dat het spel gestart moet worden
        this.game.showPlayScreen()
    }
}