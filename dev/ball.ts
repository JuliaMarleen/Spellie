/// <reference path="gameobject.ts" /> 

 // ref typen en dan tab, control spatie dan gaat hij zoeken naar map

class Ball extends GameObject {
    
    //private div: HTMLElement;
    //private x: number
    //private y: number
    private speedX : number
    //private speedY : number
    
    constructor(x : number, y : number) {
        
        super(x, y, 1, "ball") // refereert naar de class die boven jou zit, geeft de x en y van hier door naar gameobjects

        // this.div = document.createElement("ball")
        // document.body.appendChild(this.div)

        //this.x = 0 //Math.random() * window.innerWidth
        //this.y = innerHeight / 2 //Math.random() * window.innerHeight
        
        //this.x = 0
        //this.y = 200

        this.speedX = 1
        //this.speedY = 8
        this.update()

    }

    public getFutureRectangle(){
        let rect = this.div.getBoundingClientRect()
        rect.x += this.speedX
        return rect 
    }

    public bounce() {
        this.speedX *= -1 // -1.1 als sneller moet gaan
    }

    public update(): void {

        // Bounce ball
        if( this.y + 40 > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }

        // Ball update loop
        this.x += this.speedX
        this.y += this.speedY
                        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }

    public removeMe() {
        this.div.remove()
    }

    //public move() : void {
        //super.move()
        // this.y += this.speedX    Dit staat in GameObject
        // this.draw()
      //  this.checkCollision()
    //}

    // private checkCollision():void{
    //     //check collision
    //     super.move()
    // }

    //to parent
    /*
    public update() : void {
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }*/
}