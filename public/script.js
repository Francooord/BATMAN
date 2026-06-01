// =============================================
// VARIABLES GLOBALES Y ESTADO
// =============================================
let currentSection = 'inicio';
let quizScore = 0;
let quizStreak = 0;
let bestStreak = 0;
let totalAttempts = 0;
let correctAttempts = 0;
let completedEras = [];
let timerInterval = null;
let timeLeft = 30;
let currentQuizId = null;

// PDF Viewer state
let pdfDoc = null;
let pdfPageNum = 1;
let pdfScale = 1.5;
let pdfCanvas = null;
let pdfCtx = null;

// =============================================
// DATOS DEL QUIZ
// =============================================
const quices = {
    1: {
        era: "Edad Antigua",
        icon: "🏛",
        questions: [
            {
                q: "¿Cuál fue una gran obra de ingeniería de la Edad Antigua?",
                options: ["Los Acueductos", "La Máquina de Vapor", "El Internet", "El Avión"],
                correct: 0,
                explanation: "Los acueductos romanos fueron una maravilla de la ingeniería hidráulica antigua, transportando agua por gravedad a través de largas distancias."
            },
            {
                q: "¿Qué civilización construyó las pirámides de Giza?",
                options: ["Romanos", "Griegos", "Egipcios", "Aztecas"],
                correct: 2,
                explanation: "Los antiguos egipcios construyeron las pirámides de Giza hace más de 4,500 años, demostrando un dominio avanzado de la geometría y la organización laboral."
            },
            {
                q: "¿Qué material era fundamental en la construcción mesopotámica?",
                options: ["Hierro", "Acero", "Ladrillo de adobe", "Cemento"],
                correct: 2,
                explanation: "Los mesopotámicos usaban ladrillos de adobe (barro secado al sol) como material principal de construcción debido a la escasez de piedra en la región."
            },
            {
                q: "¿Cuál era el propósito principal de los acueductos romanos?",
                options: ["Transportar mercancías", "Llevar agua a las ciudades", "Defender fronteras", "Comunicación militar"],
                correct: 1,
                explanation: "Los acueductos romanos transportaban agua desde fuentes remotas hasta las ciudades, utilizando el principio de gravedad y arcos de sillería."
            }
        ]
    },
    2: {
        era: "Edad Media",
        icon: "⛪",
        questions: [
            {
                q: "¿Qué tipo de construcción dominó la ingeniería medieval?",
                options: ["Puentes de Acero", "Catedrales e Iglesias", "Rascacielos", "Fábricas"],
                correct: 1,
                explanation: "La Edad Media fue la época de las grandes catedrales góticas, con arbotantes, bóvedas de crucería y rosetones que desafiaban los límites estructurales de la época."
            },
            {
                q: "¿Qué elemento arquitectónico es característico del estilo gótico?",
                options: ["Cúpulas", "Arbotantes", "Arcos de medio punto", "Columnas dóricas"],
                correct: 1,
                explanation: "Los arbotantes son elementos estructurales externos que transmiten el empuje de las bóvedas hacia los contrafuertes, permitiendo mayor altura y ventanales."
            },
            {
                q: "¿Para qué servían principalmente los molinos de viento medievales?",
                options: ["Generar electricidad", "Moler grano y bombear agua", "Comunicación", "Transporte"],
                correct: 1,
                explanation: "Los molinos de viento medievales se usaban principalmente para moler grano en harina y, en algunos casos, para bombear agua de zonas bajas."
            },
            {
                q: "¿Qué ingeniero medieval diseñó la catedral de Notre-Dame?",
                options: ["Leonardo da Vinci", "Maurice de Sully", "Vitruvio", "Isidoro de Mileto"],
                correct: 1,
                explanation: "Maurice de Sully fue el obispo que inició la construcción de Notre-Dame de París en 1163, aunque el diseño exacto del arquitecto se desconoce."
            }
        ]
    },
    3: {
        era: "Revolución Industrial",
        icon: "🔧",
        questions: [
            {
                q: "¿Qué invento marcó el inicio de la Revolución Industrial?",
                options: ["La Rueda", "La Brújula", "La Máquina de Vapor", "El Telégrafo"],
                correct: 2,
                explanation: "La máquina de vapor de James Watt (1769) revolucionó la producción, permitiendo la mecanización de fábricas, minas y transporte ferroviario."
            },
            {
                q: "¿Quién perfeccionó la máquina de vapor para uso industrial?",
                options: ["Thomas Edison", "James Watt", "Nikola Tesla", "Henry Ford"],
                correct: 1,
                explanation: "James Watt mejoró drásticamente la eficiencia de la máquina de vapor de Newcomen, haciéndola práctica para la industria y el transporte."
            },
            {
                q: "¿Qué material revolucionó la construcción durante la Revolución Industrial?",
                options: ["Madera", "Piedra", "Acero", "Adobe"],
                correct: 2,
                explanation: "El acero, producido masivamente con el proceso Bessemer, permitió construir puentes, rascacielos y ferrocarriles de mayor escala y resistencia."
            },
            {
                q: "¿En qué año aproximadamente comenzó la Revolución Industrial?",
                options: ["1500", "1760", "1900", "1950"],
                correct: 1,
                explanation: "La Primera Revolución Industrial comenzó alrededor de 1760 en Gran Bretaña, con la mecanización de la industria textil y la minería."
            }
        ]
    },
    4: {
        era: "Era Moderna",
        icon: "🤖",
        questions: [
            {
                q: "¿Cuál es un hito fundamental de la ingeniería moderna?",
                options: ["La Imprenta", "La Inteligencia Artificial", "El Arado", "La Rueda"],
                correct: 1,
                explanation: "La Inteligencia Artificial representa una de las fronteras más importantes de la ingeniería moderna, combinando algoritmos, big data y computación avanzada."
            },
            {
                q: "¿Qué paradigma define la Ingeniería de Software moderna?",
                options: ["Programación estructurada", "Desarrollo ágil y DevOps", "Código máquina", "Tarjetas perforadas"],
                correct: 1,
                explanation: "El desarrollo ágil y DevOps son los paradigmas actuales, enfocados en iteraciones rápidas, integración continua y entrega de valor al usuario."
            },
            {
                q: "¿Qué tecnología permite la computación en la nube?",
                options: ["Transistores", "Virtualización", "Válvulas de vacío", "Relés"],
                correct: 1,
                explanation: "La virtualización permite crear múltiples entornos de computación en un solo servidor físico, base fundamental de la computación en la nube moderna."
            },
            {
                q: "¿Qué lenguaje de programación es ampliamente usado en IA?",
                options: ["COBOL", "Python", "Fortran", "Assembly"],
                correct: 1,
                explanation: "Python es el lenguaje dominante en IA y ciencia de datos gracias a su simplicidad y bibliotecas como TensorFlow, PyTorch y scikit-learn."
            }
        ]
    }
};

// =============================================
// NAVEGACIÓN POR SECCIONES
// =============================================
function goToSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active-section');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active-section');
        currentSection = sectionId;
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionId) {
            link.classList.add('active');
        }
    });

    document.getElementById('nav-links').classList.remove('mobile-open');
    document.getElementById('hamburger').classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        goToSection(link.dataset.section);
    });
});

document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('hamburger').classList.toggle('open');
    document.getElementById('nav-links').classList.toggle('mobile-open');
});

