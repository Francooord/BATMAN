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
        title: "Edad Antigua",
        icon: "🏛",
        desc: "Explora las maravillas de la ingeniería antigua: desde las pirámides de Egipto hasta los acueductos romanos. Este material cubre 3000 a.C. hasta 500 d.C.",
        pdf: "recurso1.pdf"
    },
    2: {
        title: "Edad Media",
        icon: "⛪",
        desc: "Descubre la ingeniería medieval: catedrales góticas, castillos fortificados, molinos de viento y los primeros puentes de piedra.",
        pdf: "recurso2.pdf"
    },
    3: {
        title: "Revolución Industrial",
        icon: "🔧",
        desc: "La revolución que cambió el mundo: máquina de vapor, ferrocarriles, producción en masa y los cimientos de la ingeniería moderna.",
        pdf: "recurso3.pdf"
    },
    4: {
        title: "SIGLO XX",
        icon: "🔧",
        desc: "La revolución que cambió el mundo: máquina de vapor, ferrocarriles, producción en masa y los cimientos de la ingeniería moderna.",
        pdf: "recurso4.pdf"
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