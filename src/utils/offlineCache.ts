/**
 * Offline Data Caching
 * Cache country data for offline access
 */

import { Country } from './quizSystem'

export interface CachedData {
  countries: Country[]
  timestamp: number
  version: string
}

export interface CacheMetadata {
  size: number
  timestamp: number
  expiry: number
  version: string
}

export class OfflineCache {
  private readonly CACHE_KEY = 'world_net_cache'
  private readonly CACHE_VERSION = '1.0.0'
  private readonly DEFAULT_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

  /**
   * Cache country data
   */
  async cacheData(countries: Country[], expiryMs: number = this.DEFAULT_EXPIRY): Promise<void> {
    const data: CachedData = {
      countries,
      timestamp: Date.now(),
      version: this.CACHE_VERSION
    }

    try {
      // Compress data if it's large
      const serialized = JSON.stringify(data)
      const compressed = this.compress(serialized)

      // Store in localStorage with metadata
      const metadata: CacheMetadata = {
        size: compressed.length,
        timestamp: Date.now(),
        expiry: Date.now() + expiryMs,
        version: this.CACHE_VERSION
      }

      localStorage.setItem(this.CACHE_KEY, compressed)
      localStorage.setItem(`${this.CACHE_KEY}_meta`, JSON.stringify(metadata))

      // Also try to use IndexedDB for larger datasets
      if ('indexedDB' in window) {
        await this.saveToIndexedDB(data)
      }
    } catch (error) {
      console.error('Failed to cache data:', error)
      throw new Error('Storage quota exceeded or caching not supported')
    }
  }

  /**
   * Retrieve cached data
   */
  async getCachedData(): Promise<CachedData | null> {
    try {
      // Try IndexedDB first (faster for large datasets)
      if ('indexedDB' in window) {
        const idbData = await this.getFromIndexedDB()
        if (idbData && !this.isExpired(idbData)) {
          return idbData
        }
      }

      // Fallback to localStorage
      const compressed = localStorage.getItem(this.CACHE_KEY)
      if (!compressed) return null

      const metadataStr = localStorage.getItem(`${this.CACHE_KEY}_meta`)
      if (metadataStr) {
        const metadata: CacheMetadata = JSON.parse(metadataStr)
        if (this.isExpiredMetadata(metadata)) {
          return null
        }
      }

      const decompressed = this.decompress(compressed)
      const data: CachedData = JSON.parse(decompressed)

      if (this.isExpired(data)) {
        return null
      }

      return data
    } catch (error) {
      console.error('Failed to retrieve cached data:', error)
      return null
    }
  }

  /**
   * Check if cache is valid
   */
  isCacheValid(): boolean {
    const compressed = localStorage.getItem(this.CACHE_KEY)
    if (!compressed) return false

    try {
      const metadataStr = localStorage.getItem(`${this.CACHE_KEY}_meta`)
      if (metadataStr) {
        const metadata: CacheMetadata = JSON.parse(metadataStr)
        return !this.isExpiredMetadata(metadata)
      }
    } catch {
      return false
    }

    return true
  }

  /**
   * Get cache metadata
   */
  getCacheMetadata(): CacheMetadata | null {
    try {
      const metadataStr = localStorage.getItem(`${this.CACHE_KEY}_meta`)
      return metadataStr ? JSON.parse(metadataStr) : null
    } catch {
      return null
    }
  }

  /**
   * Clear cached data
   */
  async clearCache(): Promise<void> {
    localStorage.removeItem(this.CACHE_KEY)
    localStorage.removeItem(`${this.CACHE_KEY}_meta`)

    if ('indexedDB' in window) {
      await this.clearIndexedDB()
    }
  }

  /**
   * Update cache with new or modified countries
   */
  async updateCache(updates: Partial<Country>[]): Promise<void> {
    const cached = await this.getCachedData()
    if (!cached) return

    const countriesMap = new Map(cached.countries.map(c => [c.code, c]))

    updates.forEach(update => {
      if (update.code && countriesMap.has(update.code)) {
        countriesMap.set(update.code, {
          ...countriesMap.get(update.code)!,
          ...update
        })
      }
    })

    cached.countries = Array.from(countriesMap.values())
    await this.cacheData(cached.countries)
  }