// =============================================
// HERO PARTICLES
// =============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.setProperty('--dur', (5 + Math.random() * 10) + 's');
        p.style.setProperty('--delay', (Math.random() * 5) + 's');
        p.style.width = (2 + Math.random() * 3) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
}

// =============================================
// QUIZ DINÁMICO
// =============================================
function abrirQuiz(id) {
    const cp = document.getElementById(`cp${id}`);
    if (cp.classList.contains('locked')) {
        showToast("🔒 Época bloqueada", "Responde la anterior para avanzar.");
        return;
    }

    currentQuizId = id;
    const quizData = quices[id];
    const randomQ = quizData.questions[Math.floor(Math.random() * quizData.questions.length)];

    document.getElementById('quiz-era-badge').innerText = quizData.icon;
    document.getElementById('quiz-title').innerText = `Desafío: ${quizData.era}`;
    document.getElementById('quiz-question').innerText = randomQ.q;

    window.currentQuestion = randomQ;

    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    randomQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerHTML = `<span class="opt-letter">${letters[index]}</span><span class="opt-text">${opt}</span>`;
        btn.className = 'quiz-opt';
        btn.onclick = () => verificarRespuesta(index, btn);
        optionsDiv.appendChild(btn);
    });

    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.add('hidden');
    feedback.classList.remove('correct', 'wrong');

    document.getElementById('quiz-streak').innerHTML = '';

    iniciarTimer();

    const modal = document.getElementById('quiz-modal');
    modal.style.display = 'flex';
    modal.classList.add('open');
}

function iniciarTimer() {
    timeLeft = 30;
    const timerBar = document.getElementById('timer-bar');
    const timerText = document.getElementById('timer-text');

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        const pct = (timeLeft / 30) * 100;
        timerBar.style.width = pct + '%';
        timerText.innerText = timeLeft + 's';

        if (timeLeft <= 10) {
            timerBar.style.background = '#e74c3c';
        } else {
            timerBar.style.background = 'linear-gradient(90deg, var(--accent), var(--accent2))';
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            verificarRespuesta(-1, null);
        }
    }, 1000);
}

function verificarRespuesta(seleccion, btnElement) {
    clearInterval(timerInterval);

    const quiz = window.currentQuestion;
    const feedback = document.getElementById('quiz-feedback');
    const optionsDiv = document.getElementById('quiz-options');

    totalAttempts++;

    optionsDiv.querySelectorAll('.quiz-opt').forEach(b => {
        b.disabled = true;
        b.style.cursor = 'default';
    });

    if (seleccion === quiz.correct) {
        correctAttempts++;
        quizScore += 100 + (timeLeft * 2);
        quizStreak++;
        if (quizStreak > bestStreak) bestStreak = quizStreak;

        if (btnElement) {
            btnElement.classList.add('correct-anim');
        }

        feedback.innerHTML = `✅ ¡Correcto! +${100 + (timeLeft * 2)} pts<br><small>${quiz.explanation}</small>`;
        feedback.classList.remove('hidden', 'wrong');
        feedback.classList.add('correct');

        if (!completedEras.includes(currentQuizId)) {
            completedEras.push(currentQuizId);
        }

        const proximoId = currentQuizId + 1;
        const proximoCp = document.getElementById(`cp${proximoId}`);
        if (proximoCp) {
            setTimeout(() => {
                proximoCp.classList.remove('locked');
                proximoCp.classList.add('active');
                proximoCp.querySelector('.cp-status').innerText = '✓ Disponible';
                showToast("🎉 ¡Época desbloqueada!", `Ahora puedes acceder a la Era ${proximoId}`);
            }, 1500);
        }

        const currentCp = document.getElementById(`cp${currentQuizId}`);
        currentCp.classList.add('completed');
        currentCp.querySelector('.cp-status').innerText = '✅ Completada';

        if (quizStreak > 1) {
            document.getElementById('quiz-streak').innerHTML = `🔥 Racha de ${quizStreak} correctas!`;
        }

        setTimeout(() => {
            cerrarModal();
            actualizarProgreso();
        }, 2500);

    } else {
        quizStreak = 0;

        if (btnElement) {
            btnElement.classList.add('wrong-anim');
        }

        const correctBtn = optionsDiv.children[quiz.correct];
        if (correctBtn) correctBtn.classList.add('correct-anim');

        feedback.innerHTML = `❌ Incorrecto<br><small>${quiz.explanation}</small>`;
        feedback.classList.remove('hidden', 'correct');
        feedback.classList.add('wrong');

        setTimeout(() => {
            cerrarModal();
            actualizarProgreso();
        }, 2500);
    }

    actualizarScoreBoard();
}

function actualizarProgreso() {
    const total = 4;
    const completadas = completedEras.length;
    const pct = (completadas / total) * 100;

    document.getElementById('progress-text').innerText = `${completadas} / ${total} completadas`;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('stat-score').innerText = quizScore;
}

function actualizarScoreBoard() {
    document.getElementById('total-score').innerText = quizScore;
    document.getElementById('best-streak').innerText = bestStreak;
    const acc = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
    document.getElementById('accuracy').innerText = acc + '%';
}

function cerrarModal() {
    const modal = document.getElementById('quiz-modal');
    modal.classList.remove('open');
    modal.style.display = 'none';
    clearInterval(timerInterval);
}

function closeOnOverlay(event, modalId) {
    if (event.target.id === modalId) {
        if (modalId === 'quiz-modal') cerrarModal();
        if (modalId === 'slides-modal') cerrarSlides();
    }
}

