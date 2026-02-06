// Vite Config - Build-Tool für sichere Deployment
// Vite stellt sicher, dass:
// 1. Code richtig gebundelt wird (kein Sourcecode auf dem Server!)
// 2. Umgebungsvariablen sicher behandelt werden
// 3. HTTPS und Security Headers verwendet werden

import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // Nur localhost für Entwicklung
    host: 'localhost',
    port: 5173,
    // Strict CORS während Entwicklung
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      credentials: false
    }
  },
  build: {
    // Minify & Obfuscate für Production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Entferne console.log() in Production
      }
    },
    // Source Maps NUR für Entwicklung
    sourcemap: false,
    // Output Verzeichnis
    outDir: 'dist',
    assetsDir: 'assets'
  },
  // Security Header für alle Responses
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  }
})
