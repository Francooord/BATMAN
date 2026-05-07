const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Verificar si hay API Key configurada (opcional, para futuro)
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback: cualquier ruta sirve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('  🚀 SERVIDOR INICIADO');
  console.log('========================================');
  console.log('');
  console.log(`  📍 URL: http://localhost:${PORT}`);
  console.log(`  📁 Public: ${path.join(__dirname, 'public')}`);
  console.log('');

  if (GROQ_API_KEY) {
    console.log('  🤖 API GROQ: ✅ Configurada');
    console.log(`     Key: ${GROQ_API_KEY.substring(0, 10)}...`);
  } else {
    console.log('  🤖 API GROQ: ⚠️  No configurada');
    console.log('     El asistente usará respuestas locales.');
  }

  console.log('');
  console.log('  Presiona Ctrl+C para detener');
  console.log('========================================');
  console.log('');
});