// =============================================
// TOAST NOTIFICATIONS
// =============================================
function showToast(title, message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <strong>${title}</strong>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// RECURSOS / DIAPOSITIVAS - PDFs desde assets/
// =============================================
const recursosData = {
    1: {
        title: "Mesopotamia",
        icon: "🐫",
        desc: "Explora las maravillas de la ingeniería de Mesopotamia: su infraestructura innovadora y solución primaria de problemas.",
        pdf: "recurso1.pdf"
    },
    2: {
        title: "Egipto",
        icon: "🏺",
        desc: "Descubre la ingeniería egipcia: pirámides gigantes, sistemas hidráulicos y nuevas matemáticas que maracaron el antes y después.",
        pdf: "recurso2.pdf"
    },
    3: {
        title: "Grecia",
        icon: "🏛️",
        desc: "La ingeniería que cambió el mundo: palanca, geometría, pitágoras y los cimientos de la ingeniería moderna.",
        pdf: "recurso3.pdf"
    },
    4: {
        title: "Edad Media",
        icon: "⛪",
        desc: "El auge de la ingeniería medieval: fortalezas, arquitectura gótica y nuevas técnicas de construcción.",
        pdf: "recurso4.pdf"
    },
    5: {
        title: "Siglos XVIII - XIX",
        icon: "🏭",
        desc: "Máquina de vapor, producción en masa, ferrocarriles y el nacimiento de la industria moderna.",
        pdf: "recurso5.pdf"
    },
    6: {
        title: "Siglo XX",
        icon: "🔌",
        desc: "La era de la innovación tecnológica: electricidad, aviación, electrónica y el desarrollo de la ingeniería moderna.",
        pdf: "recurso6.pdf"
    },
    7: {
        title: "Siglo XXI",
        icon: "🤖",
        desc: "La era de la transformación digital: inteligencia artificial, automatización y tecnologías que redefinen la ingeniería del futuro.",
        pdf: "recurso7.pdf"
    }
};

function abrirDiapositivas(id) {
    const data = recursosData[id];
    document.getElementById('slides-badge').innerText = data.icon;
    document.getElementById('slides-title').innerText = data.title;
    document.getElementById('slides-desc').innerText = data.desc;

    // Cargar PDF directamente desde assets
    cargarPDF(`/assets/${data.pdf}`);

    const modal = document.getElementById('slides-modal');
    modal.style.display = 'flex';
    modal.classList.add('open');
}

function cargarPDF(url) {
    pdfCanvas = document.getElementById('pdf-canvas');
    pdfCtx = pdfCanvas.getContext('2d');

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(pdf => {
        pdfDoc = pdf;
        pdfPageNum = 1;
        renderPage(pdfPageNum);
        document.getElementById('pdf-page-info').innerText = `Página 1 de ${pdf.numPages}`;

        document.getElementById('slides-upload-zone').classList.add('hidden');
        document.getElementById('pdf-viewer').classList.remove('hidden');
    }).catch(err => {
        console.error('Error cargando PDF:', err);
        showToast("❌ Error", "No se pudo cargar el PDF. Verifica que exista en assets/");
    });
}

function cerrarSlides() {
    const modal = document.getElementById('slides-modal');
    modal.classList.remove('open');
    modal.style.display = 'none';

    // Reset para próxima vez
    setTimeout(() => {
        document.getElementById('slides-upload-zone').classList.remove('hidden');
        document.getElementById('pdf-viewer').classList.add('hidden');
        pdfDoc = null;
    }, 300);
}

function renderPage(num) {
    if (!pdfDoc) return;

    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale: pdfScale });
        pdfCanvas.height = viewport.height;
        pdfCanvas.width = viewport.width;

        const renderContext = {
            canvasContext: pdfCtx,
            viewport: viewport
        };
        page.render(renderContext);
    });
}

function prevPage() {
    if (pdfDoc && pdfPageNum > 1) {
        pdfPageNum--;
        renderPage(pdfPageNum);
        document.getElementById('pdf-page-info').innerText = `Página ${pdfPageNum} de ${pdfDoc.numPages}`;
    }
}

function nextPage() {
    if (pdfDoc && pdfPageNum < pdfDoc.numPages) {
        pdfPageNum++;
        renderPage(pdfPageNum);
        document.getElementById('pdf-page-info').innerText = `Página ${pdfPageNum} de ${pdfDoc.numPages}`;
    }
}

function zoomIn() {
    pdfScale += 0.25;
    renderPage(pdfPageNum);
}

function zoomOut() {
    if (pdfScale > 0.5) {
        pdfScale -= 0.25;
        renderPage(pdfPageNum);
    }
}

function resetZoom() {
    pdfScale = 1.5;
    renderPage(pdfPageNum);
}

// =============================================
// ASISTENTE IA - CONECTADO AL SERVIDOR
// =============================================
async function enviarMensaje() {
    const input = document.getElementById('user-input');
    const msgText = input.value.trim();
    if (msgText === "") return;

    const chatBox = document.getElementById('chat-box');
    const typingIndicator = document.getElementById('typing-indicator');

    // Mensaje usuario
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user';
    userDiv.innerHTML = `
        <div class="msg-bubble">${escapeHtml(msgText)}</div>
        <div class="msg-avatar user-avatar">👤</div>
    `;
    chatBox.appendChild(userDiv);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Mostrar typing
    typingIndicator.classList.remove('hidden');
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Llamar a TU servidor, no directamente a Groq
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: msgText })
        });

        const data = await response.json();
        typingIndicator.classList.add('hidden');

        const botDiv = document.createElement('div');
        botDiv.className = 'msg bot';
        
        if (data.response) {
            botDiv.innerHTML = `
                <div class="msg-avatar">⚙</div>
                <div class="msg-bubble">${data.response}</div>
            `;
        } else {
            // Si hay error, usar fallback local
            respuestaFallback(msgText, chatBox);
            return;
        }
        
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error('Error:', error);
        typingIndicator.classList.add('hidden');
        // Si falla la conexión, usar respuesta local
        respuestaFallback(msgText, chatBox);
    }
}

function respuestaFallback(msgText, chatBox) {
    const lower = msgText.toLowerCase();
    let respuesta = "Interesante pregunta sobre ingeniería. Para más detalles, consulta las diapositivas en el Banco de Información.";

    if (lower.includes("egipto") || lower.includes("antigua") || lower.includes("piramide")) {
        respuesta = "🏛 <strong>Edad Antigua:</strong> Los ingenieros egipcios destacaron por su precisión geométrica en las pirámides y el manejo del río Nilo. Usaron rampas, niveles de agua y un sistema de medición basado en el codo real (52.5 cm).";
    } else if (lower.includes("medieval") || lower.includes("media") || lower.includes("gotico") || lower.includes("catedral")) {
        respuesta = "⛪ <strong>Edad Media:</strong> La ingeniería medieval revolucionó la arquitectura con los arbotantes, que permitieron mayor altura en catedrales. Los molinos de viento y agua automatizaron procesos agrícolas e industriales.";
    } else if (lower.includes("industrial") || lower.includes("vapor") || lower.includes("ferrocarril")) {
        respuesta = "🔧 <strong>Revolución Industrial:</strong> La máquina de vapor de James Watt (1769) revolucionó la producción. El acero Bessemer y los ferrocarriles transformaron la infraestructura global.";
    } else if (lower.includes("moderna") || lower.includes("software") || lower.includes("ia") || lower.includes("inteligencia artificial")) {
        respuesta = "🤖 <strong>Era Moderna:</strong> La Ingeniería de Software nació en la década de 1960. Hoy usamos metodologías ágiles, DevOps, y herramientas como CI/CD. La IA está transformando cómo diseñamos y construimos sistemas.";
    } else if (lower.includes("ingenieria de software") || lower.includes("que es")) {
        respuesta = "💻 <strong>Ingeniería de Software</strong> es la aplicación sistemática de enfoques disciplinados para el desarrollo, operación y mantenimiento de software. Incluye requisitos, diseño, codificación, pruebas y gestión de proyectos.";
    } else if (lower.includes("ciclo de vida") || lower.includes("sdlc")) {
        respuesta = "🔄 <strong>Ciclo de Vida del Software (SDLC):</strong> 1) Planificación → 2) Análisis de requisitos → 3) Diseño → 4) Implementación → 5) Pruebas → 6) Despliegue → 7) Mantenimiento.";
    } else if (lower.includes("agil") || lower.includes("scrum") || lower.includes("devops")) {
        respuesta = "🚀 <strong>Metodologías Ágiles:</strong> Scrum usa sprints de 2-4 semanas. DevOps integra desarrollo y operaciones con CI/CD. Estos enfoques priorizan la entrega continua de valor al cliente.";
    } else if (lower.includes("hola") || lower.includes("buenas") || lower.includes("hey")) {
        respuesta = "¡Hola! 👋 Soy tu asistente de <strong>Introducción a la Ingeniería de Software</strong>. Puedo ayudarte con:<br><br>🏛 Historia de la ingeniería<br>🔧 Conceptos técnicos<br>🤖 Ingeniería moderna y Software<br><br>¿Qué quieres explorar hoy?";
    }

    const botDiv = document.createElement('div');
    botDiv.className = 'msg bot';
    botDiv.innerHTML = `
        <div class="msg-avatar">⚙</div>
        <div class="msg-bubble">${respuesta}</div>
    `;
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    actualizarProgreso();
    actualizarScoreBoard();

    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
});
// =============================================
// MINE CART GAME - CARRITO DEL INGENIERO
// =============================================

