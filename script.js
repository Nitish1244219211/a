// Game state management
let currentScreen = 'rotation';
let isFullscreen = false;
let isLandscape = false;
let tipIndex = 0;
let rotationAnimationActive = false;

// Tips array
const tips = [
    "Don't spoil other players' game by exiting the game mid-game.",
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

// Audio context for sound effects
let audioContext;
let swooshSound;

// Initialize audio
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        createSwooshSound();
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Create swoosh sound effect
function createSwooshSound() {
    if (!audioContext) return;
    
    swooshSound = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    };
}

// Play swoosh sound
function playSwoosh() {
    if (swooshSound && audioContext && audioContext.state === 'running') {
        swooshSound();
    }
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check orientation
function checkOrientation() {
    const orientation = screen.orientation?.angle ?? (window.orientation || 0);
    isLandscape = Math.abs(orientation) === 90;
    
    if (isMobile()) {
        if (!isLandscape) {
            showRotationScreen();
        } else {
            hideRotationScreen();
            if (currentScreen === 'rotation') {
                startGameSequence();
            }
        }
    } else {
        hideRotationScreen();
        if (currentScreen === 'rotation') {
            startGameSequence();
        }
    }
}

// Show rotation screen with animation
function showRotationScreen() {
    currentScreen = 'rotation';
    const rotationScreen = document.getElementById('rotation-screen');
    rotationScreen.style.display = 'flex';
    
    if (!rotationAnimationActive) {
        startRotationAnimation();
    }
}

// Hide rotation screen
function hideRotationScreen() {
    const rotationScreen = document.getElementById('rotation-screen');
    rotationScreen.style.display = 'none';
    rotationAnimationActive = false;
}

// Start rotation animation sequence
function startRotationAnimation() {
    rotationAnimationActive = true;
    const bar = document.querySelector('.rotation-bar');
    const text = document.querySelector('.rotation-text');
    const mobile = document.querySelector('.mobile-device');
    
    // Initial animation cycle
    animatePhoneOut(mobile, () => {
        setTimeout(() => {
            animatePhoneIn(mobile, () => {
                setTimeout(() => {
                    rotateElements(bar, text, mobile, () => {
                        if (rotationAnimationActive) {
                            // Continue the cycle
                            setTimeout(() => {
                                if (rotationAnimationActive) {
                                    startRotationAnimation();
                                }
                            }, 1000);
                        }
                    });
                }, 500);
            });
        }, 1000);
    });
}

// Animate phone coming out
function animatePhoneOut(mobile, callback) {
    playSwoosh();
    mobile.classList.add('show');
    setTimeout(callback, 300);
}

// Animate phone going in
function animatePhoneIn(mobile, callback) {
    playSwoosh();
    mobile.classList.remove('show');
    setTimeout(callback, 300);
}

// Rotate elements to landscape
function rotateElements(bar, text, mobile, callback) {
    bar.classList.add('horizontal');
    text.classList.add('rotated');
    mobile.classList.add('landscape');
    
    setTimeout(() => {
        animatePhoneOut(mobile, () => {
            setTimeout(() => {
                animatePhoneIn(mobile, () => {
                    // Reset for next cycle
                    setTimeout(() => {
                        bar.classList.remove('horizontal');
                        text.classList.remove('rotated');
                        mobile.classList.remove('landscape');
                        callback();
                    }, 500);
                });
            }, 1000);
        });
    }, 1000);
}

// Start the main game sequence
function startGameSequence() {
    if (currentScreen !== 'rotation') return;
    
    currentScreen = 'company';
    hideRotationScreen();
    showCompanyScreen();
}

// Show company screen
function showCompanyScreen() {
    const companyScreen = document.getElementById('company-screen');
    companyScreen.style.display = 'flex';
    
    setTimeout(() => {
        hideCompanyScreen();
        showLoadingScreen();
    }, 3000);
}

// Hide company screen
function hideCompanyScreen() {
    const companyScreen = document.getElementById('company-screen');
    companyScreen.style.display = 'none';
}

// Show loading screen
function showLoadingScreen() {
    currentScreen = 'loading';
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';
    
    startTipsRotation();
    
    // Simulate loading time
    setTimeout(() => {
        hideLoadingScreen();
        showMainScreen();
    }, 8000);
}

// Hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}

// Show main screen
function showMainScreen() {
    currentScreen = 'main';
    const mainScreen = document.getElementById('main-screen');
    mainScreen.style.display = 'flex';
}

// Start tips rotation
function startTipsRotation() {
    const tipText = document.querySelector('.tip-text');
    
    function showNextTip() {
        tipText.style.opacity = '0';
        tipText.style.animation = 'none';
        
        setTimeout(() => {
            tipText.textContent = tips[tipIndex];
            tipText.style.animation = 'tipFadeIn 0.5s ease forwards';
            tipIndex = (tipIndex + 1) % tips.length;
        }, 250);
    }
    
    // Show first tip
    showNextTip();
    
    // Continue rotating tips every 5 seconds
    const tipInterval = setInterval(() => {
        if (currentScreen === 'loading') {
            showNextTip();
        } else {
            clearInterval(tipInterval);
        }
    }, 5000);
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!isFullscreen) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Handle fullscreen change
function handleFullscreenChange() {
    isFullscreen = !!(document.fullscreenElement || 
                     document.webkitFullscreenElement || 
                     document.msFullscreenElement);
    
    const body = document.body;
    if (isFullscreen) {
        body.classList.add('fullscreen');
    } else {
        body.classList.remove('fullscreen');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio on first user interaction
    document.addEventListener('click', () => {
        if (!audioContext) {
            initAudio();
        }
    }, { once: true });
    
    document.addEventListener('touchstart', () => {
        if (!audioContext) {
            initAudio();
        }
    }, { once: true });
    
    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    // Orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(checkOrientation, 100);
    });
    
    window.addEventListener('resize', checkOrientation);
    
    // Initial check
    checkOrientation();
});

// Handle visibility change (when user switches tabs)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioContext) {
        audioContext.suspend();
    } else if (!document.hidden && audioContext) {
        audioContext.resume();
    }
});

// Prevent right-click context menu for better mobile experience
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent default touch behaviors that might interfere
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Debug info (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Seep Card Game - Debug Mode');
    console.log('Mobile device:', isMobile());
    console.log('Initial orientation:', isLandscape ? 'Landscape' : 'Portrait');
}