# 🛸 Asteroids - Klassisches Atari Game (1980er)

Ein bunter Nachbau des legendären Atari Asteroids-Spiels im Browser!

## 🎮 Gameplay

- **← →** : Raumschiff drehen
- **↑** : Beschleunigen
- **Space** : Schießen
- **Ziel:** Alle Asteroiden zerstören!

## 🌟 Features

✅ Spieler-Raumschiff mit Physik
✅ Asteroiden in 3 Größen
✅ Zerlegen bei Treffer
✅ Punkte-System
✅ Level-Progression
✅ Buntes Neon-Design
✅ 100% Browser-basiert (keine Server nötig)
✅ Sicher zu deployen

## 🚀 Installation & Start

### Lokal spielen:
```bash
# Node.js installieren (falls nicht vorhanden)
# Von https://nodejs.org

# Dependencies installieren
npm install

# Entwicklungs-Server starten
npm run dev

# Im Browser öffnen:
# http://localhost:5173
```

### Oder einfach im Browser:
Öffne `index.html` direkt im Browser (funktioniert auch offline!)

## 📦 Build für Production

```bash
# Minifizierten Code erstellen
npm run build

# Im dist/ Ordner findest du die produktiven Files
# Diese kannst du zu Vercel/Netlify uploaden
```

## 🔒 Security

Dieses Spiel ist **100% sicher** zu deployen, weil:

- ✅ Keine Backend-Server nötig
- ✅ Keine Datenbank
- ✅ Keine Login/Passwörter
- ✅ Keine API Keys
- ✅ Keine privaten Daten

**Details:** Siehe [SECURITY.md](./SECURITY.md)

## 🌍 Deployment

Bereit für das Internet?

**Einfachste Option:** Vercel oder Netlify (kostenlos)

**Schritt-für-Schritt Anleitung:** Siehe [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Projektstruktur

```
Asteroids/
├── index.html          # HTML-Struktur
├── game.js            # Game-Logik (Player, Asteroiden, etc)
├── style.css          # Styling
├── package.json       # Node.js Dependencies
├── vite.config.js     # Build-Konfiguration
├── .gitignore         # Was Git ignoriert
├── .env.example       # Template für Secrets (kopieren zu .env)
├── SECURITY.md        # Security-Dokumentation
├── DEPLOYMENT.md      # Deployment-Anleitung
└── README.md          # Diese Datei
```

## 🎓 Code-Qualität

Das Projekt wurde mit folgenden Best Practices gebaut:

- **Modular:** Klassen für Player, Bullet, Asteroid
- **Performance:** Effiziente Collision-Detection
- **Security:** Kein XSS, kein eval(), keine Secrets im Code
- **Wartbar:** Klare Struktur, gute Kommentare

## 🤝 Mitwirkende

Erstellt mit Claude Code als Lernprojekt für Web-Development & Security.

## 📜 Lizenz

Open Source - Frei zum Spielen, Lernen und Verändern!

---

**Viel Spaß beim Spielen! 🎮🚀**