const GAME_QUESTIONS = {
    1: {
        era: "🏛 Edad Antigua",
        color: "#f59e0b",
        questions: [
            { q: "¿Qué civilización construyó las pirámides de Giza?", opts: ["Romanos", "Egipcios", "Griegos", "Aztecas"], ans: 1 },
            { q: "¿Qué herramienta inventó Arquímedes para elevar agua?", opts: ["La Palanca", "El Tornillo", "La Rueda", "El Arado"], ans: 1 },
            { q: "¿Cuál era la función principal de los acueductos romanos?", opts: ["Irrigación agrícola", "Llevar agua a ciudades", "Defensa militar", "Comercio fluvial"], ans: 1 },
            { q: "¿De qué material construían los mesopotámicos sus edificios?", opts: ["Granito", "Mármol", "Adobe de barro", "Madera"], ans: 2 },
            { q: "¿Qué principio usa la palanca de Arquímedes?", opts: ["Gravedad", "Fuerza y distancia", "Fricción", "Flotabilidad"], ans: 1 },
            { q: "¿Cuántos lados tiene una pirámide cuadrangular egipcia?", opts: ["3", "4", "5", "6"], ans: 1 },
        ]
    },
    2: {
        era: "⛪ Edad Media",
        color: "#8b5cf6",
        questions: [
            { q: "¿Qué elemento sostiene las bóvedas en catedrales góticas desde afuera?", opts: ["Columnas", "Arbotantes", "Pilares", "Contrafuertes planos"], ans: 1 },
            { q: "¿Para qué usaban principalmente los molinos de viento medievales?", opts: ["Generar electricidad", "Moler grano", "Bombear aceite", "Hacer papel"], ans: 1 },
            { q: "¿Qué caracteriza el arco ojival del gótico?", opts: ["Es semicircular", "Termina en punta", "Es horizontal", "Es de madera"], ans: 1 },
            { q: "¿Qué materiales usaban para construir castillos medievales?", opts: ["Ladrillo y vidrio", "Piedra y madera", "Acero y hormigón", "Adobe y paja"], ans: 1 },
            { q: "¿Cómo se llamaba el gremio de constructores medievales?", opts: ["Liga de Ingenieros", "Hermandad de Canteros", "Cofradía de Albañiles", "Gremio de Maestros"], ans: 1 },
            { q: "¿Qué avance permitió construir catedrales más altas?", opts: ["Nuevos metales", "El arco apuntado y arbotantes", "Cemento moderno", "Grúas eléctricas"], ans: 1 },
        ]
    },
    3: {
        era: "🔧 Rev. Industrial",
        color: "#10b981",
        questions: [
            { q: "¿Quién perfeccionó la máquina de vapor en 1769?", opts: ["Newton", "James Watt", "Edison", "Faraday"], ans: 1 },
            { q: "¿Qué metal fue clave en la Revolución Industrial para estructuras?", opts: ["Oro", "Cobre", "Hierro y Acero", "Aluminio"], ans: 2 },
            { q: "¿Qué transporte masivo surgió gracias al vapor?", opts: ["Avión", "Ferrocarril", "Automóvil", "Barco de remos"], ans: 1 },
            { q: "¿Cómo se llama el proceso Bessemer mencionado en ingeniería?", opts: ["Fundir oro", "Producir acero barato", "Refinar petróleo", "Fabricar vidrio"], ans: 1 },
            { q: "¿Qué fuente energética dominó la Primera Revolución Industrial?", opts: ["Petróleo", "Gas natural", "Carbón y vapor", "Energía solar"], ans: 2 },
            { q: "¿En qué período inició la Revolución Industrial?", opts: ["1600-1650", "1760-1840", "1850-1900", "1900-1950"], ans: 1 },
        ]
    },
    4: {
        era: "🤖 Era Moderna",
        color: "#4f9cf9",
        questions: [
            { q: "¿Qué lenguaje domina el desarrollo de IA y ciencia de datos?", opts: ["COBOL", "Python", "Pascal", "Fortran"], ans: 1 },
            { q: "¿Qué metodología usa sprints de 2-4 semanas en desarrollo?", opts: ["Cascada", "Scrum", "UML", "RUP"], ans: 1 },
            { q: "¿Qué significa 'CI/CD' en Ingeniería de Software?", opts: ["Código Interno / Código Distribuido", "Integración Continua / Entrega Continua", "Control Interno / Control Dinámico", "Ciclo Iterativo / Ciclo Dinámico"], ans: 1 },
            { q: "¿Qué es el 'Machine Learning' o Aprendizaje Automático?", opts: ["Programar manualmente reglas", "Sistemas que aprenden de datos", "Hardware más rápido", "Una base de datos avanzada"], ans: 1 },
            { q: "¿Qué protocolo permite la comunicación en Internet?", opts: ["USB", "TCP/IP", "HDMI", "Bluetooth"], ans: 1 },
            { q: "¿Cuál fue el primer lenguaje de programación de alto nivel?", opts: ["Python", "C++", "FORTRAN", "Java"], ans: 2 },
        ]
    }
};

// Game state
let MG = {
    canvas: null, ctx: null,
    running: false,
    selectedEra: 1,
    score: 0, lives: 3, combo: 0, maxCombo: 0,
    correctCount: 0, totalQuestions: 0,
    distance: 0,
    questions: [], qIndex: 0,
    phase: 'idle', // idle | running | question | crash | win
    // Cart position
    cartX: 0, cartY: 0,
    cartVX: 0, cartVY: 0,
    cameraX: 0,
    // Track
    track: [],
    // Animation
    frame: 0,
    crashAnim: 0,
    winAnim: 0,
    // Input
    keys: {},
    // Question state
    questionTimer: 0, questionDuration: 8,
    selectedOption: -1, // -1=none, 0=left, 1=right
    answerLocked: false,
    answerResult: null, // 'correct'|'wrong'
    answerFlashTimer: 0,
    // Track segments
    segments: [],
    segIndex: 0,
    // Particles
    particles: [],
    // Environment scroll speed
    speed: 3.5,
    // Question upcoming flag
    nextQuestionAt: 800,
    bifurcationShown: false,
    // Timer
    raf: null,
};

function initMineGame() {
    MG.canvas = document.getElementById('game-canvas');
    MG.ctx = MG.canvas.getContext('2d');
    resizeGameCanvas();

    // Era buttons
    document.querySelectorAll('.era-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.era-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            MG.selectedEra = parseInt(btn.dataset.era);
        });
    });

    document.getElementById('start-game-btn').addEventListener('click', startMineGame);
    document.getElementById('restart-game-btn').addEventListener('click', restartMineGame);
    document.getElementById('win-restart-btn').addEventListener('click', restartMineGame);

    window.addEventListener('resize', resizeGameCanvas);
    window.addEventListener('keydown', onGameKey);
    window.addEventListener('keyup', (e) => { MG.keys[e.key] = false; });

    // Draw idle background
    drawIdleScreen();
    renderStartSVG();
}

