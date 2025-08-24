// Parallel Dimensions - Retro Game
// A split-screen platformer where you control two characters simultaneously

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameState = 'start'; // start, playing, gameOver, victory

        // Game settings
        this.currentLevel = 1;
        this.lives = 3;
        this.gravity = 0.5;
        this.jumpPower = -12;
        this.moveSpeed = 4;

        // Canvas setup
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.worldHeight = this.canvasHeight / 2;

        // Initialize game objects
        this.initPlayers();
        this.initLevels();
        this.initControls();
        this.initUI();

        // Start game loop
        this.gameLoop();
    }

    initPlayers() {
        this.player1 = {
            x: 50,
            y: this.worldHeight - 100,
            width: 16,
            height: 16,
            vx: 0,
            vy: 0,
            onGround: false,
            color: '#00ff00'
        };

        this.player2 = {
            x: 50,
            y: this.worldHeight * 2 - 100,
            width: 16,
            height: 16,
            vx: 0,
            vy: 0,
            onGround: false,
            color: '#ff00ff'
        };
    }

    initLevels() {
        this.levels = [
            // Level 1 - Tutorial
            {
                platforms: [
                    // Top world platforms
                    { x: 0, y: this.worldHeight - 20, width: 800, height: 20, color: '#444' },
                    { x: 200, y: this.worldHeight - 80, width: 100, height: 20, color: '#444' },
                    { x: 400, y: this.worldHeight - 120, width: 100, height: 20, color: '#444' },
                    { x: 600, y: this.worldHeight - 60, width: 100, height: 20, color: '#444' },

                    // Bottom world platforms (different layout)
                    { x: 0, y: this.canvasHeight - 20, width: 800, height: 20, color: '#800080' },
                    { x: 150, y: this.canvasHeight - 100, width: 100, height: 20, color: '#800080' },
                    { x: 350, y: this.canvasHeight - 140, width: 100, height: 20, color: '#800080' },
                    { x: 550, y: this.canvasHeight - 80, width: 100, height: 20, color: '#800080' },
                ],
                obstacles: [
                    // Top world obstacles
                    { x: 300, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },

                    // Bottom world obstacles
                    { x: 250, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                ],
                exit1: {
                    x: 750,
                    y: this.worldHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                },
                exit2: {
                    x: 750,
                    y: this.canvasHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                }
            },

            // Level 2 - More challenging
            {
                platforms: [
                    // Top world
                    { x: 0, y: this.worldHeight - 20, width: 800, height: 20, color: '#444' },
                    { x: 100, y: this.worldHeight - 60, width: 80, height: 20, color: '#444' },
                    { x: 250, y: this.worldHeight - 100, width: 80, height: 20, color: '#444' },
                    { x: 400, y: this.worldHeight - 140, width: 80, height: 20, color: '#444' },
                    { x: 550, y: this.worldHeight - 80, width: 80, height: 20, color: '#444' },
                    { x: 700, y: this.worldHeight - 120, width: 80, height: 20, color: '#444' },

                    // Bottom world
                    { x: 0, y: this.canvasHeight - 20, width: 800, height: 20, color: '#800080' },
                    { x: 150, y: this.canvasHeight - 80, width: 80, height: 20, color: '#800080' },
                    { x: 300, y: this.canvasHeight - 120, width: 80, height: 20, color: '#800080' },
                    { x: 450, y: this.canvasHeight - 60, width: 80, height: 20, color: '#800080' },
                    { x: 600, y: this.canvasHeight - 100, width: 80, height: 20, color: '#800080' },
                ],
                obstacles: [
                    { x: 200, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 500, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 350, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                ],
                exit1: {
                    x: 750,
                    y: this.worldHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                },
                exit2: {
                    x: 750,
                    y: this.canvasHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                }
            },

            // Level 3 - Expert
            {
                platforms: [
                    // Top world
                    { x: 0, y: this.worldHeight - 20, width: 800, height: 20, color: '#444' },
                    { x: 50, y: this.worldHeight - 60, width: 60, height: 20, color: '#444' },
                    { x: 180, y: this.worldHeight - 100, width: 60, height: 20, color: '#444' },
                    { x: 310, y: this.worldHeight - 140, width: 60, height: 20, color: '#444' },
                    { x: 440, y: this.worldHeight - 100, width: 60, height: 20, color: '#444' },
                    { x: 570, y: this.worldHeight - 60, width: 60, height: 20, color: '#444' },
                    { x: 700, y: this.worldHeight - 100, width: 60, height: 20, color: '#444' },

                    // Bottom world
                    { x: 0, y: this.canvasHeight - 20, width: 800, height: 20, color: '#800080' },
                    { x: 120, y: this.canvasHeight - 80, width: 60, height: 20, color: '#800080' },
                    { x: 250, y: this.canvasHeight - 120, width: 60, height: 20, color: '#800080' },
                    { x: 380, y: this.canvasHeight - 60, width: 60, height: 20, color: '#800080' },
                    { x: 510, y: this.canvasHeight - 100, width: 60, height: 20, color: '#800080' },
                    { x: 640, y: this.canvasHeight - 80, width: 60, height: 20, color: '#800080' },
                ],
                obstacles: [
                    { x: 150, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 400, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 650, y: this.worldHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 200, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                    { x: 450, y: this.canvasHeight - 40, width: 20, height: 40, color: '#ff0000' },
                ],
                exit1: {
                    x: 750,
                    y: this.worldHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                },
                exit2: {
                    x: 750,
                    y: this.canvasHeight - 40,
                    width: 30,
                    height: 40,
                    color: '#ffff00'
                }
            }
        ];

        this.currentLevelData = this.levels[this.currentLevel - 1];
    }

    initControls() {
        // Keyboard controls
        this.keys = {};
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Touch controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;

            // Swipe detection
            if (Math.abs(deltaX) > 30) {
                if (deltaX > 0) {
                    this.keys['ArrowRight'] = true;
                    setTimeout(() => this.keys['ArrowRight'] = false, 100);
                } else {
                    this.keys['ArrowLeft'] = true;
                    setTimeout(() => this.keys['ArrowLeft'] = false, 100);
                }
            }

            if (deltaY < -30) {
                this.keys['ArrowUp'] = true;
                setTimeout(() => this.keys['ArrowUp'] = false, 100);
            }
        });
    }

    initUI() {
        // Button event listeners
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });

        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            this.nextLevel();
        });
    }

    startGame() {
        this.gameState = 'playing';
        this.hideAllScreens();
        this.resetLevel();
    }

    restartGame() {
        this.lives = 3;
        this.currentLevel = 1;
        this.currentLevelData = this.levels[this.currentLevel - 1];
        this.gameState = 'playing';
        this.hideAllScreens();
        this.resetLevel();
        this.updateUI();
    }

    nextLevel() {
        if (this.currentLevel < this.levels.length) {
            this.currentLevel++;
            this.currentLevelData = this.levels[this.currentLevel - 1];
            this.gameState = 'playing';
            this.hideAllScreens();
            this.resetLevel();
            this.updateUI();
        } else {
            // Game completed
            this.gameState = 'start';
            this.hideAllScreens();
            document.getElementById('startScreen').classList.remove('hidden');
        }
    }

    resetLevel() {
        this.player1.x = 50;
        this.player1.y = this.worldHeight - 100;
        this.player1.vx = 0;
        this.player1.vy = 0;
        this.player1.onGround = false;

        this.player2.x = 50;
        this.player2.y = this.worldHeight * 2 - 100;
        this.player2.vx = 0;
        this.player2.vy = 0;
        this.player2.onGround = false;
    }

    hideAllScreens() {
        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.add('hidden');
        document.getElementById('victoryScreen').classList.add('hidden');
    }

    updateUI() {
        document.getElementById('levelNum').textContent = this.currentLevel;
        document.getElementById('livesNum').textContent = this.lives;
    }

    update() {
        if (this.gameState !== 'playing') return;

        this.handleInput();
        this.updatePlayers();
        this.checkCollisions();
        this.checkWinCondition();
    }

    handleInput() {
        // Player 1 and 2 move together
        if (this.keys['ArrowLeft']) {
            this.player1.vx = -this.moveSpeed;
            this.player2.vx = -this.moveSpeed;
        } else if (this.keys['ArrowRight']) {
            this.player1.vx = this.moveSpeed;
            this.player2.vx = this.moveSpeed;
        } else {
            this.player1.vx = 0;
            this.player2.vx = 0;
        }

        if (this.keys['ArrowUp'] && this.player1.onGround) {
            this.player1.vy = this.jumpPower;
            this.player1.onGround = false;
        }

        if (this.keys['ArrowUp'] && this.player2.onGround) {
            this.player2.vy = this.jumpPower;
            this.player2.onGround = false;
        }
    }

    updatePlayers() {
        // Update player 1 (top world)
        this.player1.vy += this.gravity;
        this.player1.x += this.player1.vx;
        this.player1.y += this.player1.vy;

        // Update player 2 (bottom world)
        this.player2.vy += this.gravity;
        this.player2.x += this.player2.vx;
        this.player2.y += this.player2.vy;

        // Keep players in bounds
        this.player1.x = Math.max(0, Math.min(this.canvasWidth - this.player1.width, this.player1.x));
        this.player2.x = Math.max(0, Math.min(this.canvasWidth - this.player2.width, this.player2.x));

        // Check platform collisions for player 1
        this.player1.onGround = false;
        for (let platform of this.currentLevelData.platforms) {
            if (platform.y < this.worldHeight) { // Top world platforms
                if (this.checkCollision(this.player1, platform)) {
                    if (this.player1.vy > 0 && this.player1.y < platform.y) {
                        this.player1.y = platform.y - this.player1.height;
                        this.player1.vy = 0;
                        this.player1.onGround = true;
                    }
                }
            }
        }

        // Check platform collisions for player 2
        this.player2.onGround = false;
        for (let platform of this.currentLevelData.platforms) {
            if (platform.y >= this.worldHeight) { // Bottom world platforms
                if (this.checkCollision(this.player2, platform)) {
                    if (this.player2.vy > 0 && this.player2.y < platform.y) {
                        this.player2.y = platform.y - this.player2.height;
                        this.player2.vy = 0;
                        this.player2.onGround = true;
                    }
                }
            }
        }
    }

    checkCollisions() {
        // Check obstacle collisions
        for (let obstacle of this.currentLevelData.obstacles) {
            if (obstacle.y < this.worldHeight) { // Top world obstacles
                if (this.checkCollision(this.player1, obstacle)) {
                    this.gameOver();
                    return;
                }
            } else { // Bottom world obstacles
                if (this.checkCollision(this.player2, obstacle)) {
                    this.gameOver();
                    return;
                }
            }
        }

        // Check if players fell off the world
        if (this.player1.y > this.worldHeight || this.player2.y > this.canvasHeight) {
            this.gameOver();
            return;
        }
    }

    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }

    checkWinCondition() {
        const exit1 = this.currentLevelData.exit1;
        const exit2 = this.currentLevelData.exit2;

        // Player 1 must reach exit1 (top world), Player 2 must reach exit2 (bottom world)
        const player1AtExit = this.checkCollision(this.player1, exit1);
        const player2AtExit = this.checkCollision(this.player2, exit2);

        if (player1AtExit && player2AtExit) {
            this.victory();
        }
    }

    gameOver() {
        this.lives--;
        this.updateUI();

        if (this.lives <= 0) {
            this.gameState = 'gameOver';
            this.hideAllScreens();
            document.getElementById('gameOverScreen').classList.remove('hidden');
        } else {
            this.resetLevel();
        }
    }

    victory() {
        this.gameState = 'victory';
        this.hideAllScreens();
        document.getElementById('victoryLevel').textContent = this.currentLevel;
        document.getElementById('victoryScreen').classList.remove('hidden');
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw world separator line
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.worldHeight);
        this.ctx.lineTo(this.canvasWidth, this.worldHeight);
        this.ctx.stroke();

        // Draw platforms
        for (let platform of this.currentLevelData.platforms) {
            this.ctx.fillStyle = platform.color;

            // Add glitch effect to bottom world platforms
            if (platform.y >= this.worldHeight) {
                // Random glitch offset for bottom world platforms
                const glitchOffset = Math.random() > 0.9 ? (Math.random() - 0.5) * 4 : 0;
                this.ctx.fillRect(
                    platform.x + glitchOffset,
                    platform.y,
                    platform.width,
                    platform.height
                );

                // Add glitch scanlines to bottom world platforms
                if (Math.random() > 0.8) {
                    this.ctx.fillStyle = 'rgba(0, 255, 255, 0.4)';
                    this.ctx.fillRect(
                        platform.x,
                        platform.y + Math.random() * platform.height,
                        platform.width,
                        1
                    );
                    this.ctx.fillStyle = platform.color; // Reset color
                }
            } else {
                // Normal world platforms (no glitch)
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            }
        }

        // Draw obstacles
        for (let obstacle of this.currentLevelData.obstacles) {
            this.ctx.fillStyle = obstacle.color;

            // Add glitch effect to bottom world obstacles
            if (obstacle.y >= this.worldHeight) {
                // Random glitch offset for bottom world obstacles
                const glitchOffset = Math.random() > 0.85 ? (Math.random() - 0.5) * 6 : 0;
                this.ctx.fillRect(
                    obstacle.x + glitchOffset,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height
                );

                // Add glitch color flicker
                if (Math.random() > 0.9) {
                    this.ctx.fillStyle = '#00ffff';
                    this.ctx.fillRect(
                        obstacle.x,
                        obstacle.y,
                        obstacle.width,
                        obstacle.height
                    );
                    this.ctx.fillStyle = obstacle.color; // Reset color
                }
            } else {
                // Normal world obstacles (no glitch)
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
        }

        // Draw exits
        const exit1 = this.currentLevelData.exit1;
        const exit2 = this.currentLevelData.exit2;

        // Top world exit (green)
        this.ctx.fillStyle = exit1.color;
        this.ctx.fillRect(exit1.x, exit1.y, exit1.width, exit1.height);

        // Bottom world exit (yellow)
        this.ctx.fillStyle = exit2.color;
        this.ctx.fillRect(exit2.x, exit2.y, exit2.width, exit2.height);

        // Add exit labels
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px "Press Start 2P"';
        this.ctx.fillText('EXIT', exit1.x + 5, exit1.y - 5);
        this.ctx.fillText('EXIT', exit2.x + 5, exit2.y - 5);

        // Draw players
        this.ctx.fillStyle = this.player1.color;
        this.ctx.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height);

        // Draw glitched player 2 with effects
        this.drawGlitchedPlayer();

        // Draw world labels
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '16px "Press Start 2P"';
        this.ctx.fillText('NORMAL WORLD', 10, 30);
        this.ctx.fillText('GLITCHED WORLD', 10, this.worldHeight + 30);

        // Add glitch effects to bottom world
        this.drawGlitchEffects();
    }

    drawGlitchedPlayer() {
        // Add glitch offset based on time
        const glitchOffset = Math.sin(Date.now() * 0.01) * 2;
        const glitchIntensity = Math.random() > 0.8 ? 3 : 0;

        // Draw main player with glitch offset
        this.ctx.fillStyle = this.player2.color;
        this.ctx.fillRect(
            this.player2.x + glitchOffset,
            this.player2.y,
            this.player2.width,
            this.player2.height
        );

        // Add glitch scanlines
        if (Math.random() > 0.9) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(
                this.player2.x,
                this.player2.y + Math.random() * this.player2.height,
                this.player2.width,
                1
            );
        }

        // Add color glitch
        if (Math.random() > 0.95) {
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillRect(
                this.player2.x + glitchIntensity,
                this.player2.y,
                this.player2.width,
                this.player2.height
            );
        }
    }

    drawGlitchEffects() {
        const time = Date.now();

        // Add glitch scanlines to bottom world
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < 5; i++) {
            if (Math.random() > 0.8) {
                const y = this.worldHeight + Math.random() * this.worldHeight;
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.canvasWidth, y);
                this.ctx.stroke();
            }
        }

        // Add random glitch rectangles
        if (Math.random() > 0.9) {
            this.ctx.fillStyle = 'rgba(255, 0, 255, 0.2)';
            this.ctx.fillRect(
                Math.random() * this.canvasWidth,
                this.worldHeight + Math.random() * this.worldHeight,
                Math.random() * 100 + 20,
                Math.random() * 20 + 5
            );
        }

        // Add glitch noise
        if (Math.random() > 0.85) {
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
            for (let i = 0; i < 10; i++) {
                this.ctx.fillRect(
                    Math.random() * this.canvasWidth,
                    this.worldHeight + Math.random() * this.worldHeight,
                    Math.random() * 5 + 1,
                    Math.random() * 5 + 1
                );
            }
        }

        // Add glitch text corruption
        if (Math.random() > 0.95) {
            this.ctx.fillStyle = '#ff00ff';
            this.ctx.font = '12px "Press Start 2P"';
            this.ctx.fillText('ERROR', Math.random() * this.canvasWidth, this.worldHeight + Math.random() * 100 + 50);
        }

        // Add screen tearing effect
        if (Math.random() > 0.92) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            const tearY = this.worldHeight + Math.random() * this.worldHeight;
            const tearHeight = Math.random() * 10 + 5;
            this.ctx.fillRect(0, tearY, this.canvasWidth, tearHeight);
        }

        // Add color channel separation
        if (Math.random() > 0.88) {
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            this.ctx.fillRect(
                Math.random() * 10 - 5,
                this.worldHeight,
                this.canvasWidth,
                this.worldHeight
            );
        }

        // Add glitch border corruption
        if (Math.random() > 0.96) {
            this.ctx.strokeStyle = '#ff00ff';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.worldHeight);
            this.ctx.lineTo(this.canvasWidth, this.worldHeight);
            this.ctx.stroke();
        }
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new Game();
});
