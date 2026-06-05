// ===== STATE =====
let state = {
    currentScreen: 'home',
    selectedSubject: null,
    testMode: 'exam', // 'exam' or 'practice'
    timerMinutes: 15,
    userName: '',
    userGroup: '',
    questions: [],
    currentQuestion: 0,
    answers: [], // user's selected answers (index or null)
    flagged: [], // flagged questions
    timerInterval: null,
    timeRemaining: 0, // in seconds
    timeStarted: null,
    testFinished: false
};

// ===== GOOGLE SHEETS CONFIG =====
// Replace with your actual Google Apps Script Web App URL
const GOOGLE_SHEETS_URL = ''; // Add your deployed Apps Script URL here

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    renderSubjects();
    loadHistory();
});

// ===== THEME =====
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        icon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-icon').className = 'fa-solid fa-sun';
    }
}

// ===== SCREEN NAVIGATION =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(`screen-${screenId}`);
    if (screen) {
        screen.classList.add('active');
        // Re-trigger animation
        screen.style.animation = 'none';
        screen.offsetHeight;
        screen.style.animation = '';
    }
    state.currentScreen = screenId;
    
    if (screenId === 'home') {
        // Clean up timer
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }
}

// ===== RENDER SUBJECTS =====
function renderSubjects() {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = SUBJECTS_DATA.subjects.map(subject => `
        <div class="subject-card" onclick="selectSubject('${subject.id}')" style="--subject-color: ${subject.color}">
            <div class="subject-card-icon" style="background: ${subject.color}20; color: ${subject.color}">
                <i class="fa-solid ${subject.icon}"></i>
            </div>
            <h3>${subject.name}</h3>
            <p>${subject.questions.length} ta savol</p>
            <div class="subject-card-meta">
                <i class="fa-solid fa-calendar"></i> ${subject.year}-kurs, ${subject.semester}-semestr
            </div>
        </div>
    `).join('');
}

// ===== SELECT SUBJECT =====
function selectSubject(subjectId) {
    const subject = SUBJECTS_DATA.subjects.find(s => s.id === subjectId);
    if (!subject) return;
    
    state.selectedSubject = subject;
    document.getElementById('selected-subject-badge').innerHTML = `
        <i class="fa-solid ${subject.icon}"></i> ${subject.name}
    `;
    
    showScreen('userinfo');
}

// ===== MODE SELECTION =====
function selectMode(mode) {
    state.testMode = mode;
    document.querySelectorAll('.mode-card').forEach(card => {
        card.classList.toggle('active', card.dataset.mode === mode);
    });
    
    const timerSettings = document.getElementById('timer-settings');
    timerSettings.style.display = mode === 'exam' ? 'flex' : 'none';
}

// ===== TIMER SELECTION =====
function selectTimer(minutes) {
    state.timerMinutes = minutes;
    document.querySelectorAll('.timer-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.time) === minutes);
    });
}

// ===== START TEST =====
function startTest(event) {
    event.preventDefault();
    
    state.userName = document.getElementById('user-name').value.trim();
    state.userGroup = document.getElementById('user-group').value.trim();
    
    if (!state.userName || !state.userGroup) return;
    
    // Prepare questions (shuffle)
    state.questions = shuffleArray([...state.selectedSubject.questions]);
    state.currentQuestion = 0;
    state.answers = new Array(state.questions.length).fill(null);
    state.flagged = new Array(state.questions.length).fill(false);
    state.testFinished = false;
    state.timeStarted = Date.now();
    
    // Setup timer
    if (state.testMode === 'exam' && state.timerMinutes > 0) {
        state.timeRemaining = state.timerMinutes * 60;
        startTimer();
    } else {
        state.timeRemaining = 0;
    }
    
    showScreen('quiz');
    renderQuiz();
}