function resizeGameCanvas() {
    if (!MG.canvas) return;
    const container = document.getElementById('game-container');
    MG.canvas.width = container.clientWidth;
    MG.canvas.height = container.clientHeight;
}

function startMineGame() {
    const qData = GAME_QUESTIONS[MG.selectedEra];
    MG.questions = [...qData.questions].sort(() => Math.random() - 0.5);
    MG.qIndex = 0;
    MG.score = 0; MG.lives = 3; MG.combo = 0; MG.maxCombo = 0;
    MG.correctCount = 0; MG.totalQuestions = 0;
    MG.distance = 0;
    MG.frame = 0;
    MG.speed = 3.5;
    MG.particles = [];
    MG.crashAnim = 0; MG.winAnim = 0;
    MG.selectedOption = -1;
    MG.answerLocked = false;
    MG.answerResult = null;
    MG.answerFlashTimer = 0;
    MG.bifurcationShown = false;
    MG.phase = 'running';
    MG.nextQuestionAt = 600;

    // Cart start position
    MG.cartX = 120;
    MG.cartY = MG.canvas.height * 0.55;
    MG.cartVY = 0;
    MG.cameraX = 0;

    // Generate track
    generateTrack();

    showScreen(null);
    document.getElementById('game-hud').classList.remove('hidden');
    updateHUD();

    if (MG.raf) cancelAnimationFrame(MG.raf);
    MG.running = true;
    gameLoop();
}

function restartMineGame() {
    showScreen('screen-start');
    document.getElementById('game-hud').classList.add('hidden');
    if (MG.raf) cancelAnimationFrame(MG.raf);
    MG.running = false;
    drawIdleScreen();
}

function generateTrack() {
    const W = MG.canvas.width, H = MG.canvas.height;
    MG.track = [];
    let x = 0, y = H * 0.55;
    const segW = 60;
    // Generate ~400 segments of track with hills
    for (let i = 0; i < 400; i++) {
        const t = i / 400;
        // Roller-coaster curve: goes down, up, down
        const base = H * 0.55 + Math.sin(t * Math.PI * 6) * H * 0.12 + t * H * 0.08;
        MG.track.push({ x: i * segW, y: Math.min(base, H * 0.78) });
    }
}

function getTrackYAt(worldX) {
    const segW = 60;
    const idx = Math.floor(worldX / segW);
    if (idx < 0) return MG.canvas.height * 0.55;
    if (idx >= MG.track.length - 1) return MG.track[MG.track.length - 1].y;
    const t = (worldX / segW) - idx;
    return MG.track[idx].y * (1 - t) + MG.track[idx + 1].y * t;
}

function showScreen(id) {
    document.querySelectorAll('.game-screen').forEach(s => s.classList.add('hidden'));
    if (id) document.getElementById(id).classList.remove('hidden');
}

function updateHUD() {
    const eraData = GAME_QUESTIONS[MG.selectedEra];
    document.getElementById('hud-era').textContent = eraData.era;
    const hearts = '❤️'.repeat(MG.lives) + '🖤'.repeat(3 - MG.lives);
    document.getElementById('hud-lives').textContent = hearts;
    document.getElementById('hud-score').textContent = MG.score;
}

function onGameKey(e) {
    MG.keys[e.key] = true;
    if (!MG.running) return;
    if (MG.phase === 'question' && !MG.answerLocked) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            selectAnswer(0);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            selectAnswer(1);
        }
    }
}

function selectAnswer(optionIndex) {
    if (MG.answerLocked || MG.phase !== 'question') return;
    MG.answerLocked = true;
    MG.selectedOption = optionIndex;
    const q = MG.questions[MG.qIndex % MG.questions.length];
    const correctOpt = q.ans <= 1 ? 0 : 1; // left=0, right=1 (we map correct answer to a side)
    const isCorrect = (optionIndex === MG.questionCorrectSide);

    MG.totalQuestions++;
    if (isCorrect) {
        MG.correctCount++;
        MG.combo++;
        if (MG.combo > MG.maxCombo) MG.maxCombo = MG.combo;
        const pts = 100 + (MG.combo - 1) * 25;
        MG.score += pts;
        MG.answerResult = 'correct';
        spawnParticles(MG.cartX - MG.cameraX, MG.cartY, '#10b981', 12);
    } else {
        MG.combo = 0;
        MG.lives--;
        MG.answerResult = 'wrong';
        spawnParticles(MG.cartX - MG.cameraX, MG.cartY, '#ef4444', 12);
    }

    MG.answerFlashTimer = 60;

    // Flash choices
    const choices = document.querySelectorAll('.gq-choice');
    if (choices.length >= 2) {
        choices[MG.questionCorrectSide].classList.add('correct-flash');
        if (!isCorrect) choices[optionIndex].classList.add('wrong-flash');
    }

    setTimeout(() => {
        showScreen(null);
        updateHUD();
        MG.phase = 'running';
        MG.qIndex++;
        MG.nextQuestionAt = MG.distance + 700 + Math.random() * 300;
        MG.bifurcationShown = false;

        if (MG.lives <= 0) {
            triggerGameOver("¡Respondiste mal demasiadas veces!");
        } else if (MG.qIndex >= MG.questions.length) {
            triggerWin();
        }
    }, 1100);
}

function triggerGameOver(reason) {
    MG.phase = 'crash';
    MG.running = false;
    setTimeout(() => {
        document.getElementById('game-hud').classList.add('hidden');
        document.getElementById('go-score').textContent = MG.score;
        document.getElementById('go-correct').textContent = MG.correctCount;
        document.getElementById('go-dist').textContent = Math.floor(MG.distance / 60) + 'm';
        document.getElementById('go-reason').textContent = reason;
        showScreen('screen-gameover');
        renderGoSVG();
    }, 1800);
}

function triggerWin() {
    MG.phase = 'win';
    MG.running = false;
    setTimeout(() => {
        document.getElementById('game-hud').classList.add('hidden');
        document.getElementById('win-score').textContent = MG.score;
        document.getElementById('win-correct').textContent = MG.correctCount;
        document.getElementById('win-combo').textContent = MG.maxCombo + 'x';
        showScreen('screen-win');
        renderWinSVG();
    }, 1200);
}

function spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        MG.particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6 - 2,
            color, life: 40, maxLife: 40,
            size: 3 + Math.random() * 4
        });
    }
}

function gameLoop() {
    if (!MG.running && MG.phase !== 'crash' && MG.phase !== 'win') return;
    MG.raf = requestAnimationFrame(gameLoop);
    MG.frame++;
    update();
    render();
}

