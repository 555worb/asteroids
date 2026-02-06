#!/bin/bash

# QUICK START SCRIPT für Asteroids Game
# Alles was du brauchst um zu starten!

echo "========================================="
echo "🚀 Asteroids Game - Quick Start"
echo "========================================="
echo ""

# Check ob Node.js installiert ist
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nicht gefunden!"
    echo "Installiere von: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js Version: $(node --version)"
echo ""

# Installiere Dependencies
echo "📦 Installiere Dependencies..."
npm install

echo ""
echo "✅ Setup fertig!"
echo ""
echo "Jetzt kannst du:"
echo ""
echo "  🎮 Lokal spielen:"
echo "     npm run dev"
echo ""
echo "  🏗️  Production-Build erstellen:"
echo "     npm run build"
echo ""
echo "📚 Mehr Info in:"
echo "  - README.md           (Übersicht)"
echo "  - SECURITY.md         (Sicherheit)"
echo "  - COACH_NOTES.md      (Erklärungen)"
echo "  - DEPLOYMENT.md       (Ins Internet)"
echo "  - PROJECT_STRUCTURE.md (Datei-Übersicht)"
echo ""
echo "========================================="