  /**
   * Search cached countries
   */
  async searchCountries(query: string): Promise<Country[]> {
    const cached = await this.getCachedData()
    if (!cached) return []

    const lowerQuery = query.toLowerCase()
    return cached.countries.filter(country =>
      country.name.toLowerCase().includes(lowerQuery) ||
      country.code.toLowerCase().includes(lowerQuery) ||
      country.capital.toLowerCase().includes(lowerQuery) ||
      country.region.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get country by code from cache
   */
  async getCountryByCode(code: string): Promise<Country | null> {
    const cached = await this.getCachedData()
    if (!cached) return null

    return cached.countries.find(c => c.code === code) || null
  }

  /**
   * Get countries by region from cache
   */
  async getCountriesByRegion(region: string): Promise<Country[]> {
    const cached = await this.getCachedData()
    if (!cached) return []

    return cached.countries.filter(c => c.region === region)
  }

  /**
   * Preload data for offline use
   */
  async preloadData(countries: Country[]): Promise<void> {
    // Check if cache exists and is recent
    if (this.isCacheValid()) {
      const metadata = this.getCacheMetadata()
      const age = Date.now() - (metadata?.timestamp || 0)
      const maxAge = 6 * 60 * 60 * 1000 // 6 hours

      if (age < maxAge) {
        console.log('Using recent cache, skipping preload')
        return
      }
    }

    console.log('Preloading data for offline use...')
    await this.cacheData(countries)
    console.log('Data cached successfully')
  }

  /**
   * Estimate cache size
   */
  getCacheSize(): string {
    const compressed = localStorage.getItem(this.CACHE_KEY)
    if (!compressed) return '0 B'

    const bytes = compressed.length
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  /**
   * Check if browser supports offline caching
   */
  isSupported(): boolean {
    return 'localStorage' in window && localStorage !== null
  }

  /**
   * Check if data is expired
   */
  private isExpired(data: CachedData): boolean {
    const metadata = this.getCacheMetadata()
    if (!metadata) return false
    return this.isExpiredMetadata(metadata)
  }

  private isExpiredMetadata(metadata: CacheMetadata): boolean {
    return Date.now() > metadata.expiry
  }

  /**
   * Simple compression (placeholder - use real compression in production)
   */
  private compress(data: string): string {
    // In production, use lz-string or similar
    return btoa(data)
  }

  private decompress(data: string): string {
    return atob(data)
  }

  /**
   * IndexedDB operations for larger datasets
   */
  private async saveToIndexedDB(data: CachedData): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('WorldNetCache', 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['countries'], 'readwrite')
        const store = transaction.objectStore('countries')
        store.put({ id: 'main', data })
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('countries')) {
          db.createObjectStore('countries', { keyPath: 'id' })
        }
      }
    })
  }

  private async getFromIndexedDB(): Promise<CachedData | null> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('WorldNetCache', 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['countries'], 'readonly')
        const store = transaction.objectStore('countries')
        const getRequest = store.get('main')

        getRequest.onsuccess = () => {
          resolve(getRequest.result?.data || null)
        }
        getRequest.onerror = () => reject(getRequest.error)
      }
    })
  }

  private async clearIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('WorldNetCache', 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['countries'], 'readwrite')
        const store = transaction.objectStore('countries')
        store.delete('main')

        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      }
    })
  }
}

// Singleton instance
let cacheInstance: OfflineCache | null = null

export function getOfflineCache(): OfflineCache {
  if (!cacheInstance) {
    cacheInstance = new OfflineCache()
  }
  return cacheInstance
}

/**
 * Hook for using offline cache in React components
 */
export function useOfflineCache() {
  const cache = getOfflineCache()

  return {
    cacheData: cache.cacheData.bind(cache),
    getCachedData: cache.getCachedData.bind(cache),
    isCacheValid: cache.isCacheValid.bind(cache),
    clearCache: cache.clearCache.bind(cache),
    updateCache: cache.updateCache.bind(cache),
    searchCountries: cache.searchCountries.bind(cache),
    getCountryByCode: cache.getCountryByCode.bind(cache),
    getCountriesByRegion: cache.getCountriesByRegion.bind(cache),
    preloadData: cache.preloadData.bind(cache),
    getCacheSize: cache.getCacheSize.bind(cache),
    isSupported: cache.isSupported.bind(cache)
  }
}