function update() {
    if (MG.phase === 'running') {
        // Move cart forward
        MG.cartX += MG.speed;
        MG.distance += MG.speed;
        MG.cameraX = MG.cartX - MG.canvas.width * 0.3;
        // Track follow
        const targetY = getTrackYAt(MG.cartX) - 28;
        MG.cartY += (targetY - MG.cartY) * 0.2;
        // Speed up gradually
        MG.speed = Math.min(6.5, MG.speed + 0.001);
        // Check if question time
        if (MG.distance >= MG.nextQuestionAt && !MG.bifurcationShown) {
            MG.bifurcationShown = true;
            showQuestion();
        }
    } else if (MG.phase === 'crash') {
        MG.crashAnim++;
        MG.cartX += MG.speed * 0.5;
        MG.cartY += 2;
        MG.cameraX = MG.cartX - MG.canvas.width * 0.3;
        MG.speed *= 0.97;
        spawnParticles(MG.cartX - MG.cameraX, MG.cartY, '#f59e0b', 1);
        spawnParticles(MG.cartX - MG.cameraX, MG.cartY, '#ef4444', 1);
    } else if (MG.phase === 'win') {
        MG.winAnim++;
        MG.cartX += MG.speed * 0.5;
        MG.cameraX = MG.cartX - MG.canvas.width * 0.3;
        MG.speed *= 0.98;
        spawnParticles(MG.cartX - MG.cameraX, MG.cartY - 20, '#4f9cf9', 2);
        spawnParticles(MG.cartX - MG.cameraX, MG.cartY - 20, '#f59e0b', 1);
    }
    // Update particles
    MG.particles = MG.particles.filter(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.15;
        p.life--;
        return p.life > 0;
    });
    if (MG.answerFlashTimer > 0) MG.answerFlashTimer--;
}

function showQuestion() {
    MG.phase = 'question';
    const q = MG.questions[MG.qIndex % MG.questions.length];
    MG.questionTimer = MG.questionDuration;
    MG.answerLocked = false;
    MG.selectedOption = -1;
    MG.answerResult = null;

    // Randomly assign correct answer to left or right option
    MG.questionCorrectSide = Math.round(Math.random()); // 0=left, 1=right
    const correctText = q.opts[q.ans];
    // Pick a random wrong answer
    const wrongOpts = q.opts.filter((_, i) => i !== q.ans);
    const wrongText = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];

    const leftText = MG.questionCorrectSide === 0 ? correctText : wrongText;
    const rightText = MG.questionCorrectSide === 1 ? correctText : wrongText;

    const eraData = GAME_QUESTIONS[MG.selectedEra];
    document.getElementById('gq-era-tag').textContent = eraData.era;
    document.getElementById('gq-text').textContent = q.q;

    const choicesEl = document.getElementById('gq-choices');
    choicesEl.innerHTML = `
        <button class="gq-choice" onclick="selectAnswer(0)">⬅ ${leftText}</button>
        <button class="gq-choice" onclick="selectAnswer(1)">${rightText} ➡</button>
    `;

    showScreen('screen-question');

    // Timer countdown
    let elapsed = 0;
    const timerFill = document.getElementById('gq-timer-fill');
    const interval = setInterval(() => {
        if (MG.phase !== 'question' || MG.answerLocked) { clearInterval(interval); return; }
        elapsed += 0.1;
        const pct = Math.max(0, 1 - elapsed / MG.questionDuration) * 100;
        timerFill.style.width = pct + '%';
        timerFill.style.background = pct > 50 ? 'linear-gradient(90deg,#10b981,#4f9cf9)' : pct > 25 ? 'linear-gradient(90deg,#f59e0b,#ef4444)' : '#ef4444';
        if (elapsed >= MG.questionDuration && !MG.answerLocked) {
            clearInterval(interval);
            selectAnswer(MG.questionCorrectSide === 0 ? 1 : 0); // auto-wrong
        }
    }, 100);
}

// =============================================
// RENDER
// =============================================
function render() {
    const ctx = MG.ctx;
    const W = MG.canvas.width, H = MG.canvas.height;
    ctx.clearRect(0, 0, W, H);

    drawBackground(ctx, W, H);
    drawTrack(ctx, W, H);
    drawEnvironment(ctx, W, H);
    drawCart(ctx, W, H);
    drawParticles(ctx);

    if (MG.phase === 'crash' && MG.crashAnim > 0) {
        drawCrashEffect(ctx, W, H);
    }
    if (MG.phase === 'win') {
        drawWinEffect(ctx, W, H);
    }
}

function drawIdleScreen() {
    if (!MG.canvas) return;
    const ctx = MG.ctx;
    const W = MG.canvas.width, H = MG.canvas.height;
    if (!W || !H) return;
    drawBackground(ctx, W, H);
    // Draw static cart
    drawCartAt(ctx, W * 0.45, H * 0.52, 0, false);
    // Draw static track
    ctx.strokeStyle = '#8b7355';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 0; x < W; x += 2) {
        const y = H * 0.55 + Math.sin(x * 0.015) * 20;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
}

