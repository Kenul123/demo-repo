// Initialize counter
let clickCount = 0;
let combo = 0;
let maxCombo = 0;

// Increment counter function
function incrementCounter() {
    clickCount++;
    combo++;
    if (combo > maxCombo) maxCombo = combo;
    updateDisplay();
    playSound('success');
    createExplosion();
    updateMaxCombo();
}

// Reset counter function
function resetCounter() {
    clickCount = 0;
    combo = 0;
    updateDisplay();
    playSound('reset');
}

// Update the display
function updateDisplay() {
    const countElement = document.getElementById('count');
    const statElement = document.getElementById('stat-clicks');
    const comboElement = document.getElementById('combo');
    
    countElement.style.animation = 'none';
    statElement.style.animation = 'none';
    comboElement.style.animation = 'none';
    
    setTimeout(() => {
        countElement.textContent = clickCount;
        statElement.textContent = clickCount;
        comboElement.textContent = combo + 'x COMBO!';
        countElement.style.animation = 'scaleHit 0.4s ease-out';
        statElement.style.animation = 'scaleHit 0.4s ease-out';
        comboElement.style.animation = 'pulse 0.4s ease-out';
    }, 10);
}

function updateMaxCombo() {
    document.getElementById('max-combo').textContent = maxCombo + 'x';
}

// Create explosion effect
function createExplosion() {
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.fontSize = '1.5em';
        particle.textContent = ['💥', '⭐', '✨', '🎆'][Math.floor(Math.random() * 4)];
        particle.style.fontSize = '1.2em';
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 5;
        let x_vel = Math.cos(angle) * velocity;
        let y_vel = Math.sin(angle) * velocity;
        let current_x = x;
        let current_y = y;
        let opacity = 1;
        
        const interval = setInterval(() => {
            current_x += x_vel;
            current_y += y_vel;
            y_vel += 0.2; // gravity
            opacity -= 0.05;
            
            particle.style.left = current_x + 'px';
            particle.style.top = current_y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(interval);
                particle.remove();
            }
        }, 20);
    }
}

// Play arcade sounds
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'success') {
            // Ascending arcade tone
            const notes = [800, 1000, 1200];
            let noteIndex = 0;
            
            const playNote = () => {
                if (noteIndex < notes.length) {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    
                    osc.frequency.value = notes[noteIndex];
                    osc.type = 'square';
                    
                    gain.gain.setValueAtTime(0.15, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    
                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + 0.1);
                    
                    noteIndex++;
                    setTimeout(playNote, 120);
                }
            };
            playNote();
        } else if (type === 'reset') {
            // Descending arcade tone
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.setValueAtTime(1000, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
            osc.type = 'sine';
            
            gain.gain.setValueAtTime(0.15, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.3);
        }
    } catch (e) {
        // Silent fail
    }
}

// Page load initialization
window.addEventListener('load', function() {
    console.log('%c🎮 ARCADE MODE ACTIVATED 🎮', 'font-size: 16px; color: #FF6B35; font-weight: bold; text-shadow: 2px 2px #FFD60A;');
    console.log('%cGET THOSE HIGH SCORES!', 'font-size: 12px; color: #00D4FF;');
});

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        incrementCounter();
    }
    if (event.code === 'KeyR') {
        resetCounter();
    }
});
