import { Game } from 'breakout_wasm'

const GameScreen = document.getElementById('game-screen');

const ctx = GameScreen.getContext('2d');

const ScreenWidth = 1280;
const ScreenHeight = 720;

GameScreen.width = ScreenWidth;
GameScreen.height = ScreenHeight;

const game = Game.new(ScreenWidth, ScreenHeight);

document.addEventListener('keydown', e => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        game.set_rpressed(true);
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        game.set_lpressed(true);
    }
}, false);

document.addEventListener('keyup', e => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        game.set_rpressed(false);
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        game.set_lpressed(false);
    }
}, false);

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        game.set_play(true);
        window.requestAnimationFrame(gameLoop);
        startTime = performance.now();
    }
}, false);

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(game.ball_x(), game.ball_y(), game.ball_radius(), 0, Math.PI * 2);
    ctx.fillStyle = game.ball_color();
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(game.paddle_x(), game.paddle_y(), game.paddle_width(), game.paddle_height());
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

const draw = () => {
    ctx.clearRect(0, 0, ScreenWidth, ScreenHeight);
    drawBall();
    drawPaddle();
}

let startTime = 0;
const gameLoop = () => {
    if (game.get_lives() <= 0) {
        alert("Game lost!");
    }
    let currentTime = performance.now();
    let deltaTime = currentTime - startTime;
    startTime = currentTime;
    game.update(deltaTime);
    console.log(game.ball_dx())
    draw();
    if (game.get_play()) {
        window.requestAnimationFrame(gameLoop);
    }
}
draw();
