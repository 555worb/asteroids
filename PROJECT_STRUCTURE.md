# 📁 Projektstruktur - Was ist wo?

```
Asteroids/
│
├── 🎮 SPIEL-DATEIEN (Das eigentliche Spiel)
│   ├── index.html         ← HTML-Struktur (mit Security Headers!)
│   ├── game.js            ← Game-Logik (Player, Asteroiden, etc)
│   └── style.css          ← Styling (Farben, Layout)
│
├── 🔧 KONFIGURATION (Build & Development)
│   ├── package.json       ← Node.js Projekt-Definition
│   ├── vite.config.js     ← Build-Konfiguration (Minify, etc)
│   └── .gitignore         ← Welche Dateien Git ignorieren soll
│
├── 🔒 SECURITY (Für dich als Coach erklärt!)
│   ├── .env.example       ← Template für Umgebungsvariablen
│   ├── SECURITY.md        ← Sicherheits-Dokumentation
│   ├── COACH_NOTES.md     ← Detaillierte Erklärungen
│   └── DEPLOYMENT.md      ← Schritt-für-Schritt zum Live-Gehen
│
└── 📚 DOKUMENTATION
    └── README.md          ← Projekt-Übersicht
```

---

## Welche Datei macht was?

### 🎮 SPIEL-DATEIEN

#### `index.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Canvas Element -->
    <!-- Security Headers: Content-Security-Policy -->
  </head>
  <body>
    <canvas id="gameCanvas">
    <script src="game.js">
  </body>
</html>
```
**Wichtig:** Enthält CSP Headers (blockiert XSS)

#### `game.js`
```javascript
// Player-Klasse (Raumschiff)
// Bullet-Klasse (Schüsse)
// Asteroid-Klasse (Asteroiden)
// Game Loop, Kollisionserkennung, etc
```
**Wichtig:** Läuft 100% im Browser

#### `style.css`
```css
/* Neon-Farben */
/* Canvas-Styling */
/* Responsive Layout */
```

---

### 🔧 KONFIGURATION

#### `package.json`
```json
{
  "scripts": {
    "dev": "vite",          // npm run dev = lokal entwickeln
    "build": "vite build"   // npm run build = für Production
  },
  "devDependencies": {
    "vite": "^5.0.0"        // Build-Tool
  }
}
```

#### `vite.config.js`
```javascript
// Minify JavaScript (Code verkleinerung)
// Drop console.logs (Debug-Ausgaben entfernen)
// Output Directory: dist/ (für Production)
// Security Headers
```

#### `.gitignore`
```
.env              // ← Secrets nicht hochladen!
node_modules/     // ← Zu groß, kann neu installiert werden
*.log             // ← Temporäre Dateien
```

---

### 🔒 SECURITY

#### `.env.example`
**Zeigt:** Welche Variablen existieren (ohne echte Werte)

```
# DAS IST ÖFFENTLICH
VITE_API_URL=http://localhost:3000
VITE_API_KEY=XXX-PLACEHOLDER-XXX
```

#### `.env` (wird NICHT committed!)
```
# DAS IST PRIVAT (nur auf deinem Computer!)
VITE_API_URL=http://localhost:3000
VITE_API_KEY=sk_live_wirklich_geheim_123456
```

**Warum unterschiedlich?**
- `.env.example` → öffentlich (zeigt Struktur)
- `.env` → privat (echte Secrets)

#### `SECURITY.md`
**Erklärt:**
- Was wird getransportiert?
- Welche Attacken sind möglich?
- Wie schützen wir uns?
- Sicherheits-Checkliste vor Deployment

#### `COACH_NOTES.md`
**Erklärt (für dich!):**
- Warum ich jede Datei gemacht habe
- Wie Sicherheit funktioniert
- FAQ und praktische Beispiele
- Was ist XSS? CSRF? CSP?

#### `DEPLOYMENT.md`
**Erklärt:**
- Schritt-für-Schritt zu Vercel/Netlify
- Warum welche Option
- Häufige Probleme & Lösungen

---

## 🚀 Workflow - Was passiert wann?

```
1. ENTWICKLUNG (Local)
   ↓
   npm run dev
   ↓
   Vite startet Server auf http://localhost:5173
   ↓
   Du spielst, testest, entwickelst
   ↓

2. VERSION-CONTROL
   ↓
   git add .
   ↓
   (.env wird ignoriert wegen .gitignore)
   ↓
   git commit -m "New feature"
   ↓
   git push to GitHub
   ↓

3. PRODUCTION BUILD
   ↓
   npm run build
   ↓
   Vite minifiziert & optimiert
   ↓
   Output in dist/ Ordner
   ↓

4. DEPLOYMENT
   ↓
   Vercel/Netlify holen Code von GitHub
   ↓
   Führen "npm run build" aus (automatisch!)
   ↓
   Deployen dist/ Ordner
   ↓
   User spielen unter https://asteroids.vercel.app
   ↓

5. LIVE & SICHER
   ✅ Code ist minifiziert
   ✅ Secrets sind geschützt
   ✅ HTTPS ist aktiv
   ✅ Security Headers sind gesetzt
```

---

## 🎯 Welche Dateien gehen wohin?

### `npm install` (lokal)
```
node_modules/    ← Vite wird installiert
               ← Dann kannst du "npm run dev" machen
```

### `npm run build`
```
dist/                     ← Output von Build
├── index.html           ← Minifiziert
├── game.js              ← Minifiziert & Obfuscated
└── style.css            ← Minifiziert
```

### `git push` (zu GitHub)
```
.git/              ← Git History
game.js            ← Source Code
index.html         ← HTML
style.css          ← CSS
package.json       ← Dependencies
.gitignore         ← NICHT: .env!
SECURITY.md        ← Dokumentation
etc.
```

### Deployment (zu Vercel)
```
https://asteroids.vercel.app
├── /index.html    ← Minifiziertes HTML
├── /_app.js       ← Minifiziertes JS
└── /_app.css      ← Minifiziertes CSS
```

---

## ⚠️ WICHTIG: Was NICHT hochgeladen werden darf

```
❌ .env (Secrets!)
❌ node_modules/ (zu groß)
❌ *.log (Temp-Dateien)
❌ .vscode/ (IDE Settings)
❌ Private Keys (*.key, *.pem)
❌ API Credentials
❌ Passwörter
```

Diese sind in `.gitignore` = Git ignoriert sie automatisch

---

## ✅ SICHERE STRUKTUR CHECKLIST

```
□ index.html hat CSP Headers
□ game.js hat keine Secrets
□ .env.example zeigt Structure aber keine echten Werte
□ .gitignore hat .env und Secrets
□ package.json definiert "build" & "dev" Scripts
□ vite.config.js hat Minify & drop_console
□ Dokumentation erklärt alles
□ Keine API Keys im Code
□ Keine Passwörter sichtbar
```

---

## 🔥 Los geht's!

```bash
# 1. Installiere Dependencies
npm install

# 2. Starte lokalen Dev-Server
npm run dev

# 3. Öffne Browser: http://localhost:5173

# 4. Wenn ready für Production:
npm run build

# 5. Zu GitHub & Vercel deployen
# (Siehe DEPLOYMENT.md)
```

---

**Jetzt weißt du wo alles ist und warum!** 🎓
