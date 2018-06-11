"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y, speedY, object) {
        var _this = this;
        this.div = document.createElement(object);
        document.body.appendChild(this.div);
        this.div.addEventListener('click', function () { return _this.div.remove(); });
        this.x = x;
        this.y = y;
        this.speedY = speedY;
    }
    GameObject.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    GameObject.prototype.move = function () {
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y) {
        var _this = _super.call(this, x, y, 1, "ball") || this;
        _this.speedX = 1;
        _this.update();
        return _this;
    }
    Ball.prototype.getFutureRectangle = function () {
        var rect = this.div.getBoundingClientRect();
        rect.x += this.speedX;
        return rect;
    };
    Ball.prototype.bounce = function () {
        this.speedX *= -1;
    };
    Ball.prototype.update = function () {
        if (this.y + 40 > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Ball.prototype.removeMe = function () {
        this.div.remove();
    };
    return Ball;
}(GameObject));
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(x, y, upkey, downkey) {
        var _this = _super.call(this, x, y, 0, "paddle") || this;
        _this.upkey = upkey;
        _this.downkey = downkey;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.speedY = -5;
                break;
            case this.downkey:
                this.speedY = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.speedY = 0;
                break;
            case this.downkey:
                this.speedY = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        if (this.y > window.innerHeight - 100) {
            this.y = window.innerHeight - 100;
        }
        if (this.y < 0) {
            this.y = 1;
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}(GameObject));
var Game = (function () {
    function Game() {
        this.screen = new StartScreen(this);
        this.backgroundElement = document.createElement('background');
        this.gameLoop();
    }
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        document.body.appendChild(this.backgroundElement);
        this.screen = new PlayScreen(this);
    };
    Game.prototype.showGameScreen = function () {
        document.body.innerHTML = "";
        document.body.appendChild(this.backgroundElement);
        this.screen = new GameOverScreen(this.screen, this);
    };
    Game.prototype.startAgain = function () {
        document.body.innerHTML = "";
        document.body.appendChild(this.backgroundElement);
        this.screen = new StartScreen(this);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOverScreen = (function () {
    function GameOverScreen(p, g) {
        this.game = g;
        this.playScreen = p;
        this.div = document.createElement("endgame");
        document.body.appendChild(this.div);
        this.div.innerHTML = "GAME OVER";
        this.scoreElement = document.createElement('score');
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : " + (this.playScreen.score - 1);
        this.button = document.createElement("button");
        document.body.appendChild(this.button);
        this.button.innerHTML = "START AGAIN";
    }
    GameOverScreen.prototype.update = function () {
        var _this = this;
        this.button.addEventListener("click", function () { return _this.buttonClicked(); });
    };
    GameOverScreen.prototype.buttonClicked = function () {
        this.game.startAgain();
    };
    return GameOverScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.game = g;
        this.score = 1;
        this.scoreElement = document.createElement('score');
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score : 0";
        this.balls = new Array;
        for (var i = 0; i < 100; i++) {
            this.balls.push(new Ball(Math.random() / 1.5 * window.innerWidth + 200, Math.random() / 1.3 * window.innerHeight + 50));
        }
        this.paddle = new Paddle(0, window.innerHeight / 2, 87, 83);
        this.paddle2 = new Paddle(window.innerWidth - 20, window.innerHeight / 2, 38, 40);
    }
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    PlayScreen.prototype.update = function () {
        this.paddle.move();
        this.paddle2.move();
        this.paddle.update();
        this.paddle2.update();
        var paddleRect = this.paddle.getRectangle();
        var paddle2Rect = this.paddle2.getRectangle();
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var b = _a[_i];
            var ballRect = b.getFutureRectangle();
            if (this.checkCollision(paddleRect, ballRect) || this.checkCollision(paddle2Rect, ballRect)) {
                b.bounce();
                this.scoreElement.innerHTML = "Score : " + this.score++;
            }
            else {
                b.update();
            }
            b.update();
        }
        this.detectGameover();
    };
    PlayScreen.prototype.detectGameover = function () {
        if (this.balls.length < 2) {
            this.game.showGameScreen();
        }
        else {
            for (var i = 0; i < this.balls.length; i++) {
                var ball = this.balls[i];
                console.log(ball);
                if (ball.x + 40 > window.innerWidth || ball.x < 0) {
                    ball.removeMe();
                    this.balls.splice(i, 1);
                }
            }
        }
    };
    return PlayScreen;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.innerHTML = "START THE GAME";
    }
    StartScreen.prototype.update = function () {
        var _this = this;
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map