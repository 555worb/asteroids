# 🔒 Security-Dokumentation für Asteroids Game

## Für dich als Code Coach erklärt:

### Was ist Sicherheit im Browser?
Browser-Spiele wie dieses haben **unterschiedliche Sicherheitsanforderungen** als Web-Apps mit Logins/Datenbanken. Lass mich zeigen, was wichtig ist:

---

## 1️⃣ Was wird auf dem Server gespeichert?
**Antwort: NICHTS von deinem Spiel!**

- ✅ Das Spiel läuft komplett im **Browser des Nutzers** (lokal)
- ✅ Keine Login-Daten
- ✅ Keine Passwörter
- ✅ Keine privaten Informationen
- ✅ Scores werden NUR lokal im Browser gespeichert

**Warum ist das sicher?**
→ Wenn keine Daten zum Server gehen, können auch keine gestohlen werden!

---

## 2️⃣ Deployment - Was du beachten musst

### ✅ Sicher:
```
Statische Files servieren (HTML, CSS, JS)
├─ Auf CDN wie Netlify, Vercel, GitHub Pages
├─ Mit HTTPS verschlüsselt
└─ Mit Security Headers
```

### ❌ NICHT sicher:
```
Deine source Code / .env Datei hochladen
├─ .env mit API Keys hochladen
├─ Unverschlüsselte HTTP-Verbindungen
└─ Private Keys sichtbar machen
```

---

## 3️⃣ Was ist `.env` und warum .gitignore?

### .env Datei:
```javascript
// Statt hart in Code zu schreiben:
const API_KEY = 'geheim123';  // ❌ FALSCH - sichtbar im Browser!

// So machen wir es:
const API_KEY = process.env.VITE_API_KEY;  // ✅ RICHTIG
```

### .gitignore:
Sagt Git: "Diese Dateien NICHT ins Internet hochladen!"
- `.env` - Enthält geheime Keys
- `node_modules/` - Zu groß und kann neu installiert werden
- `.log` - Temporäre Dateien

---

## 4️⃣ Content Security Policy (CSP) - Was ist das?

**Einfach erklärt:** CSP sagt dem Browser: "Vertrau nur Code von DIESEN Quellen"

Beispiel - Verhindert XSS-Attacken:
```html
<!-- ❌ FALSCH - Erlaubt beliebigen Code: -->
<script src="https://evil-site.com/hack.js"></script>

<!-- ✅ RICHTIG - Mit CSP blockiert: -->
<!-- CSP sagt: "Nur Skripte von unserem Server erlaubt!" -->
```

---

## 5️⃣ Sicherheitschecklist für Deployment

- [ ] **Keine `.env` Datei in Git**
- [ ] **HTTPS verwenden** (verschlüsselte Verbindung)
- [ ] **Build-Artefakte** (`dist/` Ordner) deployen, nicht `game.js`
- [ ] **Security Headers** setzen (CORS, CSP, etc.)
- [ ] **console.log()** entfernen in Production
- [ ] **Source Maps** nicht in Production hochladen
- [ ] **Regelmäßig Dependencies aktualisieren** (npm update)

---

## 6️⃣ Wenn du später Backend brauchst:

### Dann wird es komplexer:
- High-Score Database
- User-Accounts
- Multiplayer Server
- Payment-Processing

### Dann brauchst du:
```
Backend (Node/Python/etc)
   ↓
API mit Authentication (JWT/OAuth)
   ↓
Verschlüsselte Datenbank
   ↓
Security Audits & Penetration Testing
```

---

## 7️⃣ Best Practices die wir verwenden:

| Technik | Was es tut | Warum wichtig |
|---------|-----------|--------------|
| **Vite** | Build-Tool | Minifiziert Code, versteckt Logik |
| **.gitignore** | Datei-Filter | Secrets nicht ins Internet |
| **HTTPS** | Verschlüsselt | Spion kann nicht abhören |
| **Minification** | Code-Verkleinerung | Schwerer zu reverse-engineeren |
| **Security Headers** | HTTP-Header | Blockiert Known Attacks |

---

## 8️⃣ Dein Plan zum Deploy:

```
1. npm install          (Dependencies laden)
2. npm run build        (Code minifizieren)
3. dist/ Ordner        (Upload zu Hosting)
4. HTTPS aktivieren     (Kostenlos bei Vercel/Netlify)
5. Fertig!              (Läuft sicher im Internet)
```

---

## 9️⃣ Noch Fragen?

**F: Kann jemand mein Spiel "hacken"?**
A: Nein - es gibt nichts zu hacken. Nur JavaScript im Browser.

**F: Kann jemand mein Quellcode sehen?**
A: Im Browser ja (mit Dev-Tools), aber:
- Dein Code ist nach `npm run build` minifiziert & verschleiert
- Nicht dein eigentliches Problem (auch Google/Facebook Code ist sichtbar)
- Wichtig nur bei geheimen Algorithmen/Keys

**F: Sind meine Scores sicher?**
A: Nein, aber auch nicht wichtig. Sind nur lokal im Browser.
Wenn du Remote Scores brauchst → Musst Cheating-Detection bauen.

---

**Du bist jetzt ein Security-Experte für Browser-Games! 🎓**