function drawBackground(ctx, W, H) {
    // Sky gradient - anime style
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#0a0d14');
    sky.addColorStop(0.4, '#141928');
    sky.addColorStop(1, '#1a2035');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    const seed = Math.floor(MG.frame * 0.01);
    for (let i = 0; i < 60; i++) {
        const sx = ((i * 137.5 + seed) % W);
        const sy = (i * 73.1) % (H * 0.5);
        const twinkle = Math.sin(MG.frame * 0.04 + i) * 0.5 + 0.5;
        ctx.globalAlpha = twinkle * 0.7;
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Moon
    ctx.fillStyle = '#fffde7';
    ctx.shadowColor = '#fffde7';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(W * 0.85, H * 0.12, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#141928';
    ctx.beginPath();
    ctx.arc(W * 0.85 + 10, H * 0.12 - 4, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Distant mountains - parallax
    drawMountains(ctx, W, H, MG.cameraX * 0.15);
    drawMountains2(ctx, W, H, MG.cameraX * 0.25);
}

function drawMountains(ctx, W, H, offset) {
    ctx.fillStyle = 'rgba(20,30,60,0.8)';
    ctx.beginPath();
    ctx.moveTo(-offset % W, H);
    for (let x = 0; x <= W + 200; x += 80) {
        const mx = x - (offset % (W + 200));
        const my = H * 0.45 + Math.sin(x * 0.022 + 1) * H * 0.12;
        ctx.lineTo(mx, my);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
}

function drawMountains2(ctx, W, H, offset) {
    ctx.fillStyle = 'rgba(15,20,40,0.9)';
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W + 200; x += 60) {
        const mx = x - (offset % (W + 200));
        const my = H * 0.52 + Math.sin(x * 0.018 + 3) * H * 0.1;
        ctx.lineTo(mx, my);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
}

function drawEnvironment(ctx, W, H) {
    // Era-specific decorations - drawn relative to camera
    const eraColor = GAME_QUESTIONS[MG.selectedEra]?.color || '#4f9cf9';
    const spacing = 350;

    for (let i = 0; i < 25; i++) {
        const worldX = i * spacing - (MG.cameraX % spacing) + (MG.cameraX - (MG.cameraX % spacing));
        const screenX = worldX - MG.cameraX;
        if (screenX < -200 || screenX > W + 200) continue;

        const trackY = getTrackYAt(worldX + MG.cameraX);
        drawEraDecor(ctx, screenX, trackY, eraColor, MG.selectedEra, i);
    }

    // Ground below track
    const grd = ctx.createLinearGradient(0, H * 0.7, 0, H);
    grd.addColorStop(0, 'rgba(20,30,20,0.6)');
    grd.addColorStop(1, 'rgba(10,15,10,0.9)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(0, H);

    // Draw track ground fill
    for (let x = 0; x <= W; x += 4) {
        const worldX = x + MG.cameraX;
        const y = getTrackYAt(worldX);
        x === 0 ? ctx.moveTo(x, y + 6) : ctx.lineTo(x, y + 6);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fill();
}

function drawEraDecor(ctx, x, y, color, era, idx) {
    ctx.save();
    ctx.translate(x, y - 10);

    if (era === 1) { // Pyramids/columns
        if (idx % 2 === 0) {
            // Mini pyramid
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.moveTo(0, 0); ctx.lineTo(-25, -45); ctx.lineTo(25, -45);
            ctx.closePath(); ctx.fill();
            ctx.globalAlpha = 0.7;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        } else {
            // Column
            ctx.fillStyle = 'rgba(200,180,120,0.3)';
            ctx.globalAlpha = 0.5;
            ctx.fillRect(-8, -60, 16, 60);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.strokeRect(-8, -60, 16, 60);
        }
    } else if (era === 2) { // Arch/castle
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-20, 0); ctx.lineTo(-20, -50);
        ctx.arc(0, -50, 20, Math.PI, 0);
        ctx.lineTo(20, 0);
        ctx.stroke();
    } else if (era === 3) { // Chimney smoke
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#555';
        ctx.fillRect(-5, -70, 10, 70);
        // Smoke puffs
        for (let s = 0; s < 3; s++) {
            const sy = -75 - s * 18 + ((MG.frame * 0.5 + s * 10) % 18);
            ctx.fillStyle = `rgba(150,150,150,${0.3 - s * 0.08})`;
            ctx.beginPath();
            ctx.arc(s % 2 === 0 ? 0 : 8, sy, 10 + s * 4, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (era === 4) { // Server/antenna
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(0, -60);
        ctx.stroke();
        // Signal rings
        for (let r = 1; r <= 3; r++) {
            ctx.globalAlpha = 0.2 + (Math.sin(MG.frame * 0.05 + r) * 0.1);
            ctx.beginPath();
            ctx.arc(0, -60, r * 12, -Math.PI * 0.8, -Math.PI * 0.2);
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawTrack(ctx, W, H) {
    // Draw rail ties (sleepers)
    ctx.strokeStyle = '#5c4a2a';
    ctx.lineWidth = 3;
    for (let i = 0; i < 40; i++) {
        const worldX = Math.floor((MG.cameraX + i * (W / 15)) / 40) * 40 + i * 2;
        const screenX = worldX - MG.cameraX;
        if (screenX < -20 || screenX > W + 20) continue;
        const ty = getTrackYAt(worldX);
        ctx.save();
        ctx.translate(screenX, ty);
        // Get slope angle
        const ty2 = getTrackYAt(worldX + 5);
        const angle = Math.atan2(ty2 - ty, 5);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-14, 5); ctx.lineTo(14, 5);
        ctx.stroke();
        ctx.restore();
    }

    // Main rails (two parallel lines)
    for (let rail = -1; rail <= 1; rail += 2) {
        ctx.strokeStyle = rail === -1 ? '#b8860b' : '#d4a017';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        let first = true;
        for (let x = 0; x <= W + 60; x += 3) {
            const worldX = x + MG.cameraX;
            const y = getTrackYAt(worldX) + rail * 5;
            if (first) { ctx.moveTo(x, y); first = false; }
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    ctx.shadowBlur = 0;
}

function drawCart(ctx, W, H) {
    const screenX = MG.cartX - MG.cameraX;
    const trackY = getTrackYAt(MG.cartX);
    const trackY2 = getTrackYAt(MG.cartX + 10);
    const angle = Math.atan2(trackY2 - trackY, 10);
    const wobble = MG.phase === 'crash' ? Math.sin(MG.crashAnim * 0.5) * 0.3 : 0;
    drawCartAt(ctx, screenX, trackY - 2, angle + wobble, MG.phase === 'crash');
}

function drawCartAt(ctx, x, y, angle, crashed) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const cartW = 52, cartH = 30;

    if (crashed) {
        ctx.rotate(Math.min(MG.crashAnim * 0.06, Math.PI * 0.4));
        ctx.globalAlpha = Math.max(0.2, 1 - MG.crashAnim / 40);
    }

    // Cart body - anime style with thick outlines
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(-cartW/2 + 3, 3, cartW, cartH);

    // Main body
    const bodyGrad = ctx.createLinearGradient(-cartW/2, -cartH, cartW/2, 0);
    bodyGrad.addColorStop(0, '#6b7280');
    bodyGrad.addColorStop(0.5, '#9ca3af');
    bodyGrad.addColorStop(1, '#4b5563');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    roundRect(ctx, -cartW/2, -cartH, cartW, cartH, 4);
    ctx.fill();

    // Anime outline
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Cart rim shine
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(-cartW/2 + 4, -cartH + 3, cartW - 8, 5);

    // Wheels - big anime style
    [-cartW/2 + 12, cartW/2 - 12].forEach(wx => {
        const wheelRot = (MG.cartX / 30) % (Math.PI * 2);
        ctx.save();
        ctx.translate(wx, 2);
        ctx.rotate(crashed ? 0 : wheelRot);
        // Wheel
        ctx.fillStyle = '#374151';
        ctx.beginPath(); ctx.arc(0, 0, 11, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.stroke();
        // Rim
        ctx.fillStyle = '#6b7280';
        ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill();
        // Spokes
        ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2;
        for (let s = 0; s < 4; s++) {
            const a = (s / 4) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * 2, Math.sin(a) * 2);
            ctx.lineTo(Math.cos(a) * 6, Math.sin(a) * 6);
            ctx.stroke();
        }
        // Center bolt
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.arc(0, 0, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
    });

    // Engineer character - anime style
    drawEngineer(ctx, 0, -cartH - 2, crashed);

    // Speed lines
    if (MG.phase === 'running' && MG.speed > 4) {
        ctx.strokeStyle = 'rgba(79,156,249,0.3)';
        ctx.lineWidth = 1.5;
        for (let l = 0; l < 3; l++) {
            const ly = -cartH * 0.3 + l * 8;
            ctx.beginPath();
            ctx.moveTo(-cartW/2 - 30 - l * 10, ly);
            ctx.lineTo(-cartW/2 - 5, ly);
            ctx.stroke();
        }
    }

    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawEngineer(ctx, x, y, crashed) {
    ctx.save();
    ctx.translate(x, y);

    // Bounce animation
    const bounce = MG.phase === 'running' ? Math.sin(MG.frame * 0.25) * 2 : 0;
    ctx.translate(0, bounce);

    if (crashed && MG.crashAnim > 5) {
        ctx.rotate(-0.8);
        ctx.translate(10, 5);
    }

    // Helmet - hard hat anime style
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(0, -28, 12, 8, 0, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();
    // Helmet brim
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-13, -22, 26, 4);
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; ctx.stroke();
    // Helmet shine
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.ellipse(-3, -27, 5, 3, -0.3, 0, Math.PI); ctx.fill();

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath(); ctx.ellipse(0, -16, 9, 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();

    // Eyes - anime big eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(-3.5, -17, 3, 3.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(3.5, -17, 3, 3.5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = crashed ? '#ef4444' : '#1e40af';
    ctx.beginPath(); ctx.arc(-3.5, -17, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(3.5, -17, 2, 0, Math.PI * 2); ctx.fill();
    // Eye shine
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-2.5, -18, 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(4.5, -18, 0.8, 0, Math.PI * 2); ctx.fill();

    // Mouth
    if (crashed) {
        ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, -11, 3, 0, Math.PI); ctx.stroke();
    } else {
        ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, -14, 3, 0, Math.PI, true); ctx.stroke();
    }

    // Body - overalls
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    roundRect(ctx, -8, -8, 16, 16, 3);
    ctx.fill();
    ctx.strokeStyle = '#1e3a8a'; ctx.lineWidth = 1.5; ctx.stroke();
    // Pocket
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(-5, -6, 6, 5);
    // Overall straps
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-4, -8); ctx.lineTo(-5, -18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4, -8); ctx.lineTo(5, -18); ctx.stroke();

    // Arms - animated
    const armSwing = MG.phase === 'running' ? Math.sin(MG.frame * 0.25) * 0.5 : 0;
    ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-7, -5);
    ctx.lineTo(-13 + armSwing * 3, 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(7, -5);
    ctx.lineTo(13 - armSwing * 3, 2);
    ctx.stroke();

    ctx.restore();
}

function drawParticles(ctx) {
    MG.particles.forEach(p => {
        const alpha = p.life / p.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

function drawCrashEffect(ctx, W, H) {
    // Flash effect
    if (MG.crashAnim < 8) {
        ctx.fillStyle = `rgba(239,68,68,${0.4 - MG.crashAnim * 0.05})`;
        ctx.fillRect(0, 0, W, H);
    }
    // CRASH text
    if (MG.crashAnim > 5 && MG.crashAnim < 60) {
        const scale = Math.min(1, (MG.crashAnim - 5) / 10);
        ctx.save();
        ctx.translate(MG.cartX - MG.cameraX, MG.cartY - 60);
        ctx.scale(scale, scale);
        ctx.font = 'bold 36px "Syne", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 20;
        ctx.fillText('💥 CRASH!', 0, 0);
        ctx.shadowBlur = 0;
        ctx.restore();
    }
    // Stars circling
    if (MG.crashAnim > 10) {
        for (let s = 0; s < 5; s++) {
            const a = (MG.crashAnim * 0.12 + s * (Math.PI * 2 / 5));
            const sx = MG.cartX - MG.cameraX + Math.cos(a) * 30;
            const sy = MG.cartY - 50 + Math.sin(a) * 20;
            ctx.font = '18px serif';
            ctx.textAlign = 'center';
            ctx.fillText('⭐', sx, sy);
        }
    }
}

function drawWinEffect(ctx, W, H) {
    // Confetti
    for (let i = 0; i < 8; i++) {
        const a = MG.winAnim * 0.1 + i;
        const rx = W * 0.5 + Math.cos(a * 0.7) * W * 0.35;
        const ry = ((MG.winAnim * 2 + i * 80) % H);
        ctx.fillStyle = ['#f59e0b','#4f9cf9','#10b981','#7c3aed','#ef4444'][i % 5];
        ctx.fillRect(rx, ry, 6, 10);
    }
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function renderGoSVG() {
    document.getElementById('go-crash-svg').innerHTML = `
        <svg width="120" height="90" viewBox="0 0 120 90">
            <text x="60" y="55" font-size="60" text-anchor="middle">💥</text>
        </svg>`;
}

function renderWinSVG() {
    document.getElementById('win-svg').innerHTML = `
        <svg width="120" height="90" viewBox="0 0 120 90">
            <text x="60" y="55" font-size="60" text-anchor="middle">🏆</text>
        </svg>`;
}

// Init game when juego section loads
document.addEventListener('DOMContentLoaded', () => {
    // Lazy init game when section is shown
    const origGoTo = window.goToSection;
    const patchedGoTo = function(sectionId) {
        origGoTo(sectionId);
        if (sectionId === 'juego' && !MG.canvas) {
            setTimeout(initMineGame, 100);
        }
    };
    window.goToSection = patchedGoTo;

    // Also handle direct nav clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (link.dataset.section === 'juego' && !MG.canvas) {
                setTimeout(initMineGame, 150);
            }
        });
    });
});

// Render start screen SVG
function renderStartSVG() {
    const el = document.getElementById('start-anim-svg');
    if (!el) return;
    el.innerHTML = `<svg width="120" height="90" viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg">
      <!-- Cart -->
      <rect x="30" y="52" width="60" height="28" rx="5" fill="#6b7280" stroke="#1f2937" stroke-width="2"/>
      <rect x="32" y="54" width="56" height="6" rx="2" fill="rgba(255,255,255,0.15)"/>
      <!-- Wheels -->
      <circle cx="45" cy="80" r="10" fill="#374151" stroke="#111" stroke-width="2"/>
      <circle cx="45" cy="80" r="6" fill="#6b7280"/>
      <circle cx="45" cy="80" r="2" fill="#f59e0b"/>
      <circle cx="75" cy="80" r="10" fill="#374151" stroke="#111" stroke-width="2"/>
      <circle cx="75" cy="80" r="6" fill="#6b7280"/>
      <circle cx="75" cy="80" r="2" fill="#f59e0b"/>
      <!-- Track -->
      <line x1="0" y1="90" x2="120" y2="90" stroke="#b8860b" stroke-width="3"/>
      <!-- Engineer -->
      <!-- Hard hat -->
      <ellipse cx="60" cy="28" rx="13" ry="9" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>
      <rect x="47" y="35" width="26" height="4" rx="1" fill="#d97706" stroke="#92400e" stroke-width="1"/>
      <!-- Head -->
      <ellipse cx="60" cy="42" rx="9" ry="10" fill="#fde68a" stroke="#92400e" stroke-width="1.5"/>
      <!-- Eyes -->
      <ellipse cx="56" cy="41" rx="3" ry="3.5" fill="white"/>
      <ellipse cx="64" cy="41" rx="3" ry="3.5" fill="white"/>
      <circle cx="56" cy="41" r="2" fill="#1e40af"/>
      <circle cx="64" cy="41" r="2" fill="#1e40af"/>
      <circle cx="56.8" cy="40" r="0.8" fill="white"/>
      <circle cx="64.8" cy="40" r="0.8" fill="white"/>
      <!-- Smile -->
      <path d="M57,47 Q60,50 63,47" stroke="#92400e" stroke-width="1.5" fill="none"/>
      <!-- Body -->
      <rect x="52" y="52" width="16" height="14" rx="3" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1.5"/>
      <!-- Arms -->
      <line x1="52" y1="56" x2="42" y2="62" stroke="#fde68a" stroke-width="4" stroke-linecap="round"/>
      <line x1="68" y1="56" x2="78" y2="62" stroke="#fde68a" stroke-width="4" stroke-linecap="round"/>
      <!-- Speed lines anim -->
      <line x1="0" y1="58" x2="25" y2="58" stroke="rgba(79,156,249,0.4)" stroke-width="2" stroke-dasharray="4 4">
        <animate attributeName="x1" values="0;20;0" dur="0.8s" repeatCount="indefinite"/>
      </line>
      <line x1="0" y1="65" x2="20" y2="65" stroke="rgba(79,156,249,0.3)" stroke-width="1.5" stroke-dasharray="3 5">
        <animate attributeName="x1" values="5;25;5" dur="1s" repeatCount="indefinite"/>
      </line>
    </svg>`;
}