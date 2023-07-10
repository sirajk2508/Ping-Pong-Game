// Update Loop

import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreEle = document.getElementById("player-score")
const computerScoreEle = document.getElementById("computer-score")

let lasttime;
function update(time) {
    if(lasttime != null) {
        const delta = time - lasttime;
        // Update code
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
        if(isLose())
            handleLose()
    }
    lasttime = time;
    window.requestAnimationFrame(update);
}

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if(rect.right >= window.innerWidth) {
        playerScoreEle.textContent = parseInt(playerScoreEle.textContent) + 1
    } else {
        computerScoreEle.textContent = parseInt(computerScoreEle.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update);