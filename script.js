// Initialize counter
let clickCount = 0;

// Increment counter function
function incrementCounter() {
    clickCount++;
    updateDisplay();
    playSound();
    createParticle();
}

// Reset counter function
function resetCounter() {
    clickCount = 0;
    updateDisplay();
}

// Update the display
function updateDisplay() {
    const countElement = document.getElementById('count');
    const statElement = document.getElementById('stat-clicks');
    
    // Animate the counter update
    countElement.style.animation = 'none';
    statElement.style.animation = 'none';
    
    setTimeout(() => {
        countElement.textContent = clickCount;
        statElement.textContent = clickCount;
        countElement.style.animation = 'scaleUp 0.4s ease-out';
        statElement.style.animation = 'scaleUp 0.4s ease-out';
    }, 10);
}

// Create subtle particle effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999';
    
    const colors = ['rgba(0, 212, 255, 0.8)', 'rgba(217, 70, 239, 0.8)', 'rgba(16, 185, 129, 0.8)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);
    
    let opacity = 1;
    const interval = setInterval(() => {
        opacity -= 0.05;
        particle.style.opacity = opacity;
        
        if (opacity <= 0) {
            clearInterval(interval);
            particle.remove();
        }
    }, 30);
}

// Play subtle sound effect
function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Higher pitch, shorter duration for modern feel
        oscillator.frequency.value = 1200;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.08);
    } catch (e) {
        // Silent fail
    }
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes scaleUp {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.15);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Page load initialization
window.addEventListener('load', function() {
    console.log('%cWelcome to Y2K Modern', 'font-size: 16px; color: #00D4FF; font-weight: bold;');
    console.log('%cProfessional design meets nostalgic vibes', 'font-size: 12px; color: #A0A0B8;');
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
