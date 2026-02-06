# 📤 Schritt-für-Schritt: Asteroids zu GitHub hochladen

## 🎯 Am Ende dieser Anleitung wird dein Code auf GitHub sein!

---

## SCHRITT 1: GitHub Account erstellen (falls du noch keinen hast)

Gehe zu: https://github.com/signup

```
Email eingeben
Password eingeben
Username wählen (z.B. "deinname" oder "asteroids-player")
"Create account" klicken
Email bestätigen
```

**Fertig! GitHub Account ist erstellt.**

---

## SCHRITT 2: Neues Repository erstellen

1. Nach Login auf https://github.com gehen
2. Oben rechts: **+** Menü → **New repository**

```
Repository name: asteroids
(oder: asteroids-game, mein-asteroids, etc.)

Description: "Klassisches Asteroids Spiel vom Atari (1980er)
             - nachgebaut im Browser mit Security Best Practices"

Public oder Private: PUBLIC (damit andere sehen können)

Initialize this repository: NICHT ankreuzen!
(Wir haben schon Dateien)
```

Dann: **Create repository** klicken

**Fertig! Repository ist erstellt.**

---

## SCHRITT 3: Git auf deinem Computer initialisieren

Öffne Terminal/PowerShell und navigiere zum Asteroids-Verzeichnis:

```bash
cd /Users/userone/CLAUDE/Asteroids
```

Initialisiere Git (falls noch nicht gemacht):

```bash
git init
```

Output sollte sein:
```
Initialized empty Git repository in /Users/userone/CLAUDE/Asteroids/.git/
```

---

## SCHRITT 4: Deine GitHub-Verbindung einrichten

GitHub zeigt dir die nächsten Befehle. Hier sind sie:

```bash
git config user.name "DEIN NAME"
git config user.email "deine@email.com"
```

Beispiel:
```bash
git config user.name "Max Mustermann"
git config user.email "max@example.com"
```

---

## SCHRITT 5: Remote Repository verbinden

**WICHTIG:** Ersetze `DEIN-USERNAME` mit deinem GitHub-Nutzernamen!

```bash
git remote add origin https://github.com/DEIN-USERNAME/asteroids.git
```

Beispiel:
```bash
git remote add origin https://github.com/max-mustermann/asteroids.git
```

Kontrolliere ob es funktioniert:
```bash
git remote -v
```

Output sollte sein:
```
origin  https://github.com/DEIN-USERNAME/asteroids.git (fetch)
origin  https://github.com/DEIN-USERNAME/asteroids.git (push)
```

---

## SCHRITT 6: Alle Dateien zum Staging hinzufügen

```bash
git add .
```

**Wichtig:** Das `.gitignore` File sorgt dafür dass `.env` NICHT hinzugefügt wird!

Kontrolliere was hinzugefügt wird:
```bash
git status
```

Output sollte zeigen:
```
On branch master

Changes to be committed:
  new file:   .env.example
  new file:   .gitignore
  new file:   COACH_NOTES.md
  new file:   DEPLOYMENT.md
  new file:   game.js
  new file:   index.html
  ... usw
```

**Wichtig:** `.env` sollte NICHT in der Liste sein! ✅

---

## SCHRITT 7: Commit erstellen

```bash
git commit -m "Initial commit: Asteroids Game mit Security Best Practices"
```

Output:
```
[master (root-commit) abc1234] Initial commit: Asteroids Game...
 16 files changed, 2700 insertions(+)
 create mode 100644 .env.example
 create mode 100644 .gitignore
 ... usw
```

---

## SCHRITT 8: Zu GitHub pushen

Jetzt hochladen:

```bash
git branch -M main
git push -u origin main
```

**Erste Zeit:** GitHub fragt vielleicht nach deinen Credentials!

```
Username for 'https://github.com': DEIN-USERNAME
Password for 'https://DEIN-USERNAME@github.com':
```

**Oder:** Wenn GitHub Token fragt:
1. Gehe zu https://github.com/settings/tokens
2. "Generate new token" klicken
3. Token als Password verwenden

