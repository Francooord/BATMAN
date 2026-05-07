require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTANTE: Permitir JSON en el body
app.use(express.json());

// Verificar si hay API Key configurada
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Servir archivos estáticos desde public/
app.use(express.static(path.join(__dirname, 'public')));

// =============================================
// NUEVO: Endpoint API para el chat con Groq
// =============================================
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!GROQ_API_KEY) {
        return res.status(500).json({ 
            error: 'API key no configurada',
            response: 'El asistente no está disponible. API key no configurada en el servidor.'
        });
    }

    if (!message) {
        return res.status(400).json({ error: 'Mensaje requerido' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192', // o el modelo que prefieras
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un asistente educativo experto en Ingeniería de Software e historia de la ingeniería. Responde de manera clara, concisa y educativa. Máximo 3 párrafos.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error Groq API:', errorData);
            return res.status(500).json({ 
                error: 'Error en la API de Groq',
                response: 'Lo siento, hubo un problema con el servicio de IA. Intenta de nuevo.'
            });
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        
        res.json({ response: botResponse });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Error interno',
            response: 'Lo siento, ocurrió un error. Intenta de nuevo más tarde.'
        });
    }
});

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