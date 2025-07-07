// Global variables
let currentTipIndex = 0;
let tipInterval;
let currentScreen = 'initial';

// Game tips array
const tips = [
    "Don't spoil other players' game by exiting the game midgame.",
    "Don't forget to claim daily reward",
    "User will be banned for 5 min if you exit the game mid-game.",
    "Buy emojis from store to make the gaming more fun.",
    "Seep scored during bidding will be worth points equal to the bid number!",
    "Try to remember high points card as much as you can to win.",
    "Found a bug, report from the game settings by clicking on 'Report a Bug' button.",
    "Frames will be automatically upgraded as you level up!",
    "Not good cards? You can still win with great strategy.",
    "If dots appear on a selected card, then tapping again on card will give you different combinations."
];

// Audio context for swoosh sounds (simplified)
let audioContext;

// Initialize audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Create swoosh sound effect
function playSwooshSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check if device is in portrait mode
function isPortrait() {
    return window.innerHeight > window.innerWidth;
}

// Show specific screen
function showScreen(screenId) {
    // Hide all screens
    const screens = ['rotateScreen', 'creditScreen', 'loadingScreen', 'landingPage'];
    screens.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'flex';
    }
    
    currentScreen = screenId;
}

// Handle orientation changes
function handleOrientationChange() {
    setTimeout(() => {
        if (isMobile() && isPortrait()) {
            showScreen('rotateScreen');
            // Add swoosh sound to phone animation
            addSwooshToPhoneAnimation();
        } else {
            if (currentScreen === 'rotateScreen') {
                startSequence();
            }
        }
    }, 100);
}

// Add swoosh sound to phone animation
function addSwooshToPhoneAnimation() {
    const phoneElement = document.querySelector('.phone');
    if (phoneElement) {
        phoneElement.addEventListener('animationiteration', () => {
            playSwooshSound();
        });
    }
}

// Start the main sequence
function startSequence() {
    // Step 1: Show credit screen
    showCreditScreen();
}

// Show credit screen for 3 seconds
function showCreditScreen() {
    showScreen('creditScreen');
    
    setTimeout(() => {
        showLoadingScreen();
    }, 3000);
}

// Show loading screen with tips rotation
function showLoadingScreen() {
    showScreen('loadingScreen');
    
    // Start tips rotation
    startTipsRotation();
    
    // Show loading screen for about 10 seconds before showing landing page
    setTimeout(() => {
        showLandingPage();
    }, 10000);
}

// Start tips rotation every 5 seconds
function startTipsRotation() {
    const tipElement = document.getElementById('tipText');
    
    // Clear any existing interval
    if (tipInterval) {
        clearInterval(tipInterval);
    }
    
    // Function to update tip
    function updateTip() {
        if (tipElement) {
            // Fade out
            tipElement.style.opacity = '0';
            tipElement.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                // Update text
                currentTipIndex = (currentTipIndex + 1) % tips.length;
                tipElement.textContent = tips[currentTipIndex];
                
                // Fade in
                tipElement.style.opacity = '1';
                tipElement.style.transform = 'translateY(0)';
            }, 500);
        }
    }
    
    // Start interval
    tipInterval = setInterval(updateTip, 5000);
}

// Show landing page
function showLandingPage() {
    // Clear tips interval
    if (tipInterval) {
        clearInterval(tipInterval);
    }
    
    showScreen('landingPage');
}

// Add enhanced animations on load
function addEnhancedAnimations() {
    // Add particle effects to ace card
    const cardElement = document.querySelector('.ace-card');
    if (cardElement) {
        // Add hover effect for desktop
        if (!isMobile()) {
            cardElement.addEventListener('mouseenter', () => {
                cardElement.style.transform = 'rotateY(15deg) rotateX(-10deg) translateY(-30px) scale(1.1)';
            });
            
            cardElement.addEventListener('mouseleave', () => {
                cardElement.style.transform = '';
            });
        }
    }
    
    // Add dynamic spotlight movement
    const spotlight = document.querySelector('.spotlight');
    if (spotlight) {
        let angle = 0;
        setInterval(() => {
            angle += 0.02;
            const offsetX = Math.sin(angle) * 20;
            const offsetY = Math.cos(angle) * 15;
            spotlight.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${0.8 + Math.sin(angle * 2) * 0.2})`;
        }, 50);
    }
}

// Initialize the application
function init() {
    console.log('Initializing Seep Card Game...');
    
    // Initialize audio
    initAudio();
    
    // Add enhanced animations
    addEnhancedAnimations();
    
    // Check initial orientation and device type
    if (isMobile() && isPortrait()) {
        showScreen('rotateScreen');
        addSwooshToPhoneAnimation();
    } else {
        startSequence();
    }
    
    // Add orientation change listener
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
}

// Handle page visibility changes (for audio context)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
});

// Enable audio on first user interaction
document.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });

document.addEventListener('touchstart', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Prevent context menu on mobile for better UX
document.addEventListener('contextmenu', (e) => {
    if (isMobile()) {
        e.preventDefault();
    }
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add console logs for debugging
window.addEventListener('load', () => {
    console.log('Page loaded');
    console.log('Is Mobile:', isMobile());
    console.log('Is Portrait:', isPortrait());
    console.log('Screen dimensions:', window.innerWidth, 'x', window.innerHeight);
});

// Export functions for potential external use
window.SeepGame = {
    isMobile,
    isPortrait,
    showScreen,
    startSequence,
    playSwooshSound
};