/**
 * Real-time Weather Data Integration
 * Fetches and displays current weather for countries
 */

export interface WeatherData {
  country: string
  capital: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  timestamp: number
}

export interface WeatherCache {
  [countryCode: string]: {
    data: WeatherData
    expiry: number
  }
}

export class WeatherService {
  private cache: WeatherCache = {}
  private readonly CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

  /**
   * Get weather data for a country
   * Uses mock data for demonstration - replace with real API call
   */
  async getWeather(countryCode: string, countryName: string, capital: string): Promise<WeatherData> {
    // Check cache first
    const cached = this.cache[countryCode]
    if (cached && Date.now() < cached.expiry) {
      return cached.data
    }

    // Simulate API call with mock data
    // In production, replace with actual weather API (e.g., OpenWeatherMap)
    const mockData = await this.fetchMockWeather(countryName, capital)

    // Cache the result
    this.cache[countryCode] = {
      data: mockData,
      expiry: Date.now() + this.CACHE_DURATION
    }

    return mockData
  }

  /**
   * Fetch weather for multiple countries
   */
  async getBatchWeather(countries: Array<{ code: string; name: string; capital: string }>): Promise<WeatherData[]> {
    const promises = countries.map(country =>
      this.getWeather(country.code, country.name, country.capital)
    )

    return Promise.all(promises)
  }

  /**
   * Mock weather data generator
   * Replace this with actual API call in production
   */
  private async fetchMockWeather(countryName: string, capital: string): Promise<WeatherData> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))

    // Generate realistic weather based on "climate zones"
    const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Stormy', 'Snowy', 'Foggy']
    const icons = ['☀️', '☁️', '⛅', '🌧️', '⛈️', '❄️', '🌫️']

    // Simple climate simulation based on country name (for demo)
    let baseTemp = 20
    let possibleConditions = conditions.slice(0, 4)

    if (countryName.toLowerCase().includes('iceland') || countryName.toLowerCase().includes('greenland')) {
      baseTemp = 5
      possibleConditions = ['Snowy', 'Cloudy', 'Foggy']
    } else if (countryName.toLowerCase().includes('india') || countryName.toLowerCase().includes('africa')) {
      baseTemp = 30
      possibleConditions = ['Sunny', 'Partly Cloudy', 'Rainy']
    } else if (countryName.toLowerCase().includes('russia') || countryName.toLowerCase().includes('canada')) {
      baseTemp = 10
      possibleConditions = ['Snowy', 'Cloudy', 'Sunny']
    }

    const condition = possibleConditions[Math.floor(Math.random() * possibleConditions.length)]
    const iconIndex = conditions.indexOf(condition)

    return {
      country: countryName,
      capital,
      temperature: Math.round(baseTemp + (Math.random() - 0.5) * 15),
      condition,
      humidity: Math.round(40 + Math.random() * 50),
      windSpeed: Math.round(5 + Math.random() * 25),
      icon: icons[iconIndex] || '🌡️',
      timestamp: Date.now()
    }
  }

  /**
   * Get cached weather data without API call
   */
  getCachedWeather(countryCode: string): WeatherData | null {
    const cached = this.cache[countryCode]
    if (cached && Date.now() < cached.expiry) {
      return cached.data
    }
    return null
  }

  /**
   * Clear expired cache entries
   */
  clearExpiredCache(): void {
    const now = Date.now()
    for (const key in this.cache) {
      if (now >= this.cache[key].expiry) {
        delete this.cache[key]
      }
    }
  }

  /**
   * Clear all cache
   */
  clearCache(): void {
    this.cache = {}
  }

  /**
   * Get weather condition color for UI
   */
  getConditionColor(condition: string): string {
    const colors: Record<string, string> = {
      'Sunny': '#fbbf24',
      'Cloudy': '#9ca3af',
      'Partly Cloudy': '#60a5fa',
      'Rainy': '#3b82f6',
      'Stormy': '#4b5563',
      'Snowy': '#e5e7eb',
      'Foggy': '#d1d5db'
    }
    return colors[condition] || '#6b7280'
  }

  /**
   * Get temperature color scale
   */
  getTemperatureColor(temp: number): string {
    if (temp <= 0) return '#3b82f6' // Freezing - blue
    if (temp <= 10) return '#06b6d4' // Cold - cyan
    if (temp <= 20) return '#10b981' // Cool - green
    if (temp <= 30) return '#f59e0b' // Warm - orange
    return '#ef4444' // Hot - red
  }
}

// Singleton instance
let weatherServiceInstance: WeatherService | null = null

export function getWeatherService(): WeatherService {
  if (!weatherServiceInstance) {
    weatherServiceInstance = new WeatherService()
  }
  return weatherServiceInstance
}

/**
 * Hook for using weather data in React components
 */
export function useWeather() {
  const service = getWeatherService()

  return {
    getWeather: service.getWeather.bind(service),
    getBatchWeather: service.getBatchWeather.bind(service),
    getCachedWeather: service.getCachedWeather.bind(service),
    clearCache: service.clearCache.bind(service),
    getConditionColor: service.getConditionColor.bind(service),
    getTemperatureColor: service.getTemperatureColor.bind(service)
  }
}
