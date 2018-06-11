class PlayScreen {

    game:Game
    // private ball:Ball
    private balls:Array<Ball>;
    private paddle: Paddle
    private paddle2:Paddle
    public score:number
    private scoreElement : HTMLElement
    
        constructor(g:Game) {
            this.game = g
            this.score = 1
            this.scoreElement = document.createElement('score')
            document.body.appendChild(this.scoreElement)
            this.scoreElement.innerHTML = `Score : 0` //${this.score}

            // this.ball = new Ball(100, 100)

            this.balls = new Array;

            for (let i : number = 0; i < 100; i++)
            {
            this.balls.push(new Ball(Math.random()/ 1.5 * window.innerWidth + 200, Math.random()/1.3 * window.innerHeight+50))
            }

            this.paddle = new Paddle(0, window.innerHeight / 2, 87, 83)
            this.paddle2 = new Paddle(window.innerWidth -20, window.innerHeight/2, 38, 40)
        }

        checkCollision(a: ClientRect, b: ClientRect) {
            return (a.left <= b.right &&
                b.left <= a.right &&
                a.top <= b.bottom &&
                b.top <= a.bottom)
        }
    
    public update(): void {

        //this.ball.move()
        //this.ball.update()
        this.paddle.move()
        this.paddle2.move()
        this.paddle.update()
        this.paddle2.update()

        let paddleRect = this.paddle.getRectangle()
        let paddle2Rect = this.paddle2.getRectangle()

        for(let b of this.balls){

            let ballRect = b.getFutureRectangle();

            if(this.checkCollision(paddleRect, ballRect) || this.checkCollision(paddle2Rect, ballRect)){
                b.bounce()
                this.scoreElement.innerHTML = `Score : ${this.score++}`
             } else {
                b.update() 
             } 
            b.update()
        }
        this.detectGameover()
    }

    private detectGameover(){
        if (this.balls.length < 2){
            this.game.showGameScreen()
        }else{
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                console.log(ball);
                if (ball.x + 40 > window.innerWidth || ball.x < 0) {
                    // verwijder het object tijdens de loop
                    ball.removeMe()
                    this.balls.splice(i,1)
                }
            }
        }
    }
}