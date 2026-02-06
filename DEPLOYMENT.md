# 🚀 Deployment-Anleitung für Asteroids

## Schritt-für-Schritt: Dein Spiel ins Internet bringen

---

## Option 1: Vercel (Empfohlen - einfachste Option)

### Was ist Vercel?
- Kostenloses Hosting speziell für Web-Apps
- Automatisches HTTPS
- Automatische Deployments bei Git-Push
- Perfekt für Spiele

### So geht's:

#### 1. Code zu GitHub hochladen
```bash
# GitHub Repository erstellen auf github.com
# Code hochladen:
git init
git add .
git commit -m "Initial commit: Asteroids Game"
git remote add origin https://github.com/DEIN-NAME/asteroids.git
git branch -M main
git push -u origin main
```

#### 2. Bei Vercel anmelden
- Gehe zu https://vercel.com
- Melde dich mit GitHub an
- Klick "New Project"
- Wähle dein `asteroids` Repository

#### 3. Deploy konfigurieren
```
Framework: Vite
Build Command: npm run build
Output Directory: dist
Environment Variables: (leer lassen für dieses Spiel)
```

#### 4. Fertig!
Vercel gibt dir eine URL wie: `https://asteroids.vercel.app`

**Vorteil:** Bei jedem Push zu GitHub wird automatisch neu deployed!

---

## Option 2: Netlify (Auch sehr einfach)

### Schritt 1-2: Wie Vercel (Code zu GitHub)

### Schritt 3: Bei Netlify anmelden
- https://netlify.com
- Klick "Add new site" → "Import an existing project"
- Verbinde GitHub
- Wähle `asteroids` Repository

### Schritt 4: Build-Settings
```
Build command: npm run build
Publish directory: dist
```

### Fertig!
Netlify gibt dir auch eine URL, z.B. `https://asteroids-game.netlify.app`

---

## Option 3: GitHub Pages (Kostenlos, ohne Node.js)

Wenn du npm nicht instaliert hast:

### Schritt 1: Static Files vorbereiten
```bash
# Verschiebe deine Files für GitHub Pages
mkdir -p docs
cp index.html game.js style.css docs/
```

### Schritt 2: Code zu GitHub
```bash
git add docs/
git commit -m "Add GitHub Pages files"
git push
```

### Schritt 3: GitHub Settings
1. Gehe zu deinem Repository
2. Settings → Pages
3. "Source" → `docs` Ordner
4. Save

### Fertig!
URL: `https://dein-username.github.io/asteroids`

---

## ⚠️ Wichtige Sicherheits-Checkliste VOR dem Deploy

```
☐ .env Datei existiert NICHT im Repository
  → git status | grep .env

☐ .gitignore enthält .env und secrets
  → cat .gitignore | grep ".env"

☐ Keine API Keys im JavaScript Code
  → grep -r "API_KEY" src/

☐ HTTPS ist aktiviert
  → Alle 3 Optionen oben haben HTTPS enabled

☐ Kein Debug/Console-Code
  → grep -r "console.log" game.js
```

---

## Falls du Backend später brauchst (z.B. High-Scores)

### Dann brauchst du:
1. **Backend-Server** (Node.js/Python/etc)
2. **Datenbank** (PostgreSQL/MongoDB/etc)
3. **API mit Authentifizierung** (JWT Tokens)
4. **Environment-Variablen für API URLs**

### Sicherer Backend-Setup:
```javascript
// .env (NICHT in Git!)
VITE_API_URL=https://api.asteroids.com
VITE_API_KEY=secret-api-key

// game.js
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Sende Score zum Backend
fetch(`${API_URL}/scores`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ score: 12345 })
});
```

---

## 📋 Quick-Start Checkliste

```
□ npm install          # Dependencies
□ npm run dev          # Lokal testen
□ npm run build        # Production build
□ Git-Repository       # Code hochladen
□ Vercel/Netlify       # Deployment
□ Test im Browser      # Spiel spielen
□ Teile Link mit Freunden! 🎮
```

---

## 🆘 Häufige Probleme

**Problem: "npm: command not found"**
- Installiere Node.js von https://nodejs.org

**Problem: Game lädt nicht richtig**
- Check ob dist/ Ordner mit npm run build erstellt wurde
- Check ob alle Dateien (HTML, CSS, JS) im dist/ Ordner sind

**Problem: CORS Error im Console"**
- Das sollte nicht passieren, da alles statische Files sind
- Check die Browser-Console (F12) für Fehler

---

## 📊 Erfolgreicher Deploy = ✅

Wenn du:
1. Eine öffentliche URL hast
2. Game im Browser lädt
3. Spielbar ist
4. Keine Fehler in der Console

**Glückwunsch! Dein Spiel ist sicher ins Internet gebracht!** 🚀

---

## Nächste Schritte (Optional):

- Analytics hinzufügen (Google Analytics)
- Highscore Leaderboard (mit Backend)
- Multiplayer (WebSockets)
- Mobile-freundliche Touch-Controls
- Sound-Effekte
