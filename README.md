# 27-game-world-net

**A Cyberpunk Geopolitical World Analyzer**

Explore countries, compare statistics, and test your geography knowledge in a stunning cyberpunk interface.

---

## 🎮 Live Demo

| Platform | URL |
|----------|-----|
| **Vercel** | [27-game-world-net.vercel.app](https://27-game-world-net.vercel.app) |

---

## 🌟 Features

### Core Gameplay
- **Country Database**: Comprehensive country information
- **Cyberpunk UI**: Modern dark theme with neon accents
- **React 19**: Latest React features with hooks
- **Responsive Design**: Works on all devices

### 🆕 New Features (V2)

#### 1. Interactive 3D Globe
- **Three.js Rendering**: Beautiful 3D globe with atmosphere glow
- **Country Markers**: Visual markers for selected countries
- **Drag to Rotate**: Interactive rotation controls
- **Zoom**: Mouse wheel to zoom in/out
- **Auto-rotation**: Smooth automatic rotation
- **Atmosphere Effects**: Realistic atmospheric glow shader

#### 2. Real-time Weather Data
- **Current Conditions**: Live weather for country capitals
- **Temperature Display**: Color-coded temperature indicators
- **Weather Icons**: Visual weather condition icons
- **Humidity & Wind**: Additional weather metrics
- **Smart Caching**: 30-minute cache for performance
- **Multiple Countries**: Batch weather fetching

**Weather Data Includes:**
- Temperature (°C/°F)
- Weather condition (Sunny, Cloudy, Rainy, etc.)
- Humidity percentage
- Wind speed (km/h)
- Weather icons

#### 3. Country Comparison Tool
- **Side-by-Side Comparison**: Compare up to 4 countries
- **Multiple Metrics**: Population, GDP, Area, Density, Growth Rate
- **Ranking System**: Automatic ranking for each metric
- **Percentage Differences**: Visual comparison indicators
- **Similarity Score**: Find countries with similar profiles
- **Chart Data**: Export comparison data for charts

**Comparison Metrics:**
- 📊 Population
- 💰 GDP & GDP per Capita
- 🗺️ Land Area
- 👥 Population Density
- 📈 Growth Rate

#### 4. Quiz/Challenge Mode
- **Multiple Question Types**: Capital, Population, Flag, Location, Currency, Landmark
- **Difficulty Levels**: Easy, Medium, Hard with varying points
- **Time Limits**: Challenge yourself against the clock
- **Score Tracking**: Accumulate points for correct answers
- **Leaderboard**: Compete for high scores
- **Ranks**: Earn titles from "Tourist" to "Geography Genius"

**Question Types:**
- 🏛️ Capital cities
- 👥 Population estimates
- 🚩 Flag identification
- 🗺️ Geographic regions
- 💱 Currency recognition
- 🏛️ Famous landmarks

**Ranks:**
- 🏆 Geography Genius (90%+)
- 🌍 World Explorer (75%+)
- ✈️ Globe Trotter (60%+)
- 🗺️ Traveler (40%+)
- 🧳 Tourist (<40%)

#### 5. Offline Data Caching
- **localStorage Caching**: Store country data locally
- **IndexedDB Support**: Large dataset support via IndexedDB
- **Smart Expiry**: Configurable cache expiry (default 24h)
- **Cache Metadata**: Track cache size and age
- **Search Offline**: Search cached countries without internet
- **Preload Data**: Automatically cache for offline use
- **Incremental Updates**: Update cache with new data

**Cache Features:**
- Automatic compression
- Version management
- Size estimation
- Expiry tracking
- Clear cache option

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite 6
- **3D Graphics**: Three.js
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4
- **Routing**: React Router 7

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/mk-knight23/27-game-world-net.git

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📖 Usage

### Exploring Countries
1. Browse the country database
2. Click on any country for details
3. Use the 3D globe for visual exploration
4. Check real-time weather data

### Comparing Countries
1. Select up to 4 countries
2. View side-by-side statistics
3. See rankings for each metric
4. Calculate percentage differences

### Taking Quizzes
1. Choose quiz difficulty
2. Answer questions before time runs out
3. Earn points for correct answers
4. Climb the leaderboard

### Offline Mode
1. Data is automatically cached
2. Access country info without internet
3. Search cached data
4. Manage cache settings

## 🎨 Features

### Interactive Globe
- Smooth 3D rotation
- Country markers
- Atmosphere glow
- Zoom controls

### Weather Integration
- Real-time updates
- Color-coded temperatures
- Weather icons
- Humidity & wind data

### Comparison Tools
- Multi-country compare
- Various metrics
- Visual rankings
- Similarity matching

### Quiz System
- 6 question types
- 3 difficulty levels
- Time challenges
- Score tracking

### Offline Support
- localStorage caching
- IndexedDB for large data
- Smart expiry
- Search capability

## 📝 License

MIT License - feel free to use this project for learning or inspiration.

---
*Made by MK — Musharraf Kazi*