// ===== TIMER =====
function startTimer() {
    updateTimerDisplay();
    const timerCard = document.getElementById('timer-card');
    timerCard.style.display = 'block';
    
    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();
        
        if (state.timeRemaining <= 60) {
            document.getElementById('timer-widget').classList.add('warning');
        }
        
        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            finishTest();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    document.getElementById('timer-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ===== RENDER QUIZ =====
function renderQuiz() {
    const q = state.questions[state.currentQuestion];
    const total = state.questions.length;
    const current = state.currentQuestion + 1;
    
    // Progress
    const percent = Math.round((current / total) * 100);
    document.getElementById('progress-title').textContent = `Savol ${current}/${total}`;
    document.getElementById('progress-percent').textContent = `${percent}%`;
    document.getElementById('progress-fill').style.width = `${percent}%`;
    
    // Question
    document.getElementById('question-number').textContent = `Savol #${current}`;
    document.getElementById('question-badge').textContent = state.testMode === 'exam' ? 'Imtihon' : 'Mashq';
    document.getElementById('question-badge').className = `question-badge ${state.testMode === 'practice' ? 'practice' : ''}`;
    document.getElementById('question-text').textContent = q.question;
    
    // Image
    const imgContainer = document.getElementById('question-image-container');
    if (q.image) {
        imgContainer.style.display = 'block';
        document.getElementById('question-image').src = q.image;
    } else {
        imgContainer.style.display = 'none';
    }
    
    // Timer visibility
    const timerCard = document.getElementById('timer-card');
    if (state.testMode === 'practice' || state.timerMinutes === 0) {
        timerCard.style.display = 'none';
    }
    
    // Options
    const letters = ['A', 'B', 'C', 'D'];
    const optionsContainer = document.getElementById('options-container');
    const userAnswer = state.answers[state.currentQuestion];
    
    optionsContainer.innerHTML = q.options.map((option, idx) => {
        let extraClass = '';
        if (userAnswer === idx) extraClass = 'selected';
        
        // In practice mode, show correct/incorrect after answering
        if (state.testMode === 'practice' && userAnswer !== null) {
            if (idx === q.correctAnswer) extraClass += ' correct';
            else if (idx === userAnswer && userAnswer !== q.correctAnswer) extraClass += ' incorrect';
        }
        
        return `
            <button class="option-btn ${extraClass}" onclick="selectAnswer(${idx})" 
                ${state.testMode === 'practice' && userAnswer !== null ? 'disabled' : ''}>
                <span class="option-letter">${letters[idx]}</span>
                <span class="option-text">${option}</span>
            </button>
        `;
    }).join('');
    
    // Practice feedback
    const feedback = document.getElementById('practice-feedback');
    feedback.className = 'practice-feedback';
    feedback.classList.remove('show');
    
    if (state.testMode === 'practice' && userAnswer !== null) {
        const isCorrect = userAnswer === q.correctAnswer;
        feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        document.getElementById('practice-feedback').querySelector('i').className = 
            isCorrect ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark';
        document.getElementById('practice-feedback-text').textContent = 
            isCorrect ? "To'g'ri javob!" : `Noto'g'ri. To'g'ri javob: ${letters[q.correctAnswer]}) ${q.options[q.correctAnswer]}`;
    }
    
    // Navigation buttons
    document.getElementById('btn-prev').disabled = state.currentQuestion === 0;
    const btnNext = document.getElementById('btn-next');
    if (state.currentQuestion === total - 1) {
        btnNext.innerHTML = '<i class="fa-solid fa-flag-checkered"></i> Yakunlash';
        btnNext.onclick = confirmFinish;
    } else {
        btnNext.innerHTML = 'Keyingi <i class="fa-solid fa-chevron-right"></i>';
        btnNext.onclick = nextQuestion;
    }
    
    // Flag button
    const flagBtn = document.getElementById('btn-flag');
    flagBtn.classList.toggle('flagged', state.flagged[state.currentQuestion]);
    
    // Question grid
    renderGrid();
}

// ===== SELECT ANSWER =====
function selectAnswer(idx) {
    if (state.testFinished) return;
    if (state.testMode === 'practice' && state.answers[state.currentQuestion] !== null) return;
    
    state.answers[state.currentQuestion] = idx;
    renderQuiz();
}

// ===== NAVIGATION =====
function nextQuestion() {
    if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion++;
        renderQuiz();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuiz();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToQuestion(idx) {
    state.currentQuestion = idx;
    renderQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== FLAG =====
function toggleFlag() {
    state.flagged[state.currentQuestion] = !state.flagged[state.currentQuestion];
    renderQuiz();
}

// ===== QUESTION GRID =====
function renderGrid() {
    const grid = document.getElementById('questions-grid');
    const answeredCount = state.answers.filter(a => a !== null).length;
    
    document.getElementById('grid-stats').textContent = `${answeredCount}/${state.questions.length} javob`;
    
    grid.innerHTML = state.questions.map((_, idx) => {
        let classes = 'grid-cell';
        if (idx === state.currentQuestion) classes += ' active';
        if (state.answers[idx] !== null) classes += ' answered';
        if (state.flagged[idx]) classes += ' flagged';
        return `<div class="${classes}" onclick="goToQuestion(${idx})">${idx + 1}</div>`;
    }).join('');
}

// ===== FINISH TEST =====
function confirmFinish() {
    const unanswered = state.answers.filter(a => a === null).length;
    const confirmText = document.getElementById('confirm-text');
    
    if (unanswered > 0) {
        confirmText.textContent = `${unanswered} ta savolga hali javob bermadingiz. Testni yakunlaysizmi?`;
    } else {
        confirmText.textContent = 'Barcha savollarga javob berdingiz. Testni yakunlaysizmi?';
    }
    
    document.getElementById('confirm-modal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirm-modal').classList.remove('active');
}

function finishTest() {
    closeConfirmModal();
    state.testFinished = true;
    
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    
    // Calculate results
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    
    state.questions.forEach((q, idx) => {
        if (state.answers[idx] === null) unanswered++;
        else if (state.answers[idx] === q.correctAnswer) correct++;
        else incorrect++;
    });
    
    const total = state.questions.length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 60;
    const timeSpent = Math.round((Date.now() - state.timeStarted) / 1000);
    
    // Show results screen
    showScreen('results');
    
    // Results header
    const resultsIcon = document.getElementById('results-icon');
    resultsIcon.className = `results-icon ${passed ? 'success' : 'fail'}`;
    resultsIcon.innerHTML = passed ? '<i class="fa-solid fa-trophy"></i>' : '<i class="fa-solid fa-face-sad-tear"></i>';
    document.getElementById('results-title').textContent = passed ? 'Tabriklaymiz!' : 'Afsuski...';
    document.getElementById('results-subtitle').textContent = passed 
        ? `Siz testdan muvaffaqiyatli o'tdingiz!` 
        : `Qayta urinib ko'ring. Kamida 60% kerak.`;
    
    // Score circle
    document.getElementById('score-value').textContent = `${percentage}%`;
    const scoreFill = document.getElementById('score-fill');
    scoreFill.className = `score-fill ${passed ? '' : 'fail'}`;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    setTimeout(() => {
        scoreFill.style.strokeDashoffset = offset;
    }, 100);
    
    // Score details
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('incorrect-count').textContent = incorrect;
    document.getElementById('unanswered-count').textContent = unanswered;
    document.getElementById('time-spent').textContent = formatTime(timeSpent);
    
    // Review list
    renderReview();
    
    // Save to history
    saveHistory({
        subject: state.selectedSubject.name,
        subjectId: state.selectedSubject.id,
        mode: state.testMode,
        score: percentage,
        correct,
        total,
        date: new Date().toISOString(),
        userName: state.userName,
        userGroup: state.userGroup,
        timeSpent
    });
    
    // Send to Google Sheets
    sendToGoogleSheets({
        name: state.userName,
        group: state.userGroup,
        subject: state.selectedSubject.name,
        mode: state.testMode,
        score: percentage,
        correct,
        incorrect,
        unanswered,
        total,
        timeSpent: formatTime(timeSpent),
        date: new Date().toLocaleString('uz-UZ')
    });
}

// ===== REVIEW =====
function renderReview() {
    const letters = ['A', 'B', 'C', 'D'];
    const list = document.getElementById('review-list');
    
    list.innerHTML = state.questions.map((q, idx) => {
        const userAnswer = state.answers[idx];
        let status, statusClass;
        
        if (userAnswer === null) {
            status = 'Javob berilmadi';
            statusClass = 'unanswered';
        } else if (userAnswer === q.correctAnswer) {
            status = "To'g'ri";
            statusClass = 'correct';
        } else {
            status = "Noto'g'ri";
            statusClass = 'incorrect';
        }
        
        let answerText = '';
        if (userAnswer !== null && userAnswer !== q.correctAnswer) {
            answerText = `Sizning javobingiz: ${letters[userAnswer]}) ${q.options[userAnswer]} | <strong>To'g'ri: ${letters[q.correctAnswer]}) ${q.options[q.correctAnswer]}</strong>`;
        } else if (userAnswer === q.correctAnswer) {
            answerText = `${letters[userAnswer]}) ${q.options[userAnswer]}`;
        } else {
            answerText = `<strong>To'g'ri javob: ${letters[q.correctAnswer]}) ${q.options[q.correctAnswer]}</strong>`;
        }
        
        return `
            <div class="review-item ${statusClass}">
                <div class="review-item-header">
                    <span class="review-item-number">Savol #${idx + 1}</span>
                    <span class="review-item-status ${statusClass}">${status}</span>
                </div>
                <div class="review-item-question">${q.question}</div>
                <div class="review-item-answer">${answerText}</div>
            </div>
        `;
    }).join('');
}

// ===== RETRY =====
function retryTest() {
    state.questions = shuffleArray([...state.selectedSubject.questions]);
    state.currentQuestion = 0;
    state.answers = new Array(state.questions.length).fill(null);
    state.flagged = new Array(state.questions.length).fill(false);
    state.testFinished = false;
    state.timeStarted = Date.now();
    
    // Reset score circle
    document.getElementById('score-fill').style.strokeDashoffset = 283;
    
    // Reset timer widget
    document.getElementById('timer-widget').classList.remove('warning');
    
    if (state.testMode === 'exam' && state.timerMinutes > 0) {
        state.timeRemaining = state.timerMinutes * 60;
        startTimer();
    }
    
    showScreen('quiz');
    renderQuiz();
}

// ===== IMAGE ZOOM =====
function zoomImage(img) {
    document.getElementById('modal-image').src = img.src;
    document.getElementById('image-modal').classList.add('active');
}

function closeImageModal() {
    document.getElementById('image-modal').classList.remove('active');
}

// ===== HISTORY =====
function saveHistory(entry) {
    let history = JSON.parse(localStorage.getItem('testHistory') || '[]');
    history.unshift(entry);
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem('testHistory', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('testHistory') || '[]');
    const card = document.getElementById('history-card');
    const list = document.getElementById('history-list');
    
    if (history.length === 0) {
        card.style.display = 'none';
        return;
    }
    
    card.style.display = 'flex';
    list.innerHTML = history.slice(0, 10).map(entry => {
        const date = new Date(entry.date);
        const dateStr = date.toLocaleDateString('uz-UZ') + ' ' + date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="history-item">
                <div class="history-item-details">
                    <span class="history-subject">${entry.subject}</span>
                    <span class="history-date">${dateStr} | ${entry.userName}</span>
                </div>
                <span class="history-score ${entry.score < 60 ? 'fail' : ''}">${entry.score}%</span>
            </div>
        `;
    }).join('');
}

function clearHistory() {
    if (confirm('Tarixni tozalashni xohlaysizmi?')) {
        localStorage.removeItem('testHistory');
        loadHistory();
    }
}

// ===== GOOGLE SHEETS INTEGRATION =====
async function sendToGoogleSheets(data) {
    const statusEl = document.getElementById('sheets-status');
    
    if (!GOOGLE_SHEETS_URL) {
        statusEl.style.display = 'none';
        return;
    }
    
    statusEl.style.display = 'flex';
    statusEl.className = 'sheets-status';
    document.getElementById('sheets-status-text').textContent = 'Natijalar saqlanmoqda...';
    
    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        statusEl.className = 'sheets-status success';
        document.getElementById('sheets-status-text').textContent = 'Natijalar muvaffaqiyatli saqlandi!';
    } catch (error) {
        statusEl.className = 'sheets-status error';
        document.getElementById('sheets-status-text').textContent = 'Xatolik! Natijalar saqlanmadi.';
        console.error('Google Sheets error:', error);
    }
}

// ===== UTILITIES =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (state.currentScreen !== 'quiz' || state.testFinished) return;
    
    switch(e.key) {
        case '1': case 'a': case 'A': selectAnswer(0); break;
        case '2': case 'b': case 'B': selectAnswer(1); break;
        case '3': case 'c': case 'C': selectAnswer(2); break;
        case '4': case 'd': case 'D': selectAnswer(3); break;
        case 'ArrowRight': nextQuestion(); break;
        case 'ArrowLeft': prevQuestion(); break;
        case 'f': case 'F': toggleFlag(); break;
    }
});
