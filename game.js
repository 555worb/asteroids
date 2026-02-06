// ============================================
// ASTEROIDS GAME - Sichere Implementierung
// ============================================
// Wichtig: Alle Spiellogik läuft im Browser
// Keine Backend-Verbindungen = Sicher zu deployen!
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const gameStatusDisplay = document.getElementById('gameStatus');

// Spielvariablen
let gameRunning = true;
let score = 0;
let level = 1;
let asteroids = [];
let bullets = [];
let keys = {};

// Farben für buntes Design
const colors = {
    player: '#00ff00',
    bullet: '#ffff00',
    asteroidLarge: '#ff0080',
    asteroidMedium: '#00ffff',
    asteroidSmall: '#ffaa00'
};

// Spieler-Klasse
class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angle = 0;
        this.radius = 15;
        this.velocity = { x: 0, y: 0 };
        this.acceleration = 0.3;
        this.friction = 0.99;
        this.angularVelocity = 0;
        this.invulnerable = 0;
    }

    update() {
        // Rotation
        if (keys['ArrowLeft']) {
            this.angularVelocity = -0.1;
        } else if (keys['ArrowRight']) {
            this.angularVelocity = 0.1;
        } else {
            this.angularVelocity = 0;
        }

        this.angle += this.angularVelocity;

        // Beschleunigung
        if (keys['ArrowUp']) {
            this.velocity.x += Math.cos(this.angle) * this.acceleration;
            this.velocity.y += Math.sin(this.angle) * this.acceleration;
        }

        // Reibung
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;

        // Position aktualisieren
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Bildschirmränder wrappen (Raumschiff kommt von der anderen Seite raus)
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Unverwundbarkeit zähler
        if (this.invulnerable > 0) {
            this.invulnerable--;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Blinken wenn unverwundbar
        if (this.invulnerable > 0 && Math.floor(this.invulnerable / 5) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        ctx.strokeStyle = colors.player;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(12, 0); // Vorne des Raumschiffs
        ctx.lineTo(-10, -10);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, 10);
        ctx.closePath();
        ctx.stroke();

        // Flamme wenn beschleunigt
        if (keys['ArrowUp']) {
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-5, -3);
            ctx.lineTo(-10 - Math.random() * 5, 0);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-5, 3);
            ctx.lineTo(-10 - Math.random() * 5, 0);
            ctx.stroke();
        }

        ctx.restore();
    }

    shoot() {
        const bullet = new Bullet(
            this.x + Math.cos(this.angle) * this.radius,
            this.y + Math.sin(this.angle) * this.radius,
            Math.cos(this.angle) * 7 + this.velocity.x,
            Math.sin(this.angle) * 7 + this.velocity.y
        );
        bullets.push(bullet);
    }
}

// Bullet-Klasse
class Bullet {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 2;
        this.lifetime = 120; // 2 Sekunden bei 60 FPS
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.lifetime--;

        // Bildschirmränder wrappen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = colors.bullet;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    isAlive() {
        return this.lifetime > 0;
    }
}

// Asteroiden-Klasse
class Asteroid {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size; // 1 = klein, 2 = mittel, 3 = groß
        this.radius = size * 10;
        this.vx = (Math.random() - 0.5) * 2 * (4 - size);
        this.vy = (Math.random() - 0.5) * 2 * (4 - size);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.points = [];
        this.generateShape();
    }

    generateShape() {
        // Generiere zufällige Asteroiden-Form
        const numPoints = 8 + this.size * 2;
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const distance = this.radius * (0.7 + Math.random() * 0.3);
            this.points.push({
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance
            });
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Bildschirmränder wrappen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        // Farbe basierend auf Größe
        const colorMap = {
            1: colors.asteroidSmall,
            2: colors.asteroidMedium,
            3: colors.asteroidLarge
        };

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = colorMap[this.size];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    split() {
        const newAsteroids = [];
        if (this.size > 1) {
            for (let i = 0; i < 2; i++) {
                const newAsteroid = new Asteroid(this.x, this.y, this.size - 1);
                newAsteroid.vx += (Math.random() - 0.5) * 3;
                newAsteroid.vy += (Math.random() - 0.5) * 3;
                newAsteroids.push(newAsteroid);
            }
        }
        return newAsteroids;
    }
}

let player = new Player();

// Initialisiere Asteroiden
function initializeAsteroids() {
    asteroids = [];
    const asteroidCount = 3 + level;
    for (let i = 0; i < asteroidCount; i++) {
        let x, y;
        // Spawne Asteroiden nicht am Spieler
        do {
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
        } while (Math.hypot(x - player.x, y - player.y) < 100);

        asteroids.push(new Asteroid(x, y, 3));
    }
}

// Kollisionserkennung
function checkCollisions() {
    // Bullet-Asteroid Kollisionen
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
            const bullet = bullets[i];
            const asteroid = asteroids[j];
            const distance = Math.hypot(bullet.x - asteroid.x, bullet.y - asteroid.y);

            if (distance < bullet.radius + asteroid.radius) {
                // Treffer!
                bullets.splice(i, 1);

                // Punkte und Asteroiden splitten
                const pointMap = { 1: 100, 2: 50, 3: 20 };
                score += pointMap[asteroid.size];
                scoreDisplay.textContent = score;

                // Asteroiden splitten
                const newAsteroids = asteroid.split();
                asteroids.splice(j, 1);
                asteroids.push(...newAsteroids);

                break;
            }
        }
    }

    // Player-Asteroid Kollisionen
    if (player.invulnerable === 0) {
        for (const asteroid of asteroids) {
            const distance = Math.hypot(player.x - asteroid.x, player.y - asteroid.y);
            if (distance < player.radius + asteroid.radius) {
                // Spieler getroffen
                player.invulnerable = 120; // 2 Sekunden Unverwundbarkeit
                player.velocity = { x: 0, y: 0 };
                break;
            }
        }
    }
}

// Update Spielzustand
function update() {
    player.update();

    // Update Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        if (!bullets[i].isAlive()) {
            bullets.splice(i, 1);
        }
    }

    // Update Asteroiden
    for (const asteroid of asteroids) {
        asteroid.update();
    }

    // Kollisionserkennung
    checkCollisions();

    // Level beendet wenn keine Asteroiden mehr
    if (asteroids.length === 0) {
        level++;
        levelDisplay.textContent = level;
        gameStatusDisplay.textContent = `Level ${level}! Nächste Welle...`;
        initializeAsteroids();
    }
}

// Zeichne alles
function draw() {
    // Schwarzer Hintergrund
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sterne (Hintergrund)
    ctx.fillStyle = '#444';
    for (let i = 0; i < 100; i++) {
        const x = (i * 73) % canvas.width;
        const y = (i * 97) % canvas.height;
        ctx.fillRect(x, y, 1, 1);
    }

    player.draw();

    for (const bullet of bullets) {
        bullet.draw();
    }

    for (const asteroid of asteroids) {
        asteroid.draw();
    }
}

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Keyboard Input
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    if (e.key === ' ') {
        e.preventDefault();
        player.shoot();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Starte das Spiel
initializeAsteroids();
gameLoop();
