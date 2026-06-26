// Initialize counter
let clickCount = 0;

// Increment counter function
function incrementCounter() {
    clickCount++;
    updateDisplay();
    console.log('Button clicked! Total clicks:', clickCount);
}

// Reset counter function
function resetCounter() {
    clickCount = 0;
    updateDisplay();
    console.log('Counter reset');
}

// Update the display
function updateDisplay() {
    document.getElementById('count').textContent = clickCount;
}

// Page load message
window.addEventListener('load', function() {
    console.log('Welcome to the Placeholder Website!');
    console.log('Click the buttons to interact with the page.');
});