---

## ✅ FERTIG!

Dein Code ist jetzt auf GitHub!

Gehe zu: `https://github.com/DEIN-USERNAME/asteroids`

Du solltest sehen:
```
📁 Your Repository
├─ .env.example
├─ .gitignore
├─ game.js
├─ index.html
├─ style.css
├─ package.json
├─ vite.config.js
├─ README.md
├─ SECURITY.md
├─ DEPLOYMENT.md
└─ ... mehr Dokumentation
```

---

## 🔍 Kontrolliere ob .env NICHT hochgeladen wurde

Gehe auf GitHub bei deinem Repository → oben "Find file"

Suche nach: `.env`

**Ergebnis sollte sein:** ❌ Datei nicht gefunden (gut!)

`.env.example` sollte aber sichtbar sein ✅

---

## 📝 Weitere Commits machen (wenn du Code änderst)

```bash
# Code ändern/verbessern

# Änderungen hinzufügen
git add .

# Commit erstellen
git commit -m "Feature XY hinzugefügt"

# Zu GitHub pushen
git push
```

---

## 🚀 Nächster Schritt: Zu Vercel deployen

Jetzt dass dein Code auf GitHub ist, kannst du zu Vercel deployen:

1. Gehe zu https://vercel.com
2. Melde dich an (mit GitHub Account)
3. "Import Project" klicken
4. Wähle dein "asteroids" Repository
5. Vercel zeigt Einstellungen:
   ```
   Framework: Other (Static Site)
   Build Command: npm run build
   Output Directory: dist
   Environment Variables: (leer lassen)
   ```
6. "Deploy" klicken
7. Warten...
8. **FERTIG!** Vercel gibt dir eine URL:
   ```
   https://asteroids.vercel.app
   ```

---

## 🎮 FINALE ÜBERSICHT

```
Lokal auf deinem Computer:
npm run dev
↓
Code ändern/testen
↓
git add . && git commit -m "..." && git push
↓
Zu GitHub hochgeladen
↓
Vercel sieht Änderung automatisch
↓
Vercel führt aus: npm run build
↓
Deployed zu https://asteroids.vercel.app
↓
Deine Freunde spielen dein Spiel! 🎮
```

---

## ❓ HÄUFIGE PROBLEME

### Problem: "fatal: remote origin already exists"
Lösung:
```bash
git remote remove origin
git remote add origin https://github.com/DEIN-USERNAME/asteroids.git
```

### Problem: Authentication failed
Lösung:
- Stelle sicher Nutzername/Email stimmen
- Verwende GitHub Token statt Password
- Token erstellen: https://github.com/settings/tokens

### Problem: .env wurde hochgeladen (FEHLER!)
Schnelle Lösung:
```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

Dann .env.example als Vorlage nutzen!

---

## ✅ CHECKLIST

```
□ GitHub Account erstellt
□ Repository "asteroids" erstellt
□ git init durchgeführt
□ git config user.name & email
□ git remote add origin ... ausgeführt
□ git add . durchgeführt
□ git status zeigt keine .env
□ git commit -m "..." durchgeführt
□ git push durchgeführt
□ Auf GitHub sichtbar (https://github.com/DEIN-USERNAME/asteroids)
□ .env NICHT sichtbar
□ .env.example SICHTBAR
□ Nächster Schritt: Zu Vercel deployen!
```

---

## 🎉 HERZLICHEN GLÜCKWUNSCH!

Dein Code ist jetzt:
- ✅ Bei GitHub (sicher gespeichert)
- ✅ Version-kontrolliert (kannst alte Versionen zurückgehen)
- ✅ Mit anderen teilen (Link geben)
- ✅ Bereit für Vercel-Deployment (automatisch)

**Du bist jetzt ein echter DevOps Engineer!** 🚀

---

## 📞 NÄCHSTER SCHRITT

Wenn GitHub funktioniert → Gehe zu: **DEPLOYMENT.md**

(Dort steht wie du zu Vercel deployest!)
