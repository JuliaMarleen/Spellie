/// <reference path="gameobject.ts" /> 
 // ref typen en dan tab, control spatie dan gaat hij zoeken naar map

class Paddle extends GameObject {
    //private y: number -> staat al in parent
    //private speedY : number -> staat al in parent

    private downkey: number
    private upkey: number

    // private downSpeed: number = 0
    // private upSpeed: number = 0

    constructor(x : number, y : number, upkey : number, downkey : number) {
        super(x, y, 0, "paddle") // refereert naar de class die boven jou zit, geeft de x en y van hier door naar gameobjects

        //this.div = document.createElement("paddle") -> parent
        //document.body.appendChild(this.div) -> parent

        this.upkey = upkey
        this.downkey = downkey

        //this.x = 0 -> dubbelop
        //this.y = 200 -> dubbelop

        //this.speedY = 8 -> niet nodig, moet alleen bewegen via toets

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.speedY = -5
                break
            case this.downkey:
                this.speedY = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.speedY = 0
                break
            case this.downkey:
                this.speedY = 0
                break
        }
    }

    // public move(){
    //     if (this.y > window.innerHeight){
    //     this.speedY = -1
    //     }
    // }

    // //handelen we in de parent
    //  public move() : void {
    //     this.y += this.speedY
    //     // this.y += this.speedX
    //     this.draw()
    // }

    public update() {
        // check of de paddle binnen beeld blijft
        if (this.y > window.innerHeight - 100){ //this.y = newY   //newY > 0 && newY + 100 
        this.y = window.innerHeight - 100;
        }
        if (this.y < 0 ){
        this.y = 1
        }

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}