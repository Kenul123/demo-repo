// Initialize counter
let clickCount = 0;

// Increment counter function
function incrementCounter() {
    clickCount++;
    updateDisplay();
    playClickSound();
    createConfetti();
    console.log('🎮 Button clicked! Total clicks:', clickCount);
}

// Reset counter function
function resetCounter() {
    clickCount = 0;
    updateDisplay();
    console.log('🔄 Counter reset to 0');
}

// Update the display
function updateDisplay() {
    document.getElementById('count').textContent = clickCount;
    
    // Add a pulse effect
    const counter = document.querySelector('.counter');
    counter.style.animation = 'none';
    setTimeout(() => {
        counter.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Create confetti effect
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-20px';
    confetti.style.fontSize = '2em';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    const emoji = ['🎉', '⭐', '✨', '🌟', '💫', '🎊', '🎈', '🎆'][Math.floor(Math.random() * 8)];
    confetti.textContent = emoji;
    
    document.body.appendChild(confetti);
    
    let top = -20;
    let opacity = 1;
    const interval = setInterval(() => {
        top += 3;
        opacity -= 0.02;
        confetti.style.top = top + 'px';
        confetti.style.opacity = opacity;
        
        if (opacity <= 0) {
            clearInterval(interval);
            confetti.remove();
        }
    }, 10);
}

// Play retro click sound effect (using Web Audio API)
function playClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Sound not supported in this browser');
    }
}

// Create starfield effect
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Page load message and initialization
window.addEventListener('load', function() {
    console.log('%c🌟 WELCOME TO THE Y2K ZONE! 🌟', 'font-size: 20px; color: #FF00FF; text-shadow: 2px 2px #00FF00;');
    console.log('%c✨ This website has been blessed with early 2000s energy! ✨', 'font-size: 14px; color: #00CCFF;');
    console.log('%c🎮 Click the buttons to interact with this totally awesome page! 🎮', 'font-size: 12px; color: #FFFF00;');
    
    // Create starfield
    createStars();
    
    // Add pulse animation for counter
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
});

// Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        incrementCounter();
    }
    if (event.code === 'KeyR') {
        resetCounter();
    }
});
