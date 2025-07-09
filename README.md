# Seep Card Game Landing Page

A sophisticated landing page for the Seep card game with responsive design, animations, and cross-platform compatibility.

## Features

### 🎮 Multi-Platform Support
- **Desktop**: Fullscreen experience with smooth transitions
- **Mobile**: Responsive design with orientation-aware animations
- **Cross-browser**: Compatible with modern web browsers

### 📱 Smart Orientation Handling
- **Mobile Portrait**: Displays animated rotation prompt with phone sliding animation
- **Mobile Landscape**: Automatically proceeds to game sequence
- **Desktop**: No rotation prompts, direct access to content

### 🎨 Visual Effects
- **Company Branding**: Elegant "KuramaGames" intro with mystical font styling
- **Loading Screen**: Animated Ace of Spades card with floating effect
- **Spotlight Animation**: Dynamic lighting effects during loading
- **Responsive Typography**: Scales appropriately across all devices

### 🔊 Audio Features
- **Swoosh Sound Effects**: Web Audio API generated sounds during animations
- **Context Management**: Proper audio handling with user interaction requirements

### ⚡ Interactive Elements
- **Fullscreen Toggle**: 3-dot button for fullscreen mode (hidden during fullscreen)
- **Rotation Animations**: Smooth bar and text rotations during mobile prompts
- **Loading Tips**: Rotating gameplay tips during loading sequence

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── script.js           # All functionality and interactions
└── README.md          # This documentation
```

## How It Works

### 1. Device Detection
The page automatically detects:
- Mobile vs Desktop devices
- Screen orientation (portrait/landscape)
- Fullscreen capabilities

### 2. Screen Flow
1. **Rotation Check** (Mobile only)
   - Shows "Please Rotate Your Phone" animation
   - Continues until device is in landscape mode

2. **Company Introduction**
   - Displays "KuramaGames" branding for 3 seconds
   - Smooth fade-in animation

3. **Loading Screen**
   - Animated Ace of Spades card (CSS-generated)
   - "Seep" game logo with glow effect
   - Rotating tips every 5 seconds
   - Loading spinner

4. **Main Landing**
   - "Coming Soon" message
   - Final destination

### 3. Mobile Animations
- **Vertical Bar**: Phone slides out with swoosh sound
- **Text Rotation**: "Please Rotate Your Phone" rotates 90 degrees
- **Bar Transformation**: Vertical bar becomes horizontal
- **Landscape Phone**: Phone slides from horizontal bar

### 4. Tips System
Displays helpful game tips during loading:
- Anti-griefing reminders
- Daily reward notifications
- Strategy hints
- Feature explanations

## Technical Features

### Responsive Design
- Mobile-first approach
- Flexible typography scaling
- Touch-friendly interactions
- Orientation change handling

### Performance Optimizations
- CSS-only animations where possible
- Efficient DOM manipulation
- Optimized audio context usage
- Proper event listener cleanup

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Reduced motion considerations

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Required Features
- CSS Grid and Flexbox
- Web Audio API (for sound effects)
- Fullscreen API
- Orientation API

## Usage

### Development
1. Clone or download the files
2. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser

### Testing Mobile Features
1. Use browser developer tools
2. Toggle device simulation
3. Test both portrait and landscape orientations
4. Verify touch interactions work properly

### Customization
- **Fonts**: Update Google Fonts links in HTML
- **Colors**: Modify CSS custom properties
- **Timing**: Adjust JavaScript timeout values
- **Tips**: Edit the tips array in script.js

## Animation Details

### Rotation Screen
- **Duration**: Continuous loop until orientation change
- **Sound**: Swoosh effect on phone animations
- **Elements**: Bar, text, and mobile device transformations

### Loading Screen
- **Card Float**: 3-second infinite loop
- **Glow Effect**: Text shadow animation
- **Spotlight**: Pulsing radial gradient
- **Tips Rotation**: 5-second intervals with fade transitions

### Responsive Breakpoints
- **Desktop**: > 768px
- **Tablet**: 481px - 768px  
- **Mobile**: ≤ 480px

## Known Features

### Audio
- Requires user interaction before playing sounds
- Automatically suspends when tab is inactive
- Gracefully degrades if Web Audio API unavailable

### Fullscreen
- Button disappears when in fullscreen mode
- Cross-browser fullscreen API support
- Proper state management

### Performance
- Optimized for smooth 60fps animations
- Minimal DOM manipulation
- Efficient event handling

## Future Enhancements

Potential additions for the full game:
- User authentication system
- Game lobby interface
- Multiplayer matchmaking
- Settings and preferences
- Achievement system
- In-app purchases integration

## Credits

**Developer**: KuramaGames  
**Technology**: Vanilla HTML, CSS, JavaScript  
**Fonts**: Google Fonts (Brush Script MT, Uncial Antiqua)  
**Audio**: Web Audio API  

---

*This landing page serves as the entry point for the Seep card game, providing an engaging and professional first impression while ensuring compatibility across all devices and platforms.*