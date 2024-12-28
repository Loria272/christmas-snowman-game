// game.js
let timer;
let score = 0;
let timeLeft = 60;
let gameInterval;
let isGameActive = false;  // 控制游戏状态

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', restartGame);

function startGame() {
    if (isGameActive) return;  // 防止多次点击

    isGameActive = true;
    score = 0;
    timeLeft = 60;
    document.getElementById('score-count').textContent = score;
    document.getElementById('time-left').textContent = timeLeft;
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('start-btn').classList.add('hidden');
    
    // 每秒钟生成雪人并减少时间
    gameInterval = setInterval(function() {
        generateSnowman(); // 每秒生成一个雪人
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

function generateSnowman() {
    const snowman = document.createElement('div');
    snowman.classList.add('snowman');
    
    const gameArea = document.getElementById('game-area');
    const maxWidth = gameArea.offsetWidth - 50;  // 留出50px的空间避免雪人超出边界
    const maxHeight = gameArea.offsetHeight - 50;  // 留出50px的空间避免雪人超出边界
    
    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;
    
    snowman.style.left = randomX + 'px';
    snowman.style.top = randomY + 'px';
    
    snowman.addEventListener('click', function() {
        score++;
        document.getElementById('score-count').textContent = score;
        snowman.remove();  // 点击后雪人消失
    });
    
    gameArea.appendChild(snowman);
    
    // 雪人出现3秒后消失
    setTimeout(function() {
        snowman.remove();
    }, 3000);
}

function endGame() {
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('start-btn').classList.remove('hidden');
    isGameActive = false;
}

function restartGame() {
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('start-btn').classList.remove('hidden');
    score = 0;  // 重置分数
    document.getElementById('score-count').textContent = score;
    document.getElementById('time-left').textContent = 60;  // 重置时间
    timeLeft = 60;
}
