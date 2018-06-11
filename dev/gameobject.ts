class GameObject {

    public x : number
    protected y : number

    protected speedY : number
    protected div : HTMLElement

    constructor(x : number, y : number, speedY: number, object:string){
        // Creates element
        this.div = document.createElement(object)
        document.body.appendChild(this.div)

        this.div.addEventListener('click', () => this.div.remove())

        // Set position
        this.x = x
        this.y = y

        // Set speed
        this.speedY = speedY
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    public move() : void {
        this.y += this.speedY   // Dit staat in GameObject
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`

    }

}