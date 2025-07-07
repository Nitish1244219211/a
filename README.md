# Seep Card Game - Landing Page

A responsive and animated landing page for the Seep card game that works seamlessly across both mobile and desktop devices.

## Features

### 🎮 Responsive Design
- **Mobile Portrait**: Shows rotation animation prompting users to rotate their phone to landscape mode
- **Mobile Landscape**: Full experience with all animations and transitions
- **Desktop**: Optimized experience without rotation requirements

### 🎭 Animated Sequences

1. **Mobile Rotation Screen** (Portrait Mode Only)
   - Animated phone with swoosh sound effects
   - "Please Rotate Your Phone" text with rotation animation
   - Continuous loop until screen is rotated

2. **Credit Screen**
   - "KuramaGames" company branding
   - 3-second display with fade animations
   - Black background with elegant typography

3. **Loading Screen**
   - Ace of Spades card with 3D floating animation
   - Dynamic spotlight effects with subtle movement
   - "SEEP" game title with glowing text effects
   - Spinning loader with "Loading..." text
   - Rotating tips footer (changes every 5 seconds)

4. **Landing Page**
   - "Coming Soon" message
   - Elegant gradient background
   - Pulsing text animation

### 🎵 Audio Features
- Procedural swoosh sound effects using Web Audio API
- Sound plays during phone animation cycles
- Responsive to user interactions and page visibility

### 💡 Interactive Tips
The loading screen displays helpful tips that rotate every 5 seconds:
- Game etiquette and rules
- Daily rewards reminders
- Strategy hints
- Bug reporting information
- Feature explanations

## Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Advanced animations, gradients, and responsive design
- **JavaScript ES6+**: Modern functionality and Web APIs
- **Web Audio API**: Procedural sound generation
- **Google Fonts**: Orbitron and Roboto font families

### Key Features
- CSS Grid and Flexbox for responsive layouts
- CSS Custom Properties for maintainable styling
- Intersection Observer API for performance
- requestAnimationFrame for smooth animations
- Media queries for responsive breakpoints

## File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive styling and animations
├── script.js           # JavaScript functionality and logic
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- HTTP server (for local testing)

### Installation

1. Clone or download the project files
2. Start a local HTTP server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

### Testing Responsive Features

**Desktop Testing:**
- Visit the site normally to see the full sequence

**Mobile Testing:**
- Use browser developer tools to simulate mobile devices
- Test portrait mode to see rotation animation
- Test landscape mode to see full experience
- Test orientation changes in real-time

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Mobile Support
- ✅ iOS Safari 11+
- ✅ Chrome Mobile 60+
- ✅ Samsung Internet 8+
- ✅ Firefox Mobile 55+

## Performance Considerations

- Optimized CSS animations using `transform` and `opacity`
- Minimal DOM manipulation for better performance
- Efficient event listeners with proper cleanup
- Responsive images and scalable vector graphics

## Customization

### Modifying Tips
Edit the `tips` array in `script.js`:
```javascript
const tips = [
    "Your custom tip here",
    "Another helpful tip",
    // Add more tips as needed
];
```

### Adjusting Timing
Modify timing constants in `script.js`:
```javascript
// Credit screen duration (default: 3000ms)
setTimeout(() => {
    showLoadingScreen();
}, 3000);

// Tip rotation interval (default: 5000ms)
tipInterval = setInterval(updateTip, 5000);
```

### Styling Changes
Key CSS variables for easy customization:
- Colors: Modify the CSS color values in `styles.css`
- Fonts: Change the Google Fonts imports in `index.html`
- Animations: Adjust keyframe animations and durations

## Known Issues

- Audio may require user interaction on some browsers due to autoplay policies
- Orientation detection may have slight delays on some devices
- Web Audio API not supported in older browsers (graceful fallback included)

## Future Enhancements

- [ ] Add particle effects to loading screen
- [ ] Implement progressive web app features
- [ ] Add more sophisticated audio effects
- [ ] Include preloader for assets
- [ ] Add accessibility improvements
- [ ] Implement theme customization

## License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different devices and browsers
5. Submit a pull request

---

**Created for KuramaGames - Bringing Seep to the digital world!** 🃏✨