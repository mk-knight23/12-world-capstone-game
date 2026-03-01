# 27-game-world-net

**A Cyberpunk Geopolitical World Analyzer**

Explore countries, compare statistics, and test your geography knowledge in a stunning cyberpunk interface.

Built with React 19, TypeScript, Three.js, and Tailwind CSS v4 for an immersive 3D geography experience.

---

## 🎮 Live Demo

| Platform | URL |
|----------|-----|
| **Vercel** | [27-game-world-net.vercel.app](https://27-game-world-net.vercel.app) |

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Presentation Layer                           │
│  React 19 Components + Tailwind CSS v4 + Framer Motion        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                   3D Visualization Layer                       │
│  Three.js Globe + Atmosphere Shaders + Markers                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    State Management                           │
│  Zustand Store (gameStore) + LocalStorage + React State       │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Data Services                               │
│  REST Countries API + OpenWeatherMap API + Axios              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Features Layer                              │
│  Country Database + Quiz Mode + Comparison Tool + Weather     │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
27-game-world-net/
├── src/
│   ├── components/                     # React components
│   │   ├── InteractiveGlobe.tsx       # 3D globe with Three.js
│   │   └── common/                    # Shared UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── ...
│   │
│   ├── pages/                          # React pages
│   │   ├── Game.tsx                   # Main game page
│   │   ├── Achievements.tsx           # Achievements page
│   │   └── Stats.tsx                  # Statistics page
│   │
│   ├── router/                         # React Router
│   │   └── index.tsx                  # Router configuration
│   │
│   ├── stores/                         # Zustand stores
│   │   └── gameStore.ts               # Game state store
│   │
│   ├── types/                          # TypeScript types
│   │   ├── country.ts                 # Country interfaces
│   │   ├── game.ts                    # Game interfaces
│   │   └── quiz.ts                    # Quiz interfaces
│   │
│   ├── utils/                          # Utilities
│   │   ├── api.ts                     # API helpers
│   │   ├── helpers.ts                 # Helper functions
│   │   └── constants.ts               # Constants
│   │
│   ├── App.tsx                         # Main App component
│   ├── main.tsx                        # React entry point
│   └── index.css                       # Tailwind CSS
│
├── public/                             # Static assets
│
├── .github/workflows/                  # CI/CD pipelines
│
├── docs/                               # Documentation
│   ├── architecture.md                 # Architecture details
│   └── api.md                          # API documentation
│
├── vite.config.ts                      # Vite configuration
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── vercel.json                         # Vercel deployment
└── package.json                        # Dependencies & scripts
```

### Tech Stack

```typescript
{
  frontend: {
    framework: {
      name: "React",
      version: "19.2.3",
      features: [
        "Concurrent rendering",
        "Server components ready",
        "Automatic batching",
        "Suspense",
        "TypeScript support"
      ]
    },
    router: {
      name: "React Router",
      version: "7.13.0",
      features: [
        "Nested routes",
        "Lazy loading",
        "Data routing",
        "Type-safe navigation"
      ]
    },
    buildTool: {
      name: "Vite",
      version: "6.4.1",
      features: [
        "HMR (Hot Module Replacement)",
        "ESBuild-based",
        "Fast development",
        "Optimized production builds"
      ]
    },
    styling: {
      name: "Tailwind CSS",
      version: "4.0.0",
      features: [
        "Dark mode (cyberpunk theme)",
        "Responsive utilities",
        "Custom animations",
        "Neon color palette"
      ]
    },
    animation: {
      name: "Framer Motion",
      version: "12.29.2",
      features: [
        "Smooth transitions",
        "Gesture animations",
        "Layout animations",
        "Variants"
      ]
    }
  },
  visualization: {
    library: "Three.js",
    features: [
      "3D globe rendering",
      "Atmosphere glow shader",
      "Interactive rotation",
      "Zoom controls",
      "Country markers",
      "Auto-rotation"
    ],
    components: [
      "Scene",
      "Camera",
      "Renderer",
      "GlobeMesh",
      "AtmosphereShader",
      "Markers"
    ]
  },
  stateManagement: {
    library: "Zustand",
    version: "5.0.11",
    stores: [
      {
        name: "gameStore",
        purpose: "Game state and quiz data",
        state: [
          "score: number",
          "highScore: number",
          "gamesPlayed: number",
          "achievements: Achievement[]",
          "quizResults: QuizResult[]"
        ],
        actions: [
          "addScore(score: number): void",
          "resetGame(): void",
          "unlockAchievement(id: string): void",
          "saveQuizResult(result: QuizResult): void"
        ],
        persistence: "LocalStorage (via zustand/middleware/persist)"
      }
    ]
  },
  dataServices: {
    apis: [
      {
        name: "REST Countries API",
        purpose: "Country database",
        endpoints: [
          "/all - Get all countries",
          "/alpha/{code} - Get country by code",
          "/region/{region} - Get countries by region"
        ],
        data: [
          "Country names",
          "Population",
          "Area",
          "Capital",
          "Flags",
          "Region",
          "CCA3 codes"
        ]
      },
      {
        name: "OpenWeatherMap API",
        purpose: "Weather data for capitals",
        endpoints: [
          "/weather - Current weather"
        ],
        data: [
          "Temperature",
          "Weather condition",
          "Humidity",
          "Wind speed",
          "Weather icons"
        ],
        caching: "30-minute cache for performance"
      }
    ],
    client: {
      name: "Axios",
      version: "1.13.3",
      features: [
        "Promise-based",
        "Request/response interceptors",
        "Automatic JSON transformation",
        "Error handling"
      ]
    }
  },
  icons: {
    library: "Lucide React",
    version: "0.474.0",
    icons: [
      "Search",
      "Globe",
      "Users",
      "Navigation",
      "Zap",
      "Cpu",
      "Database",
      "Star",
      "ArrowRightLeft"
    ]
  }
}
```

### Component Architecture

```typescript
{
  components: {
    core: [
      {
        name: "App",
        purpose: "Main application component",
        features: [
          "Country database",
          "Search functionality",
          "Keyboard navigation",
          "Typing animation",
          "Region filtering",
          "Saved entities"
        ]
      },
      {
        name: "InteractiveGlobe",
        purpose: "3D globe visualization",
        library: "Three.js",
        features: [
          "Interactive rotation",
          "Zoom controls",
          "Atmosphere glow",
          "Country markers",
          "Auto-rotation"
        ],
        threeObjects: [
          "Scene",
          "PerspectiveCamera",
          "WebGLRenderer",
          "SphereGeometry (globe)",
          "ShaderMaterial (atmosphere)",
          "Group (markers)"
        ]
      }
    ],
    common: [
      {
        name: "Button",
        purpose: "Reusable button component",
        features: [
          "Multiple variants",
          "Disabled states",
          "Loading states",
          "Icon support"
        ]
      },
      {
        name: "Card",
        purpose: "Card container for content",
        features: [
          "Hover effects",
          "Cyberpunk styling",
          "Responsive layout"
        ]
      },
      {
        name: "Modal",
        purpose: "Modal dialogs",
        features: [
          "Animations",
          "Backdrop",
          "Keyboard navigation"
        ]
      }
    ],
    pages: [
      {
        name: "Game",
        purpose: "Main game page",
        features: [
          "Country database",
          "3D globe",
          "Search",
          "Quiz mode"
        ]
      },
      {
        name: "Achievements",
        purpose: "Achievement tracking",
        features: [
          "Achievement list",
          "Progress indicators",
          "Unlock status"
        ]
      },
      {
        name: "Stats",
        purpose: "Statistics page",
        features: [
          "Quiz statistics",
          "High scores",
          "Performance metrics"
        ]
      }
    ]
  }
}
```

### State Management

```typescript
{
  gameStore: {
    purpose: "Game state and quiz data",
    state: {
      score: "number - Current quiz score",
      highScore: "number - Highest score achieved",
      gamesPlayed: "number - Total games played",
      achievements: "Achievement[] - Unlocked achievements",
      quizResults: "QuizResult[] - Quiz history"
    },
    actions: [
      "addScore(score: number): void - Add score",
      "resetGame(): void - Reset game state",
      "unlockAchievement(id: string): void - Unlock achievement",
      "saveQuizResult(result: QuizResult): void - Save quiz result"
    ],
    persistence: "LocalStorage",
    storageKey: "world-net-game"
  },
  reactState: {
    countries: "Country[] - All countries",
    filtered: "Country[] - Filtered countries",
    selected: "Country | null - Selected country",
    selectedRegion: "string - Selected region",
    search: "string - Search query",
    savedEntities: "string[] - Saved country codes",
    comparisonTarget: "Country | null - Country to compare",
    weatherData: "Map<string, Weather> - Weather cache"
  }
}
```

### TypeScript Interfaces

```typescript
{
  types: {
    country: {
      name: "{ common: string, official: string }",
      capital: "string[]",
      region: "string",
      subregion: "string",
      population: "number",
      area: "number",
      flags: "{ svg: string, png: string }",
      cca3: "string",
      currencies: "Record<string, Currency>",
      languages: "Record<string, string>"
    },
    weather: {
      temp: "number - Temperature (°C)",
      condition: "string - Weather condition",
      humidity: "number - Humidity percentage",
      windSpeed: "number - Wind speed (km/h)",
      icon: "string - Weather icon"
    },
    quiz: {
      questionType: "'capital' | 'population' | 'flag' | 'location' | 'currency' | 'landmark'",
      difficulty: "'Easy' | 'Medium' | 'Hard'",
      points: "number",
      timeLimit: "number (seconds)"
    },
    achievement: {
      id: "string",
      name: "string",
      description: "string",
      tier: "'Common' | 'Rare' | 'Epic' | 'Legendary'",
      unlocked: "boolean",
      progress: "number"
    }
  }
}
```

### API Integration

```typescript
{
  apis: {
    restCountries: {
      baseURL: "https://restcountries.com/v3.1",
      endpoints: {
        all: {
          url: "/all",
          purpose: "Get all countries",
          response: "Country[]"
        },
        byCode: {
          url: "/alpha/{code}",
          purpose: "Get country by code",
          response: "Country[]"
        },
        byRegion: {
          url: "/region/{region}",
          purpose: "Get countries by region",
          response: "Country[]"
        }
      },
      features: [
        "No API key required",
        "Free and open",
        "Up-to-date data"
      ]
    },
    openWeatherMap: {
      baseURL: "https://api.openweathermap.org/data/2.5",
      endpoints: {
        current: {
          url: "/weather",
          params: {
            q: "City name",
            appid: "API key",
            units: "metric/imperial"
          },
          response: "WeatherData"
        }
      },
      features: [
        "Current weather data",
        "Temperature conversion",
        "Weather icons",
        "Multiple units"
      ],
      caching: "30-minute cache"
    }
  },
  errorHandling: {
    api: {
      type: "HTTP errors",
      handling: [
        "Axios interceptors",
        "Error messages",
        "Fallback data",
        "Retry logic"
      ]
    }
  }
}
```

### 3D Globe Visualization

```typescript
{
  globe: {
    library: "Three.js",
    setup: {
      scene: "Three.Scene",
      camera: "Three.PerspectiveCamera",
      renderer: "Three.WebGLRenderer",
      width: "100%",
      height: "100%"
    },
    components: [
      {
        name: "GlobeMesh",
        type: "SphereGeometry",
        material: "MeshPhongMaterial",
        features: [
          "Earth texture",
          "Lighting",
          "Shadows"
        ]
      },
      {
        name: "AtmosphereShader",
        type: "ShaderMaterial",
        purpose: "Atmosphere glow effect",
        features: [
          "Vertex shader",
          "Fragment shader",
          "Glow intensity"
        ]
      },
      {
        name: "Markers",
        type: "Group",
        purpose: "Country position markers",
        features: [
          "Clickable markers",
          "Hover effects",
          "Label display"
        ]
      }
    ],
    interactions: [
      {
        type: "Drag to rotate",
        implementation: "Event listeners on renderer",
        features: [
          "Mouse drag",
          "Touch drag",
          "Smooth easing"
        ]
      },
      {
        type: "Zoom",
        implementation: "Mouse wheel",
        features: [
          "Zoom in/out",
          "Min/max limits",
          "Smooth transition"
        ]
      },
      {
        type: "Auto-rotation",
        implementation: "requestAnimationFrame",
        features: [
          "Slow rotation",
          "Smooth animation",
          "Toggle on/off"
        ]
      }
    ],
    performance: {
      optimizations: [
        "Geometry instancing",
        "Texture compression",
        "Lazy loading",
        "RequestAnimationFrame loop"
      ]
    }
  }
}
```

### Features Architecture

```typescript
{
  features: {
    countryDatabase: {
      purpose: "Comprehensive country information",
      data: [
        "Country names",
        "Population",
        "Area",
        "Capital",
        "Flags",
        "Region",
        "Subregion",
        "Languages",
        "Currencies",
        "CCA3 codes"
      ],
      capabilities: [
        "Search by name",
        "Filter by region",
        "Sort by population/area",
        "Save favorites",
        "Keyboard navigation"
      ]
    },
    comparisonTool: {
      purpose: "Compare countries side-by-side",
      features: [
        "Compare up to 4 countries",
        "Multiple metrics",
        "Ranking system",
        "Percentage differences",
        "Similarity score",
        "Export data"
      ],
      metrics: [
        "📊 Population",
        "💰 GDP & GDP per Capita",
        "🗺️ Land Area",
        "👥 Population Density",
        "📈 Growth Rate"
      ],
      comparisonLogic: {
        ranking: "Automatic ranking for each metric",
        differences: "Visual comparison indicators",
        similarity: "Find countries with similar profiles",
        export: "Export comparison data for charts"
      }
    },
    quizMode: {
      purpose: "Test geography knowledge",
      questionTypes: [
        {
          type: "Capital",
          icon: "🏛️",
          description: "Identify capital cities"
        },
        {
          type: "Population",
          icon: "👥",
          description: "Estimate population"
        },
        {
          type: "Flag",
          icon: "🚩",
          description: "Identify flags"
        },
        {
          type: "Location",
          icon: "🗺️",
          description: "Geographic regions"
        },
        {
          type: "Currency",
          icon: "💱",
          description: "Currency recognition"
        },
        {
          type: "Landmark",
          icon: "🏛️",
          description: "Famous landmarks"
        }
      ],
      difficulty: {
        Easy: {
          points: 10,
          timeLimit: 30,
          features: ["Multiple choice", "Hints"]
        },
        Medium: {
          points: 25,
          timeLimit: 20,
          features: ["Multiple choice", "No hints"]
        },
        Hard: {
          points: 50,
          timeLimit: 15,
          features: ["Open answer", "No hints"]
        }
      },
      ranks: [
        "Tourist",
        "Explorer",
        "Navigator",
        "Geographer",
        "Geography Genius"
      ],
      features: [
        "Score tracking",
        "Time limits",
        "Leaderboard",
        "Ranks system"
      ]
    },
    weatherData: {
      purpose: "Real-time weather for capitals",
      data: [
        "Temperature (°C/°F)",
        "Weather condition",
        "Humidity percentage",
        "Wind speed (km/h)",
        "Weather icons"
      ],
      features: [
        "Current conditions",
        "Color-coded indicators",
        "Visual icons",
        "Smart caching (30 minutes)",
        "Batch fetching"
      ],
      implementation: {
        api: "OpenWeatherMap",
        caching: "30-minute cache",
        units: "Metric/Imperial toggle",
        icons: "Weather condition icons"
      }
    },
    achievements: {
      purpose: "Track accomplishments",
      categories: [
        "Quiz Master",
        "Explorer",
        "Speed Demon",
        "Comparison Expert",
        "Perfect Score"
      ],
      tiers: [
        "Common",
        "Rare",
        "Epic",
        "Legendary"
      ],
      storage: "LocalStorage",
      tracking: "Progress tracking for each achievement"
    }
  }
}
```

### UI/UX Design

```typescript
{
  design: {
    aesthetic: "Cyberpunk",
    features: [
      "Dark theme",
      "Neon accents",
      "Glowing effects",
      "Futuristic typography",
      "Holographic UI elements",
      "Smooth animations"
    ],
    colors: [
      {
        name: "Primary",
        value: "#00ff88 - Neon green"
      },
      {
        name: "Secondary",
        value: "#00ffff - Cyan"
      },
      {
        name: "Accent",
        value: "#ff00ff - Magenta"
      },
      {
        name: "Background",
        value: "#0a0a0f - Dark blue-black"
      }
    ],
    animations: {
      library: "Framer Motion",
      types: [
        "Fade in/out",
        "Slide transitions",
        "Scale effects",
        "Hover effects",
        "Loading animations"
      ],
      features: [
        "Smooth transitions",
        "Gesture animations",
        "Layout animations",
        "Variants"
      ]
    },
    responsiveness: {
      breakpoints: [
        "Mobile (320px)",
        "Tablet (768px)",
        "Desktop (1024px)",
        "Large (1280px)"
      ],
      features: [
        "Responsive grid",
        "Adaptive layouts",
        "Touch-friendly",
        "Keyboard navigation"
      ]
    }
  }
}
```

### Performance Optimization

```typescript
{
  performance: {
    strategies: [
      "Lazy loading countries",
      "Debounced search",
      "Weather data caching (30 min)",
      "Three.js geometry instancing",
      "Texture compression",
      "Code splitting",
      "Component memoization"
    ],
    threeJS: {
      optimizations: [
        "Geometry instancing",
        "Texture compression",
        "Render loop optimization",
        "Raycaster optimization"
      ]
    },
    api: {
      optimizations: [
        "Request caching",
        "Debounced requests",
        "Batch API calls",
        "Error handling"
      ]
    }
  }
}
```

### Error Handling

```typescript
{
  errorHandling: {
    api: {
      type: "HTTP errors",
      handling: [
        "Axios interceptors",
        "Error messages",
        "Fallback data",
        "Retry logic",
        "User-friendly errors"
      ]
    },
    user: {
      validation: "Input validation",
      features: [
        "Type checking",
        "Range validation",
        "Null checks",
        "Error boundaries"
      ]
    }
  }
}
```

### Accessibility

```typescript
{
  accessibility: {
    features: [
      "Keyboard navigation",
      "ARIA labels",
      "Screen reader support",
      "Focus management",
      "Color contrast",
      "Touch support"
    ],
    keyboard: {
      shortcuts: [
        "Arrow Down - Navigate down",
        "Arrow Up - Navigate up",
        "Enter - Select item",
        "Escape - Close modal"
      ]
    }
  }
}
```

### Build Pipeline

```typescript
{
  build: {
    dev: "npm run dev (Vite dev server)",
    build: "npm run build (tsc && vite build)",
    output: "dist/ directory",
    features: [
      "TypeScript compilation",
      "Code splitting",
      "Tree-shaking",
      "Minification",
      "Optimized bundles"
    ]
  }
}
```

### CI/CD Pipeline

```yaml
Push to main → Build → Test → Deploy
     ↓          ↓        ↓        ↓
  Trigger    Vite      Vitest   Vercel
             Build     Tests    Deploy
```

- **Build**: Vite production build
- **Test**: Unit tests
- **Deploy**: Vercel deployment

### Environment Variables

```typescript
{
  envVariables: {
    VITE_OPENWEATHER_API_KEY: "OpenWeatherMap API key (optional)",
    VITE_API_BASE_URL: "API base URL (optional)"
  }
}
```

### Deployment

```typescript
{
  deployment: {
    vercel: {
      url: "https://27-game-world-net.vercel.app",
      features: [
        "Automatic deployments",
        "Edge functions",
        "Preview deployments"
      ],
      config: "vercel.json"
    }
  }
}
```

### Key Architectural Decisions

**Why Three.js for Globe Visualization?**
- High-performance 3D rendering
- WebGL-based for hardware acceleration
- Extensive ecosystem and examples
- Great documentation
- Supports shaders for custom effects

**Why Zustand for State Management?**
- Simpler than Redux
- No providers needed
- Excellent TypeScript support
- Built-in persistence middleware
- Perfect for game state

**Why REST Countries API?**
- No API key required
- Free and open
- Up-to-date data
- Well-documented
- Comprehensive data

**Why OpenWeatherMap?**
- Reliable weather data
- Good documentation
- Free tier available
- Global coverage
- Weather icons included

**Why Framer Motion?**
- Smooth animations
- Gesture support
- Layout animations
- Easy to use
- Great performance

**Why Vite?**
- Fast development with HMR
- ESBuild-based for speed
- Optimized production builds
- Native ESM support
- Good React/TypeScript integration

### Design Philosophy

```typescript
{
  design: {
    principles: [
      "Cyberpunk aesthetic",
      "Immersive 3D visualization",
      "Smooth animations",
      "Responsive design",
      "Accessible gameplay"
    ],
    gameplay: {
      focus: "Geography knowledge",
      elements: [
        "Country database",
        "Quiz mode",
        "Comparison tool",
        "Weather data",
        "3D globe"
      ]
    }
  }
}
```

### Extension Points

```typescript
{
  extensions: [
    "Multiplayer quiz mode",
    "More question types",
    "Additional map projections",
    "Historical data",
    "Economic indicators",
    "Climate data",
    "3D landmarks",
    "Augmented reality mode",
    "Social sharing"
  ]
}
```

---

## 🌟 Features

### Core Gameplay
- **Country Database**: Comprehensive country information with 250+ countries
- **Cyberpunk UI**: Modern dark theme with neon accents
- **3D Interactive Globe**: Beautiful Three.js globe with atmosphere glow
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
- 📍 Tourist (0-99 points)
- 🧭 Explorer (100-499 points)
- 🗺️ Navigator (500-999 points)
- 📚 Geographer (1000-4999 points)
- 🏆 Geography Genius (5000+ points)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Vercel
1. Import project to [vercel.com](https://vercel.com)
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Manual Deployment
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

---

## 👤 Human Touch

- **Cyberpunk Aesthetic**: Designed with a deliberate futuristic, dark, neon style
- **Typing Animation**: The title has a cool typing effect on load
- **Smooth Transitions**: Framer Motion animations throughout
- **Keyboard Navigation**: Full keyboard support for accessibility

---

*Made by MK — Musharraf Kazi*

## 📝 License

MIT

---

*Last updated: 2026-03-01*
